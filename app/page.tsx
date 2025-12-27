"use client";

import ModernLanding from './components/ModernLanding';

export default function Home() {
  return <ModernLanding />;
}

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
  const [showSplash, setShowSplash] = useState(true);
  const [turnTime, setTurnTime] = useState(28);
  const [cooldowns, setCooldowns] = useState<number[]>([3, 1, 0]);
  const [onchainStatus, setOnchainStatus] = useState<'idle' | 'pending' | 'confirmed'>('idle');
  const [logs, setLogs] = useState<string[]>([
    '🛡️ Valor casts Bulwark (+24 shield)',
    '🏹 Nyx crits Riven (💥 132 dmg)',
    '✨ Aurora heals party (+48)',
    '⚡ Riven dashes (AP -2)',
  ]);
  const [signatureState, setSignatureState] = useState<'idle' | 'prompt' | 'signed'>('idle');
  const [lastTxHash, setLastTxHash] = useState<string | null>(null);
  const [lastBlock, setLastBlock] = useState<bigint | null>(null);
  const [trackInput, setTrackInput] = useState('');

  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balance } = useBalance({ address });
  const { waitForReceipt } = useMetaTxRelay();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTurnTime((t) => (t > 0 ? t - 1 : 30));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCooldowns((cd) => cd.map((c) => (c > 0 ? c - 1 : 0)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 3200);
    return () => clearTimeout(t);
  }, []);

  const networkLabel = useMemo(() => {
    if (!chainId) return 'Base Mainnet';
    // 8453 is Base mainnet, 84532 is Base testnet
    if (chainId === 8453) return 'Base Mainnet';
    if (chainId === 84532) return 'Base Sepolia';
    return `Chain ${chainId}`;
  }, [chainId]);

  const walletLabel = useMemo(() => {
    if (!address) return 'Not connected';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  const trackTxHash = async (hash: string) => {
    try {
      setOnchainStatus('pending');
      setLogs((l) => [`⛓️ Tracking ${hash.slice(0, 10)}…`, ...l].slice(0, 8));
      const receipt = await waitForReceipt(hash as `0x${string}`);
      setOnchainStatus('confirmed');
      setLastTxHash(hash);
      setLastBlock(receipt.blockNumber);
      setLogs((l) => [`✅ Confirmed in block ${receipt.blockNumber}`, ...l].slice(0, 8));
      setTimeout(() => setOnchainStatus('idle'), 2000);
    } catch (err: unknown) {
      setOnchainStatus('idle');
      setLogs((l) => [`❌ ${(err instanceof Error ? err.message : 'Receipt error')}`, ...l].slice(0, 8));
    }
  };

  const triggerOnchain = async () => {
    const txHash = trackInput.trim();
    if (!txHash || !txHash.startsWith('0x')) {
      setLogs((l) => ['❌ Enter a valid tx hash starting with 0x', ...l].slice(0, 8));
      return;
    }
    await trackTxHash(txHash);
  };

  const castAbility = (slot: number, label: string) => {
    setCooldowns((cd) => cd.map((c, i) => (i === slot ? 5 : c)));
    setLogs((l) => [`🎯 ${label} cast (cd 5s)`, ...l].slice(0, 8));
  };

  const requestSignature = () => {
    setSignatureState('prompt');
    setTimeout(() => setSignatureState('signed'), 1200);
    setTimeout(() => setSignatureState('idle'), 2600);
  };

  const parallax = (intensity: number) => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const h = typeof window !== 'undefined' ? window.innerHeight : 900;
    return {
      transform: `translate3d(${(mousePosition.x - w / 2) * intensity}px, ${(mousePosition.y - h / 2) * intensity}px, 0)`
    };
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {showSplash && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-xl animate-splash-fade">
          <div className="relative flex flex-col items-center gap-4 text-center px-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-3xl shadow-2xl shadow-cyan-500/30 animate-pulse-soft">⚔️</div>
            <p className="uppercase tracking-[0.35em] text-xs text-cyan-200">ComCelo</p>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">Tactical On-Chain Arena</h1>
            <p className="text-sm text-slate-300">Logo glow → emblem assemble → ready up</p>
          </div>
        </div>
      )}

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
              <span className="text-sm font-semibold text-cyan-200">LIVE ON BASE + STACKS · GASLESS ENABLED</span>
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

            {/* Wallet Connection Section */}
            <div className="flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-slate-900/70 border border-slate-700/70">
              <div className="flex-1 min-w-[200px]">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Connect Wallets</p>
                <div className="flex flex-wrap gap-3">
                  <StacksWalletButton />
                </div>
              </div>
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

        {/* HUD SHOWCASE */}
        <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Core HUD</p>
                <h3 className="text-2xl font-black">Battle heads-up display</h3>
                <p className="text-slate-400 text-sm">Designed for small screens with thick outlines and bold shapes (chibi-friendly).</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-100">Readable @ mobile</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {/* Health / Energy */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs text-slate-400 flex items-center gap-2">❤️ Health & ⚡ Energy</p>
                <div className="mt-2 space-y-2">
                  <div className="h-3 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                    <div className="h-full bg-gradient-to-r from-rose-400 to-orange-400 w-4/5 animate-hud-fill" />
                  </div>
                  <div className="h-3 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-2/3 animate-hud-fill" style={{ animationDelay: '0.1s' }} />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Floating damage numbers appear here</p>
              </div>

              {/* Wallet + Network */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs text-slate-400 flex items-center gap-2">👛 Wallet & ⛓ Network</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-lg">🪪</div>
                  <div>
                    <p className="text-white font-semibold text-sm">{walletLabel}</p>
                    <p className="text-emerald-300 text-xs">{isConnected ? `Connected · ${networkLabel}` : 'Not connected'}</p>
                    <p className="text-slate-400 text-[11px]">{balance ? `${(Number(balance.value) / 10 ** balance.decimals).toFixed(4)} ${balance.symbol}` : isConnected ? 'Fetching balance...' : '—'}</p>
                  </div>
                  <button
                    onClick={requestSignature}
                    className={`ml-auto px-3 py-1 rounded-full border text-xs transition ${
                      signatureState === 'prompt'
                        ? 'bg-amber-500/20 border-amber-400/40 text-amber-100'
                        : signatureState === 'signed'
                          ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-100'
                          : 'bg-indigo-500/20 border-indigo-400/40 text-indigo-100'
                    }`}
                  >
                    {signatureState === 'prompt' && 'Awaiting signature'}
                    {signatureState === 'signed' && 'Signature captured'}
                    {signatureState === 'idle' && 'Signature ready'}
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-2">On-chain confirmation + cooldown ring</p>
              </div>

              {/* Action buttons */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs text-slate-400 flex items-center gap-2">🧩 Abilities & Cooldowns</p>
                <div className="mt-3 flex gap-3">
                  {[{icon:'🌀',label:'Warp'},{icon:'💥',label:'Burst'},{icon:'🛡️',label:'Guard'}].map((btn, idx) => (
                    <button
                      key={btn.label}
                      onClick={() => castAbility(idx, btn.label)}
                      className="relative w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-lg text-white overflow-hidden focus:outline-none"
                      disabled={cooldowns[idx] > 0}
                      title={cooldowns[idx] > 0 ? `Cooldown ${cooldowns[idx]}s` : 'Ready'}
                    >
                      {cooldowns[idx] > 0 && <div className="absolute inset-0 hud-cooldown" />}
                      <span className="text-xl">{btn.icon}</span>
                      <span className="text-[11px] font-semibold">{btn.label}</span>
                      {cooldowns[idx] > 0 && <span className="absolute bottom-1 text-[11px] text-amber-300">{cooldowns[idx]}s</span>}
                    </button>
                  ))}
                  <div className="flex flex-col justify-between text-xs text-slate-400">
                    <span className="px-2 py-1 rounded-full bg-slate-900 border border-slate-800">🎯 Selected: Valor</span>
                    <span className="px-2 py-1 rounded-full bg-slate-900 border border-slate-800">🔔 Buffs: Barrier, Haste</span>
                    <span className="px-2 py-1 rounded-full bg-slate-900 border border-slate-800">🚫 Debuff: Silence (4s)</span>
                  </div>
                </div>
              </div>

              {/* Log / Timer / Mini-map */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>📜 Action Log</span>
                  <span className="px-2 py-1 rounded-full bg-rose-500/20 text-rose-100 border border-rose-400/30">Turn 6 · {turnTime}s</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300 max-h-24 overflow-hidden">
                  {logs.map((log, i) => (
                    <p key={i}>{log}</p>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <div className="w-16 h-16 rounded-xl border border-slate-800 bg-slate-900/60 grid grid-cols-3 gap-[2px] p-1 text-[10px] text-center">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="rounded bg-slate-800/80 flex items-center justify-center text-slate-400">{i === 4 ? 'X' : ''}</div>
                    ))}
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <div className="px-2 py-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <span>🪙 Credits</span>
                      <span className="font-semibold text-amber-200">1,240</span>
                    </div>
                    <div className="px-2 py-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <span>🧾 On-chain</span>
                      <span className={`font-semibold ${onchainStatus === 'pending' ? 'text-amber-200' : onchainStatus === 'confirmed' ? 'text-emerald-200' : 'text-slate-200'}`}>
                        {onchainStatus === 'pending' ? 'Pending...' : onchainStatus === 'confirmed' ? 'Confirmed' : 'Idle'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <input
                      value={trackInput}
                      onChange={(e) => setTrackInput(e.target.value)}
                      placeholder="0x... (tx hash to track)"
                      className="flex-1 rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-[12px] focus:border-cyan-400/60 focus:outline-none"
                    />
                    <button onClick={triggerOnchain} className="px-3 py-2 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-100 hover:bg-emerald-500/25 transition">
                      Track tx
                    </button>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {lastTxHash && (
                      <a href={`https://basescan.org/tx/${lastTxHash}`} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-400/40 text-cyan-200">
                        View tx {lastTxHash.slice(0, 8)}…
                      </a>
                    )}
                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">{lastBlock ? `Block ${lastBlock.toString()}` : 'Latency ~450ms'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ART STYLE MENU */}
          <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-fuchsia-500/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-300">Visual Themes</p>
                <h3 className="text-2xl font-black">Pick a style</h3>
                <p className="text-slate-400 text-sm">Optimized for social feeds and fast loads.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-100 text-xs">Swap-ready</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              {[ 
                'Chibi / Super-Deformed',
                'Flat Vector (mobile-friendly)',
                'Outline + Fill (Cartoon Inked)',
                'Hand-Painted Fantasy',
                'Cel-Shaded Anime',
                'Afro-Futurism / Regional'
              ].map(style => (
                <div key={style} className="rounded-2xl border border-slate-800 bg-slate-950/60 px-3 py-3 flex items-center gap-2 hover:border-cyan-400/40 transition">
                  <span className="text-lg">🎨</span>
                  <div>
                    <p className="text-white font-semibold leading-tight">{style}</p>
                    <p className="text-[11px] text-slate-400">Bold colors, small-screen readable</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-200 space-y-2">
              <p className="text-xs uppercase tracking-[0.25em] text-indigo-300">Splash intro (3-5s)</p>
              <p>Logo glow-in, emblem particle assemble, or map zoom → title. Minimal, fast, memorable.</p>
              <div className="flex gap-3 text-xs text-slate-300 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">Logo fade + glow</span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">Map zoom to arena</span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">Sigil assemble</span>
              </div>
            </div>
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
