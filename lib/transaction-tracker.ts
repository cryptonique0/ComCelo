/**
 * Transaction tracking and monitoring
 * Track both EVM (Base) and Stacks transactions
 */

export interface TransactionRecord {
  hash: string;
  network: 'base' | 'stacks';
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  type: 'game' | 'trade' | 'governance' | 'meta-tx';
  value?: string;
}

const txCache = new Map<string, TransactionRecord>();

export function trackTransaction(record: TransactionRecord): void {
  txCache.set(record.hash, record);
  localStorage.setItem(`tx_${record.hash}`, JSON.stringify(record));
}

export function getTransaction(hash: string): TransactionRecord | undefined {
  return txCache.get(hash);
}

export function getAllTransactions(): TransactionRecord[] {
  return Array.from(txCache.values());
}

export function getTransactionsByNetwork(network: 'base' | 'stacks'): TransactionRecord[] {
  return getAllTransactions().filter(tx => tx.network === network);
}

export function updateTransactionStatus(
  hash: string,
  status: 'pending' | 'confirmed' | 'failed'
): void {
  const tx = txCache.get(hash);
  if (tx) {
    tx.status = status;
    localStorage.setItem(`tx_${hash}`, JSON.stringify(tx));
  }
}

export function clearOldTransactions(olderThanMs: number = 86400000): void {
  const cutoff = Date.now() - olderThanMs;
  const toDelete: string[] = [];

  txCache.forEach((tx, hash) => {
    if (tx.timestamp < cutoff) {
      toDelete.push(hash);
      localStorage.removeItem(`tx_${hash}`);
    }
  });

  toDelete.forEach(hash => txCache.delete(hash));
}
