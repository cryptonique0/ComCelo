// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title ComCeloRewards
 * @dev Rewards and staking system for ComCelo
 * Players earn rewards from battles and can stake for additional yield
 */
contract ComCeloRewards is Ownable, Pausable, ReentrancyGuard {
    // Reward tier levels
    enum RewardTier {
        BRONZE,    // 0
        SILVER,    // 1
        GOLD,      // 2
        PLATINUM,  // 3
        DIAMOND    // 4
    }

    struct PlayerRewards {
        uint256 totalEarned;
        uint256 totalSpent;
        uint256 currentBalance;
        uint256 stakedAmount;
        uint256 stakingStartTime;
        RewardTier tier;
        bool isActive;
    }

    struct StakingReward {
        uint256 amount;
        uint256 stakingDuration; // in seconds
        uint256 rewardRate; // percentage (e.g., 5 = 5%)
        uint256 unlockedAt;
    }

    // State variables
    mapping(address => PlayerRewards) public playerRewards;
    mapping(address => StakingReward[]) public stakingHistory;
    
    uint256 public totalRewardsDistributed;
    uint256 public totalStakedAmount;
    
    // Reward multipliers per tier
    mapping(RewardTier => uint256) public tierMultipliers;
    
    // Event emissions
    event RewardEarned(address indexed player, uint256 amount, string reason);
    event RewardSpent(address indexed player, uint256 amount, string reason);
    event StakingStarted(address indexed player, uint256 amount, uint256 duration);
    event StakingClaimed(address indexed player, uint256 principal, uint256 rewards);
    event TierUpgrade(address indexed player, RewardTier newTier);
    event RewardBurned(uint256 amount);

    constructor() {
        // Initialize tier multipliers
        tierMultipliers[RewardTier.BRONZE] = 100;   // 1.0x
        tierMultipliers[RewardTier.SILVER] = 110;   // 1.1x
        tierMultipliers[RewardTier.GOLD] = 125;     // 1.25x
        tierMultipliers[RewardTier.PLATINUM] = 150; // 1.5x
        tierMultipliers[RewardTier.DIAMOND] = 200;  // 2.0x
    }

    /**
     * @dev Award rewards for a battle win
     */
    function awardBattleReward(address player, uint256 baseReward, bool isRanked) 
        external 
        onlyOwner 
        nonReentrant 
    {
        require(player != address(0), "Invalid player");
        require(baseReward > 0, "Reward must be > 0");

        // Calculate reward with tier multiplier and ranked bonus
        uint256 multiplier = tierMultipliers[playerRewards[player].tier];
        uint256 rankedBonus = isRanked ? 150 : 100; // 50% bonus for ranked
        
        uint256 totalReward = (baseReward * multiplier * rankedBonus) / 10000;

        // Award reward
        playerRewards[player].totalEarned += totalReward;
        playerRewards[player].currentBalance += totalReward;
        playerRewards[player].isActive = true;
        totalRewardsDistributed += totalReward;

        // Check for tier upgrade
        _checkTierUpgrade(player);

        emit RewardEarned(player, totalReward, isRanked ? "Ranked Battle" : "Casual Battle");
    }

    /**
     * @dev Award achievement rewards
     */
    function awardAchievementReward(address player, uint256 rewardAmount) 
        external 
        onlyOwner 
    {
        require(player != address(0), "Invalid player");
        require(rewardAmount > 0, "Reward must be > 0");

        playerRewards[player].currentBalance += rewardAmount;
        playerRewards[player].totalEarned += rewardAmount;
        totalRewardsDistributed += rewardAmount;

        emit RewardEarned(player, rewardAmount, "Achievement");
    }

    /**
     * @dev Spend rewards (for cosmetics, etc.)
     */
    function spendRewards(address player, uint256 amount, string memory reason) 
        external 
        onlyOwner 
    {
        require(player != address(0), "Invalid player");
        require(amount > 0, "Amount must be > 0");
        require(playerRewards[player].currentBalance >= amount, "Insufficient balance");

        playerRewards[player].currentBalance -= amount;
        playerRewards[player].totalSpent += amount;

        emit RewardSpent(player, amount, reason);
    }

    /**
     * @dev Stake rewards for additional yield
     */
    function stakeRewards(address player, uint256 amount, uint256 durationDays, uint256 rewardRate) 
        external 
        onlyOwner 
    {
        require(player != address(0), "Invalid player");
        require(amount > 0, "Amount must be > 0");
        require(durationDays > 0, "Duration must be > 0");
        require(rewardRate >= 1 && rewardRate <= 100, "Rate must be 1-100%");
        require(playerRewards[player].currentBalance >= amount, "Insufficient balance");

        // Deduct from current balance
        playerRewards[player].currentBalance -= amount;
        playerRewards[player].stakedAmount += amount;
        playerRewards[player].stakingStartTime = block.timestamp;
        
        totalStakedAmount += amount;

        // Record staking
        uint256 durationSeconds = durationDays * 1 days;
        stakingHistory[player].push(StakingReward({
            amount: amount,
            stakingDuration: durationSeconds,
            rewardRate: rewardRate,
            unlockedAt: block.timestamp + durationSeconds
        }));

        emit StakingStarted(player, amount, durationDays);
    }

    /**
     * @dev Claim staking rewards
     */
    function claimStakingRewards(address player, uint256 stakingIndex) 
        external 
        onlyOwner 
        nonReentrant 
    {
        require(player != address(0), "Invalid player");
        require(stakingIndex < stakingHistory[player].length, "Invalid staking index");

        StakingReward memory staking = stakingHistory[player][stakingIndex];
        require(block.timestamp >= staking.unlockedAt, "Staking not yet unlocked");

        // Calculate rewards
        uint256 rewardAmount = (staking.amount * staking.rewardRate) / 100;
        uint256 total = staking.amount + rewardAmount;

        // Update balances
        playerRewards[player].stakedAmount -= staking.amount;
        playerRewards[player].currentBalance += total;
        totalStakedAmount -= staking.amount;
        totalRewardsDistributed += rewardAmount;

        // Mark as claimed (remove from history)
        stakingHistory[player][stakingIndex] = stakingHistory[player][stakingHistory[player].length - 1];
        stakingHistory[player].pop();

        emit StakingClaimed(player, staking.amount, rewardAmount);
    }

    /**
     * @dev Check and upgrade player tier
     */
    function _checkTierUpgrade(address player) internal {
        uint256 totalEarned = playerRewards[player].totalEarned;
        RewardTier currentTier = playerRewards[player].tier;
        RewardTier newTier = currentTier;

        // Tier thresholds (in wei/ether units)
        if (totalEarned >= 50000 ether && currentTier < RewardTier.DIAMOND) {
            newTier = RewardTier.DIAMOND;
        } else if (totalEarned >= 10000 ether && currentTier < RewardTier.PLATINUM) {
            newTier = RewardTier.PLATINUM;
        } else if (totalEarned >= 2000 ether && currentTier < RewardTier.GOLD) {
            newTier = RewardTier.GOLD;
        } else if (totalEarned >= 500 ether && currentTier < RewardTier.SILVER) {
            newTier = RewardTier.SILVER;
        }

        if (newTier != currentTier) {
            playerRewards[player].tier = newTier;
            emit TierUpgrade(player, newTier);
        }
    }

    /**
     * @dev Burn unclaimed rewards (emergency/maintenance)
     */
    function burnRewards(address player, uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be > 0");
        require(playerRewards[player].currentBalance >= amount, "Insufficient balance");

        playerRewards[player].currentBalance -= amount;
        emit RewardBurned(amount);
    }

    /**
     * @dev Get player rewards info
     */
    function getPlayerRewards(address player) 
        external 
        view 
        returns (PlayerRewards memory) 
    {
        return playerRewards[player];
    }

    /**
     * @dev Get player's active stakings
     */
    function getPlayerStakings(address player) 
        external 
        view 
        returns (StakingReward[] memory) 
    {
        return stakingHistory[player];
    }

    /**
     * @dev Get tier multiplier
     */
    function getTierMultiplier(RewardTier tier) 
        external 
        view 
        returns (uint256) 
    {
        return tierMultipliers[tier];
    }

    /**
     * @dev Get next tier threshold
     */
    function getNextTierThreshold(address player) 
        external 
        view 
        returns (uint256) 
    {
        RewardTier currentTier = playerRewards[player].tier;
        
        if (currentTier == RewardTier.BRONZE) return 500 ether;
        if (currentTier == RewardTier.SILVER) return 2000 ether;
        if (currentTier == RewardTier.GOLD) return 10000 ether;
        if (currentTier == RewardTier.PLATINUM) return 50000 ether;
        
        return type(uint256).max; // Already at max tier
    }

    /**
     * @dev Set tier multiplier (owner only)
     */
    function setTierMultiplier(RewardTier tier, uint256 multiplier) 
        external 
        onlyOwner 
    {
        require(multiplier >= 100 && multiplier <= 1000, "Multiplier must be 100-1000");
        tierMultipliers[tier] = multiplier;
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
