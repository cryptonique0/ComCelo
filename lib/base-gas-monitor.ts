/**
 * Base network gas price monitoring
 * Real-time gas tracking for Base mainnet and testnet
 */

export interface GasPrices {
  standard: string;
  fast: string;
  turbo: string;
  timestamp: number;
}

let lastFetchedGas: GasPrices | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30000; // 30 seconds

export async function getBasegasPrices(network: 'base' | 'baseSepolia' = 'base'): Promise<GasPrices> {
  const now = Date.now();
  
  // Return cached data if still fresh
  if (lastFetchedGas && (now - lastFetchTime) < CACHE_DURATION) {
    return lastFetchedGas;
  }

  try {
    const rpcUrl = network === 'base' 
      ? 'https://mainnet.base.org'
      : 'https://sepolia.base.org';

    const response = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_gasPrice',
        params: [],
        id: 1,
      }),
    });

    const data = await response.json();
    const gasPrice = BigInt(data.result);
    
    // Calculate tiers based on base gas price
    const gasPrices: GasPrices = {
      standard: (gasPrice).toString(),
      fast: (gasPrice * BigInt(120) / BigInt(100)).toString(), // 20% higher
      turbo: (gasPrice * BigInt(150) / BigInt(100)).toString(), // 50% higher
      timestamp: now,
    };

    lastFetchedGas = gasPrices;
    lastFetchTime = now;
    return gasPrices;
  } catch (error) {
    console.error('Failed to fetch gas prices:', error);
    return {
      standard: '0',
      fast: '0',
      turbo: '0',
      timestamp: now,
    };
  }
}

export function formatGasPrice(wei: string): string {
  const gwei = BigInt(wei) / BigInt(10 ** 9);
  return `${gwei} Gwei`;
}
