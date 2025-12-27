import { useMemo } from 'react';
import { useChainId } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';

export const useBaseConfig = () => {
  const chainId = useChainId();

  const config = useMemo(() => {
    return {
      isBase: chainId === base.id,
      isBaseSepolia: chainId === baseSepolia.id,
      isTestnet: chainId === baseSepolia.id,
      chainName: chainId === base.id ? 'Base Mainnet' : 'Base Sepolia',
      rpcUrl: chainId === base.id 
        ? 'https://mainnet.base.org' 
        : 'https://sepolia.base.org',
      explorer: chainId === base.id
        ? 'https://basescan.org'
        : 'https://sepolia.basescan.org',
      nativeCurrency: 'ETH',
    };
  }, [chainId]);

  return config;
};
