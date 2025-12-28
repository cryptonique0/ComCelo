/**
 * Input validation utilities for ComCelo
 * Centralized validation for addresses, amounts, game parameters, and more
 */

import { ethers } from 'ethers';
import type { ValidationResult, EvmAddress, StacksAddress } from './types/index';

// ============ Address Validation ============

/**
 * Validate EVM address format (0x-prefixed hex string)
 */
export function validateEvmAddress(address: unknown): address is EvmAddress {
  if (typeof address !== 'string') return false;
  try {
    return ethers.isAddress(address) && address.startsWith('0x');
  } catch {
    return false;
  }
}

/**
 * Validate Stacks address format (SP or SM prefix)
 */
export function validateStacksAddress(address: unknown): address is StacksAddress {
  if (typeof address !== 'string') return false;
  // Stacks mainnet: SP followed by 39 alphanumeric, testnet: SM prefix
  return /^(SP|SM)[A-Z0-9]{39}$/.test(address);
}

/**
 * Validate either EVM or Stacks address
 */
export function validateChainAddress(address: unknown): boolean {
  return validateEvmAddress(address) || validateStacksAddress(address);
}

// ============ Amount Validation ============

/**
 * Validate token amount string (parseable to BigInt)
 */
export function validateAmount(amount: unknown, decimals = 18): ValidationResult {
  const errors: string[] = [];

  if (typeof amount !== 'string') {
    errors.push('Amount must be a string');
    return { isValid: false, errors };
  }

  if (!amount.trim()) {
    errors.push('Amount cannot be empty');
    return { isValid: false, errors };
  }

  try {
    const parsed = ethers.parseUnits(amount, decimals);
    if (parsed <= 0n) {
      errors.push('Amount must be greater than 0');
    }
  } catch (error) {
    errors.push(`Invalid amount format: ${error instanceof Error ? error.message : 'unknown error'}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ============ Game Parameter Validation ============

/**
 * Validate grid coordinates (0-2 for 3x3 grid)
 */
export function validateGridCoordinates(x: number, y: number, gridSize = 3): ValidationResult {
  const errors: string[] = [];

  if (!Number.isInteger(x) || !Number.isInteger(y)) {
    errors.push('Coordinates must be integers');
  }

  if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
    errors.push(`Coordinates must be between 0 and ${gridSize - 1}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate move distance
 */
export function validateMoveDistance(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  maxDistance = 2
): ValidationResult {
  const distance = Math.max(Math.abs(toX - fromX), Math.abs(toY - fromY));
  const errors: string[] = [];

  if (distance > maxDistance) {
    errors.push(`Move distance (${distance}) exceeds maximum (${maxDistance})`);
  }

  if (distance === 0) {
    errors.push('Unit must move at least 1 space');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate unit HP
 */
export function validateUnitHP(hp: number, maxHP = 100): ValidationResult {
  const errors: string[] = [];

  if (!Number.isInteger(hp)) {
    errors.push('HP must be an integer');
  }

  if (hp < 0 || hp > maxHP) {
    errors.push(`HP must be between 0 and ${maxHP}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate game stake (must be positive amount)
 */
export function validateGameStake(stake: unknown, minStake = 0n, maxStake = 1000000n): ValidationResult {
  const errors: string[] = [];

  let stakeBigInt: bigint;
  try {
    if (typeof stake === 'string') {
      stakeBigInt = ethers.parseUnits(stake, 18);
    } else if (typeof stake === 'bigint') {
      stakeBigInt = stake;
    } else if (typeof stake === 'number') {
      stakeBigInt = ethers.parseUnits(stake.toString(), 18);
    } else {
      errors.push('Stake must be a string, number, or bigint');
      return { isValid: false, errors };
    }
  } catch (error) {
    errors.push(`Invalid stake format: ${error instanceof Error ? error.message : 'unknown error'}`);
    return { isValid: false, errors };
  }

  if (stakeBigInt < minStake) {
    errors.push(`Stake must be at least ${ethers.formatUnits(minStake, 18)}`);
  }

  if (stakeBigInt > maxStake) {
    errors.push(`Stake must not exceed ${ethers.formatUnits(maxStake, 18)}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ============ String Validation ============

/**
 * Validate username (alphanumeric, 3-32 chars, no spaces)
 */
export function validateUsername(username: unknown): ValidationResult {
  const errors: string[] = [];

  if (typeof username !== 'string') {
    errors.push('Username must be a string');
    return { isValid: false, errors };
  }

  if (username.length < 3 || username.length > 32) {
    errors.push('Username must be between 3 and 32 characters');
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    errors.push('Username can only contain letters, numbers, underscores, and hyphens');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate contract address format (context-aware)
 */
export function validateContractAddress(address: unknown, chain: 'evm' | 'stacks' = 'evm'): ValidationResult {
  const errors: string[] = [];

  if (chain === 'evm') {
    if (!validateEvmAddress(address)) {
      errors.push('Invalid EVM contract address format');
    }
  } else {
    if (!validateStacksAddress(address)) {
      errors.push('Invalid Stacks contract address format');
    }
  }

  // Prevent zero address for EVM
  if (chain === 'evm' && address === '0x0000000000000000000000000000000000000000') {
    errors.push('Contract address cannot be zero address');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ============ Batch Validation ============

/**
 * Validate multiple addresses at once
 */
export function validateAddresses(addresses: unknown[], chain: 'evm' | 'stacks' = 'evm'): ValidationResult {
  const errors: string[] = [];

  if (!Array.isArray(addresses)) {
    errors.push('Input must be an array');
    return { isValid: false, errors };
  }

  addresses.forEach((addr, index) => {
    const isValid = chain === 'evm' ? validateEvmAddress(addr) : validateStacksAddress(addr);
    if (!isValid) {
      errors.push(`Address at index ${index} is invalid`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}
