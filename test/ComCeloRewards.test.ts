import { expect } from "chai";
import { ethers } from "hardhat";
import { ComCeloRewards } from "../typechain-types";

describe("ComCeloRewards", () => {
  let rewards: ComCeloRewards;
  let owner: any;
  let player1: any;
  let player2: any;

  beforeEach(async () => {
    [owner, player1, player2] = await ethers.getSigners();

    const RewardsFactory = await ethers.getContractFactory("ComCeloRewards");
    rewards = await RewardsFactory.deploy();
    await rewards.waitForDeployment();
  });

  describe("Deployment", () => {
    it("should deploy with correct tier multipliers", async () => {
      const bronzeMultiplier = await rewards.getTierMultiplier(0);
      const goldMultiplier = await rewards.getTierMultiplier(2);
      
      expect(bronzeMultiplier).to.equal(100);
      expect(goldMultiplier).to.equal(125);
    });
  });

  describe("Battle Rewards", () => {
    it("should award casual battle rewards", async () => {
      const baseReward = ethers.parseEther("100");
      
      await rewards.awardBattleReward(player1.address, baseReward, false);

      const playerRewards = await rewards.getPlayerRewards(player1.address);
      expect(playerRewards.totalEarned).to.equal(baseReward); // 1.0x * 1.0x multiplier
      expect(playerRewards.currentBalance).to.equal(baseReward);
      expect(playerRewards.isActive).to.be.true;
    });

    it("should award ranked battle with 50% bonus", async () => {
      const baseReward = ethers.parseEther("100");
      
      await rewards.awardBattleReward(player1.address, baseReward, true);

      const playerRewards = await rewards.getPlayerRewards(player1.address);
      // 100 * 1.0 (bronze tier) * 1.5 (ranked bonus) = 150
      expect(playerRewards.totalEarned).to.equal(ethers.parseEther("150"));
    });

    it("should apply tier multipliers to rewards", async () => {
      const baseReward = ethers.parseEther("100");
      
      // Award multiple rewards to reach Silver tier
      for (let i = 0; i < 6; i++) {
        await rewards.awardBattleReward(player1.address, baseReward, false);
      }

      const playerRewards = await rewards.getPlayerRewards(player1.address);
      expect(playerRewards.tier).to.equal(1); // SILVER tier
    });
  });

  describe("Achievement Rewards", () => {
    it("should award achievement rewards", async () => {
      const rewardAmount = ethers.parseEther("75");
      
      await rewards.awardAchievementReward(player1.address, rewardAmount);

      const playerRewards = await rewards.getPlayerRewards(player1.address);
      expect(playerRewards.totalEarned).to.equal(rewardAmount);
      expect(playerRewards.currentBalance).to.equal(rewardAmount);
    });

    it("should accumulate multiple achievements", async () => {
      const reward1 = ethers.parseEther("50");
      const reward2 = ethers.parseEther("75");
      
      await rewards.awardAchievementReward(player1.address, reward1);
      await rewards.awardAchievementReward(player1.address, reward2);

      const playerRewards = await rewards.getPlayerRewards(player1.address);
      expect(playerRewards.totalEarned).to.equal(reward1 + reward2);
      expect(playerRewards.currentBalance).to.equal(reward1 + reward2);
    });
  });

  describe("Spending Rewards", () => {
    beforeEach(async () => {
      const baseReward = ethers.parseEther("200");
      await rewards.awardBattleReward(player1.address, baseReward, false);
    });

    it("should allow spending earned rewards", async () => {
      const spendAmount = ethers.parseEther("50");
      
      await rewards.spendRewards(player1.address, spendAmount, "Item Purchase");

      const playerRewards = await rewards.getPlayerRewards(player1.address);
      expect(playerRewards.totalSpent).to.equal(spendAmount);
      expect(playerRewards.currentBalance).to.equal(ethers.parseEther("150"));
    });

    it("should prevent spending more than balance", async () => {
      const excessAmount = ethers.parseEther("300");
      
      await expect(
        rewards.spendRewards(player1.address, excessAmount, "Overspend")
      ).to.be.revertedWith("Insufficient balance");
    });

    it("should track spent amounts", async () => {
      const spend1 = ethers.parseEther("30");
      const spend2 = ethers.parseEther("20");
      
      await rewards.spendRewards(player1.address, spend1, "Shop");
      await rewards.spendRewards(player1.address, spend2, "Shop");

      const playerRewards = await rewards.getPlayerRewards(player1.address);
      expect(playerRewards.totalSpent).to.equal(spend1 + spend2);
    });
  });

  describe("Staking", () => {
    beforeEach(async () => {
      const baseReward = ethers.parseEther("500");
      await rewards.awardBattleReward(player1.address, baseReward, false);
    });

    it("should allow staking rewards", async () => {
      const stakeAmount = ethers.parseEther("100");
      const duration = 30; // days
      const rate = 5; // 5% APY
      
      await rewards.stakeRewards(player1.address, stakeAmount, duration, rate);

      const playerRewards = await rewards.getPlayerRewards(player1.address);
      expect(playerRewards.stakedAmount).to.equal(stakeAmount);
      expect(playerRewards.currentBalance).to.equal(ethers.parseEther("400"));
    });

    it("should prevent staking more than balance", async () => {
      const excessAmount = ethers.parseEther("1000");
      
      await expect(
        rewards.stakeRewards(player1.address, excessAmount, 30, 5)
      ).to.be.revertedWith("Insufficient balance");
    });

    it("should validate staking rate (1-100%)", async () => {
      const stakeAmount = ethers.parseEther("100");
      
      await expect(
        rewards.stakeRewards(player1.address, stakeAmount, 30, 0)
      ).to.be.revertedWith("Rate must be 1-100%");
      
      await expect(
        rewards.stakeRewards(player1.address, stakeAmount, 30, 101)
      ).to.be.revertedWith("Rate must be 1-100%");
    });

    it("should track staking history", async () => {
      const stakeAmount = ethers.parseEther("100");
      
      await rewards.stakeRewards(player1.address, stakeAmount, 30, 5);

      const stakings = await rewards.getPlayerStakings(player1.address);
      expect(stakings.length).to.equal(1);
      expect(stakings[0].amount).to.equal(stakeAmount);
      expect(stakings[0].rewardRate).to.equal(5);
    });
  });

  describe("Tier System", () => {
    it("should start at Bronze tier", async () => {
      await rewards.awardBattleReward(player1.address, ethers.parseEther("100"), false);
      
      const playerRewards = await rewards.getPlayerRewards(player1.address);
      expect(playerRewards.tier).to.equal(0); // BRONZE
    });

    it("should upgrade to Silver at 500 CELO earned", async () => {
      // Award 500 CELO total
      for (let i = 0; i < 5; i++) {
        await rewards.awardBattleReward(player1.address, ethers.parseEther("100"), false);
      }

      const playerRewards = await rewards.getPlayerRewards(player1.address);
      expect(playerRewards.tier).to.equal(1); // SILVER
    });

    it("should upgrade to Gold at 2000 CELO earned", async () => {
      // Award 2000 CELO total
      for (let i = 0; i < 20; i++) {
        await rewards.awardBattleReward(player1.address, ethers.parseEther("100"), false);
      }

      const playerRewards = await rewards.getPlayerRewards(player1.address);
      expect(playerRewards.tier).to.equal(2); // GOLD
    });

    it("should provide tier multipliers", async () => {
      // Get to Silver tier (500 earned)
      for (let i = 0; i < 5; i++) {
        await rewards.awardBattleReward(player1.address, ethers.parseEther("100"), false);
      }

      // Silver multiplier is 1.1x
      // Next reward: 100 * 1.1 = 110
      await rewards.awardBattleReward(player1.address, ethers.parseEther("100"), false);

      const playerRewards = await rewards.getPlayerRewards(player1.address);
      // Previous total: 500, new: 500 + 110 = 610
      expect(playerRewards.totalEarned).to.equal(ethers.parseEther("610"));
    });

    it("should show next tier threshold", async () => {
      const nextThreshold = await rewards.getNextTierThreshold(player1.address);
      expect(nextThreshold).to.equal(ethers.parseEther("500")); // Bronze -> Silver
    });

    it("should return max value for max tier", async () => {
      // Get to Diamond tier
      for (let i = 0; i < 500; i++) {
        await rewards.awardBattleReward(player1.address, ethers.parseEther("100"), false);
      }

      const playerRewards = await rewards.getPlayerRewards(player1.address);
      expect(playerRewards.tier).to.equal(4); // DIAMOND

      const nextThreshold = await rewards.getNextTierThreshold(player1.address);
      // In ethers v6, MaxUint256 is a constant at ethers.MaxUint256
      const maxUint256 = ethers.MaxUint256 || BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
      expect(nextThreshold).to.equal(maxUint256);
    });
  });

  describe("Access Control", () => {
    it("should only allow owner to award rewards", async () => {
      await expect(
        rewards.connect(player1).awardBattleReward(player2.address, ethers.parseEther("100"), false)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should only allow owner to spend rewards", async () => {
      await expect(
        rewards.connect(player1).spendRewards(player1.address, ethers.parseEther("50"), "Shop")
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should only allow owner to stake rewards", async () => {
      await expect(
        rewards.connect(player1).stakeRewards(player1.address, ethers.parseEther("100"), 30, 5)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Pause/Unpause", () => {
    it("should allow owner to pause", async () => {
      await rewards.pause();
      const paused = await rewards.paused();
      expect(paused).to.be.true;
    });

    it("should allow owner to unpause", async () => {
      await rewards.pause();
      await rewards.unpause();
      const paused = await rewards.paused();
      expect(paused).to.be.false;
    });
  });

  describe("Burn Rewards", () => {
    beforeEach(async () => {
      await rewards.awardBattleReward(player1.address, ethers.parseEther("100"), false);
    });

    it("should burn unclaimed rewards", async () => {
      const burnAmount = ethers.parseEther("50");
      
      await rewards.burnRewards(player1.address, burnAmount);

      const playerRewards = await rewards.getPlayerRewards(player1.address);
      expect(playerRewards.currentBalance).to.equal(ethers.parseEther("50"));
    });

    it("should prevent burning more than balance", async () => {
      await expect(
        rewards.burnRewards(player1.address, ethers.parseEther("200"))
      ).to.be.revertedWith("Insufficient balance");
    });
  });

  describe("Multi-Player Tracking", () => {
    it("should track rewards independently for multiple players", async () => {
      await rewards.awardBattleReward(player1.address, ethers.parseEther("100"), false);
      await rewards.awardBattleReward(player2.address, ethers.parseEther("200"), false);

      const rewards1 = await rewards.getPlayerRewards(player1.address);
      const rewards2 = await rewards.getPlayerRewards(player2.address);

      expect(rewards1.totalEarned).to.equal(ethers.parseEther("100"));
      expect(rewards2.totalEarned).to.equal(ethers.parseEther("200"));
    });
  });
});
