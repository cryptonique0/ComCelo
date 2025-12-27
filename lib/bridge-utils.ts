/**
 * Cross-chain bridge utilities
 * Support for bridging between Base and other networks
 */

export interface BridgeRoute {
  id: string;
  name: string;
  fromChain: string;
  toChain: string;
  minAmount: string;
  maxAmount: string;
  estimatedTime: string;
  fee: string;
}

export const BRIDGE_ROUTES: BridgeRoute[] = [
  {
    id: 'base-to-ethereum',
    name: 'Base → Ethereum',
    fromChain: 'Base',
    toChain: 'Ethereum',
    minAmount: '0.001',
    maxAmount: 'unlimited',
    estimatedTime: '7 days',
    fee: 'dynamic',
  },
  {
    id: 'ethereum-to-base',
    name: 'Ethereum → Base',
    fromChain: 'Ethereum',
    toChain: 'Base',
    minAmount: '0.001',
    maxAmount: 'unlimited',
    estimatedTime: '10-60 minutes',
    fee: 'dynamic',
  },
];

export function getBridgeRoute(id: string): BridgeRoute | undefined {
  return BRIDGE_ROUTES.find(route => route.id === id);
}

export function getBridgesByChain(chainName: string): BridgeRoute[] {
  return BRIDGE_ROUTES.filter(
    route => route.fromChain === chainName || route.toChain === chainName
  );
}

export function validateBridgeAmount(amount: string, route: BridgeRoute): { valid: boolean; error?: string } {
  const num = parseFloat(amount);
  
  if (isNaN(num) || num <= 0) {
    return { valid: false, error: 'Invalid amount' };
  }

  const minAmount = parseFloat(route.minAmount);
  if (num < minAmount) {
    return { valid: false, error: `Minimum amount is ${route.minAmount}` };
  }

  return { valid: true };
}
