/**
 * Game configuration constants
 */

export const GAME_CONFIG = {
  // Grid dimensions
  GRID_WIDTH: 3,
  GRID_HEIGHT: 3,
  GRID_SIZE: 9,

  // Unit types
  UNIT_TYPES: {
    HERO: 0,
    SOLDIER: 1,
    ARCHER: 2,
  },

  // Unit stats (base values)
  UNITS: {
    HERO: {
      hp: 100,
      attack: 15,
      defense: 10,
      range: 1,
    },
    SOLDIER: {
      hp: 40,
      attack: 12,
      defense: 8,
      range: 1,
    },
    ARCHER: {
      hp: 30,
      attack: 10,
      defense: 5,
      range: 3,
    },
  },

  // Game rules
  MAX_MOVE_DISTANCE: 2,
  DEFEND_DAMAGE_REDUCTION: 0.5, // 50% damage reduction when defending
  MIN_DAMAGE: 1,

  // Matchmaking
  MIN_PLAYERS_FOR_TOURNAMENT: 4,
  QUICK_MATCH_TIMEOUT_MS: 30000, // 30 seconds

  // Economy
  PLATFORM_FEE_PERCENT: 5,
  MIN_STAKE: 0, // No minimum stake required
  MAX_STAKE: "1000", // 1000 CELO max

  // Ranking
  INITIAL_ELO: 1600,
  ELO_K_FACTOR: 32,

  // Timing
  TURN_TIMEOUT_SECONDS: 300, // 5 minutes per turn
  GAME_TIMEOUT_SECONDS: 3600, // 1 hour total game timeout
};

export const GAME_STATUS = {
  NONE: 0,
  WAITING_FOR_OPPONENT: 1,
  ACTIVE: 2,
  FINISHED: 3,
  CANCELLED: 4,
};

export const GAME_MODE = {
  UNRANKED: 0,
  RANKED: 1,
};

export const SKILL_IDS = {
  POWER_STRIKE: 0,
  CHARGE: 1,
  MULTI_SHOT: 2,
};
