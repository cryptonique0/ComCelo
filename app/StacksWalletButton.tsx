'use client';

import { useStacksWallet } from './providers';

export default function StacksWalletButton() {
  const { address, connect, disconnect, isConnected } = useStacksWallet();

  return (
    <div className="flex items-center gap-2">
      {isConnected && address ? (
        <>
          <span className="text-sm text-gray-600">
            Stacks: {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <button
            onClick={disconnect}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Disconnect
          </button>
        </>
      ) : (
        <button
          onClick={connect}
          className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Connect Stacks Wallet
        </button>
      )}
    </div>
  );
}
