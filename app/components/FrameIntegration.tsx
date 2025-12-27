'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useRouter } from 'next/navigation';

export default function FrameIntegration() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const [status, setStatus] = useState<string | null>(null);
  const [opponent, setOpponent] = useState<string>('');

  const callAction = async (path: string, body?: Record<string, unknown>) => {
    try {
      setStatus(null);
      const res = await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, address }),
      });
      const json = await res.json();

      if (!json?.ok) {
        setStatus(`error: ${json?.error ?? res.status}`);
        return;
      }

      // If action is 'join' or 'create', trigger contract write
      if ((json.action === 'join' || json.action === 'create') && json.contractAddress && address) {
        setStatus('preparing transaction…');
        try {
          writeContract({
            address: json.contractAddress,
            abi: json.abi,
            functionName: json.functionName,
            args: json.args,
          });
          const gameIdDisplay = json.action === 'create' ? 'creating…' : `gameId=${json.args?.[0]?.toString() ?? 'n/a'}`;
          setStatus(`tx sent • ${gameIdDisplay}`);
        } catch (e: any) {
          setStatus(`tx error: ${e?.message ?? 'unknown'}`);
        }
      } else if (json.action === 'spectate' && json.redirect) {
        setStatus(`spectating gameId=${json.gameId}…`);
        setTimeout(() => router.push(json.redirect), 500);
      } else {
        setStatus(`${json.action} • ${JSON.stringify(json)}`);
      }
    } catch (e) {
      setStatus('network error');
    }
  };

  return (
    <div className="bg-background-dark text-white min-h-screen">
      {/* TopNavBar */}
      <header className="sticky top-0 z-50 w-full border-b border-[#282e39] bg-background-dark/80 backdrop-blur-md">
        <div className="px-4 md:px-10 py-3 flex items-center justify-between mx-auto max-w-7xl">
          <div className="flex items-center gap-4">
            <div className="size-8 flex items-center justify-center rounded bg-[#135bec] text-white">
              <span className="material-symbols-outlined">strategy</span>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">ComCelo</h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium hover:text-[#135bec] transition-colors" href="#">Game Guide</a>
            <a className="text-sm font-medium hover:text-[#135bec] transition-colors" href="#">Leaderboard</a>
            <a className="text-sm font-bold text-[#135bec]" href="#">Frame Integration</a>
            <a className="text-sm font-medium hover:text-[#135bec] transition-colors" href="#">Marketplace</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-[#135bec] text-white text-sm font-bold shadow-lg shadow-[#135bec]/20 hover:bg-[#135bec]/90 transition-all">
              <span className="truncate">Connect Wallet</span>
            </button>
            <button className="sm:hidden text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#135bec]/20 rounded-full blur-[100px]"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 bg-purple-600/10 rounded-full blur-[80px]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-1 flex flex-col gap-6 md:gap-8 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#135bec]/10 border border-[#135bec]/20 w-fit mx-auto md:mx-0">
              <span className="material-symbols-outlined text-[#135bec] text-sm">rocket_launch</span>
              <span className="text-xs font-bold text-[#135bec] uppercase tracking-wider">Live on Farcaster</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight">
              Strategy in Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#135bec] to-purple-400">Stream</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Experience ComCelo's 1v1 tactical battles without ever leaving Farcaster. Deploy units, command turns, and claim victory directly from your social feed using next-gen Frames.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button onClick={() => callAction('/api/frame/connect')} disabled={!isConnected} className="flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-[#135bec] text-white font-bold text-base shadow-lg shadow-[#135bec]/25 hover:bg-[#135bec]/90 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="material-symbols-outlined">login</span>
                <span>{isConnected ? 'Connect Farcaster' : 'Connect Wallet First'}</span>
              </button>
              <button className="flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-[#1c1f27] border border-[#282e39] text-white font-bold text-base hover:bg-[#282e39] transition-all">
                <span className="material-symbols-outlined">play_circle</span>
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Device Mockup */}
          <div className="flex-1 w-full max-w-[500px] md:max-w-none relative">
            <div className="relative rounded-[2rem] border-[8px] border-[#2a2f3a] bg-slate-900 shadow-2xl overflow-hidden aspect-[9/16] max-h-[600px] mx-auto">
              <div className="h-6 w-full bg-slate-900 flex justify-between items-center px-4 pt-1">
                <div className="text-[10px] text-white font-medium">9:41</div>
                <div className="flex gap-1 text-white">
                  <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
                  <span className="material-symbols-outlined text-[14px]">wifi</span>
                  <span className="material-symbols-outlined text-[14px]">battery_full</span>
                </div>
              </div>
              <div className="bg-[#111] h-full p-4 flex flex-col gap-4 overflow-hidden">
                <div className="flex gap-3">
                  <div className="size-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm">ComCelo Official <span className="text-slate-400 font-normal">@comcelo</span></span>
                    <span className="text-slate-400 text-xs">2m</span>
                  </div>
                </div>
                <p className="text-white text-sm">The arena is open! Challenge me to a quick match. Winner takes the loot. ⚔️ #ComCelo #Farcaster</p>
                <div className="border border-slate-700 rounded-lg overflow-hidden bg-slate-800 flex flex-col">
                  <div className="aspect-video w-full bg-slate-900 relative" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1642388691925-50e50f38b002?q=80&w=1000&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                        <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Lobby Open</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-800 border-t border-slate-700">
                    <h3 className="text-white font-bold mb-1">Ranked Match: Forest Arena</h3>
                    <p className="text-slate-400 text-xs mb-3">Entry: 0.01 ETH • Reward: 0.02 ETH</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => callAction('/api/frame/join', { gameId: 1 })} disabled={!isConnected || isPending || isConfirming} className="bg-white text-black font-bold py-2 rounded text-sm hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        {isPending || isConfirming ? 'Joining…' : 'Join Battle'}
                      </button>
                      <button onClick={() => callAction('/api/frame/spectate', { gameId: 1 })} className="bg-slate-700 text-white font-bold py-2 rounded text-sm hover:bg-slate-600 transition-colors">Spectate</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Action status */}
      {(status || isPending || isConfirming || isSuccess) && (
        <div className="px-4">
          <div className={`max-w-7xl mx-auto mb-6 p-3 rounded-lg border ${isPending || isConfirming ? 'border-[#135bec]/40 bg-[#135bec]/10 animate-pulse' : isSuccess ? 'border-green-500/40 bg-green-500/10' : 'border-[#283930] bg-[#1c1f27]'}`}>
            <div className="flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-[#135bec] text-[18px]">
                {isSuccess ? 'check_circle' : isPending || isConfirming ? 'pending' : 'info'}
              </span>
              <span className="font-mono">
                {isPending && 'wallet confirmation pending…'}
                {isConfirming && 'transaction confirming…'}
                {isSuccess && `✓ confirmed • ${hash?.slice(0, 10)}…`}
                {!isPending && !isConfirming && !isSuccess && status}
              </span>
            </div>
            {error && <p className="text-red-400 text-xs mt-1 font-mono">{error.message}</p>}
          </div>
        </div>
      )}

      {/* Create Challenge Section */}
      <section className="py-12 px-4 bg-[#151a24] border-y border-[#282e39]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Cast a Challenge</h2>
              <p className="text-slate-400">Create a new game and invite an opponent by their wallet address.</p>
            </div>
            <div className="bg-[#1c1f27] rounded-xl border border-[#282e39] p-6 md:p-8">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-bold text-white mb-2 block">Opponent Address</label>
                  <input
                    type="text"
                    value={opponent}
                    onChange={(e) => setOpponent(e.target.value)}
                    placeholder="0x..."
                    className="w-full h-12 px-4 bg-[#101622] border border-[#282e39] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#135bec] font-mono text-sm"
                  />
                </div>
                <button
                  onClick={() => callAction('/api/frame/create', { opponent, ranked: true, maxTurns: 50, stake: '0' })}
                  disabled={!isConnected || !opponent || isPending || isConfirming}
                  className="w-full flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-[#135bec] text-white font-bold text-base shadow-lg shadow-[#135bec]/25 hover:bg-[#135bec]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">add_circle</span>
                  <span>{isPending || isConfirming ? 'Creating Game…' : isConnected ? 'Create Game' : 'Connect Wallet First'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-4 bg-[#151a24]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Play via Frames</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">A frictionless path from scrolling to strategy. We've removed the barriers so you can focus on the win.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'campaign', title: 'Cast a Challenge', desc: 'Create a lobby directly from our dashboard or within Warpcast. Configure entry fees and map selection, then cast it to your followers.' },
              { icon: 'swords', title: 'Instant Matchmaking', desc: 'Friends or followers can join the battle instantly with one click. Wallet authentication happens seamlessly in the background.' },
              { icon: 'trophy', title: 'Command & Conquer', desc: 'Execute tactical moves on the Base blockchain, turn by turn, right in the feed. When the dust settles, claim your rewards.' },
            ].map((s, i) => (
              <div key={i} className="bg-[#1c1f27] p-8 rounded-xl border border-[#282e39] shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-slate-500 select-none">{String(i + 1).padStart(2, '0')}</div>
                <div className="size-12 rounded-lg bg-[#135bec]/20 text-[#135bec] flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined" style={{ fontSize: 28 }}>{s.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#135bec] transition-colors">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-4 border-y border-[#282e39]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold">Frame Gallery Simulator</h2>
              <p className="mt-2 text-slate-400">Preview the different states of the gameplay loop.</p>
            </div>
            <div className="flex gap-2">
              <button className="size-10 rounded-full border border-[#282e39] flex items-center justify-center hover:bg-[#1c1f27] transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="size-10 rounded-full border border-[#282e39] flex items-center justify-center hover:bg-[#1c1f27] transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="flex overflow-x-auto gap-6 pb-8 -mx-4 px-4 scrollbar-hide snap-x">
            {[
              { state: 'State 1: Lobby', badge: 'bg-[#135bec]', title: 'The Challenge', desc: 'The initial frame users see. It displays the map type, entry fee, and current players waiting.' },
              { state: 'State 2: Tactics', badge: 'bg-purple-600', title: 'Tactical Map', desc: 'The core gameplay view. Users select a unit and a target tile. The frame image updates dynamically based on the move.' },
              { state: 'State 3: Results', badge: 'bg-yellow-600', title: 'Victory Summary', desc: 'Post-game stats, ELO updates, and reward claiming. Provides an instant "Rematch" option to keep the loop going.' },
            ].map((card, idx) => (
              <div key={idx} className="min-w-[300px] md:min-w-[340px] bg-[#1c1f27] rounded-xl border border-[#282e39] overflow-hidden snap-center flex flex-col">
                <div className="aspect-[1.91/1] bg-slate-900 relative group overflow-hidden" style={{ backgroundImage: `url(https://lh3.googleusercontent.com/aida-public/AB6AXuCDqdnGAnD4J5iiClfrZ4BJggOsrDig8qOFbykelQLuDgpipEJcmeN_Gpemfi-qp8zjD7di31FSPlzLUs3rzrUSCUT5UqU0qxQ-SMBApOux6H3ioBEK5ShhTIi5e72bSyF_-z1g7Ym_ayY_qfCNFQYjobw4W3bq3HQMtGTnosul-9ayKbxaKxGa4JovVOlfPjK_RAYkHyJ2F7fkIlbe61BUE554fW-NQ7KuvKMxmkpHX8phS0q6KsVlOqFA7u-JVGOtZzNOaTn19tw)`, backgroundSize: 'cover' }}>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                  <div className={`absolute bottom-3 left-3 ${card.badge} text-white text-[10px] font-bold px-2 py-1 rounded uppercase`}>{card.state}</div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h4 className="text-lg font-bold mb-2">{card.title}</h4>
                  <p className="text-sm text-slate-400 mb-4 flex-1">{card.desc}</p>
                  <div className="bg-[#101622] p-3 rounded-lg border border-[#282e39]">
                    <div className="text-xs font-mono text-slate-500 mb-2">Action Buttons:</div>
                    <div className="flex gap-2">
                      <div className="h-8 flex-1 bg-slate-700 rounded animate-pulse"></div>
                      <div className="h-8 flex-1 bg-slate-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-4 bg-[#151a24]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#135bec] rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <h3 className="text-3xl font-black text-white mb-4 z-10">Low Fees, High Speed</h3>
              <p className="text-white/80 text-lg mb-8 max-w-sm z-10">Built on Base for low transaction fees and fast finality. Your strategy shouldn't cost a fortune.</p>
              <div className="flex items-center gap-4 z-10">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">~$0.001</span>
                  <span className="text-xs text-white/60 uppercase tracking-wider font-bold">Avg Cost</span>
                </div>
                <div className="w-px h-10 bg-white/20"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">2s</span>
                  <span className="text-xs text-white/60 uppercase tracking-wider font-bold">Block Time</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { iconColor: 'text-purple-500', iconBg: 'bg-purple-500/10', title: 'Mobile First', desc: 'Designed natively for the Warpcast mobile experience.' },
                { iconColor: 'text-green-500', iconBg: 'bg-green-500/10', title: 'Secure Signer', desc: 'Safe interactions without exposing your private keys.' },
                { iconColor: 'text-orange-500', iconBg: 'bg-orange-500/10', title: 'On-Chain Reputation', desc: 'Wins are minted as soulbound tokens to your profile.' },
                { iconColor: 'text-blue-500', iconBg: 'bg-blue-500/10', title: 'Open Protocol', desc: 'Anyone can build a frontend for the ComCelo contracts.' },
              ].map((f, i) => (
                <div key={i} className="bg-[#1c1f27] border border-[#282e39] rounded-2xl p-6 flex flex-col gap-4">
                  <div className={`size-10 rounded-full ${f.iconBg} flex items-center justify-center ${f.iconColor}`}>
                    <span className="material-symbols-outlined">smartphone</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">{f.title}</h4>
                    <p className="text-sm text-slate-400 mt-1">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#135bec]/5 to-transparent pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Ready to Command?</h2>
          <p className="text-lg text-slate-300 mb-10">
            Join thousands of tacticians battling for supremacy on Base. Connect your wallet and cast your first challenge today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-[#135bec] text-white font-bold text-lg shadow-xl shadow-[#135bec]/30 hover:bg-[#135bec]/90 hover:-translate-y-1 transition-all">
              <span>Launch App</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
            <div className="text-sm text-slate-400">
              or <a className="underline hover:text-[#135bec] transition-colors" href="#">read the whitepaper</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
