"use client";

import { useEffect, useState } from 'react';
import TutorialModal from './components/TutorialModal';

const characters = [
  {
    name: 'Valor Prime',
    title: 'Frontline Vanguard',
    role: 'Tank',
    rarity: 'Legendary',
    emoji: '🛡️',
    attack: 88,
    defense: 96,
    speed: 62,
    ability: 'Bulwark Overdrive',
    element: 'Plasma',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
  },
  {
    name: 'Nyx Arclight',
    title: 'Void Sniper',
    role: 'DPS',
    rarity: 'Mythic',
    emoji: '🏹',
    attack: 98,
    defense: 62,
    speed: 90,
    ability: 'Umbra Barrage',
    element: 'Shadow',
    gradient: 'from-fuchsia-500 via-purple-500 to-indigo-600',
  },
  {
    name: 'Riven Pulse',
    title: 'Chrono Skirmisher',
    role: 'Assassin',
    rarity: 'Epic',
    emoji: '⚡',
    attack: 92,
    defense: 58,
    speed: 99,
    ability: 'Phase Step',
    element: 'Lightning',
    gradient: 'from-amber-400 via-orange-500 to-pink-500',
  },
  {
    name: 'Aurora Synth',
    title: 'Quantum Support',
    role: 'Support',
    rarity: 'Epic',
    emoji: '✨',
    attack: 74,
    defense: 70,
    speed: 84,
    ability: 'Prismatic Heal',
    element: 'Radiant',
    gradient: 'from-emerald-400 via-cyan-400 to-blue-500',
  },
];

