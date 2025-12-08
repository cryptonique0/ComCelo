import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const CELO_RPC_ALFAJORES = process.env.CELO_RPC_ALFAJORES || "https://alfajores-forno.celo-testnet.org";
const CELO_RPC_MAINNET = process.env.CELO_RPC_MAINNET || "https://forno.celo.org";
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
      accounts
    },
    celo: {
      url: CELO_RPC_MAINNET,
      accounts
    }
  },
  etherscan: {
    apiKey: {
      celoAlfajores: process.env.CELOSCAN_API_KEY || "",
      celo: process.env.CELOSCAN_API_KEY || ""
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
      }
    ]
  }
};

export default config;
