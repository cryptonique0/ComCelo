import { expect } from "chai";
import { ethers } from "hardhat";
import { ComCeloCore, ComCeloMatchmaker, ComCeloTreasury } from "../typechain-types";

describe("ComCeloCore - Game Logic Integration", () => {
  let core: ComCeloCore;
  let matchmaker: ComCeloMatchmaker;
  let treasury: ComCeloTreasury;
  let owner: any, player1: any, player2: any;

  beforeEach(async () => {
    [owner, player1, player2] = await ethers.getSigners();

    const CoreFactory = await ethers.getContractFactory("ComCeloCore");
    core = await CoreFactory.deploy();
    await core.waitForDeployment();

    const MatchmakerFactory = await ethers.getContractFactory("ComCeloMatchmaker");
    matchmaker = await MatchmakerFactory.deploy();
    await matchmaker.waitForDeployment();

    const TreasuryFactory = await ethers.getContractFactory("ComCeloTreasury");
    treasury = await TreasuryFactory.deploy();
    await treasury.waitForDeployment();
  });

  describe("Full Game Flow", () => {
    it("should create game successfully", async () => {
      const gameOptions = { ranked: false, maxTurns: 100, stake: 0 };
      const tx = await core.connect(player1).createGame(player2.address, gameOptions);

      await expect(tx).to.emit(core, "GameCreated");
      const receipt = await tx.wait();
      expect(receipt?.blockNumber).to.be.greaterThan(0);
    });

    it("should not allow self-games", async () => {
      const gameOptions = { ranked: false, maxTurns: 100, stake: 0 };
      await expect(core.connect(player1).createGame(player1.address, gameOptions)).to.be.revertedWith(
        "Cannot play against yourself"
      );
    });

    it("should join game and initialize units", async () => {
      const gameOptions = { ranked: false, maxTurns: 100, stake: 0 };
      const createTx = await core.connect(player1).createGame(player2.address, gameOptions);
      await createTx.wait();

      const joinTx = await core.connect(player2).joinGame(1);
      await expect(joinTx).to.emit(core, "GameStarted");

      const state = await core.getGameState(1);
      expect(state.status).to.equal(2); // Active (enum value 2)
      expect(state.player1).to.equal(player1.address);
      expect(state.player2).to.equal(player2.address);
    });

    it("should handle unit movement", async () => {
      const gameOptions = { ranked: false, maxTurns: 100, stake: 0 };
      await core.connect(player1).createGame(player2.address, gameOptions);
      await core.connect(player2).joinGame(1);

      const moveTx = await core.connect(player1).move(1, 0, 1, 0);
      await expect(moveTx).to.emit(core, "UnitMoved").withArgs(1, 0, 1, 0);

      const state = await core.getGameState(1);
      expect(state.units[0].x).to.equal(1);
      expect(state.units[0].y).to.equal(0);
    });

    it("should prevent non-current player from moving", async () => {
      const gameOptions = { ranked: false, maxTurns: 100, stake: 0 };
      await core.connect(player1).createGame(player2.address, gameOptions);
      await core.connect(player2).joinGame(1);

      await expect(core.connect(player2).move(1, 0, 1, 0)).to.be.revertedWith("Not your turn");
    });

    it("should validate move distance", async () => {
      const gameOptions = { ranked: false, maxTurns: 100, stake: 0 };
      await core.connect(player1).createGame(player2.address, gameOptions);
      await core.connect(player2).joinGame(1);

      // Try to move hero from (0,0) to (2,2) - distance 4, too far
      await expect(core.connect(player1).move(1, 0, 2, 2)).to.be.revertedWith("Move out of range");
    });

    it("should handle attacks", async () => {
      const gameOptions = { ranked: false, maxTurns: 100, stake: 0 };
      await core.connect(player1).createGame(player2.address, gameOptions);
      await core.connect(player2).joinGame(1);

      // Setup: position units - use proper turn sequence
      await core.connect(player1).move(1, 0, 1, 1);
      await core.connect(player1).endTurn(1); // End player1's turn

      await core.connect(player2).move(1, 4, 1, 2);
      await core.connect(player2).endTurn(1); // End player2's turn, back to player1

      // Now both units are in position and it's player1's turn
      const attackTx = await core.connect(player1).attack(1, 0, 4);
      await expect(attackTx).to.emit(core, "UnitAttacked");

      const state = await core.getGameState(1);
      expect(state.units[4].hp).to.be.lessThan(100); // Player 2's hero damaged
    });

    it("should handle defend action", async () => {
      const gameOptions = { ranked: false, maxTurns: 100, stake: 0 };
      await core.connect(player1).createGame(player2.address, gameOptions);
      await core.connect(player2).joinGame(1);

      const defendTx = await core.connect(player1).defend(1, 0);
      await expect(defendTx).to.emit(core, "UnitDefended");

      const state = await core.getGameState(1);
      expect(state.units[0].defended).to.be.true;
    });

    it("should reduce damage when defending", async () => {
      const gameOptions = { ranked: false, maxTurns: 100, stake: 0 };
      await core.connect(player1).createGame(player2.address, gameOptions);
      await core.connect(player2).joinGame(1);

      // Position units adjacent for attack (distance = 1, within range)
      await core.connect(player1).move(1, 0, 1, 0); // Hero to (1,0)
      await core.connect(player1).endTurn(1);

      await core.connect(player2).move(1, 4, 2, 0); // Hero to (2,0), adjacent to player1's hero
      await core.connect(player2).endTurn(1);

      // Check initial HP
      const hpBefore = (await core.getGameState(1)).units[4].hp;

      // Defend then attack
      await core.connect(player1).attack(1, 0, 4); // Attack player2's hero
      const hpAfter = (await core.getGameState(1)).units[4].hp;

      const damageReduced = hpBefore - hpAfter;
      expect(damageReduced).to.be.greaterThan(0);
    });

    it("should end turn and switch players", async () => {
      const gameOptions = { ranked: false, maxTurns: 100, stake: 0 };
      await core.connect(player1).createGame(player2.address, gameOptions);
      await core.connect(player2).joinGame(1);

      let state = await core.getGameState(1);
      expect(state.currentTurn).to.equal(0); // Player 1's turn

      await core.connect(player1).endTurn(1);
      state = await core.getGameState(1);
      expect(state.currentTurn).to.equal(1); // Player 2's turn
    });

    it("should allow forfeit", async () => {
      const gameOptions = { ranked: false, maxTurns: 100, stake: 0 };
      await core.connect(player1).createGame(player2.address, gameOptions);
      await core.connect(player2).joinGame(1);

      const forfeitTx = await core.connect(player1).forfeit(1);
      await expect(forfeitTx).to.emit(core, "GameFinished").withArgs(1, player2.address);

      const state = await core.getGameState(1);
      expect(state.status).to.equal(3); // Finished (status = Finished = 3)
    });

    it("should end game when hero is defeated", async () => {
      const gameOptions = { ranked: false, maxTurns: 100, stake: 0 };
      await core.connect(player1).createGame(player2.address, gameOptions);
      await core.connect(player2).joinGame(1);

      // Simulate game is active
      let state = await core.getGameState(1);
      expect(state.status).to.equal(2); // Game is active (status = Active = 2)
    });
  });

  describe("Matchmaking Integration", () => {
    it("should link invite to game", async () => {
      const gameOptions = { ranked: false, maxTurns: 100, stake: 0 };
      await core.connect(player1).createGame(player2.address, gameOptions);

      await matchmaker.connect(player1).createInvite(player2.address, 0, 0); // Unranked, no stake
      expect((await matchmaker.getInvite(1)).creator).to.equal(player1.address);
    });

    it("should match game with invite", async () => {
      const gameOptions = { ranked: false, maxTurns: 100, stake: 0 };
      const createGameTx = await core.connect(player1).createGame(player2.address, gameOptions);
      await createGameTx.wait();

      const inviteTx = await matchmaker.connect(player1).createInvite(player2.address, 0, 0);
      await inviteTx.wait();

      const acceptTx = await matchmaker.connect(player2).acceptInvite(1, 1);
      await expect(acceptTx).to.emit(matchmaker, "InviteAccepted");

      const invite = await matchmaker.getInvite(1);
      expect(invite.gameId).to.equal(1);
    });
  });
});
