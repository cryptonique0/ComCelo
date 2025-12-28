/**
 * Integration test example: Game creation and unit placement
 * Demonstrates proper test patterns and helper usage
 */

import { expect } from 'chai';
import { setupTest, createGame, placeUnit, TestFixtures } from './helpers/test-setup';

describe('ComCeloCore - Game Creation & Unit Placement', () => {
  let fixtures: TestFixtures;

  beforeEach(async () => {
    fixtures = await setupTest();
  });

  describe('Game Creation', () => {
    it('Should allow player to create a new game', async () => {
      const { core, player1, player2Address } = fixtures;

      const tx = await core.connect(player1).createGame(player2Address, 0n, false);
      const receipt = await tx.wait();

      expect(receipt?.status).to.equal(1, 'Transaction should succeed');
      expect(receipt?.logs.length).to.be.greaterThan(0, 'Should emit at least one event');
    });

    it('Should not allow creating game with zero address', async () => {
      const { core, player1 } = fixtures;
      const zeroAddress = '0x0000000000000000000000000000000000000000';

      try {
        await core.connect(player1).createGame(zeroAddress, 0n, false);
        throw new Error('Should have reverted');
      } catch (error: any) {
        expect(error.message).to.include('revert');
      }
    });

    it('Should not allow creating game with self', async () => {
      const { core, player1, player1Address } = fixtures;

      try {
        await core.connect(player1).createGame(player1Address, 0n, false);
        throw new Error('Should have reverted');
      } catch (error: any) {
        expect(error.message).to.include('revert');
      }
    });
  });

  describe('Game Joining', () => {
    it('Should allow second player to join created game', async () => {
      const { core, player1, player2, player2Address } = fixtures;

      // Create game
      const createTx = await core.connect(player1).createGame(player2Address, 0n, false);
      const createReceipt = await createTx.wait();
      expect(createReceipt?.status).to.equal(1);

      // Join game
      const joinTx = await core.connect(player2).joinGame(1);
      const joinReceipt = await joinTx.wait();
      expect(joinReceipt?.status).to.equal(1);
    });

    it('Should not allow unauthorized player to join', async () => {
      const { core, player1, player2, player2Address, other } = fixtures;

      // Create game between player1 and player2
      await core.connect(player1).createGame(player2Address, 0n, false);

      // Try to join with unauthorized player
      try {
        await core.connect(other).joinGame(1);
        throw new Error('Should have reverted');
      } catch (error: any) {
        expect(error.message).to.include('revert');
      }
    });
  });

  describe('Unit Placement', () => {
    it('Should allow player to place unit on board', async () => {
      const { core, player1, player2, player2Address } = fixtures;

      // Create and join game
      const createTx = await core.connect(player1).createGame(player2Address, 0n, false);
      await createTx.wait();
      const joinTx = await core.connect(player2).joinGame(1);
      await joinTx.wait();

      // Place unit at (0, 0)
      const placeTx = await core.connect(player1).placeUnit(1, 0, 0, 0);
      const placeReceipt = await placeTx.wait();
      expect(placeReceipt?.status).to.equal(1);
    });

    it('Should not allow placing unit outside grid bounds', async () => {
      const { core, player1, player2, player2Address } = fixtures;

      // Create and join game
      await core.connect(player1).createGame(player2Address, 0n, false);
      await core.connect(player2).joinGame(1);

      // Try to place unit at (5, 5) - outside 3x3 grid
      try {
        await core.connect(player1).placeUnit(1, 0, 5, 5);
        throw new Error('Should have reverted');
      } catch (error: any) {
        expect(error.message).to.include('revert');
      }
    });

    it('Should not allow placing unit on occupied cell', async () => {
      const { core, player1, player2, player2Address } = fixtures;

      // Create and join game
      await core.connect(player1).createGame(player2Address, 0n, false);
      await core.connect(player2).joinGame(1);

      // Place first unit
      await core.connect(player1).placeUnit(1, 0, 0, 0);

      // Try to place second unit at same location
      try {
        await core.connect(player1).placeUnit(1, 0, 0, 0);
        throw new Error('Should have reverted');
      } catch (error: any) {
        expect(error.message).to.include('revert');
      }
    });

    it('Should enforce unit type validation', async () => {
      const { core, player1, player2, player2Address } = fixtures;

      // Create and join game
      await core.connect(player1).createGame(player2Address, 0n, false);
      await core.connect(player2).joinGame(1);

      // Try to place invalid unit type (99)
      try {
        await core.connect(player1).placeUnit(1, 99, 0, 0);
        throw new Error('Should have reverted');
      } catch (error: any) {
        expect(error.message).to.include('revert');
      }
    });
  });
});
