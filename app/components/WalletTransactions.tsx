
'use client';

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

interface TxItem {
  date: string;
  time: string;
  type: 'payout' | 'purchase' | 'fee' | 'failed';
  label: string;
  hash: string;
  amount: string; // e.g. +0.05 ETH
  status: 'success' | 'pending' | 'failed';
}

export default function WalletTransactions() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, status } = useConnect();
  const { disconnect } = useDisconnect();

  const [filter, setFilter] = useState<'all' | 'payout' | 'purchase' | 'fee'>('all');

  const txs: TxItem[] = [
    { date: 'Dec 26, 2025', time: '14:32 UTC', type: 'payout', label: 'Prize Payout (Win)', hash: '0x3a1f...91f2e8', amount: '+0.05 ETH', status: 'success' },
    { date: 'Dec 26, 2025', time: '12:15 UTC', type: 'purchase', label: 'Unit Purchase (Scout)', hash: '0x8bc2...22c4af', amount: '-0.002 ETH', status: 'success' },
    { date: 'Dec 25, 2025', time: '09:45 UTC', type: 'fee', label: 'Tournament Entry Fee', hash: '0x1c95...55a9db', amount: '-0.01 ETH', status: 'pending' },
    { date: 'Dec 22, 2025', time: '18:00 UTC', type: 'failed', label: 'Failed Swap', hash: '0x9f33...11b274', amount: '0.00 ETH', status: 'failed' },
  ];

  const filtered = txs.filter((t) => (filter === 'all' ? true : t.type === filter));

  const copy = () => navigator.clipboard.writeText(address ?? '');

  return (
    <div className="bg-background-dark text-white min-h-screen flex flex-col">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 w-full border-b border-[#283930] bg-background-dark/95 backdrop-blur-md">
        <div className="px-4 md:px-10 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-8 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">token</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">ComCelo</h2>
          </div>
          <div className="hidden md:flex flex-1 justify-center gap-8">
            <a className="text-gray-400 hover:text-white text-sm font-medium" href="/dashboard">Dashboard</a>
            <a className="text-gray-400 hover:text-white text-sm font-medium" href="/game">Arena</a>
            <a className="text-gray-400 hover:text-white text-sm font-medium" href="/matchmaking">Hangar</a>
            <a className="text-primary text-sm font-bold border-b-2 border-primary pb-0.5" href="/wallet">Wallet</a>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex gap-2">
              <button className="flex size-10 items-center justify-center rounded-lg bg-[#1A2621] text-white hover:bg-[#283930]">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
              </button>
              <button className="flex size-10 items-center justify-center rounded-lg bg-[#1A2621] text-white hover:bg-[#283930]">
                <span className="material-symbols-outlined text-[20px]">settings</span>
              </button>
            </div>
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-primary/20"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAaSTxv0GFPHs9tyR8q7o0j8qhHFhsWlZdhJtBvjmekdpToLiCgfxzqwWC2Iam86MJkjuvMkspHWTzDd1duCkjzz7hyHrV0GZBzz3sj9m4iK1Z86uqW3vcX-DbQ0Jis4ndDfBe-1ID4oq4-koX_NLqDbpwe6z7EjtmmaB4LItNDcc-am29fPo0LxyxuJ8XNBpD5V6ckehOY3swD70nuA89zpfruqB21EPvbbHNHp50k8MGt4HGAkBqrW95xUFfL0xCiISoIWYTooAw')",
              }}
            />
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 flex justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col w-full max-w-5xl gap-8">
          {/* Heading */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black tracking-[-0.033em] uppercase">Command Center // Wallet</h1>
            <p className="text-[#9db9ab] text-lg">Manage your Celo assets, track match rewards, and audit your on-chain history.</p>
          </div>

          {/* Wallet Card */}
          <div className="rounded-xl border border-[#283930] bg-[#1A2621] overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
              {/* Identity */}
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="relative">
                  <div
                    className="bg-center bg-no-repeat bg-cover rounded-xl size-24 border border-[#283930]"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBiluyXfSi-AgpVZU-oc1CkYKuEoNGGZARC9R4BFVgUfRstgHhWhsi4I7jtXDBavkUR6O8RNUB5WkGqiF8GXPU89ukNLms0dvT0-fQMS8XvAfGolDCW8GthcR41Sdm4_bdzrgDMsEqr6rI1Xo7ZRhx8QbypQG7RPelk09IvNUfMefWHM_B3zrR_g29CN6E9qyi4zBEdX9QiqXgtWeMGnFxDCgcAUUseaHdA7r7gXyJ8ERH1pwXaixzshzWNrDP8nU5b2NNrk928550')",
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-background-dark p-1 rounded-full">
                    <span className="material-symbols-outlined text-primary text-xl" title="Connected via WalletConnect">
                      {connected ? 'check_circle' : 'cancel'}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold tracking-tight">{address ?? 'Not connected'}</h2>
                    <span className="px-2 py-0.5 rounded bg-[#855DCD]/20 text-[#bf9cf8] text-xs font-bold border border-[#855DCD]/40 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">verified</span> Farcaster
                    </span>
                  </div>
                  <p className="text-[#9db9ab] text-sm">{isConnected ? 'Connected to Base Mainnet' : 'Wallet not connected'}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`inline-flex size-2 rounded-full ${isConnected ? 'bg-primary animate-pulse' : 'bg-gray-500'}`}></span>
                    <span className={`text-sm font-medium ${isConnected ? 'text-primary' : 'text-gray-400'}`}>{isConnected ? 'Wallet Active' : 'Disconnected'}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <button onClick={copy} disabled={!address} className="group flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-[#283930] hover:bg-[#344a3e] text-white text-sm font-bold transition-all w-full sm:w-auto disabled:opacity-60">
                  <span className="material-symbols-outlined text-[18px] group-hover:text-primary">content_copy</span>
                  <span>Copy Address</span>
                </button>
                {isConnected ? (
                  <button onClick={() => disconnect()} className="group flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-primary hover:bg-[#0fd671] text-background-dark text-sm font-bold transition-all w-full sm:w-auto shadow-[0_0_15px_rgba(19,236,128,0.3)]">
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    <span>Disconnect</span>
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    {connectors.map((c) => (
                      <button key={c.id} onClick={() => connect({ connector: c })} className="group flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-primary hover:bg-[#0fd671] text-background-dark text-sm font-bold transition-all w-full sm:w-auto shadow-[0_0_15px_rgba(19,236,128,0.3)]">
                        <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                        <span>Connect {c.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="h-px w-full bg-[#283930]"></div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#283930] bg-[#151f1a]">
              <div className="p-6 flex flex-col gap-1 hover:bg-[#1A2621] transition-colors">
                <p className="text-[#9db9ab] text-xs font-bold uppercase tracking-wider">Total Earnings</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">0.85 ETH</p>
                  <span className="text-primary text-sm font-medium bg-primary/10 px-1.5 rounded">+12%</span>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-1 hover:bg-[#1A2621] transition-colors">
                <p className="text-[#9db9ab] text-xs font-bold uppercase tracking-wider">Matches Played</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">42</p>
                  <span className="text-primary text-sm font-medium bg-primary/10 px-1.5 rounded">+5%</span>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-1 hover:bg-[#1A2621] transition-colors">
                <p className="text-[#9db9ab] text-xs font-bold uppercase tracking-wider">Current Balance</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">0.23 ETH</p>
                  <span className="text-gray-500 text-sm font-medium">~$525.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions Heading */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
            <h3 className="text-2xl font-bold tracking-tight uppercase flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">history</span>
              Transaction Ledger
            </h3>
            <div className="flex p-1 bg-[#1A2621] rounded-lg border border-[#283930] overflow-x-auto max-w-full">
              {(['all','payout','purchase','fee'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 text-sm rounded whitespace-nowrap ${filter === f ? 'font-bold bg-[#283930] text-white' : 'font-medium text-[#9db9ab] hover:text-white hover:bg-white/5'}`}
                >
                  {f === 'all' ? 'All Events' : f[0].toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Transactions Table */}
          <div className="w-full overflow-hidden rounded-xl border border-[#283930] bg-[#1A2621]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#283930] bg-[#151f1a]">
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#9db9ab]">Date & Time</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#9db9ab]">Type</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#9db9ab]">Tx Hash</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#9db9ab] text-right">Amount</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#9db9ab] text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#283930] text-sm">
                  {filtered.map((t, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-bold">{t.date}</span>
                          <span className="text-[#9db9ab] text-xs">{t.time}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded ${t.type==='payout' ? 'bg-primary/10 text-primary' : t.type==='purchase' ? 'bg-blue-500/10 text-blue-400' : t.type==='fee' ? 'bg-orange-500/10 text-orange-400' : 'bg-red-500/10 text-red-400'}`}>
                            <span className="material-symbols-outlined text-[16px]">{t.type==='payout'?'trophy':t.type==='purchase'?'shopping_cart':t.type==='fee'?'local_activity':'sync_problem'}</span>
                          </div>
                          <span className="font-medium">{t.label}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <a className={`flex items-center gap-1 font-mono ${t.type==='payout' ? 'text-primary hover:text-[#5affaa]' : 'text-[#9db9ab] hover:text-white'} hover:underline`} href={`https://basescan.org/tx/${t.hash.replace('...', '')}`} target="_blank" rel="noopener noreferrer">
                          {t.hash}
                          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        </a>
                      </td>
                      <td className="p-4 text-right">
                        <span className={`${t.type==='payout' ? 'text-primary' : t.type==='failed' ? 'text-[#9db9ab]' : 'text-white'} font-bold text-lg`}>{t.amount}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold border ${t.status==='success' ? 'bg-primary/10 text-primary border-primary/20' : t.status==='pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                          {t.status.charAt(0).toUpperCase()+t.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-[#283930] bg-[#151f1a] flex justify-between items-center">
              <span className="text-xs text-[#9db9ab]">Showing {filtered.length} of {txs.length} transactions</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs font-bold rounded bg-[#283930] text-white hover:bg-[#344a3e] disabled:opacity-50">Prev</button>
                <button className="px-3 py-1 text-xs font-bold rounded bg-[#283930] text-white hover:bg-[#344a3e]">Next</button>
              </div>
            </div>
          </div>

          <div className="text-center pb-8">
            <p className="text-[#9db9ab] text-sm">
              Transactions may take a few moments to appear. View full history on
              <a className="text-primary hover:underline ml-1" href={address ? `https://basescan.org/address/${address}` : 'https://basescan.org/'} target="_blank" rel="noopener noreferrer">BaseScan</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
