// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title ComCeloAchievements
/// @notice Track and award player achievements and badges
contract ComCeloAchievements is Ownable {
    enum AchievementType {
        FirstWin,
        TenWins,
        HundredWins,
        WinStreak5,
        WinStreak10,
        PerfectGame,
        TournamentWinner,
        SeasonalChampion
    }

    struct Achievement {
        AchievementType achievementType;
        string name;
        string description;
        uint256 points;
        bool active;
    }

    mapping(AchievementType => Achievement) public achievements;
    mapping(address => mapping(AchievementType => bool)) public playerAchievements;
    mapping(address => uint256) public totalPoints;

    event AchievementUnlocked(address indexed player, AchievementType achievement);

    constructor() {
        // Initialize achievements
        achievements[AchievementType.FirstWin] = Achievement({
            achievementType: AchievementType.FirstWin,
            name: "First Victory",
            description: "Win your first duel",
            points: 10,
            active: true
        });

        achievements[AchievementType.TenWins] = Achievement({
            achievementType: AchievementType.TenWins,
            name: "Warrior",
            description: "Achieve 10 wins",
            points: 50,
            active: true
        });

        achievements[AchievementType.HundredWins] = Achievement({
            achievementType: AchievementType.HundredWins,
            name: "Legend",
            description: "Achieve 100 wins",
            points: 500,
            active: true
        });

        achievements[AchievementType.WinStreak5] = Achievement({
            achievementType: AchievementType.WinStreak5,
            name: "On Fire",
            description: "Win 5 games in a row",
            points: 75,
            active: true
        });

        achievements[AchievementType.PerfectGame] = Achievement({
            achievementType: AchievementType.PerfectGame,
            name: "Flawless Victory",
            description: "Win without losing any units",
            points: 200,
            active: true
        });

        achievements[AchievementType.TournamentWinner] = Achievement({
            achievementType: AchievementType.TournamentWinner,
            name: "Tournament Champion",
            description: "Win a tournament",
            points: 300,
            active: true
        });
    }

    function unlockAchievement(address player, AchievementType achievementType) external onlyOwner {
        require(achievements[achievementType].active, "Achievement inactive");
        require(!playerAchievements[player][achievementType], "Already unlocked");

        playerAchievements[player][achievementType] = true;
        totalPoints[player] += achievements[achievementType].points;

        emit AchievementUnlocked(player, achievementType);
    }

    function hasAchievement(address player, AchievementType achievementType) external view returns (bool) {
        return playerAchievements[player][achievementType];
    }

    function getPlayerPoints(address player) external view returns (uint256) {
        return totalPoints[player];
    }
}
