import { expect } from "chai";
import { ethers } from "hardhat";
import { ComCeloCore, ComCeloUnits, ComCeloMatchmaker, ComCeloTreasury, ComCeloMetaTxRelay } from "../typechain-types";

describe("ComCelo Contracts", () => {
  let core: ComCeloCore;
  let units: ComCeloUnits;
  let matchmaker: ComCeloMatchmaker;
  let treasury: ComCeloTreasury;
  let relay: ComCeloMetaTxRelay;

  let owner: any;
  let player1: any;
  let player2: any;

  beforeEach(async () => {
    [owner, player1, player2] = await ethers.getSigners();

    // Deploy contracts
    const CoreFactory = await ethers.getContractFactory("ComCeloCore");
    core = await CoreFactory.deploy();
    await core.waitForDeployment();

    const UnitsFactory = await ethers.getContractFactory("ComCeloUnits");
    units = await UnitsFactory.deploy();
    await units.waitForDeployment();

    const MatchmakerFactory = await ethers.getContractFactory("ComCeloMatchmaker");
    matchmaker = await MatchmakerFactory.deploy();
    await matchmaker.waitForDeployment();

    const TreasuryFactory = await ethers.getContractFactory("ComCeloTreasury");
    treasury = await TreasuryFactory.deploy();
    await treasury.waitForDeployment();

    const RelayFactory = await ethers.getContractFactory("ComCeloMetaTxRelay");
    relay = await RelayFactory.deploy(await core.getAddress());
    await relay.waitForDeployment();
  });

  describe("ComCeloCore", () => {
    it("should deploy successfully", async () => {
      const address = await core.getAddress();
      expect(address).to.not.equal(ethers.ZeroAddress);
    });

    it("should have correct initial state", async () => {
      const coreAddress = await core.getAddress();
      expect(coreAddress).to.properAddress;
    });
  });

  describe("ComCeloUnits", () => {
    it("should initialize with default unit templates", async () => {
      const heroTemplate = await units.getTemplate(0); // UnitType.Hero
      expect(heroTemplate.baseHp).to.equal(100);
      expect(heroTemplate.baseAttack).to.equal(15);
      expect(heroTemplate.baseDefense).to.equal(10);
      expect(heroTemplate.baseRange).to.equal(1);
      expect(heroTemplate.name).to.equal("Hero");
    });

    it("should return correct Soldier template", async () => {
      const soldierTemplate = await units.getTemplate(1); // UnitType.Soldier
      expect(soldierTemplate.baseHp).to.equal(40);
      expect(soldierTemplate.baseAttack).to.equal(12);
      expect(soldierTemplate.baseDefense).to.equal(8);
      expect(soldierTemplate.baseRange).to.equal(1);
    });

    it("should return correct Archer template", async () => {
      const archerTemplate = await units.getTemplate(2); // UnitType.Archer
      expect(archerTemplate.baseHp).to.equal(30);
      expect(archerTemplate.baseAttack).to.equal(10);
      expect(archerTemplate.baseDefense).to.equal(5);
      expect(archerTemplate.baseRange).to.equal(3);
    });

    it("should allow owner to update templates", async () => {
      const newTemplate = {
        baseHp: 150,
        baseAttack: 20,
        baseDefense: 12,
        baseRange: 1,
        name: "Super Hero",
      };

      await units.updateTemplate(0, newTemplate);
      const updated = await units.getTemplate(0);
      expect(updated.baseHp).to.equal(150);
      expect(updated.name).to.equal("Super Hero");
    });

    it("should not allow non-owner to update templates", async () => {
      const newTemplate = {
        baseHp: 150,
        baseAttack: 20,
        baseDefense: 12,
        baseRange: 1,
        name: "Super Hero",
      };

      await expect(units.connect(player1).updateTemplate(0, newTemplate)).to.be.reverted;
    });
  });

  describe("ComCeloMatchmaker", () => {
    it("should create invite successfully", async () => {
      const tx = await matchmaker.connect(player1).createInvite(player2.address, 0, 0); // GameMode.Unranked
      await expect(tx).to.emit(matchmaker, "InviteCreated");
    });

    it("should prevent self-invites", async () => {
      await expect(matchmaker.connect(player1).createInvite(player1.address, 0, 0)).to.be.revertedWith(
        "Cannot invite yourself"
      );
    });

    it("should allow opponent to accept invite", async () => {
      await matchmaker.connect(player1).createInvite(player2.address, 0, 0);
      const tx = await matchmaker.connect(player2).acceptInvite(1, 1);
      await expect(tx).to.emit(matchmaker, "InviteAccepted");
    });

    it("should join and leave quick match queue", async () => {
      await expect(matchmaker.connect(player1).joinQuickMatchQueue()).to.emit(matchmaker, "PlayerQueueJoined");
      expect(await matchmaker.getQueueLength()).to.equal(1);

      await expect(matchmaker.connect(player1).leaveQuickMatchQueue()).to.emit(matchmaker, "PlayerQueueLeft");
      expect(await matchmaker.getQueueLength()).to.equal(0);
    });

    it("should prevent duplicate queue joins", async () => {
      await matchmaker.connect(player1).joinQuickMatchQueue();
      await expect(matchmaker.connect(player1).joinQuickMatchQueue()).to.be.revertedWith("Already in queue");
    });
  });

  describe("ComCeloTreasury", () => {
    it("should calculate fees correctly", async () => {
      const amount = ethers.parseEther("100");
      const tx = await treasury.collectFee(amount);
      await expect(tx).to.emit(treasury, "FeeCollected");

      // 5% of 100 = 5
      const expectedFee = (amount * BigInt(5)) / BigInt(100);
      expect(await treasury.totalCollected()).to.equal(expectedFee);
    });

    it("should update platform fee", async () => {
      await expect(treasury.updatePlatformFee(10)).to.emit(treasury, "PlatformFeeUpdated").withArgs(10);
    });

    it("should not allow fee exceeding 100%", async () => {
      await expect(treasury.updatePlatformFee(101)).to.be.revertedWith("Fee cannot exceed 100%");
    });

    it("should add tournament prize", async () => {
      const amount = ethers.parseEther("10");
      const tournamentId = ethers.id("tournament-1");
      await treasury.addTournamentPrize(tournamentId, amount, { value: amount });

      expect(await treasury.getTournamentPrizePool(tournamentId)).to.equal(amount);
    });

    it("should award prizes to winners", async () => {
      const amount = ethers.parseEther("10");
      const tournamentId = ethers.id("tournament-1");

      await treasury.addTournamentPrize(tournamentId, amount, { value: amount });
      await treasury.awardPrize(player1.address, amount, tournamentId);

      expect(await treasury.getPlayerBalance(player1.address)).to.equal(amount);
    });
  });

  describe("ComCeloMetaTxRelay", () => {
    it("should initialize with game contract address", async () => {
      const relayAddress = await relay.getAddress();
      expect(relayAddress).to.not.equal(ethers.ZeroAddress);
    });

    it("should update game contract address", async () => {
      const newAddress = player1.address;
      await expect(relay.setGameContractAddress(newAddress))
        .to.emit(relay, "GameContractUpdated")
        .withArgs(newAddress);
    });

    it("should track nonces correctly", async () => {
      expect(await relay.getNonce(player1.address)).to.equal(0);
    });

    it("should set max gas sponsor", async () => {
      const newMax = ethers.parseEther("2");
      await expect(relay.setMaxGasSponsor(newMax)).to.emit(relay, "MaxGasSponsorUpdated").withArgs(newMax);
    });

    it("should accept ether", async () => {
      const amount = ethers.parseEther("1");
      await expect(owner.sendTransaction({ to: await relay.getAddress(), value: amount })).to.changeEtherBalance(
        relay,
        amount
      );
    });
  });
});
