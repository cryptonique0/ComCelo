/**
 * Network health check
 * Monitor Base and Stacks network status
 */

export interface NetworkHealth {
  network: string;
  isOnline: boolean;
  latency: number;
  blockHeight?: number;
  gasPrice?: string;
  timestamp: number;
}

const healthCache = new Map<string, NetworkHealth>();

export async function checkBaseHealth(): Promise<NetworkHealth> {
  const start = Date.now();
  const health: NetworkHealth = {
    network: 'Base',
    isOnline: false,
    latency: 0,
    timestamp: start,
  };

  try {
    const response = await fetch('https://mainnet.base.org', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        params: [],
        id: 1,
      }),
    });

    const latency = Date.now() - start;
    const data = await response.json();

    if (!data.error) {
      health.isOnline = true;
      health.latency = latency;
      health.blockHeight = parseInt(data.result || '0', 16);
    }
  } catch (error) {
    health.isOnline = false;
    health.latency = Date.now() - start;
  }

  healthCache.set('base', health);
  return health;
}

export async function checkStacksHealth(): Promise<NetworkHealth> {
  const start = Date.now();
  const health: NetworkHealth = {
    network: 'Stacks',
    isOnline: false,
    latency: 0,
    timestamp: start,
  };

  try {
    const response = await fetch('https://api.mainnet.hiro.so/v2/info', {
      method: 'GET',
    });

    const latency = Date.now() - start;
    
    if (response.ok) {
      const data = await response.json();
      health.isOnline = true;
      health.latency = latency;
      health.blockHeight = data.stacks_tip_height;
    }
  } catch (error) {
    health.isOnline = false;
    health.latency = Date.now() - start;
  }

  healthCache.set('stacks', health);
  return health;
}

export async function checkAllNetworks(): Promise<NetworkHealth[]> {
  const results = await Promise.all([
    checkBaseHealth(),
    checkStacksHealth(),
  ]);
  return results;
}

export function getNetworkHealth(network: 'base' | 'stacks'): NetworkHealth | undefined {
  return healthCache.get(network);
}

export function isNetworkHealthy(network: 'base' | 'stacks'): boolean {
  const health = healthCache.get(network);
  return health?.isOnline ?? false;
}
