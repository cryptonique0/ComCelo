/**
 * Stacks network utilities
 * Helpers for working with the Stacks/Bitcoin L2 network
 */

export const STACKS_NETWORKS = {
  mainnet: {
    name: 'Stacks Mainnet',
    chainId: 'mainnet',
    url: 'https://stacks.co',
    explorerUrl: 'https://explorer.stacks.co',
    rpcUrl: 'https://api.mainnet.hiro.so',
  },
  testnet: {
    name: 'Stacks Testnet',
    chainId: 'testnet',
    url: 'https://testnet.stacks.co',
    explorerUrl: 'https://explorer.stacks.co?chain=testnet',
    rpcUrl: 'https://api.testnet.hiro.so',
  },
};

export function getStacksNetwork(networkName: 'mainnet' | 'testnet' = 'mainnet') {
  return STACKS_NETWORKS[networkName];
}

export function isValidStacksAddress(address: string): boolean {
  return /^(SP|SM)[A-Z0-9]{39}$/.test(address);
}

export function formatStacksAddress(address: string): string {
  if (address.length > 10) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }
  return address;
}
