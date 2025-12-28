/**
 * Centralized constants registry for ComCelo
 * Single source of truth for all hardcoded values, limits, and configuration constants
 */

// ============ Game Grid & Board ============
export const GAME_GRID = {
  WIDTH: 3,
  HEIGHT: 3,
  TOTAL_CELLS: 9,
  MAX_UNITS_PER_PLAYER: 9,
} as const;

// ============ Unit Types & Stats ============
export const UNIT_STATS = {
  HERO: {
    HP: 100,
    ATTACK: 15,
    DEFENSE: 10,
    RANGE: 1,
  },
  SOLDIER: {
    HP: 40,
    ATTACK: 12,
    DEFENSE: 8,
    RANGE: 1,
  },
  ARCHER: {
    HP: 30,
    ATTACK: 10,
    DEFENSE: 5,
    RANGE: 3,
  },
} as const;

export const UNIT_MECHANICS = {
  MIN_DAMAGE: 1,
  DEFEND_DAMAGE_REDUCTION: 0.5, // 50% damage reduction
  MAX_MOVE_DISTANCE: 2,
  COUNTERATTACK_ENABLED: true,
  COUNTERATTACK_DAMAGE_PERCENT: 0.5, // 50% of attacker's attack
} as const;

// ============ Game Rules & Timing ============
export const GAME_RULES = {
  MAX_TURNS: 20,
  TURN_TIME_LIMIT_SECONDS: 60,
  MIN_PLAYERS_FOR_TOURNAMENT: 4,
  QUICK_MATCH_TIMEOUT_MS: 30_000,
  GAME_SESSION_TIMEOUT_MS: 3_600_000, // 1 hour
} as const;

// ============ Economy & Stakes ============
export const ECONOMY = {
  PLATFORM_FEE_PERCENT: 5,
  CREATOR_REWARD_PERCENT: 10,
  TOURNAMENT_PRIZE_POOL_PERCENT: 85,
  MIN_STAKE: 0n, // 0 CELO
  MAX_STAKE: ethers.parseUnits('1000', 18), // 1000 CELO
  TRANSACTION_MIN_BALANCE: ethers.parseUnits('0.1', 18), // 0.1 CELO
} as const;

// ============ Ranking & Rating ============
export const RANKING = {
  INITIAL_RATING: 1200,
  K_FACTOR: 32, // ELO K-factor
  MIN_GAMES_FOR_RATING: 5,
  RATING_DECAY_DAYS: 60,
  RATING_DECAY_PERCENT: 0.1, // 10% decay per cycle
} as const;

// ============ Matchmaking ============
export const MATCHMAKING = {
  MAX_RATING_DIFFERENCE: 200,
  MIN_PLAYERS_IN_QUEUE: 2,
  QUEUE_CHECK_INTERVAL_MS: 1000,
  AUTO_MATCH_TIMEOUT_MS: 120_000, // 2 minutes
} as const;

// ============ Blockchain Networks ============
export const NETWORK_IDS = {
  CELO_ALFAJORES: 44787,
  CELO_MAINNET: 42220,
  BASE_SEPOLIA: 84532,
  BASE_MAINNET: 8453,
  STACKS_TESTNET: 'testnet',
  STACKS_MAINNET: 'mainnet',
} as const;

export const BLOCK_CONFIRMATIONS = {
  CELO: 12,
  BASE: 6,
  STACKS: 10,
} as const;

export const BLOCK_TIMES = {
  CELO_SECONDS: 5,
  BASE_SECONDS: 2,
  STACKS_SECONDS: 10,
} as const;

// ============ Gas & Transaction Limits ============
export const GAS_LIMITS = {
  DEPLOY_CORE_CONTRACT: 5_000_000,
  CREATE_GAME: 200_000,
  PLACE_UNIT: 150_000,
  MOVE_UNIT: 150_000,
  ATTACK_UNIT: 200_000,
  END_TURN: 100_000,
  CLAIM_VICTORY: 250_000,
  REGISTER_PLAYER: 100_000,
  APPROVE_TOKEN: 50_000,
} as const;

