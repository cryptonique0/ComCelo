/**
 * Contract addresses and ABIs for ComCelo
 * Update these with your deployed contract addresses
 */

export const CONTRACTS = {
  core: process.env.NEXT_PUBLIC_GAME_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  matchmaker: process.env.NEXT_PUBLIC_MATCHMAKER_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  treasury: process.env.NEXT_PUBLIC_TREASURY_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  units: process.env.NEXT_PUBLIC_UNITS_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
  relay: process.env.NEXT_PUBLIC_RELAY_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000",
};

export const NETWORKS = {
  celoAlfajores: {
    chainId: 44787,
    name: "Celo Alfajores Testnet",
    rpcUrl: "https://alfajores-forno.celo-testnet.org",
    explorerUrl: "https://alfajores.celoscan.io",
    symbol: "CELO",
    decimals: 18,
  },
  celo: {
    chainId: 42220,
    name: "Celo Mainnet",
    rpcUrl: "https://forno.celo.org",
    explorerUrl: "https://celoscan.io",
    symbol: "CELO",
    decimals: 18,
  },
};

export const NETWORK_CONFIG = NETWORKS.celoAlfajores;
