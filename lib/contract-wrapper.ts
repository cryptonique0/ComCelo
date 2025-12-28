/**
 * Contract interaction wrapper for ComCelo
 * Abstraction layer for all smart contract interactions with error handling and logging
 */

import { ethers, Contract, ContractTransactionResponse, TransactionReceipt } from 'ethers';
import { ContractError, GasError, withErrorHandling } from './errors';
import type { TransactionOptions } from './types/index';

// ============ Contract Call Result Types ============

export interface TransactionResult {
  readonly hash: string;
  readonly from: string;
  readonly to: string | null;
  readonly blockNumber?: number;
  readonly confirmations: number;
  readonly gasUsed?: bigint;
  readonly gasPrice?: bigint;
  readonly status: 'pending' | 'confirmed' | 'failed';
}

export interface CallResult<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
  readonly blockNumber: number;
  readonly timestamp: number;
}

// ============ Contract Wrapper Class ============

export class ContractWrapper {
  constructor(
    private contract: Contract,
    private chainId: number,
    private options: { logCalls?: boolean; timeout?: number } = {}
  ) {}

  /**
   * Execute a contract write function (transaction)
   */
  async write<T = unknown>(
    functionName: string,
    args: unknown[],
    txOptions?: TransactionOptions
  ): Promise<TransactionResult> {
    return withErrorHandling(
      async () => {
        this.log(`📝 Call: ${functionName}(${args.join(', ')})`);

        if (!this.contract[functionName]) {
          throw new Error(`Function ${functionName} not found on contract`);
        }

        const txParams: Record<string, unknown> = {};

        if (txOptions?.gasLimit) {
          txParams.gasLimit = txOptions.gasLimit;
        } else {
          // Estimate gas
          try {
            const estimated = await this.contract[functionName].estimateGas(...args);
            txParams.gasLimit = (estimated * 120n) / 100n; // 20% buffer
          } catch (error) {
            this.log(`⚠️  Gas estimation failed: ${error}`);
            // Use sensible default
            txParams.gasLimit = 300_000n;
          }
        }

        if (txOptions?.gasPrice) {
          txParams.gasPrice = txOptions.gasPrice;
        }

        if (txOptions?.value) {
          txParams.value = txOptions.value;
        }

        const tx: ContractTransactionResponse | null = await this.contract[functionName](
          ...args,
          txParams
        );

        if (!tx) {
          throw new Error('Transaction failed - no response');
        }

        this.log(`✅ Tx sent: ${tx.hash}`);

        const receipt = await tx.wait(1);

        if (!receipt) {
          throw new ContractError(
            `Transaction failed or was not mined: ${tx.hash}`,
            'TRANSACTION_FAILED'
          );
        }

        if (receipt.status === 0) {
          throw new ContractError(
            `Transaction reverted: ${tx.hash}`,
            'REVERTED',
            { blockNumber: receipt.blockNumber }
          );
        }

        this.log(`✅ Confirmed at block ${receipt.blockNumber}`);

        return {
          hash: tx.hash,
          from: receipt.from,
          to: receipt.to,
          blockNumber: receipt.blockNumber,
          confirmations: receipt.confirmations || 1,
          gasUsed: receipt.gasUsed,
          gasPrice: receipt.gasPrice,
          status: 'confirmed',
        };
      },
      `Failed to call ${functionName}`,
      { functionName, args, chainId: this.chainId }
    );
  }

  /**
   * Execute a contract read function (call)
   */
  async read<T = unknown>(
    functionName: string,
    args: unknown[] = []
  ): Promise<CallResult<T>> {
    return withErrorHandling(
      async () => {
        this.log(`📖 Read: ${functionName}(${args.join(', ')})`);

        if (!this.contract[functionName]) {
          throw new Error(`Function ${functionName} not found on contract`);
        }

        const data = await this.contract[functionName](...args);

        const block = await this.contract.runner?.provider?.getBlock('latest');

        return {
          success: true,
          data: data as T,
          blockNumber: block?.number || 0,
          timestamp: block?.timestamp || Date.now(),
        };
      },
      `Failed to read ${functionName}`,
      { functionName, args, chainId: this.chainId }
    );
  }