const gameModes = [
  {
    name: 'Ranked Arena',
    desc: 'Seasonal ladders with promotion thresholds and elo resets.',
    icon: '🏆',
  },
  {
    name: 'Gauntlet',
    desc: 'Endless waves with escalating modifiers and double rewards.',
    icon: '🔥',
  },
  {
    name: 'Co-op Raids',
    desc: 'Team with allies to defeat giant bosses and split loot.',
    icon: '🤝',
  },
  {
    name: 'Frames Mode',
    desc: 'Play straight inside Farcaster feeds—no install needed.',
    icon: '🎯',
  },
];

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [featured, setFeatured] = useState(0);
  const [tutorialOpen, setTutorialOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallax = (intensity: number) => ({
    transform: `translate3d(${(mousePosition.x - window.innerWidth / 2) * intensity}px, ${(mousePosition.y - window.innerHeight / 2) * intensity}px, 0)`
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Layered neon background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
            ...parallax(0.02)
          }}
        />
        <div className="absolute -left-32 top-10 w-[36rem] h-[36rem] bg-cyan-500/15 blur-3xl rounded-full animate-float" />
        <div className="absolute -right-20 bottom-0 w-[40rem] h-[40rem] bg-indigo-500/15 blur-3xl rounded-full animate-float" style={{ animationDelay: '0.8s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(129,140,248,0.08),transparent_30%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 space-y-24">
        {/* HERO */}
        <header className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center pt-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/40 bg-white/5 backdrop-blur-lg shadow-lg shadow-cyan-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-sm font-semibold text-cyan-200">LIVE ON BASE MAINNET · GASLESS ENABLED</span>
            </div>

            <div className="space-y-3">
              <p className="uppercase tracking-[0.3em] text-xs text-cyan-300">Tactical on-chain arena</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_10px_50px_rgba(94,234,212,0.15)]">
                Command elite squads.
                <br className="hidden md:block" />
                Dominate the grid.
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
                Draft heroes, time your ultimates, and outplay rivals on a living battlefield. Every move is verified on Base mainnet with relayer-sponsored gas.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="group relative overflow-hidden px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 font-semibold text-lg shadow-xl shadow-cyan-500/30 hover:scale-[1.02] transition-transform">
                <span className="relative z-10 flex items-center gap-2">⚔️ Enter Arena</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => setTutorialOpen(true)}
                className="px-7 py-4 rounded-2xl border border-cyan-400/50 text-cyan-100 font-semibold hover:bg-cyan-500/10 transition"
              >
                🎮 Watch Tutorial
              </button>
              <button className="px-7 py-4 rounded-2xl bg-slate-800/60 border border-slate-700 text-slate-200 font-semibold hover:border-cyan-400/50 hover:bg-slate-800 transition">
                🧭 Roadmap
              </button>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              {[
                { label: 'Players Online', value: '2,184', gradient: 'linear-gradient(135deg, rgba(52,211,153,0.35), rgba(6,182,212,0.25))' },
                { label: 'Battles Resolved', value: '54,902', gradient: 'linear-gradient(135deg, rgba(56,189,248,0.35), rgba(79,70,229,0.25))' },
                { label: 'Gas Saved', value: '38.5 ETH', gradient: 'linear-gradient(135deg, rgba(168,85,247,0.35), rgba(236,72,153,0.25))' },
              ].map((stat) => (
                <div key={stat.label} className="relative overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/70 backdrop-blur">
                  <div className="absolute inset-0 opacity-60" style={{ backgroundImage: `linear-gradient(120deg, transparent, rgba(148,163,184,0.12))` }} />
                  <div className="absolute inset-0" style={{ backgroundImage: stat.gradient }} />
                  <div className="relative p-4">
                    <p className="text-slate-400 text-xs uppercase tracking-[0.2em]">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-slate-900/70 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
              <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.08),transparent_35%)]" />
              <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_70%_10%,rgba(129,140,248,0.12),transparent_30%)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5 pointer-events-none" />

              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold border border-emerald-400/30">Live Match</span>
                    <span className="text-slate-300 text-sm">Grid 3x3 · Best of 3</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="flex items-center gap-1">⛓️ Verified</span>
                    <span className="flex items-center gap-1">🚀 Gasless</span>
                    <span className="flex items-center gap-1">🛡️ Anti-cheat</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/60">
                    <p className="text-slate-400 text-xs uppercase">Commander</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold">0x7E5F...Bdf</p>
                        <p className="text-emerald-300 text-sm">Aggro tempo</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold">Ready</span>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
                      <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800">⚡ Ult 87%</div>
                      <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800">🛡️ Shield 32</div>
                      <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800">🏹 Range 3</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/60">
                    <p className="text-slate-400 text-xs uppercase">Opponent</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold">0xA71c...3e9</p>
                        <p className="text-indigo-300 text-sm">Control sustain</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-100 text-xs font-semibold">Locking in</span>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
                      <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800">💥 Burst 72</div>
                      <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800">🧠 CC 2.2s</div>
                      <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800">🌀 Tempo 14</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[0,1,2,3,4,5,6,7,8].map((cell) => (
                    <div key={cell} className="relative aspect-square rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(135deg, rgba(56,189,248,0.4), transparent)' }} />
                      {cell === 1 && (
                        <div className="flex flex-col items-center justify-center h-full text-cyan-100 animate-float">
                          <div className="text-4xl mb-1">🛡️</div>
                          <p className="text-xs font-semibold">Valor</p>
                          <span className="text-[10px] text-emerald-300">Guard stance</span>
                        </div>
                      )}
                      {cell === 7 && (
                        <div className="flex flex-col items-center justify-center h-full text-fuchsia-100 animate-float" style={{ animationDelay: '0.3s' }}>
                          <div className="text-4xl mb-1">🏹</div>
                          <p className="text-xs font-semibold">Nyx</p>
                          <span className="text-[10px] text-pink-300">Charged</span>
                        </div>
                      )}
                      {cell === 4 && (
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 via-transparent to-purple-500/30 blur-3xl animate-pulse-soft" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-100 border border-cyan-400/30">⛓️ Base mainnet</span>
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-100 border border-emerald-400/30">🚀 MetaTx Relay</span>
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/15 text-purple-100 border border-purple-400/30">🎁 Cross-chain rewards</span>
                  </div>
                  <button className="text-cyan-200 hover:text-white">View on Basescan →</button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* CHARACTER ROSTER */}
        <section className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Playables</p>
              <h2 className="text-3xl md:text-4xl font-black">Build your squad</h2>
              <p className="text-slate-400 max-w-2xl">Swap heroes mid-set, combine ultimates, and trigger effects based on element resonance.</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700">4/24 unlocked</span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700">Legendary drop rate 2.5%</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {characters.map((c, idx) => (
              <div
                key={c.name}
                onMouseEnter={() => setFeatured(idx)}
                className={`group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/40 ${featured === idx ? 'shadow-2xl shadow-cyan-500/20' : ''}`}
              >
                <div className={`absolute inset-0 opacity-60 blur-3xl bg-gradient-to-br ${c.gradient}`} />
                <div className="relative z-10 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-300">{c.role}</p>
                      <h3 className="text-xl font-black text-white">{c.name}</h3>
                      <p className="text-sm text-slate-400">{c.title}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-2xl">
                      {c.emoji}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className="px-3 py-1 rounded-full bg-black/30 border border-white/10 text-slate-100">{c.rarity}</span>
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white">{c.element}</span>
                  </div>

                  <div className="space-y-2 text-sm">
                    {[{label:'Attack',value:c.attack,color:'bg-amber-400'},{label:'Defense',value:c.defense,color:'bg-cyan-400'},{label:'Speed',value:c.speed,color:'bg-fuchsia-400'}].map(stat => (
                      <div key={stat.label} className="flex items-center gap-2">
                        <span className="w-20 text-slate-300">{stat.label}</span>
                        <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div className={`${stat.color} h-full`} style={{ width: `${stat.value}%` }} />
                        </div>
                        <span className="w-10 text-right text-slate-200 font-semibold">{stat.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-300">Ultimate</p>
                      <p className="font-semibold">{c.ability}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-100 text-xs border border-emerald-400/40">Ready</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GAME MODES & LOOPS */}
        <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl space-y-4 shadow-2xl shadow-indigo-500/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-indigo-300">Game Loops</p>
                <h3 className="text-2xl font-black">Modes for every playstyle</h3>
              </div>
              <span className="text-sm text-slate-400">All modes are gasless</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {gameModes.map((mode) => (
                <div key={mode.name} className="p-4 rounded-2xl border border-slate-800 bg-slate-950/70 hover:border-cyan-500/30 transition group">
                  <div className="flex items-center gap-2 text-lg font-bold">
                    <span className="text-2xl">{mode.icon}</span>
                    {mode.name}
                  </div>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">{mode.desc}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-cyan-200 opacity-0 group-hover:opacity-100 transition">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Queue now
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/60 via-slate-900 to-slate-950 backdrop-blur-xl p-6 shadow-2xl shadow-emerald-500/10">
            <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.15),transparent_40%)]" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 text-emerald-200">
                <span className="text-xl">🚀</span>
                <p className="text-sm uppercase tracking-[0.25em]">Gasless engine</p>
              </div>
              <h3 className="text-2xl font-black">Meta-transaction relayer online</h3>
              <p className="text-slate-200 leading-relaxed text-sm">
                Sponsored transactions via `ComCeloMetaTxRelay` with daily safeguards and relayer rewards. Execute combos, marketplace trades, and raids without touching ETH.
              </p>

              <div className="grid sm:grid-cols-3 gap-3 text-sm">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs text-slate-300">Daily Gas Pool</p>
                  <p className="text-lg font-bold text-white">5.0 ETH</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs text-slate-300">Latency</p>
                  <p className="text-lg font-bold text-white">~450 ms</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs text-slate-300">Rewards</p>
                  <p className="text-lg font-bold text-white">10% shared</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-emerald-200">
                <span className="px-3 py-1 rounded-full border border-emerald-400/40 bg-emerald-500/10">Auto-nonces</span>
                <span className="px-3 py-1 rounded-full border border-emerald-400/40 bg-emerald-500/10">Replay protection</span>
                <span className="px-3 py-1 rounded-full border border-emerald-400/40 bg-emerald-500/10">Batch combos</span>
              </div>
            </div>
          </div>
        </section>

        {/* CINEMATIC CALL TO ACTION */}
        <section className="relative overflow-hidden rounded-3xl border border-purple-500/25 bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 p-6 sm:p-8 shadow-2xl shadow-purple-500/10">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_50%,rgba(168,85,247,0.3),transparent_40%)]" />
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_80%_50%,rgba(14,165,233,0.25),transparent_35%)]" />
          <div className="relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-center">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-purple-200">Season Zero · Base</p>
              <h3 className="text-3xl md:text-4xl font-black leading-tight">Launch your squad. Earn cosmetics, fragments, and leaderboard glory.</h3>
              <p className="text-slate-200 max-w-2xl text-sm md:text-base">
                Mint cosmetics, climb ranked, and unlock legendary skins with on-chain proof. All actions are signed once and relayed for free.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-purple-500 font-semibold text-white shadow-lg shadow-fuchsia-500/25 hover:scale-[1.02] transition">Open Shop</button>
                <button className="px-6 py-3 rounded-2xl border border-white/20 text-white hover:border-white/40 transition">View Cosmetics</button>
              </div>
            </div>

            <div className="relative h-full">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10" />
                <div className="relative grid grid-cols-2 gap-3 text-sm text-white">
                  {[0,1,2,3].map((slot) => (
                    <div key={slot} className="aspect-[4/3] rounded-2xl border border-white/10 bg-slate-900/70 p-3 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span>Skin #{slot + 1}</span>
                        <span className="px-2 py-1 rounded-full bg-white/10 text-[10px]">Seasonal</span>
                      </div>
                      <div className="flex items-center justify-center text-4xl">{characters[slot]?.emoji}</div>
                      <div className="text-xs text-slate-200">Rarity: {characters[slot]?.rarity}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <TutorialModal isOpen={tutorialOpen} onClose={() => setTutorialOpen(false)} />
    </main>
  );
}
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {[
                { value: '6', label: 'Smart Contracts', icon: '📜', gradient: 'linear-gradient(135deg, #22d3ee, #67e8f9)' },
                { value: '160', label: 'Tests Passing', icon: '✅', gradient: 'linear-gradient(135deg, #22c55e, #4ade80)' },
                { value: '10+', label: 'API Endpoints', icon: '🔌', gradient: 'linear-gradient(135deg, #a855f7, #c084fc)' },
                { value: '32', label: 'Git Commits', icon: '💾', gradient: 'linear-gradient(135deg, #f97316, #fb923c)' },
                { value: '100%', label: 'Uptime', icon: '⚡', gradient: 'linear-gradient(135deg, #eab308, #facc15)' }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="group relative p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 transition-all hover:scale-105 cursor-pointer"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div
                    className="text-4xl font-black mb-1 bg-clip-text text-transparent"
                    style={{ backgroundImage: stat.gradient }}
                  >
                    {stat.value}
                  </div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Hub */}
        <section id="docs" className="py-12 px-2 sm:px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              📚 GAME CODEX
            </h2>
            <p className="text-slate-400 text-lg">Everything you need to master ComCelo</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '📘', title: 'README', desc: 'Setup & quick start', link: 'README.md', gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)' },
              { icon: '📗', title: 'Contracts', desc: 'ABI & function specs', link: 'CONTRACTS.md', gradient: 'linear-gradient(135deg, #22c55e, #4ade80)' },
              { icon: '📙', title: 'Frames', desc: 'Farcaster integration', link: 'FRAMES.md', gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
              { icon: '🧪', title: 'Testing', desc: 'Manual scenarios', link: 'TESTING.md', gradient: 'linear-gradient(135deg, #a855f7, #c084fc)' },
              { icon: '📕', title: 'Deployment', desc: 'Deploy to mainnet', link: 'DEPLOYMENT.md', gradient: 'linear-gradient(135deg, #ef4444, #f87171)' },
              { icon: '🏆', title: 'Contest', desc: 'Feature overview', link: 'CONTEST_SUMMARY.md', gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)' }
            ].map((doc, i) => (
              <a
                key={i}
                href={`https://github.com/cryptonique0/ComCelo/blob/main/${doc.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-6 rounded-2xl border border-slate-700/50 bg-slate-900/50 hover:bg-slate-800/50 transition-all hover:scale-105 hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity"
                  style={{ backgroundImage: doc.gradient }}
                ></div>
                
                <div className="relative z-10">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{doc.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{doc.title}</h3>
                  <p className="text-slate-400 text-sm">{doc.desc}</p>
                  <div className="mt-4 inline-flex items-center text-cyan-400 text-sm font-semibold group-hover:gap-2 transition-all">
                    Read more <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Epic CTA Section */}
        <section className="relative text-center py-20 px-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-sm overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
                ENTER THE ARENA
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Deploy your forces. Command your units. <span className="text-cyan-400 font-bold">Dominate the battlefield.</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
              <a
                href="https://github.com/cryptonique0/ComCelo"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-5 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-2xl font-black text-xl overflow-hidden transition-all hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span>⚔️ DEPLOY NOW</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
              
              <a
                href="https://github.com/cryptonique0/ComCelo#quick-start"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 border-2 border-cyan-400/50 rounded-2xl font-black text-xl hover:bg-cyan-400/10 transition-all hover:border-cyan-300 backdrop-blur-sm"
              >
                <span className="flex items-center gap-3 bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                  📖 QUICK START
                </span>
              </a>
            </div>
            
            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-3 justify-center pt-8">
              {['Hardhat', 'Next.js 14', 'TypeScript', 'Tailwind', 'OpenZeppelin', 'Base Chain'].map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-sm font-semibold text-slate-300 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-slate-800/50 text-center space-y-4">
          <div className="flex items-center justify-center gap-6 mb-6">
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-2xl">🐙</a>
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-2xl">🐦</a>
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-2xl">💬</a>
          </div>
          <p className="text-slate-500 text-sm">
            Deployed on <span className="text-cyan-400 font-semibold">Base Mainnet</span> • Playable on <span className="text-indigo-400 font-semibold">Farcaster Frames</span>
          </p>
          <p className="text-slate-600 text-xs">
            Made with ⚡ for the Celo & Farcaster ecosystem
          </p>
        </footer>
      </div>

      <TutorialModal isOpen={tutorialOpen} onClose={() => setTutorialOpen(false)} />
    </main>
  );
}
