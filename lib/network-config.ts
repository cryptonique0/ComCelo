/**
 * Network configuration manager for ComCelo
 * Centralized, validated, multi-chain network setup and management
 */

import type { NetworkConfig, SupportedNetworks } from './types/index';
import { withErrorHandling } from './errors';

// ============ Network Definitions ============

const NETWORKS_CONFIG: SupportedNetworks = {
  celoAlfajores: {
    chainId: 44787,
    name: 'Celo Alfajores Testnet',
    rpcUrl: process.env.CELO_RPC_ALFAJORES || 'https://alfajores-forno.celo-testnet.org',
    explorerUrl: 'https://alfajores.celoscan.io',
    symbol: 'CELO',
    decimals: 18,
    ecosystem: 'Celo',
    isTestnet: true,
  },
  celo: {
    chainId: 42220,
    name: 'Celo Mainnet',
    rpcUrl: process.env.CELO_RPC_MAINNET || 'https://forno.celo.org',
    explorerUrl: 'https://celoscan.io',
    symbol: 'CELO',
    decimals: 18,
    ecosystem: 'Celo',
    isTestnet: false,
  },
  baseSepolia: {
    chainId: 84532,
    name: 'Base Sepolia Testnet',
    rpcUrl: process.env.BASE_RPC_SEPOLIA || 'https://sepolia.base.org',
    explorerUrl: 'https://sepolia.basescan.org',
    symbol: 'ETH',
    decimals: 18,
    ecosystem: 'Base',
    isTestnet: true,
  },
  base: {
    chainId: 8453,
    name: 'Base Mainnet',
    rpcUrl: process.env.BASE_RPC_MAINNET || 'https://mainnet.base.org',
    explorerUrl: 'https://basescan.org',
    symbol: 'ETH',
    decimals: 18,
    ecosystem: 'Base',
    isTestnet: false,
  },
  stacksTestnet: {
    chainId: 'testnet',
    name: 'Stacks Testnet',
    rpcUrl: process.env.STACKS_RPC_TESTNET || 'https://api.testnet.hiro.so',
    explorerUrl: 'https://explorer.stacks.co?chain=testnet',
    symbol: 'STX',
    decimals: 6,
    ecosystem: 'Stacks',
    isTestnet: true,
  },
  stacksMainnet: {
    chainId: 'mainnet',
    name: 'Stacks Mainnet',
    rpcUrl: process.env.STACKS_RPC_MAINNET || 'https://api.mainnet.hiro.so',
    explorerUrl: 'https://explorer.stacks.co',
    symbol: 'STX',
    decimals: 6,
    ecosystem: 'Stacks',
    isTestnet: false,
  },
};

// ============ Network Config Manager ============

export class NetworkConfigManager {
  private static instance: NetworkConfigManager;
  private currentNetwork: NetworkConfig | null = null;

  private constructor() {
    // Initialize with environment or default
    const envNetwork = process.env.NEXT_PUBLIC_NETWORK_ID as keyof typeof NETWORKS_CONFIG;
    if (envNetwork && NETWORKS_CONFIG[envNetwork]) {
      this.currentNetwork = NETWORKS_CONFIG[envNetwork];
    } else {
      // Default to Base Sepolia for development, Base Mainnet for production
      this.currentNetwork =
        process.env.NODE_ENV === 'production'
          ? NETWORKS_CONFIG.base
          : NETWORKS_CONFIG.baseSepolia;
    }
  }

  /**
   * Get singleton instance
   */
  static getInstance(): NetworkConfigManager {
    if (!NetworkConfigManager.instance) {
      NetworkConfigManager.instance = new NetworkConfigManager();
    }
    return NetworkConfigManager.instance;
  }

  /**
   * Get current network config
   */
  getCurrentNetwork(): NetworkConfig {
    if (!this.currentNetwork) {
      throw new Error('No network configured');
    }
    return this.currentNetwork;
  }

  /**
   * Switch to a different network
   */
  switchNetwork(networkKey: keyof typeof NETWORKS_CONFIG): void {
    if (!NETWORKS_CONFIG[networkKey]) {
      throw new Error(`Network ${networkKey} not found`);
    }
    this.currentNetwork = NETWORKS_CONFIG[networkKey];
  }

  /**
   * Get network config by key
   */
  getNetwork(networkKey: keyof typeof NETWORKS_CONFIG): NetworkConfig {
    const network = NETWORKS_CONFIG[networkKey];
    if (!network) {
      throw new Error(`Network ${networkKey} not found`);
    }
    return network;
  }

  /**
   * Get all available networks
   */
  getAllNetworks(): Record<string, NetworkConfig> {
    return { ...NETWORKS_CONFIG };
  }

  /**
   * Get network by chain ID
   */
  getNetworkByChainId(chainId: number | string): NetworkConfig | undefined {
    return Object.values(NETWORKS_CONFIG).find((net) => net.chainId === chainId);
  }

