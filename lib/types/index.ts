/**
 * Centralized type definitions for ComCelo
 * Single source of truth for all interfaces and types across Celo, Base, and Stacks
 */

// ============ Blockchain Address Types ============
export type EvmAddress = `0x${string}`;
export type StacksAddress = string; // SP or SM prefix
export type ChainAddress = EvmAddress | StacksAddress;

// ============ Network Configuration ============
export interface NetworkConfig {
  readonly chainId: number | string;
  readonly name: string;
  readonly rpcUrl: string;
  readonly explorerUrl: string;
  readonly symbol: string;
  readonly decimals: number;
  readonly ecosystem: 'Celo' | 'Base' | 'Stacks';
  readonly isTestnet: boolean;
}

export interface SupportedNetworks {
  readonly celoAlfajores: NetworkConfig;
  readonly celo: NetworkConfig;
  readonly baseSepolia: NetworkConfig;
  readonly base: NetworkConfig;
  readonly stacksTestnet: NetworkConfig;
  readonly stacksMainnet: NetworkConfig;
}

// ============ Contract Addresses ============
export interface GameContracts {
  readonly core: EvmAddress;
  readonly matchmaker: EvmAddress;
  readonly treasury: EvmAddress;
  readonly units: EvmAddress;
  readonly relay: EvmAddress;
  readonly sessionManager: EvmAddress;
  readonly governance: EvmAddress;
  readonly playerStats: EvmAddress;
  readonly antiCheat: EvmAddress;
  readonly crossChainRewards: EvmAddress;
}

export interface FeatureContracts {
  readonly items: EvmAddress;
  readonly metaTxRelay: EvmAddress;
  readonly seasons: EvmAddress;
  readonly tournaments: EvmAddress;
  readonly achievements: EvmAddress;
  readonly ranking: EvmAddress;
  readonly quests: EvmAddress;
  readonly rewards: EvmAddress;
}

export interface ChainSpecificContracts {
  readonly baseSimple: EvmAddress;
  readonly optimisticOracle: EvmAddress;
  readonly baseSpokePool: EvmAddress;
}

export interface AllContracts extends GameContracts, FeatureContracts, ChainSpecificContracts {}

// ============ Game State & Logic ============
export enum GameStatus {
  None = 0,
  WaitingForOpponent = 1,
  Active = 2,
  Finished = 3,
  Cancelled = 4,
}

export enum UnitType {
  Hero = 0,
  Soldier = 1,
  Archer = 2,
}

export interface UnitStats {
  readonly hp: number;
  readonly attack: number;
  readonly defense: number;
  readonly range: number;
}

export interface UnitState extends UnitStats {
  readonly x: number;
  readonly y: number;
  readonly defended: boolean;
  readonly type: UnitType;
}

export interface GameOptions {
  readonly ranked: boolean;
  readonly maxTurns: number;
  readonly stake: bigint;
}

export interface GameState {
  readonly status: GameStatus;
  readonly player1: EvmAddress;
  readonly player2: EvmAddress;
  readonly currentTurn: number;
  readonly turnCount: number;
  readonly units: UnitState[];
}

// ============ Transaction & Events ============
export interface TransactionOptions {
  readonly gasPrice?: bigint;
  readonly gasLimit?: bigint;
  readonly value?: bigint;
}

export interface EventLog {
  readonly eventName: string;
  readonly args: Record<string, unknown>;
  readonly blockNumber: number;
  readonly transactionHash: string;
  readonly timestamp: number;
}

// ============ API & Validation ============
export interface ApiResponse<T = unknown> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
  readonly timestamp: number;
}

export interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: string[];
}

// ============ User Profile & Stats ============
export interface PlayerProfile {
  readonly address: EvmAddress;
  readonly username: string;
  readonly joinedAt: number;
  readonly totalGames: number;
  readonly wins: number;
  readonly losses: number;
  readonly rating: number;
}

export interface PlayerStats {
  readonly gamesPlayed: number;
  readonly gamesWon: number;
  readonly totalStakeWon: bigint;
  readonly totalStakeLost: bigint;
  readonly winRate: number;
}
