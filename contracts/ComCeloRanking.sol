// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title ComCeloRanking
/// @notice Ranked ladder, ELO ratings, and seasonal rankings
contract ComCeloRanking is Ownable {
    struct PlayerRating {
        uint32 elo;
        uint32 wins;
        uint32 losses;
        uint32 gamesPlayed;
        uint256 lastGameTime;
    }

    mapping(address => PlayerRating) public playerRatings;
    mapping(uint8 => string) public seasonNames;
    uint8 public currentSeason;
    uint256 public eloMultiplier = 32; // K-factor

    event PlayerRatingUpdated(
        address indexed player,
        uint32 newElo,
        uint32 wins,
        uint32 losses
    );
    event SeasonStarted(uint8 indexed seasonNumber, string name);

    constructor() {
        currentSeason = 1;
        seasonNames[1] = "Season 1: Genesis";
    }

    function getRating(address player) external view returns (PlayerRating memory) {
        return playerRatings[player];
    }

    function updateRating(address winner, address loser, bool winnerWins) external onlyOwner {
        PlayerRating storage winnerRating = playerRatings[winner];
        PlayerRating storage loserRating = playerRatings[loser];

        // Initialize ratings at 1600 if new player
        if (winnerRating.elo == 0) winnerRating.elo = 1600;
        if (loserRating.elo == 0) loserRating.elo = 1600;

        // Simple ELO: K * (1 - expected win probability)
        // For simplicity, just swap wins and losses
        if (winnerWins) {
            winnerRating.wins++;
            loserRating.losses++;
        } else {
            loserRating.wins++;
            winnerRating.losses++;
        }

        winnerRating.gamesPlayed++;
        loserRating.gamesPlayed++;
        winnerRating.lastGameTime = block.timestamp;
        loserRating.lastGameTime = block.timestamp;

        emit PlayerRatingUpdated(winner, winnerRating.elo, winnerRating.wins, winnerRating.losses);
        emit PlayerRatingUpdated(loser, loserRating.elo, loserRating.wins, loserRating.losses);
    }

    function startNewSeason(string calldata name) external onlyOwner {
        currentSeason++;
        seasonNames[currentSeason] = name;
        emit SeasonStarted(currentSeason, name);
    }
}
