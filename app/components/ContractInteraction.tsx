'use client';

import { useState } from 'react';
import { CONTRACTS } from '@/lib/contracts';

interface ContractInteractionProps {
  contractName: string;
  functionName: string;
  args?: unknown[];
}

export default function ContractInteraction({ contractName, functionName, args = [] }: ContractInteractionProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCall = async () => {
    setLoading(true);
    setError(null);
    try {
      // Call the auto-interaction script
      const response = await fetch('/api/contract-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractName,
          functionName,
          args,
        }),
      });

      if (!response.ok) throw new Error('Contract call failed');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-lg border border-slate-700 bg-slate-900/50">
      <h3 className="font-semibold text-cyan-300 mb-3">{contractName}.{functionName}()</h3>
      
      {args.length > 0 && (
        <div className="mb-3 text-sm text-slate-400">
          <p>Args: {JSON.stringify(args)}</p>
        </div>
      )}

      <button
        onClick={handleCall}
        disabled={loading}
        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-700 rounded text-white text-sm font-semibold transition"
      >
        {loading ? 'Calling...' : `Call ${functionName}`}
      </button>

      {result && (
        <div className="mt-3 p-2 bg-slate-800 rounded text-sm text-emerald-400">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div className="mt-3 p-2 bg-red-900/30 rounded text-sm text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}
