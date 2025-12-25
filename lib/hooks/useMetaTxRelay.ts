'use client';

import { useState } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { CONTRACTS } from '../contracts';
import { ComCeloMetaTxRelay__factory } from '../../typechain-types';
import { encodeFunctionData, keccak256, encodePacked } from 'viem';

export interface MetaTxParams {
  from: string;
  to: string;
  data: string;
  nonce: number;
  signature: string;
}

export function useMetaTxRelay() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Get user's nonce
  const getNonce = async (userAddress?: string): Promise<number> => {
    if (!publicClient) return 0;
    const target = userAddress || address;
    if (!target) return 0;
    
    try {
      const contract = ComCeloMetaTxRelay__factory.connect(
        CONTRACTS.metaTxRelay,
        publicClient as any
      );
      
      const nonce = await contract.nonces(target);
      return Number(nonce);
    } catch (err) {
      setError(err as Error);
      return 0;
    }
  };

  // Sign meta transaction
  const signMetaTx = async (
    to: string,
    data: string,
    nonce: number
  ): Promise<string> => {
    if (!walletClient || !address) {
      throw new Error('Wallet not connected');
    }

    try {
      // Create EIP-712 typed data hash
      const messageHash = keccak256(
        encodePacked(
          ['address', 'address', 'bytes', 'uint256'],
          [address, to as `0x${string}`, data as `0x${string}`, BigInt(nonce)]
        )
      );

      // Sign the hash
      const signature = await walletClient.signMessage({
        account: address,
        message: { raw: messageHash },
      });

      return signature;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  // Execute meta transaction (via relayer backend)
  const executeMetaTx = async (
    to: string,
    data: string,
    relayerUrl: string = '/api/relay'
  ) => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    try {
      setLoading(true);

      // Get nonce
      const nonce = await getNonce();

      // Sign transaction
      const signature = await signMetaTx(to, data, nonce);

      // Send to relayer
      const response = await fetch(relayerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: address,
          to,
          data,
          nonce,
          signature,
        }),
      });

      if (!response.ok) {
        throw new Error('Relayer request failed');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Wait for a transaction receipt (Base mainnet)
  const waitForReceipt = async (hash: `0x${string}`) => {
    if (!publicClient) throw new Error('No public client');
    try {
      return await publicClient.waitForTransactionReceipt({ hash });
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  // Execute batch meta transactions
  const executeBatchMetaTx = async (
    targets: string[],
    dataArray: string[],
    relayerUrl: string = '/api/relay/batch'
  ) => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    if (targets.length !== dataArray.length) {
      throw new Error('Targets and data arrays must have same length');
    }

    try {
      setLoading(true);

      // Get nonce
      const nonce = await getNonce();

      // Sign each transaction
      const signatures = await Promise.all(
        targets.map((to, i) => signMetaTx(to, dataArray[i], nonce + i))
      );

      // Send to relayer
      const response = await fetch(relayerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: address,
          targets,
          dataArray,
          startNonce: nonce,
          signatures,
        }),
      });

      if (!response.ok) {
        throw new Error('Batch relayer request failed');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Check if relayer is approved
  const isRelayerApproved = async (relayerAddress: string): Promise<boolean> => {
    if (!publicClient) return false;
    
    try {
      const contract = ComCeloMetaTxRelay__factory.connect(
        CONTRACTS.metaTxRelay,
        publicClient as any
      );
      
      return await contract.approvedRelayers(relayerAddress);
    } catch (err) {
      setError(err as Error);
      return false;
    }
  };

  // Get relayer's daily gas used
  const getDailyGasUsed = async (relayerAddress: string): Promise<bigint> => {
    if (!publicClient) return 0n;
    
    try {
      const contract = ComCeloMetaTxRelay__factory.connect(
        CONTRACTS.metaTxRelay,
        publicClient as any
      );
      
      const today = Math.floor(Date.now() / 86400000); // Days since epoch
      return await contract.dailyGasUsed(relayerAddress, today);
    } catch (err) {
      setError(err as Error);
      return 0n;
    }
  };

  // Get relayer rewards
  const getRelayerRewards = async (relayerAddress: string): Promise<bigint> => {
    if (!publicClient) return 0n;
    
    try {
      const contract = ComCeloMetaTxRelay__factory.connect(
        CONTRACTS.metaTxRelay,
        publicClient as any
      );
      
      return await contract.relayerRewards(relayerAddress);
    } catch (err) {
      setError(err as Error);
      return 0n;
    }
  };

  // Withdraw relayer rewards (only for relayer)
  const withdrawRelayerRewards = async () => {
    if (!walletClient || !address) {
      throw new Error('Wallet not connected');
    }

    try {
      setLoading(true);
      const contract = ComCeloMetaTxRelay__factory.connect(
        CONTRACTS.metaTxRelay,
        walletClient as any
      );

      const tx = await contract.withdrawRelayerRewards();
      await tx.wait();
      return tx;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    getNonce,
    signMetaTx,
    executeMetaTx,
    executeBatchMetaTx,
    waitForReceipt,
    isRelayerApproved,
    getDailyGasUsed,
    getRelayerRewards,
    withdrawRelayerRewards,
    loading,
    error,
  };
}
