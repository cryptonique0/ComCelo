/**
 * Contract addresses and ABIs for ComCelo
 * Update these with your deployed contract addresses
 * Supports: Celo (Alfajores & Mainnet), Base (Sepolia & Mainnet)
 */

export const CONTRACTS = {
  // Core game contracts
  core: process.env.NEXT_PUBLIC_GAME_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  matchmaker: process.env.NEXT_PUBLIC_MATCHMAKER_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  treasury: process.env.NEXT_PUBLIC_TREASURY_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  units: process.env.NEXT_PUBLIC_UNITS_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  relay: process.env.NEXT_PUBLIC_RELAY_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  sessionManager: process.env.NEXT_PUBLIC_SESSION_MANAGER_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  governance: process.env.NEXT_PUBLIC_GOVERNANCE_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  playerStats: process.env.NEXT_PUBLIC_PLAYER_STATS_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  antiCheat: process.env.NEXT_PUBLIC_ANTI_CHEAT_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  crossChainRewards: process.env.NEXT_PUBLIC_CROSS_CHAIN_REWARDS_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  
  // Feature contracts
  items: process.env.NEXT_PUBLIC_ITEMS_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  seasons: process.env.NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  tournaments: process.env.NEXT_PUBLIC_TOURNAMENTS_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  achievements: process.env.NEXT_PUBLIC_ACHIEVEMENTS_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  ranking: process.env.NEXT_PUBLIC_RANKING_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  quests: process.env.NEXT_PUBLIC_QUESTS_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  rewards: process.env.NEXT_PUBLIC_REWARDS_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  
  // Base-specific contracts
  optimisticOracle: process.env.NEXT_PUBLIC_ORACLE_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  baseSpokePool: process.env.NEXT_PUBLIC_SPOKE_POOL_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
};

export const NETWORKS = {
  celoAlfajores: {
    chainId: 44787,
    name: "Celo Alfajores Testnet",
    rpcUrl: "https://alfajores-forno.celo-testnet.org",
    explorerUrl: "https://alfajores.celoscan.io",
    symbol: "CELO",
    decimals: 18,
    ecosystem: "Celo",
  },
  celo: {
    chainId: 42220,
    name: "Celo Mainnet",
    rpcUrl: "https://forno.celo.org",
    explorerUrl: "https://celoscan.io",
    symbol: "CELO",
    decimals: 18,
    ecosystem: "Celo",
  },
  baseSepolia: {
    chainId: 84532,
    name: "Base Sepolia Testnet",
    rpcUrl: "https://sepolia.base.org",
    explorerUrl: "https://sepolia.basescan.org",
    symbol: "ETH",
    decimals: 18,
    ecosystem: "Base",
  },
  base: {
    chainId: 8453,
    name: "Base Mainnet",
    rpcUrl: "https://mainnet.base.org",
    explorerUrl: "https://basescan.org",
    symbol: "ETH",
    decimals: 18,
    ecosystem: "Base",
  },
};

// Default to Celo Alfajores, can be overridden by NEXT_PUBLIC_NETWORK_ID
export const DEFAULT_NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID || "celoAlfajores";
export const NETWORK_CONFIG = NETWORKS[DEFAULT_NETWORK_ID as keyof typeof NETWORKS] || NETWORKS.celoAlfajores;

/**
 * Get network by chain ID
 */
export function getNetworkByChainId(chainId: number) {
  return Object.values(NETWORKS).find((net) => net.chainId === chainId);
}

/**
 * Check if network is Base ecosystem
 */
export function isBaseNetwork(chainId: number): boolean {
  return chainId === 8453 || chainId === 84532;
}

/**
 * Check if network is Celo ecosystem
 */
export function isCeloNetwork(chainId: number): boolean {
  return chainId === 42220 || chainId === 44787;
}
