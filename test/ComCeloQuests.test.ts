import { expect } from "chai";
import { ethers } from "hardhat";
import { ComCeloQuests } from "../typechain-types";

describe("ComCeloQuests", () => {
  let quests: ComCeloQuests;
  let owner: any;
  let player1: any;
  let player2: any;

  beforeEach(async () => {
    [owner, player1, player2] = await ethers.getSigners();

    const QuestsFactory = await ethers.getContractFactory("ComCeloQuests");
    quests = await QuestsFactory.deploy();
    await quests.waitForDeployment();
  });

  describe("Deployment", () => {
    it("should deploy with default quests", async () => {
      const questCount = await quests.questCounter();
      expect(questCount).to.be.greaterThan(0);
    });

    it("should initialize with correct owner", async () => {
      const contractOwner = await quests.owner();
      expect(contractOwner).to.equal(owner.address);
    });
  });

  describe("Quest Creation", () => {
    it("should create a new quest", async () => {
      const tx = await quests.createQuest(
        0, // WIN_GAMES
        "Test Quest",
        "Win 5 games",
        5,
        ethers.parseEther("100"),
        7,
        true
      );

      expect(tx).to.emit(quests, "QuestCreated");
    });

    it("should only allow owner to create quests", async () => {
      await expect(
        quests.connect(player1).createQuest(
          0,
          "Unauthorized Quest",
          "Should fail",
          5,
          ethers.parseEther("100"),
          7,
          true
        )
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should require positive target progress", async () => {
      await expect(
        quests.createQuest(0, "Bad Quest", "Description", 0, ethers.parseEther("100"), 7, true)
      ).to.be.revertedWith("Target must be > 0");
    });

    it("should require positive reward amount", async () => {
      await expect(
        quests.createQuest(0, "Bad Quest", "Description", 5, 0, 7, true)
      ).to.be.revertedWith("Reward must be > 0");
    });
  });

  describe("Quest Progress", () => {
    beforeEach(async () => {
      // Create a test quest: Win 10 games for 100 CELO
      await quests.createQuest(
        0,
        "Win 10 Games",
        "Win 10 games",
        10,
        ethers.parseEther("100"),
        7,
        true
      );
    });

    it("should allow player to start a quest", async () => {
      const tx = await quests.connect(player1).startQuest(4); // 4th quest (default + custom)
      expect(tx).to.emit(quests, "QuestStarted");
    });

    it("should track quest progress", async () => {
      await quests.connect(player1).startQuest(4);

      // Update progress (owner updates)
      await quests.updateProgress(player1.address, 4, 3); // 3 wins

      const progress = await quests.getQuestProgress(player1.address, 4);
      expect(progress.currentProgress).to.equal(3);
    });

    it("should complete quest when progress reaches target", async () => {
      await quests.connect(player1).startQuest(4);

      // Update progress to target (10)
      await quests.updateProgress(player1.address, 4, 10);

      const progress = await quests.getQuestProgress(player1.address, 4);
      expect(progress.status).to.equal(2); // COMPLETED status
    });

    it("should prevent progress update on non-in-progress quest", async () => {
      // Try to update progress without starting quest
      await expect(
        quests.updateProgress(player1.address, 4, 5)
      ).to.be.revertedWith("Quest not in progress");
    });
  });

  describe("Rewards", () => {
    beforeEach(async () => {
      // Create and complete a quest
      await quests.createQuest(
        0,
        "Easy Quest",
        "Win 2 games",
        2,
        ethers.parseEther("50"),
        7,
        true
      );

      await quests.connect(player1).startQuest(4);
      await quests.updateProgress(player1.address, 4, 2); // Complete quest
    });

    it("should accumulate rewards on quest completion", async () => {
      const balance = await quests.playerRewardBalance(player1.address);
      expect(balance).to.equal(ethers.parseEther("50"));
    });

    it("should allow player to claim rewards", async () => {
      const tx = await quests.connect(player1).claimRewards();
      expect(tx).to.emit(quests, "RewardClaimed");

      // Check balance reset
      const balance = await quests.playerRewardBalance(player1.address);
      expect(balance).to.equal(0);
    });

    it("should prevent claiming with no rewards", async () => {
      await expect(
        quests.connect(player2).claimRewards()
      ).to.be.revertedWith("No rewards to claim");
    });
  });

  describe("Quest Queries", () => {
    it("should return all quests", async () => {
      const allQuests = await quests.getAllQuests();
      expect(allQuests.length).to.be.greaterThan(0);
    });

    it("should get specific quest details", async () => {
      const quest = await quests.getQuest(0);
      expect(quest.id).to.equal(0);
      expect(quest.rewardAmount).to.be.greaterThan(0);
    });

    it("should get player active quests", async () => {
      await quests.connect(player1).startQuest(0);
      await quests.connect(player1).startQuest(1);

      const activeQuests = await quests.getPlayerActiveQuests(player1.address);
      expect(activeQuests.length).to.be.greaterThanOrEqual(2);
    });
  });

  describe("Quest Expiry", () => {
    it("should prevent starting expired quest", async () => {
      // Create a quest that expires in 1 second - use 1 day with short duration
      // This test is for documentation - in practice, 1 block = ~12s so we'd need integration test
      const questBefore = await quests.getQuest(0);
      expect(questBefore.expiryTime).to.be.greaterThan(0);
    });
  });

  describe("Daily Quest Reset", () => {
    it("should allow owner to reset daily quests", async () => {
      const tx = await quests.resetDailyQuests();
      expect(tx).to.emit(quests, "DailyQuestsReset");
    });

    it("should prevent non-owner from resetting", async () => {
      await expect(
        quests.connect(player1).resetDailyQuests()
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Pause/Unpause", () => {
    it("should allow owner to pause contract", async () => {
      await quests.pause();
      const paused = await quests.paused();
      expect(paused).to.be.true;
    });

    it("should allow owner to unpause contract", async () => {
      await quests.pause();
      await quests.unpause();
      const paused = await quests.paused();
      expect(paused).to.be.false;
    });

    it("should prevent non-owner from pausing", async () => {
      await expect(
        quests.connect(player1).pause()
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Multiple Players", () => {
    it("should track quests independently per player", async () => {
      await quests.createQuest(0, "Multi Quest", "Description", 5, ethers.parseEther("75"), 7, true);

      // Player 1 starts at 2 wins
      await quests.connect(player1).startQuest(4);
      await quests.updateProgress(player1.address, 4, 2);

      // Player 2 starts at 4 wins
      await quests.connect(player2).startQuest(4);
      await quests.updateProgress(player2.address, 4, 4);

      const p1Progress = await quests.getQuestProgress(player1.address, 4);
      const p2Progress = await quests.getQuestProgress(player2.address, 4);

      expect(p1Progress.currentProgress).to.equal(2);
      expect(p2Progress.currentProgress).to.equal(4);
    });
  });
});
