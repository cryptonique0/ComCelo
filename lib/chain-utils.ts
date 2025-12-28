/**
 * Chain-specific utilities for ComCelo
 * Abstracts differences between Celo, Base, and Stacks networks
 */

import { ethers } from 'ethers';
import { getCurrentNetwork, getChainId } from './network-config';
import type { NetworkConfig } from './types/index';

// ============ Chain Type Detection ============

export type SupportedChain = 'celo' | 'base' | 'stacks';

/**
 * Detect which chain we're on
 */
export function detectChain(): SupportedChain {
  const network = getCurrentNetwork();
  const chainId = getChainId();

  // EVM chains
  if (network.ecosystem === 'Celo') {
    return 'celo';
  }
  if (network.ecosystem === 'Base') {
    return 'base';
  }
  if (network.ecosystem === 'Stacks') {
    return 'stacks';
  }

  // Fallback based on chain ID
  if (chainId === 42220 || chainId === 44787) {
    return 'celo';
  }
  if (chainId === 8453 || chainId === 84532) {
    return 'base';
  }

  throw new Error(`Unknown chain ID: ${chainId}`);
}

/**
 * Check if current chain is Celo
 */
export function isCelo(): boolean {
  return detectChain() === 'celo';
}

/**
 * Check if current chain is Base
 */
export function isBase(): boolean {
  return detectChain() === 'base';
}

/**
 * Check if current chain is Stacks
 */
export function isStacks(): boolean {
  return detectChain() === 'stacks';
}

// ============ Gas Price & Transaction Costs ============

/**
 * Chain-specific gas costs (rough estimates)
 */
const CHAIN_GAS_CONFIGS = {
  celo: {
    avgGasPrice: ethers.parseUnits('1', 'gwei'),
    blockTime: 5, // seconds
    avgConfirmationTime: 30, // seconds
    costMultiplier: 1,
  },
  base: {
    avgGasPrice: ethers.parseUnits('0.1', 'gwei'),
    blockTime: 2, // seconds
    avgConfirmationTime: 6, // seconds
    costMultiplier: 0.5,
  },
  stacks: {
    avgGasPrice: ethers.parseUnits('1', 'gwei'), // STX has different units
    blockTime: 10, // seconds
    avgConfirmationTime: 60, // seconds
    costMultiplier: 2,
  },
};

/**
 * Get gas configuration for current chain
 */
export function getChainGasConfig(): (typeof CHAIN_GAS_CONFIGS)[SupportedChain] {
  const chain = detectChain();
  return CHAIN_GAS_CONFIGS[chain];
}

/**
 * Estimate transaction cost on current chain
 */
export function estimateTransactionCost(
  gasUsed: bigint,
  gasPrice: bigint = getChainGasConfig().avgGasPrice
): bigint {
  return gasUsed * gasPrice;
}

/**
 * Get expected confirmation time in seconds
 */
export function getExpectedConfirmationTime(): number {
  return getChainGasConfig().avgConfirmationTime;
}

// ============ Contract Deployment Considerations ============

/**
 * Get maximum contract code size (some chains have limits)
 */
export function getMaxContractCodeSize(): number {
  const chain = detectChain();

  // Stacks has different constraints
  if (chain === 'stacks') {
    return 100_000; // Approximate Clarity contract size
  }

  // Both Celo and Base support full EVM, typically 24KB
  return 24576;
}

/**
 * Check if contract is within size limits
 */
export function isContractCodeSizeValid(codeSize: number): boolean {
  return codeSize <= getMaxContractCodeSize();
}

/**
 * Get transaction finality requirements
 */
export function getRequiredConfirmations(): number {
  const chain = detectChain();

  switch (chain) {
    case 'celo':
      return 12; // ~60 seconds
    case 'base':
      return 6; // ~12 seconds
    case 'stacks':
      return 10;
    default:
      return 6;
  }
}

// ============ Address Format Handling ============

/**
 * Normalize address for current chain
 */
export function normalizeAddress(address: string): string {
  const chain = detectChain();

  if (chain === 'stacks') {
    // Stacks addresses are already in correct format
    return address;
  }

  // EVM: checksum address
  try {
    return ethers.getAddress(address);
  } catch {
    return address; // Return as-is if invalid
  }
}

/**
 * Format address for display on explorer
 */
export function formatAddressForExplorer(address: string): string {
  const normalized = normalizeAddress(address);

  if (normalized.length > 10) {
    return `${normalized.slice(0, 6)}...${normalized.slice(-4)}`;
  }

  return normalized;
}

// ============ Token Handling ============

/**
 * Get native token symbol for current chain
 */
export function getNativeTokenSymbol(): string {
  return getCurrentNetwork().symbol;
}

/**
 * Get token decimals
 */
export function getTokenDecimals(): number {
  return getCurrentNetwork().decimals;
}

