// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";

/// @title ComCeloPlayerStats
/// @notice Tracks player performance, streaks, and rating deltas for analytics.
contract ComCeloPlayerStats is Ownable, Pausable {
    struct Stats {
        uint256 matchesPlayed;
        uint256 wins;
        uint256 losses;
        uint256 draws;
        uint256 winStreak;
        uint256 longestWinStreak;
        uint256 mmr; // simplistic rating placeholder
        uint256 lastPlayedAt;
    }

    mapping(address => Stats) public playerStats;

    event MatchRecorded(address indexed player, bool won, bool draw, uint256 mmrDelta);
    event StatsReset(address indexed player);
    event MmrUpdated(address indexed player, uint256 newMmr);

    constructor() {}

    function recordMatch(
        address player,
        bool won,
        bool draw,
        uint256 mmrDelta
    ) external onlyOwner whenNotPaused {
        _recordMatch(player, won, draw, mmrDelta);
    }

    function _recordMatch(
        address player,
        bool won,
        bool draw,
        uint256 mmrDelta
    ) internal {
        require(player != address(0), "Invalid player");

        Stats storage s = playerStats[player];
        s.matchesPlayed += 1;
        s.lastPlayedAt = block.timestamp;

        if (draw) {
            s.draws += 1;
            s.winStreak = 0;
        } else if (won) {
            s.wins += 1;
            s.winStreak += 1;
            if (s.winStreak > s.longestWinStreak) {
                s.longestWinStreak = s.winStreak;
            }
        } else {
            s.losses += 1;
            s.winStreak = 0;
        }

        if (mmrDelta > 0) {
            s.mmr += mmrDelta;
        }

        emit MatchRecorded(player, won, draw, mmrDelta);
    }

    function bulkRecord(
        address[] calldata players,
        bool[] calldata wins,
        bool[] calldata draws,
        uint256[] calldata deltas
    ) external onlyOwner whenNotPaused {
        require(players.length == wins.length && wins.length == draws.length && draws.length == deltas.length, "Length mismatch");
        for (uint256 i = 0; i < players.length; i++) {
            _recordMatch(players[i], wins[i], draws[i], deltas[i]);
        }
    }

    function setMmr(address player, uint256 newMmr) external onlyOwner whenNotPaused {
        playerStats[player].mmr = newMmr;
        emit MmrUpdated(player, newMmr);
    }

    function resetStats(address player) external onlyOwner {
        delete playerStats[player];
        emit StatsReset(player);
    }

    function getStats(address player) external view returns (Stats memory) {
        return playerStats[player];
    }
}
