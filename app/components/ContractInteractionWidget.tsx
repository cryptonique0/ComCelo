'use client';

import { useState } from 'react';

interface ContractInteractionProps {
  contractName: string;
  functionName: string;
  args?: string[];
}

export default function ContractInteraction({ 
  contractName, 
  functionName, 
  args = [] 
}: ContractInteractionProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleCall = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/contract-interact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractName,
          functionName,
          args,
        }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Call failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-lg border border-cyan-500/30 bg-slate-900/40">
      <div className="text-sm font-mono text-cyan-300 mb-3">
        {contractName}.{functionName}()
      </div>
      <button
        onClick={handleCall}
        disabled={loading}
        className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 rounded text-white text-xs font-semibold"
      >
        {loading ? 'Calling...' : 'Execute'}
      </button>
      {result && <pre className="mt-2 text-xs text-emerald-400">{result}</pre>}
      {error && <div className="mt-2 text-xs text-red-400">{error}</div>}
    </div>
  );
}
