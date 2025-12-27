'use client';

import { useState } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { CONTRACTS } from '../contracts';
import { ComCeloItems__factory } from '../../typechain-types';
import type { ComCeloItems } from '../../typechain-types';

export interface Item {
  id: number;
  name: string;
  description: string;
  itemType: number;
  rarity: number;
  price: bigint;
  maxSupply: bigint;
  currentSupply: bigint;
  seasonId: number;
  active: boolean;
  attackBonus: number;
  defenseBonus: number;
  effectId: number;
}

export interface MarketplaceListing {
  seller: string;
  itemId: number;
  price: bigint;
  active: boolean;
}

export function useItems() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Get item details
  const getItem = async (itemId: number): Promise<Item | null> => {
    if (!publicClient) return null;
    
    try {
      setLoading(true);
      const contract = ComCeloItems__factory.connect(
        CONTRACTS.items,
        publicClient as any
      );
      
      const item = await contract.items(itemId);
      
      return {
        id: itemId,
        name: item.name,
        description: item.description,
        itemType: Number(item.itemType),
        rarity: Number(item.rarity),
        price: item.price,
        maxSupply: item.maxSupply,
        currentSupply: item.currentSupply,
        seasonId: Number(item.seasonId),
        active: item.active,
        attackBonus: Number(item.attackBonus),
        defenseBonus: Number(item.defenseBonus),
        effectId: Number(item.effectId),
      };
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get user's item balance
  const getBalance = async (itemId: number): Promise<bigint> => {
    if (!publicClient || !address) return 0n;
    
    try {
      const contract = ComCeloItems__factory.connect(
        CONTRACTS.items,
        publicClient as any
      );
      
      return await contract.balanceOf(address, itemId);
    } catch (err) {
      setError(err as Error);
      return 0n;
    }
  };

  // Purchase item
  const purchaseItem = async (itemId: number, amount: number) => {
    if (!walletClient || !address) {
      throw new Error('Wallet not connected');
    }

    try {
      setLoading(true);
      const contract = ComCeloItems__factory.connect(
        CONTRACTS.items,
        walletClient as any
      );

      // Get item price
      const item = await getItem(itemId);
      if (!item) throw new Error('Item not found');

      const totalPrice = item.price * BigInt(amount);

      const tx = await contract.purchaseItem(itemId, amount, {
        value: totalPrice,
      });

      await tx.wait();
      return tx;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // List item on marketplace
  const listItem = async (itemId: number, amount: number, pricePerUnit: bigint) => {
    if (!walletClient || !address) {
      throw new Error('Wallet not connected');
    }

    try {
      setLoading(true);
      const contract = ComCeloItems__factory.connect(
        CONTRACTS.items,
        walletClient as any
      );

      const tx = await contract.listItem(itemId, amount, pricePerUnit);
      await tx.wait();
      return tx;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Buy from marketplace
  const buyFromMarketplace = async (listingId: number) => {
    if (!walletClient || !address) {
      throw new Error('Wallet not connected');
    }

    try {
      setLoading(true);
      // TODO: Implement with actual contract method
      throw new Error('Not yet implemented');
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cancel marketplace listing
  const cancelListing = async (listingId: number) => {
    if (!walletClient || !address) {
      throw new Error('Wallet not connected');
    }

    try {
      setLoading(true);
      const contract = ComCeloItems__factory.connect(
        CONTRACTS.items,
        walletClient as any
      );

      const tx = await contract.cancelListing(listingId);
      await tx.wait();
      return tx;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get marketplace listing
  const getListing = async (listingId: number): Promise<MarketplaceListing | null> => {
    if (!publicClient) return null;
    
    try {
      // TODO: Implement with actual contract method
      throw new Error('Not yet implemented');
    } catch (err) {
      setError(err as Error);
      return null;
    }
  };

  // Burn item
  const burnItem = async (itemId: number, amount: number) => {
    if (!walletClient || !address) {
      throw new Error('Wallet not connected');
    }

    try {
      setLoading(true);
      const contract = ComCeloItems__factory.connect(
        CONTRACTS.items,
        walletClient as any
      );

      const tx = await contract.burnItem(itemId, amount);
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
    getItem,
    getBalance,
    purchaseItem,
    listItem,
    buyFromMarketplace,
    cancelListing,
    getListing,
    burnItem,
    loading,
    error,
  };
}
