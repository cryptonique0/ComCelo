'use client';

import { useState, useEffect } from 'react';

interface Challenge {
  id: string;
  username: string;
  avatar: string;
  rank: string;
  winRate: string;
  type: 'incoming' | 'outgoing';
  status?: 'pending' | 'waiting';
}

export default function MatchmakingQueue() {
  const [elapsedTime, setElapsedTime] = useState(42);
  const [isSearching, setIsSearching] = useState(true);

  const incomingChallenges: Challenge[] = [
    {
      id: '1',
      username: '@dwr.eth',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWXLyDz1ijJ0h2l_6cPFQt7-0T6stwOqzras7Olx32gIilkx-1UttTUO8boexbIKgA8gGKocUlOzl0UrZ_wN6IuRZxTlUIeNbptDerg2kwULErn0UGwEHWCSDn_pAsDbxYzBB16T5YYopOAtr_OeAXDXXUC3ktu5wWAHZmYk2z1D-EQF2UzFYiT1E7m5nKia8l1KefAvOTfbLl3t4aQK6veMiexDoKpdl6PYA_SbmxD1_F67QTy5JzXy7OW1gLHzNf-lbK-miyEps',
      rank: 'Diamond III',
      winRate: '58%',
      type: 'incoming'
    },
    {
      id: '2',
      username: 'CryptoKnight',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd4GhnidTrJPXgIdO6zunP1Yn6fkOJJsFtNhWnV4ys-8dBGJIEqEVZsGZGFnTV-rCZZG1feeg2c5KxqpK74Eodz-6bW5v5Gc4MlSlS2tHxz5UKFpTJP1QpedLm_joeQ644x-4uLeSXcpuR0HW3PPoLxLWa0vL6jNshpBFjX-Vx77lalmmCfQ1-Swsdmk8BlX6sEU7WdNgnptIaPeLnJnNioidRv1nc3Q9EcxNmQo8YQcb-GLHJniOqVf9gDuUnE3mP3Vyf1V7JsA0',
      rank: 'Platinum I',
      winRate: '52%',
      type: 'incoming'
    }
  ];

  const outgoingChallenges: Challenge[] = [
    {
      id: '3',
      username: 'Vitalik_Fan',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5LBqokVpFcG1oLI8hV6VTLS8I28WAIWtZ8DokRC1CbmWSU9t4LQK3-M3eb03AzQqq9YUY5VhuRr8zYTbIH_KE7c4qBoIN5y5j_IKpd6dPefP3D-5ThZl6KSixwBb0JZ1oeY4z5HA1mdftB4aHENYLT89e-R3Gs8n6DvlmSC8aYnJWQzWiVcIfM0lNttTHzqb1khHcI7wQXVLO6lPGMysXu6qq_ud1r8gL7d3A5imwPRJHi77y-WbklI_byEB06KkxaxdAJTJ9qr0',
      rank: '',
      winRate: '',
      type: 'outgoing',
      status: 'waiting'
    }
  ];

  useEffect(() => {
    if (!isSearching) return;
    
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isSearching]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <style jsx>{`
        .radar-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>

      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-20 h-full border-r border-[#283930] bg-[#111814] items-center py-4 z-30">
          <div className="mb-8">
            <span className="material-symbols-outlined text-primary text-3xl">token</span>
          </div>
          <nav className="flex flex-col gap-4 w-full px-2">
            <a className="flex justify-center p-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="/dashboard" title="Dashboard">
              <span className="material-symbols-outlined">dashboard</span>
            </a>
            <a className="flex justify-center p-3 rounded-lg bg-[#283930] text-primary border-l-2 border-primary transition-all" href="#" title="Matchmaking">
              <span className="material-symbols-outlined">swords</span>
            </a>
            <a className="flex justify-center p-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="#" title="Leaderboard">
              <span className="material-symbols-outlined">trophy</span>
            </a>
            <a className="flex justify-center p-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="#" title="Settings">
              <span className="material-symbols-outlined">settings</span>
            </a>
          </nav>
          <div className="mt-auto">
            <div className="w-10 h-10 rounded-full bg-cover bg-center border border-primary/30" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJ-Yoolg08dNz1d32h5NxbOzuOLv7srIViZD45dHZVkyQFeeUp8YrdPVR0SXl7f3nUO5H2fKkEC8XJpNKWgIBBkJskutZ8lqddTo0C4UtTYLluV7znuXIIpkYXNYGPYyfxkYaDSB0Lg4bsKGZErtYBl5dwJI6gIMSgv6V144xAspezRj3ZumHP5vKQ0LE_RnxaEcxuccQblPCK00q93_CrqlFWrTWPxfksh4V2muexMHm-PR0YXpXM9HrNJagEqBl5z4zIi7VXbXY')"}}></div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#102219]">
          {/* Header */}
          <header className="flex items-center justify-between border-b border-[#283930] bg-[#111814]/95 backdrop-blur-md px-6 py-3 z-20">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cover bg-center border border-primary" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJ-Yoolg08dNz1d32h5NxbOzuOLv7srIViZD45dHZVkyQFeeUp8YrdPVR0SXl7f3nUO5H2fKkEC8XJpNKWgIBBkJskutZ8lqddTo0C4UtTYLluV7znuXIIpkYXNYGPYyfxkYaDSB0Lg4bsKGZErtYBl5dwJI6gIMSgv6V144xAspezRj3ZumHP5vKQ0LE_RnxaEcxuccQblPCK00q93_CrqlFWrTWPxfksh4V2muexMHm-PR0YXpXM9HrNJagEqBl5z4zIi7VXbXY')"}}></div>
                <div>
                  <h2 className="text-white text-sm font-bold">Commander (You)</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-primary font-mono bg-primary/10 px-1.5 rounded border border-primary/20">ONLINE</span>
                    <span className="text-[10px] text-[#9db9ab] font-mono">Rank: Diamond II</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-2 px-4 py-1.5 bg-[#1c2721] rounded-full border border-[#283930] shadow-lg">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span className="text-xs font-bold text-[#9db9ab] uppercase tracking-widest">Matchmaking Lobby</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#1c2721] border border-[#283930] hover:border-primary/30 transition-colors">
                <span className="material-symbols-outlined text-[#9db9ab] text-sm">wallet</span>
                <span className="text-xs text-white font-mono">0x12...4B8a</span>
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 relative flex flex-col items-center p-6 overflow-y-auto" style={{backgroundImage: "radial-gradient(circle at center, rgba(19, 236, 128, 0.03) 0%, rgba(16, 34, 25, 1) 70%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDn-ZxeDXKm6HnDfoeBuo9S9SQhwYy37xkFgupRXm4hbGOXi50srRv05tey_B05i4gnIYvnrvJ3c1a0SdBKEeVgiXombEEDsrxiyDEefWgJtZMMsYunepYfNG96p4EMasV9vttJz-EaPZjHzj5znr0tHfWzE0Oce4CCGlJQDRNeY_ch-fw58L5xtiAgdyD-T4BXLYxVPNoO5Tmkr5JuXEIjw5xmc_6Jdik1jI3m1ySHhti1jvuwRKaWZsXdk_skQXeprKhWW3O8tsI')", backgroundSize: 'cover'}}>
            
            {/* Radar Scanner */}
            <div className="flex flex-col items-center justify-center w-full max-w-lg mt-8 mb-12 relative z-10">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <div className="absolute inset-0 rounded-full border border-[#283930]"></div>
                <div className="absolute inset-8 rounded-full border border-[#283930]/50 border-dashed"></div>
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 radar-ping"></div>
                <div className="absolute inset-10 rounded-full border border-primary/30 radar-ping" style={{animationDelay: '0.5s'}}></div>
                
                <div className="w-20 h-20 bg-[#111814] rounded-full flex items-center justify-center border-2 border-primary shadow-[0_0_30px_rgba(19,236,128,0.2)] z-10 relative">
                  <span className="material-symbols-outlined text-4xl text-primary animate-pulse">radar</span>
                  <div className="absolute -bottom-1 -right-1 bg-[#111814] rounded-full p-1 border border-[#283930]">
                    <span className="material-symbols-outlined text-sm text-secondary">public</span>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-tight">Searching for Opponent...</h1>
              <p className="text-[#9db9ab] text-sm mb-6">Scanning global network for matched MMR</p>

              <div className="bg-[#1c2721]/90 backdrop-blur border border-[#283930] px-6 py-3 rounded-lg shadow-xl flex items-center gap-4 mb-8">
                <div className="text-center px-4 border-r border-[#283930]">
                  <div className="text-[10px] text-[#9db9ab] uppercase tracking-widest font-bold">Elapsed</div>
                  <div className="text-xl font-mono text-white tabular-nums">{formatTime(elapsedTime)}</div>
                </div>
                <div className="text-center px-4">
                  <div className="text-[10px] text-[#9db9ab] uppercase tracking-widest font-bold">Region</div>
                  <div className="text-xl font-display text-primary">Global</div>
                </div>
              </div>

              <button 
                onClick={() => setIsSearching(false)}
                className="group px-8 py-3 rounded bg-[#1c2721] border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:text-red-300 transition-all uppercase text-xs font-bold tracking-widest flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg group-hover:rotate-90 transition-transform">close</span>
                Cancel Matchmaking
              </button>
            </div>

            {/* Challenges Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl">
              {/* Incoming Challenges */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2 px-1">
                  <h3 className="text-[#9db9ab] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Incoming Challenges ({incomingChallenges.length})
                  </h3>
                </div>

                {incomingChallenges.map((challenge) => (
                  <div key={challenge.id} className="bg-[#111814]/80 backdrop-blur border border-[#283930] rounded-xl p-4 hover:border-secondary/30 transition-colors group">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-cover bg-center border border-[#283930] relative" style={{backgroundImage: `url('${challenge.avatar}')`}}>
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border border-[#111814]"></div>
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm">{challenge.username}</div>
                          <div className="text-[10px] text-[#9db9ab] font-mono">Rank: {challenge.rank} • Win Rate {challenge.winRate}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="h-9 w-9 rounded flex items-center justify-center border border-[#283930] text-gray-400 hover:bg-red-500/10 hover:border-red-500 hover:text-red-400 transition-colors" title="Decline">
                          <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                        <button className="h-9 px-4 rounded bg-primary/10 border border-primary/50 text-primary hover:bg-primary hover:text-[#111814] transition-all text-xs font-bold uppercase tracking-wide flex items-center gap-1" title="Accept">
                          <span className="material-symbols-outlined text-sm">check</span>
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Outgoing Challenges */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2 px-1">
                  <h3 className="text-[#9db9ab] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Pending Outgoing ({outgoingChallenges.length})
                  </h3>
                  <button className="text-[10px] text-primary hover:text-white uppercase tracking-wider font-bold">+ New Invite</button>
                </div>

                {outgoingChallenges.map((challenge) => (
                  <div key={challenge.id} className="bg-[#1c2721]/50 border border-dashed border-[#283930] rounded-xl p-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                      <span className="material-symbols-outlined text-6xl">hourglass_empty</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 relative z-10">
                      <div className="flex items-center gap-3 opacity-75">
                        <div className="w-12 h-12 rounded bg-cover bg-center border border-[#283930] grayscale" style={{backgroundImage: `url('${challenge.avatar}')`}}></div>
                        <div>
                          <div className="text-white font-bold text-sm">{challenge.username}</div>
                          <div className="text-[10px] text-yellow-500 font-mono flex items-center gap-1">
                            <span className="material-symbols-outlined text-[10px] animate-spin">progress_activity</span>
                            Waiting for response...
                          </div>
                        </div>
                      </div>
                      <div>
                        <button className="text-[10px] text-[#9db9ab] hover:text-white uppercase tracking-wider font-bold border-b border-transparent hover:border-white transition-all pb-0.5">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="h-20 border-2 border-dashed border-[#283930] rounded-xl flex items-center justify-center text-[#283930] hover:border-[#3e5246] hover:text-[#3e5246] transition-colors cursor-pointer">
                  <div className="flex flex-col items-center">
                    <span className="material-symbols-outlined text-2xl mb-1">person_add</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Invite Friend</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 right-6 hidden md:block opacity-50 pointer-events-none">
              <span className="text-[10px] text-[#283930] font-mono">SERVER: CELO-MAINNET-04</span>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
