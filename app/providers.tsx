'use client';

import { WagmiProvider } from 'wagmi';
import { http, createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { injected, coinbaseWallet } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

// Wagmi config for Base + Base Sepolia
const config = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
  connectors: [
    injected({ shimDisconnect: true }),
    coinbaseWallet({ appName: 'ComCelo', preference: 'smartWalletOnly' }),
  ],
});

const queryClient = new QueryClient();

// Stacks wallet context
interface StacksWalletContextType {
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnected: boolean;
}

const StacksWalletContext = createContext<StacksWalletContextType>({
  address: null,
  connect: async () => {},
  disconnect: () => {},
  isConnected: false,
});

export const useStacksWallet = () => useContext(StacksWalletContext);

function StacksWalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check if Hiro/Leather wallet is available
    const checkWallet = async () => {
      if (typeof window !== 'undefined' && 'StacksProvider' in window) {
        const provider = (window as unknown as { StacksProvider: { getAddresses: () => Promise<{ mainnet: string }> } }).StacksProvider;
        try {
          const userData = await provider.getAddresses();
          if (userData?.mainnet) {
            setAddress(userData.mainnet);
            setIsConnected(true);
          }
        } catch (e) {
          // Not connected yet
        }
      }
    };
    checkWallet();
  }, []);

  const connect = async () => {
    if (typeof window === 'undefined') return;
    
    // @ts-expect-error - Hiro Wallet API
    if (window.StacksProvider) {
      try {
        // @ts-expect-error
        const provider = window.StacksProvider;
        const userData = await provider.getAddresses();
        if (userData?.mainnet) {
          setAddress(userData.mainnet);
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Failed to connect Stacks wallet:', error);
      }
    } else {
      alert('Please install Hiro Wallet or Leather Wallet extension');
      window.open('https://wallet.hiro.so/', '_blank');
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
  };

  return (
    <StacksWalletContext.Provider value={{ address, connect, disconnect, isConnected }}>
      {children}
    </StacksWalletContext.Provider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <StacksWalletProvider>
          {children}
        </StacksWalletProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