  /**
   * Check if network is testnet
   */
  isTestnet(): boolean {
    return this.getCurrentNetwork().isTestnet;
  }

  /**
   * Check if network is EVM-compatible
   */
  isEvmNetwork(): boolean {
    return this.getCurrentNetwork().ecosystem !== 'Stacks';
  }

  /**
   * Check if network is Stacks
   */
  isStacksNetwork(): boolean {
    return this.getCurrentNetwork().ecosystem === 'Stacks';
  }

  /**
   * Get all testnet networks
   */
  getTestnetNetworks(): NetworkConfig[] {
    return Object.values(NETWORKS_CONFIG).filter((net) => net.isTestnet);
  }

  /**
   * Get all mainnet networks
   */
  getMainnetNetworks(): NetworkConfig[] {
    return Object.values(NETWORKS_CONFIG).filter((net) => !net.isTestnet);
  }

  /**
   * Get networks by ecosystem
   */
  getNetworksByEcosystem(ecosystem: 'Celo' | 'Base' | 'Stacks'): NetworkConfig[] {
    return Object.values(NETWORKS_CONFIG).filter((net) => net.ecosystem === ecosystem);
  }

  /**
   * Validate RPC URL is accessible
   */
  async validateRpcUrl(rpcUrl: string, timeout = 5000): Promise<boolean> {
    return withErrorHandling(
      async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
          const response = await fetch(rpcUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              method: 'eth_chainId',
              params: [],
              id: 1,
            }),
            signal: controller.signal,
          });

          clearTimeout(timeoutId);
          return response.ok;
        } catch {
          return false;
        }
      },
      `Failed to validate RPC URL: ${rpcUrl}`
    );
  }

  /**
   * Get RPC URL for current network
   */
  getRpcUrl(): string {
    return this.getCurrentNetwork().rpcUrl;
  }

  /**
   * Get explorer URL for current network
   */
  getExplorerUrl(): string {
    return this.getCurrentNetwork().explorerUrl;
  }

  /**
   * Get token symbol for current network
   */
  getTokenSymbol(): string {
    return this.getCurrentNetwork().symbol;
  }

  /**
   * Get decimals for current network
   */
  getDecimals(): number {
    return this.getCurrentNetwork().decimals;
  }

  /**
   * Get chain ID for current network
   */
  getChainId(): number | string {
    return this.getCurrentNetwork().chainId;
  }

  /**
   * Format transaction URL
   */
  formatTransactionUrl(txHash: string): string {
    const explorerUrl = this.getExplorerUrl();

    // Handle different explorer URL formats
    if (explorerUrl.includes('celoscan')) {
      return `${explorerUrl}/tx/${txHash}`;
    }
    if (explorerUrl.includes('basescan')) {
      return `${explorerUrl}/tx/${txHash}`;
    }
    if (explorerUrl.includes('explorer.stacks')) {
      return `${explorerUrl}&txid=${txHash}`;
    }

    return `${explorerUrl}/tx/${txHash}`;
  }

  /**
   * Format address URL
   */
  formatAddressUrl(address: string): string {
    const explorerUrl = this.getExplorerUrl();

    // Handle different explorer URL formats
    if (explorerUrl.includes('celoscan')) {
      return `${explorerUrl}/address/${address}`;
    }
    if (explorerUrl.includes('basescan')) {
      return `${explorerUrl}/address/${address}`;
    }
    if (explorerUrl.includes('explorer.stacks')) {
      return `${explorerUrl}&principal=${address}`;
    }

    return `${explorerUrl}/address/${address}`;
  }

  /**
   * Get network status (placeholder for health checks)
   */
  async getNetworkStatus(): Promise<{
    network: string;
    isHealthy: boolean;
    latency?: number;
  }> {
    return withErrorHandling(
      async () => {
        const startTime = Date.now();
        const isHealthy = await this.validateRpcUrl(this.getRpcUrl(), 3000);
        const latency = Date.now() - startTime;

        return {
          network: this.getCurrentNetwork().name,
          isHealthy,
          latency,
        };
      },
      'Failed to check network status'
    );
  }
}

// ============ Singleton Export ============

/**
 * Global network config manager instance
 */
export const networkConfig = NetworkConfigManager.getInstance();

/**
 * Shorthand: Get current network
 */
export function getCurrentNetwork(): NetworkConfig {
  return networkConfig.getCurrentNetwork();
}

/**
 * Shorthand: Get RPC URL
 */
export function getRpcUrl(): string {
  return networkConfig.getRpcUrl();
}

/**
 * Shorthand: Get chain ID
 */
export function getChainId(): number | string {
  return networkConfig.getChainId();
}

/**
 * Shorthand: Check if testnet
 */
export function isTestnet(): boolean {
  return networkConfig.isTestnet();
}
