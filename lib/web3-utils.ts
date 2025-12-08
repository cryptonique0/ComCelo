import { ethers } from 'ethers';

// Network configuration
export const NETWORKS = {
  celoAlfajores: {
    chainId: 44787,
    name: 'Celo Alfajores',
    rpc: process.env.NEXT_PUBLIC_CELO_RPC_URL || 'https://alfajores-forno.celo-testnet.org',
    explorer: 'https://alfajores-blockscout.celo-testnet.org',
  },
  celoMainnet: {
    chainId: 42220,
    name: 'Celo Mainnet',
    rpc: process.env.NEXT_PUBLIC_CELO_MAINNET_RPC || 'https://forno.celo.org',
    explorer: 'https://explorer.celo.org',
  },
};

// Get default network
export const DEFAULT_NETWORK = process.env.NODE_ENV === 'production'
  ? NETWORKS.celoMainnet
  : NETWORKS.celoAlfajores;

// Provider factory
export function getProvider(network = DEFAULT_NETWORK) {
  return new ethers.JsonRpcProvider(network.rpc);
}

// Signer factory (requires private key)
export function getSigner(privateKey: string, network = DEFAULT_NETWORK) {
  const provider = getProvider(network);
  return new ethers.Wallet(privateKey, provider);
}

// Check if address is valid
export function isValidAddress(address: string): boolean {
  try {
    return ethers.isAddress(address);
  } catch {
    return false;
  }
}

// Format address for display
export function formatAddress(address: string): string {
  if (!isValidAddress(address)) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Parse units (wei to token)
export function formatTokenAmount(wei: bigint | string, decimals = 18): string {
  return ethers.formatUnits(wei, decimals);
}

// Parse tokens (token to wei)
export function parseTokenAmount(amount: string, decimals = 18): bigint {
  return ethers.parseUnits(amount, decimals);
}

// Get balance
export async function getBalance(address: string, network = DEFAULT_NETWORK): Promise<string> {
  try {
    const provider = getProvider(network);
    const balance = await provider.getBalance(address);
    return formatTokenAmount(balance, 18);
  } catch (error) {
    console.error('Error getting balance:', error);
    return '0';
  }
}

// Get network info
export async function getNetworkInfo(network = DEFAULT_NETWORK) {
  try {
    const provider = getProvider(network);
    const blockNumber = await provider.getBlockNumber();
    const gasPrice = await provider.getGasPrice();
    
    return {
      chainId: network.chainId,
      name: network.name,
      blockNumber,
      gasPrice: formatTokenAmount(gasPrice, 9), // Convert to gwei
      explorer: network.explorer,
    };
  } catch (error) {
    console.error('Error getting network info:', error);
    return null;
  }
}

// Verify signature
export function verifySignature(message: string, signature: string, address: string): boolean {
  try {
    const recovered = ethers.verifyMessage(message, signature);
    return recovered.toLowerCase() === address.toLowerCase();
  } catch {
    return false;
  }
}

// Sign message
export function signMessage(message: string, privateKey: string): string {
  const wallet = new ethers.Wallet(privateKey);
  return wallet.signMessage(message);
}

// Create transaction data
export async function createTransactionData(
  to: string,
  value: string = '0',
  data: string = '0x'
): Promise<ethers.TransactionRequest> {
  const provider = getProvider();
  
  return {
    to,
    value: ethers.parseUnits(value, 18),
    data,
    gasLimit: '300000', // Default gas limit
  };
}

// Estimate gas
export async function estimateGas(
  from: string,
  to: string,
  data: string,
  value: string = '0'
): Promise<string> {
  try {
    const provider = getProvider();
    const gas = await provider.estimateGas({
      from,
      to,
      data,
      value: ethers.parseUnits(value, 18),
    });
    return gas.toString();
  } catch (error) {
    console.error('Error estimating gas:', error);
    return '100000'; // Default fallback
  }
}

// Check if contract exists
export async function contractExists(address: string, network = DEFAULT_NETWORK): Promise<boolean> {
  try {
    const provider = getProvider(network);
    const code = await provider.getCode(address);
    return code !== '0x';
  } catch {
    return false;
  }
}

// Get contract bytecode
export async function getContractBytecode(address: string, network = DEFAULT_NETWORK): Promise<string> {
  try {
    const provider = getProvider(network);
    return await provider.getCode(address);
  } catch {
    return '0x';
  }
}

// Wait for transaction
export async function waitForTransaction(
  hash: string,
  network = DEFAULT_NETWORK,
  confirmations = 1
) {
  try {
    const provider = getProvider(network);
    const receipt = await provider.waitForTransaction(hash, confirmations);
    return receipt;
  } catch (error) {
    console.error('Error waiting for transaction:', error);
    return null;
  }
}

// Get transaction
export async function getTransaction(hash: string, network = DEFAULT_NETWORK) {
  try {
    const provider = getProvider(network);
    return await provider.getTransaction(hash);
  } catch (error) {
    console.error('Error getting transaction:', error);
    return null;
  }
}

// Decode function call
export function decodeFunctionCall(data: string, abi: any[]): {
  name: string;
  inputs: Record<string, any>;
} | null {
  try {
    const iface = new ethers.Interface(abi);
    const decoded = iface.parseTransaction({ data });
    
    if (!decoded) return null;
    
    return {
      name: decoded.name,
      inputs: decoded.args.reduce((acc, arg, i) => {
        const paramName = decoded.signature.split('(')[1]?.split(')')[0]?.split(',')[i]?.trim() || `param${i}`;
        acc[paramName] = arg.toString();
        return acc;
      }, {} as Record<string, any>),
    };
  } catch {
    return null;
  }
}

// Encode function call
export function encodeFunctionCall(
  functionSignature: string,
  params: any[],
  abi: any[]
): string {
  try {
    const iface = new ethers.Interface(abi);
    const fragment = iface.getFunction(functionSignature);
    
    if (!fragment) throw new Error('Function not found');
    
    return iface.encodeFunctionData(fragment, params);
  } catch (error) {
    console.error('Error encoding function call:', error);
    return '0x';
  }
}

export default {
  NETWORKS,
  DEFAULT_NETWORK,
  getProvider,
  getSigner,
  isValidAddress,
  formatAddress,
  formatTokenAmount,
  parseTokenAmount,
  getBalance,
  getNetworkInfo,
  verifySignature,
  signMessage,
  createTransactionData,
  estimateGas,
  contractExists,
  getContractBytecode,
  waitForTransaction,
  getTransaction,
  decodeFunctionCall,
  encodeFunctionCall,
};