/**
 * Convert token amount to smallest unit (wei/uSTX)
 */
export function toSmallestUnit(amount: string | number): bigint {
  const decimals = getTokenDecimals();
  return ethers.parseUnits(String(amount), decimals);
}

/**
 * Convert from smallest unit to token amount
 */
export function fromSmallestUnit(amount: bigint | string): string {
  const decimals = getTokenDecimals();
  return ethers.formatUnits(String(amount), decimals);
}

// ============ Network-Specific Features ============

/**
 * Check if chain supports EIP-1559 transactions
 */
export function supportsEIP1559(): boolean {
  const chain = detectChain();
  // Both Celo and Base support EIP-1559
  return chain === 'celo' || chain === 'base';
}

/**
 * Check if chain supports meta-transactions
 */
export function supportsMetaTransactions(): boolean {
  const chain = detectChain();
  // All chains can support meta-tx via relayer contracts
  return true;
}

/**
 * Check if chain supports gas sponsorship
 */
export function supportsGasSponsorship(): boolean {
  const chain = detectChain();
  // Celo has built-in support via feeCurrency
  return chain === 'celo';
}

/**
 * Check if chain supports optimistic rollups
 */
export function isOptimisticRollup(): boolean {
  const chain = detectChain();
  return chain === 'base'; // Base is an OP Stack rollup
}

// ============ Contract Interface Differences ============

/**
 * Get chain-specific function selectors or encoding details
 */
export function getChainSpecificEncoding(): {
  supportsCreate2: boolean;
  supportsDelegateCall: boolean;
  supportsSelfDestruct: boolean;
} {
  const chain = detectChain();

  if (chain === 'stacks') {
    // Stacks/Clarity has different contract model
    return {
      supportsCreate2: false,
      supportsDelegateCall: false,
      supportsSelfDestruct: false,
    };
  }

  // EVM chains (Celo, Base)
  return {
    supportsCreate2: true,
    supportsDelegateCall: true,
    supportsSelfDestruct: true,
  };
}

// ============ Game-Specific Chain Logic ============

/**
 * Get game parameter adjustments based on chain
 * (e.g., different stake limits, turn time based on block time)
 */
export function getChainGameParameters() {
  const chain = detectChain();
  const blockTime = getChainGasConfig().blockTime;

  const baseParams = {
    maxTurnsPerGame: 20,
    minTurnsPerGame: 5,
    maxStakeAmount: ethers.parseUnits('100', getTokenDecimals()),
    minStakeAmount: ethers.parseUnits('0.01', getTokenDecimals()),
    turnTimeoutSeconds: 60,
    // Allow more time on slower chains
    blockFinalizationTime: blockTime * getRequiredConfirmations(),
  };

  // Chain-specific adjustments
  if (chain === 'stacks') {
    return {
      ...baseParams,
      turnTimeoutSeconds: 120, // Longer turns on Stacks
      maxStakeAmount: ethers.parseUnits('50', 6), // STX decimals = 6
    };
  }

  if (chain === 'celo') {
    return {
      ...baseParams,
      // Celo-specific params
    };
  }

  // Base
  return baseParams;
}

/**
 * Get cross-chain message cost estimate
 */
export function estimateCrossChainMessageCost(): bigint {
  const chain = detectChain();

  // These are rough estimates
  switch (chain) {
    case 'base':
      return ethers.parseUnits('0.01', 18); // ~$20
    case 'celo':
      return ethers.parseUnits('5', 18); // Celo transaction
    case 'stacks':
      return ethers.parseUnits('0.0001', 6); // STX
    default:
      return 0n;
  }
}

// ============ Chain-Specific Event Handling ============

/**
 * Get reorg-safe confirmation count for chain
 */
export function getReorgSafeConfirmations(): number {
  const chain = detectChain();

  switch (chain) {
    case 'celo':
      return 3; // Celo has lower reorg risk
    case 'base':
      return 12; // Base (OP rollup) needs more confirmations for safety
    case 'stacks':
      return 10;
    default:
      return 6;
  }
}

/**
 * Wait time before considering transaction final (in seconds)
 */
export function getFinalityWaitTime(): number {
  const confirmations = getReorgSafeConfirmations();
  const blockTime = getChainGasConfig().blockTime;
  return confirmations * blockTime;
}

// ============ Debug & Logging ============

/**
 * Get chain information for debugging
 */
export function getChainInfo(): {
  chain: SupportedChain;
  network: NetworkConfig;
  gasConfig: (typeof CHAIN_GAS_CONFIGS)[SupportedChain];
  requiresXChainRelay: boolean;
} {
  return {
    chain: detectChain(),
    network: getCurrentNetwork(),
    gasConfig: getChainGasConfig(),
    requiresXChainRelay: false, // TODO: Add cross-chain logic
  };
}