  /**
   * Get current contract state variable
   */
  async getState<T = unknown>(variableName: string): Promise<T | undefined> {
    const result = await this.read<T>(variableName);
    return result.data;
  }

  /**
   * Estimate gas for a function call
   */
  async estimateGas(
    functionName: string,
    args: unknown[] = []
  ): Promise<bigint> {
    return withErrorHandling(
      async () => {
        this.log(`⛽ Estimate gas: ${functionName}`);

        if (!this.contract[functionName]) {
          throw new Error(`Function ${functionName} not found on contract`);
        }

        try {
          const estimated = await this.contract[functionName].estimateGas(...args);
          this.log(`⛽ Estimated gas: ${estimated.toString()}`);
          return estimated;
        } catch (error) {
          // If estimation fails, return a reasonable default
          this.log(`⚠️  Gas estimation failed, using default`);
          return 300_000n;
        }
      },
      `Failed to estimate gas for ${functionName}`,
      { functionName, args }
    );
  }

  /**
   * Wait for a specific event
   */
  async waitForEvent(
    eventName: string,
    filter?: Record<string, unknown>,
    timeout = 60000
  ): Promise<unknown[]> {
    return withErrorHandling(
      async () => {
        this.log(`⏳ Waiting for event: ${eventName}`);

        return new Promise((resolve, reject) => {
          const timeoutId = setTimeout(() => {
            this.contract.removeAllListeners(eventName);
            reject(new Error(`Event ${eventName} not emitted within ${timeout}ms`));
          }, timeout);

          const listener = (...args: unknown[]) => {
            clearTimeout(timeoutId);
            this.contract.removeListener(eventName, listener);
            this.log(`✅ Event emitted: ${eventName}`);
            resolve(args);
          };

          this.contract.on(eventName, listener);
        });
      },
      `Failed to wait for event ${eventName}`
    );
  }

  /**
   * Get past events
   */
  async getPastEvents(
    eventName: string,
    fromBlock = 'latest',
    toBlock = 'latest'
  ): Promise<unknown[]> {
    return withErrorHandling(
      async () => {
        this.log(`📜 Get past events: ${eventName}`);

        const filter = this.contract.filters[eventName]?.();
        if (!filter) {
          throw new Error(`Event ${eventName} not found on contract`);
        }

        const events = await this.contract.queryFilter(filter, fromBlock, toBlock);
        this.log(`📜 Found ${events.length} ${eventName} events`);

        return events;
      },
      `Failed to get past events for ${eventName}`
    );
  }

  /**
   * Internal logging
   */
  private log(message: string): void {
    if (this.options.logCalls) {
      console.log(`[${new Date().toISOString()}] ${message}`);
    }
  }
}

// ============ Contract Factory ============

/**
 * Create a contract wrapper instance
 */
export function createContractWrapper(
  address: string,
  abi: unknown[],
  provider: ethers.Provider | ethers.Signer,
  options?: { logCalls?: boolean; timeout?: number }
): ContractWrapper {
  const contract = new Contract(address, abi, provider);

  // Get chain ID
  let chainId = 0;
  if (provider instanceof ethers.JsonRpcProvider) {
    // Synchronous for known chains
    chainId = provider._network?.chainId || 1;
  }

  return new ContractWrapper(contract, chainId, options);
}

/**
 * Batch multiple contract calls
 */
export async function batchContractCalls<T>(
  calls: Array<() => Promise<T>>
): Promise<Array<T | Error>> {
  return Promise.all(
    calls.map((call) =>
      call().catch((error) => error)
    )
  );
}

/**
 * Check if address is a contract
 */
export async function isContract(
  address: string,
  provider: ethers.Provider
): Promise<boolean> {
  return withErrorHandling(
    async () => {
      const code = await provider.getCode(address);
      return code !== '0x';
    },
    `Failed to check if address is contract: ${address}`
  );
}
