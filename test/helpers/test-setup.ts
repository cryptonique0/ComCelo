/**
 * Test setup utilities and fixtures for ComCelo integration tests
 * Provides helper functions for deploying contracts, setting up game state, etc.
 */

import { ethers } from 'hardhat';
import type { ContractFactory, Contract, Signer } from 'ethers';

// ============ Test Fixtures ============

export interface TestFixtures {
  deployer: Signer;
  player1: Signer;
  player2: Signer;
  other: Signer;
  core: Contract;
  matchmaker: Contract;
  treasury: Contract;
  deployerAddress: string;
  player1Address: string;
  player2Address: string;
  otherAddress: string;
}

// ============ Contract Deployment Helpers ============

/**
 * Deploy ComCeloCore contract
 */
export async function deployComCeloCore(): Promise<Contract> {
  const factory = await ethers.getContractFactory('ComCeloCore');
  const contract = await factory.deploy();
  await contract.waitForDeployment();
  return contract;
}

/**
 * Deploy ComCeloMatchmaker contract
 */
export async function deployComCeloMatchmaker(coreAddress: string): Promise<Contract> {
  const factory = await ethers.getContractFactory('ComCeloMatchmaker');
  const contract = await factory.deploy(coreAddress);
  await contract.waitForDeployment();
  return contract;
}

/**
 * Deploy ComCeloTreasury contract
 */
export async function deployComCeloTreasury(): Promise<Contract> {
  const factory = await ethers.getContractFactory('ComCeloTreasury');
  const contract = await factory.deploy();
  await contract.waitForDeployment();
  return contract;
}

/**
 * Deploy all core contracts
 */
export async function deployAllCoreContracts(): Promise<{
  core: Contract;
  matchmaker: Contract;
  treasury: Contract;
}> {
  const core = await deployComCeloCore();
  const coreAddress = await core.getAddress();

  const matchmaker = await deployComCeloMatchmaker(coreAddress);
  const treasury = await deployComCeloTreasury();

  return { core, matchmaker, treasury };
}

// ============ Test Fixture Setup ============

/**
 * Setup complete test environment with signers and contracts
 */
export async function setupTest(): Promise<TestFixtures> {
  const [deployer, player1, player2, other] = await ethers.getSigners();

  const { core, matchmaker, treasury } = await deployAllCoreContracts();

  return {
    deployer,
    player1,
    player2,
    other,
    core,
    matchmaker,
    treasury,
    deployerAddress: await deployer.getAddress(),
    player1Address: await player1.getAddress(),
    player2Address: await player2.getAddress(),
    otherAddress: await other.getAddress(),
  };
}

// ============ Game State Helpers ============

/**
 * Create a game between two players
 */
export async function createGame(
  core: Contract,
  player1: Signer,
  player2: Signer,
  options?: {
    ranked?: boolean;
    stake?: bigint;
    maxTurns?: number;
  }
): Promise<string> {
  const player1Address = await player1.getAddress();

  // This depends on actual contract interface
  // Adjust based on real ComCeloCore implementation
  const tx = await core
    .connect(player1)
    .createGame(player2, options?.stake || 0n, options?.ranked || false);

  const receipt = await tx.wait();
  const event = receipt?.logs[0];

  // Return game ID from event - adjust based on actual event structure
  return '1';
}

/**
 * Join a game
 */
export async function joinGame(
  core: Contract,
  gameId: string,
  player: Signer
): Promise<void> {
  // Adjust based on actual contract interface
  const tx = await core.connect(player).joinGame(gameId);
  await tx.wait();
}

/**
 * Place a unit on the board
 */
export async function placeUnit(
  core: Contract,
  gameId: string,
  unitType: number,
  x: number,
  y: number,
  player: Signer
): Promise<void> {
  // Adjust based on actual contract interface
  const tx = await core.connect(player).placeUnit(gameId, unitType, x, y);
  await tx.wait();
}

/**
 * Move a unit
 */
export async function moveUnit(
  core: Contract,
  gameId: string,
  unitId: number,
  toX: number,
  toY: number,
  player: Signer
): Promise<void> {
  // Adjust based on actual contract interface
  const tx = await core.connect(player).moveUnit(gameId, unitId, toX, toY);
  await tx.wait();
}

/**
 * Attack with a unit
 */