export const GAS_PRICE_MULTIPLIERS = {
  STANDARD: 1.0,
  PRIORITY: 1.5,
  URGENT: 2.0,
} as const;

// ============ Contract Deployment (Base Mainnet Addresses) ============
export const DEPLOYED_ADDRESSES = {
  BASE_MAINNET: {
    GOVERNANCE: '0x6736103c7a528E658895c541F89E47F250c98a4f',
    CROSS_CHAIN_REWARDS: '0x4C73a992c2f52a74E67A2424b800Cf97359ab694',
    ITEMS: '0xBf1D587fc5f00aBA65671ab575eD5225D3342e13',
    META_TX_RELAY: '0x6E69f9c92070c3381D7Aebbb07842b682d500011',
    BASE_SIMPLE: '0x3D071744510628a1afB3052Ca1492aD25A92afd8',
  },
} as const;

// ============ Pagination & Limits ============
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  LEADERBOARD_TOP_N: 100,
  MATCH_HISTORY_MAX_GAMES: 50,
} as const;

// ============ Farcaster Frame ============
export const FARCASTER = {
  FRAME_ASPECT_RATIO: '1.91:1',
  MIN_BUTTON_COUNT: 1,
  MAX_BUTTON_COUNT: 4,
  INPUT_MAX_LENGTH: 300,
} as const;

// ============ Error Messages ============
export const ERRORS = {
  INVALID_ADDRESS: 'Invalid blockchain address',
  INVALID_AMOUNT: 'Invalid token amount',
  INSUFFICIENT_BALANCE: 'Insufficient balance',
  GAME_NOT_FOUND: 'Game not found',
  PLAYER_NOT_FOUND: 'Player not found',
  INVALID_MOVE: 'Invalid move',
  OUT_OF_TURN: 'Not your turn',
  UNIT_NOT_FOUND: 'Unit not found',
  ALREADY_MOVED: 'Unit has already moved this turn',
  INSUFFICIENT_GAS: 'Insufficient gas to execute transaction',
  NETWORK_ERROR: 'Network connection error',
  CONTRACT_ERROR: 'Contract execution failed',
  UNAUTHORIZED: 'Unauthorized action',
  GAME_ALREADY_STARTED: 'Game has already started',
} as const;

// ============ Success Messages ============
export const SUCCESS = {
  GAME_CREATED: 'Game created successfully',
  MOVE_EXECUTED: 'Move executed successfully',
  ATTACK_SUCCESSFUL: 'Attack successful',
  GAME_JOINED: 'Joined game successfully',
  VICTORY_CLAIMED: 'Victory claimed',
  PLAYER_REGISTERED: 'Player registered successfully',
} as const;

// ============ Events ============
export const EVENTS = {
  GAME_CREATED: 'GameCreated',
  GAME_STARTED: 'GameStarted',
  GAME_FINISHED: 'GameFinished',
  UNIT_MOVED: 'UnitMoved',
  UNIT_ATTACKED: 'UnitAttacked',
  UNIT_DIED: 'UnitDied',
  TURN_CHANGED: 'TurnChanged',
  PLAYER_JOINED: 'PlayerJoined',
  PLAYER_REGISTERED: 'PlayerRegistered',
  STAKES_DISTRIBUTED: 'StakesDistributed',
} as const;

// Note: ECONOMY.MAX_STAKE and ECONOMY.TRANSACTION_MIN_BALANCE require ethers
// Import ethers at top of file if using these constants
import { ethers } from 'ethers';

// Re-export with proper BigInt values
export const ECONOMY_FIXED = {
  ...ECONOMY,
  MAX_STAKE: ethers.parseUnits('1000', 18),
  TRANSACTION_MIN_BALANCE: ethers.parseUnits('0.1', 18),
} as const;
