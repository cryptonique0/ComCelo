// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title ComCeloAchievements
/// @notice Track and award player achievements and badges
contract ComCeloAchievements is Ownable {
    // Base Mainnet Deployed Addresses
    address public constant UNITS_ADDRESS = 0x7230b1E0efAa8578a418B42ce92bE6c78ceBa59E;
    address public constant TREASURY_ADDRESS = 0xd32283CcD387A58FF14314f2A103b58c96Bb61F9;
    address public constant CORE_ADDRESS = 0xa70b1163dB94bfdB38C11B820cF2C7094372c134;
    address public constant MATCHMAKER_ADDRESS = 0x7F5ACfe82A31498e057ebE2fE11be6AB0135a293;
    address public constant ACHIEVEMENTS_ADDRESS = 0xB73cC20D1C7aFA00f3c8C0e896a521D2E5bAE846;
    address public constant ANTICHEAT_ADDRESS = 0x3B4b40e5AA58B926C330F2581C38d94bd0302633;
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