export async function attackUnit(
  core: Contract,
  gameId: string,
  attackerId: number,
  targetId: number,
  player: Signer
): Promise<void> {
  // Adjust based on actual contract interface
  const tx = await core.connect(player).attackUnit(gameId, attackerId, targetId);
  await tx.wait();
}

// ============ Assertion Helpers ============

/**
 * Assert that two addresses are equal (case-insensitive)
 */
export function assertAddressEqual(actual: string, expected: string, message?: string): void {
  if (actual.toLowerCase() !== expected.toLowerCase()) {
    throw new Error(message || `Address mismatch: ${actual} !== ${expected}`);
  }
}

/**
 * Assert that a transaction was reverted with a specific reason
 */
export async function assertRevert(
  tx: Promise<any>,
  expectedReason?: string
): Promise<void> {
  try {
    await tx;
    throw new Error('Expected transaction to revert, but it succeeded');
  } catch (error) {
    if (expectedReason && !String(error).includes(expectedReason)) {
      throw new Error(
        `Expected revert reason "${expectedReason}", got: ${String(error)}`
      );
    }
  }
}

/**
 * Assert that an event was emitted
 */
export async function assertEventEmitted(
  tx: Promise<any>,
  contract: Contract,
  eventName: string
): Promise<void> {
  const receipt = await (await tx).wait();

  const event = receipt?.logs
    .map((log) => {
      try {
        return contract.interface.parseLog(log);
      } catch {
        return null;
      }
    })
    .find((event) => event?.name === eventName);

  if (!event) {
    throw new Error(`Expected event ${eventName} not emitted`);
  }
}

// ============ Balance Helpers ============

/**
 * Get balance of an address
 */
export async function getBalance(address: string): Promise<bigint> {
  const provider = ethers.provider;
  return provider.getBalance(address);
}

/**
 * Assert balance equals expected amount
 */
export async function assertBalance(
  address: string,
  expectedAmount: bigint,
  message?: string
): Promise<void> {
  const balance = await getBalance(address);
  if (balance !== expectedAmount) {
    throw new Error(
      message ||
        `Balance mismatch: ${balance.toString()} !== ${expectedAmount.toString()}`
    );
  }
}

// ============ Time Helpers ============

/**
 * Advance blockchain time by specified seconds
 */
export async function advanceTime(seconds: number): Promise<void> {
  await ethers.provider.send('evm_increaseTime', [seconds]);
  await ethers.provider.send('evm_mine', []);
}

/**
 * Mine a specific number of blocks
 */
export async function mineBlocks(count: number): Promise<void> {
  for (let i = 0; i < count; i++) {
    await ethers.provider.send('evm_mine', []);
  }
}

/**
 * Get current block timestamp
 */
export async function getCurrentBlockTimestamp(): Promise<number> {
  const block = await ethers.provider.getBlock('latest');
  return block?.timestamp || 0;
}

// ============ Snapshot Helpers (for reverting state) ============

let snapshotId: string;

/**
 * Take a snapshot of the blockchain state
 */
export async function takeSnapshot(): Promise<string> {
  snapshotId = await ethers.provider.send('evm_snapshot', []);
  return snapshotId;
}

/**
 * Revert to the last snapshot
 */
export async function revertSnapshot(id?: string): Promise<void> {
  const targetId = id || snapshotId;
  if (!targetId) {
    throw new Error('No snapshot ID provided');
  }
  await ethers.provider.send('evm_revert', [targetId]);
}

// ============ Common Test Patterns ============

/**
 * Test pattern: Should revert with reason
 */
export async function testShouldRevertWith(
  tx: Promise<any>,
  reason: string
): Promise<void> {
  let reverted = false;
  try {
    await tx;
  } catch (error) {
    reverted = true;
    if (!String(error).includes(reason)) {
      throw new Error(
        `Expected "${reason}" in error, got: ${String(error)}`
      );
    }
  }

  if (!reverted) {
    throw new Error('Expected transaction to revert');
  }
}

/**
 * Test pattern: Should succeed
 */
export async function testShouldSucceed(tx: Promise<any>): Promise<void> {
  try {
    const result = await tx;
    const receipt = await result.wait();
    if (!receipt) {
      throw new Error('Transaction receipt not found');
    }
  } catch (error) {
    throw new Error(`Expected transaction to succeed, but failed: ${error}`);
  }
}
