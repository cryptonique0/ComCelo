// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";

/// @title ComCeloSeasons
/// @notice Manages seasonal passes, battle pass progression, and season rewards
contract ComCeloSeasons is Ownable, Pausable {
    struct Season {
        uint256 seasonId;
        uint256 startBlock;
        uint256 endBlock;
        string name;
        uint256 rewardPool;
        bool active;
    }

    struct PlayerProgress {
        uint256 level;
        uint256 experience;
        bool premiumPass;
        uint256 reward;
    }

    mapping(uint256 => Season) public seasons;
    mapping(uint256 => mapping(address => PlayerProgress)) public playerProgress;

    uint256 public currentSeason;
    uint256 public totalSeasons;

    event SeasonStarted(uint256 indexed seasonId, string name);
    event SeasonEnded(uint256 indexed seasonId);
    event LevelUp(address indexed player, uint256 season, uint256 newLevel);
    event RewardClaimed(address indexed player, uint256 season, uint256 amount);

    constructor() {
        currentSeason = 0;
        totalSeasons = 0;
    }

    function createSeason(
        string memory name,
        uint256 durationBlocks,
        uint256 rewardPool
    ) external onlyOwner returns (uint256 seasonId) {
        seasonId = totalSeasons++;
        uint256 startBlock = block.number;
        uint256 endBlock = startBlock + durationBlocks;

        seasons[seasonId] = Season({
            seasonId: seasonId,
            startBlock: startBlock,
            endBlock: endBlock,
            name: name,
            rewardPool: rewardPool,
            active: true
        });

        currentSeason = seasonId;
        emit SeasonStarted(seasonId, name);
    }

    function gainExperience(address player, uint256 amount) external onlyOwner {
        uint256 season = currentSeason;
        PlayerProgress storage progress = playerProgress[season][player];

        progress.experience += amount;

        // Every 1000 XP = 1 level
        uint256 newLevel = progress.experience / 1000;
        if (newLevel > progress.level) {
            progress.level = newLevel;
            emit LevelUp(player, season, newLevel);
        }
    }

    function claimSeasonReward(uint256 seasonId) external {
        require(seasonId < totalSeasons, "Invalid season");
        Season storage season = seasons[seasonId];
        require(block.number >= season.endBlock, "Season not ended");

        PlayerProgress storage progress = playerProgress[seasonId][msg.sender];
        require(progress.level > 0, "No progress in season");
        require(progress.reward == 0, "Reward already claimed");

        uint256 reward = (season.rewardPool * progress.level) / 100;
        progress.reward = reward;

        emit RewardClaimed(msg.sender, seasonId, reward);
    }

    function getCurrentSeason() external view returns (Season memory) {
        return seasons[currentSeason];
    }

    function getPlayerProgress(uint256 seasonId, address player) external view returns (PlayerProgress memory) {
        return playerProgress[seasonId][player];
    }
}
