import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const CELO_RPC_ALFAJORES = process.env.CELO_RPC_ALFAJORES || "https://alfajores-forno.celo-testnet.org";
const CELO_RPC_MAINNET = process.env.CELO_RPC_MAINNET || "https://forno.celo.org";
const BASE_RPC_SEPOLIA = process.env.BASE_RPC_SEPOLIA || "https://sepolia.base.org";
const BASE_RPC_MAINNET = process.env.BASE_RPC_MAINNET || "https://mainnet.base.org";
const DEPLOYER_KEY = process.env.DEPLOYER_KEY || "";

const accounts = DEPLOYER_KEY ? [DEPLOYER_KEY] : [];

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.23",
    settings: {
      optimizer: { enabled: true, runs: 200 }
    }
  },
  networks: {
    hardhat: {},
    celoAlfajores: {
      url: CELO_RPC_ALFAJORES,
      accounts,
      chainId: 44787
    },
    celo: {
      url: CELO_RPC_MAINNET,
      accounts,
      chainId: 42220
    },
    baseSepolia: {
      url: BASE_RPC_SEPOLIA,
      accounts,
      chainId: 84532
    },
    base: {
      url: BASE_RPC_MAINNET,
      accounts,
      chainId: 8453
    }
  },
  etherscan: {
    apiKey: {
      celoAlfajores: process.env.CELOSCAN_API_KEY || "",
      celo: process.env.CELOSCAN_API_KEY || "",
      baseSepolia: process.env.BASESCAN_API_KEY || "",
      base: process.env.BASESCAN_API_KEY || ""
    },
    customChains: [
      {
        network: "celo",
        chainId: 42220,
        urls: {
          apiURL: "https://api.celoscan.io/api",
          browserURL: "https://celoscan.io"
        }
      },
      {
        network: "celoAlfajores",
        chainId: 44787,
        urls: {
          apiURL: "https://api-alfajores.celoscan.io/api",
          browserURL: "https://alfajores.celoscan.io"
        }
      },
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      },
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org"
        }
      }
    ]
  }
};

export default config;
