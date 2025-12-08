// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title ComCeloQuests
 * @dev Daily quests and challenges system for ComCelo
 * Players earn rewards by completing daily/weekly objectives
 */
contract ComCeloQuests is Ownable, Pausable, ReentrancyGuard {
    // Quest types
    enum QuestType {
        WIN_GAMES,           // Win N games
        ATTACK_COUNT,        // Land N attacks
        PLAY_HOURS,         // Play for N hours
        TOURNAMENT_ENTRY,   // Enter tournament
        SKILL_USAGE,        // Use skill N times
        HEAL_DAMAGE,        // Heal/defend against damage
        ITEM_PURCHASE,      // Purchase N items
        STREAK_WINS         // Achieve N-win streak
    }

    // Quest status
    enum QuestStatus {
        NOT_STARTED,
        IN_PROGRESS,
        COMPLETED,
        CLAIMED
    }

    struct Quest {
        uint256 id;
        QuestType questType;
        string title;
        string description;
        uint256 targetProgress;
        uint256 rewardAmount; // in CELO
        uint256 expiryTime;
        bool isDaily; // true for daily, false for weekly
        uint256 createdAt;
    }

    struct PlayerQuest {
        uint256 questId;
        uint256 currentProgress;
        QuestStatus status;
        uint256 startedAt;
        uint256 completedAt;
    }

    // State variables
    mapping(uint256 => Quest) public quests;
    mapping(address => mapping(uint256 => PlayerQuest)) public playerQuests; // player => questId => progress
    mapping(address => uint256) public playerRewardBalance;
    
    uint256 public questCounter;
    uint256 public totalRewardsDistributed;

    // Events
    event QuestCreated(uint256 indexed questId, QuestType questType, string title, uint256 reward);
    event QuestStarted(address indexed player, uint256 indexed questId);
    event QuestProgress(address indexed player, uint256 indexed questId, uint256 newProgress);
    event QuestCompleted(address indexed player, uint256 indexed questId, uint256 reward);
    event RewardClaimed(address indexed player, uint256 amount);
    event DailyQuestsReset(uint256 timestamp);

    constructor() {
        // Initialize with default quests
        _createDefaultQuests();
    }

    /**
     * @dev Create a new quest
     */
    function createQuest(
        QuestType questType,
        string memory title,
        string memory description,
        uint256 targetProgress,
        uint256 rewardAmount,
        uint256 durationDays,
        bool isDaily
    ) external onlyOwner {
        _createQuestInternal(
            questType,
            title,
            description,
            targetProgress,
            rewardAmount,
            durationDays,
            isDaily
        );
    }

    /**
     * @dev Start a quest for a player
     */
    function startQuest(uint256 questId) external {
        require(questId < questCounter, "Invalid quest ID");
        
        Quest memory quest = quests[questId];
        require(block.timestamp <= quest.expiryTime, "Quest expired");
        
        PlayerQuest storage pq = playerQuests[msg.sender][questId];
        require(pq.status != QuestStatus.CLAIMED, "Quest already claimed");

        pq.questId = questId;
        pq.status = QuestStatus.IN_PROGRESS;
        pq.startedAt = block.timestamp;
        pq.currentProgress = 0;

        emit QuestStarted(msg.sender, questId);
    }

    /**
     * @dev Update quest progress (called by ComCeloCore)
     */
    function updateProgress(
        address player,
        uint256 questId,
        uint256 progressIncrement
    ) external onlyOwner {
        require(questId < questCounter, "Invalid quest ID");

        PlayerQuest storage pq = playerQuests[player][questId];
        require(pq.status == QuestStatus.IN_PROGRESS, "Quest not in progress");

        Quest memory quest = quests[questId];
        require(block.timestamp <= quest.expiryTime, "Quest expired");

        pq.currentProgress += progressIncrement;

        emit QuestProgress(player, questId, pq.currentProgress);

        // Check if completed
        if (pq.currentProgress >= quest.targetProgress) {
            _completeQuest(player, questId);
        }
    }

    /**
     * @dev Complete a quest
     */
    function _completeQuest(address player, uint256 questId) internal {
        PlayerQuest storage pq = playerQuests[player][questId];
        Quest memory quest = quests[questId];

        pq.status = QuestStatus.COMPLETED;
        pq.completedAt = block.timestamp;

        // Add reward to balance
        playerRewardBalance[player] += quest.rewardAmount;
        totalRewardsDistributed += quest.rewardAmount;

        emit QuestCompleted(player, questId, quest.rewardAmount);
    }

    /**
     * @dev Claim quest rewards
     */
    function claimRewards() external nonReentrant {
        uint256 amount = playerRewardBalance[msg.sender];
        require(amount > 0, "No rewards to claim");

        playerRewardBalance[msg.sender] = 0;

        // In production: transfer CELO tokens
        // celo.transfer(msg.sender, amount);

        emit RewardClaimed(msg.sender, amount);
    }

    /**
     * @dev Get player's active quests
     */
    function getPlayerActiveQuests(address player) 
        external 
        view 
        returns (uint256[] memory activeQuestIds) 
    {
        uint256[] memory temp = new uint256[](questCounter);
        uint256 count = 0;

        for (uint256 i = 0; i < questCounter; i++) {
            PlayerQuest memory pq = playerQuests[player][i];
            if (pq.status == QuestStatus.IN_PROGRESS) {
                temp[count] = i;
                count++;
            }
        }

        activeQuestIds = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            activeQuestIds[i] = temp[i];
        }
    }

    /**
     * @dev Get quest details
     */
    function getQuest(uint256 questId) 
        external 
        view 
        returns (Quest memory) 
    {
        require(questId < questCounter, "Invalid quest ID");
        return quests[questId];
    }

    /**
     * @dev Get player's quest progress
     */
    function getQuestProgress(address player, uint256 questId) 
        external 
        view 
        returns (PlayerQuest memory) 
    {
        require(questId < questCounter, "Invalid quest ID");
        return playerQuests[player][questId];
    }

    /**
     * @dev Get all quests
     */
    function getAllQuests() 
        external 
        view 
        returns (Quest[] memory) 
    {
        Quest[] memory allQuests = new Quest[](questCounter);
        for (uint256 i = 0; i < questCounter; i++) {
            allQuests[i] = quests[i];
        }
        return allQuests;
    }

    /**
     * @dev Reset daily quests (called by owner/contract)
     */
    function resetDailyQuests() external onlyOwner {
        // In production, iterate through daily quests and reset
        emit DailyQuestsReset(block.timestamp);
    }

    /**
     * @dev Initialize with default quests
     */
    function _createDefaultQuests() internal {
        // Daily: Win 3 games
        _createQuestInternal(
            QuestType.WIN_GAMES,
            "Daily Victor",
            "Win 3 games",
            3,
            50 ether,
            1,
            true
        );

        // Daily: Land 15 attacks
        _createQuestInternal(
            QuestType.ATTACK_COUNT,
            "Attack Master",
            "Land 15 attacks",
            15,
            40 ether,
            1,
            true
        );

        // Weekly: Enter tournament
        _createQuestInternal(
            QuestType.TOURNAMENT_ENTRY,
            "Tournament Challenger",
            "Enter 1 tournament",
            1,
            100 ether,
            7,
            false
        );

        // Weekly: Achieve 5-win streak
        _createQuestInternal(
            QuestType.STREAK_WINS,
            "Winning Streak",
            "Achieve 5-game win streak",
            5,
            150 ether,
            7,
            false
        );
    }

    /**
     * @dev Internal helper for quest creation
     */
    function _createQuestInternal(
        QuestType questType,
        string memory title,
        string memory description,
        uint256 targetProgress,
        uint256 rewardAmount,
        uint256 durationDays,
        bool isDaily
    ) internal {
        require(targetProgress > 0, "Target must be > 0");
        require(rewardAmount > 0, "Reward must be > 0");
        require(durationDays > 0, "Duration must be > 0");

        uint256 questId = questCounter++;
        uint256 expiryTime = block.timestamp + (durationDays * 1 days);

        quests[questId] = Quest({
            id: questId,
            questType: questType,
            title: title,
            description: description,
            targetProgress: targetProgress,
            rewardAmount: rewardAmount,
            expiryTime: expiryTime,
            isDaily: isDaily,
            createdAt: block.timestamp
        });

        emit QuestCreated(questId, questType, title, rewardAmount);
    }

    /**
     * @dev Pause contract (emergency)
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause contract
     */
    function unpause() external onlyOwner {
        _unpause();
    }
}
