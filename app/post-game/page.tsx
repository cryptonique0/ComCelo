export default function PostGamePage() {
  const combatStats = [
    { label: 'Total Damage Dealt', you: '12,450', opponent: '8,200', youWidth: '60%', oppWidth: '39%' },
    { label: 'Units Lost', you: '2', opponent: '5', youWidth: '28%', oppWidth: '71%' },
    { label: 'Resources Gathered', you: '450 Gold', opponent: '320 Gold', youWidth: '58%', oppWidth: '41%' },
    { label: 'Turns Taken', you: '18', opponent: '18', youWidth: '50%', oppWidth: '50%' },
  ];

  const unitReports = [
    {
      name: 'Sniper Bot',
      tag: 'MVP',
      role: 'Ranged • Support',
      icon: 'precision_manufacturing',
      kills: '4 Units',
      damage: '6,200',
      accent: true,
    },
    {
      name: 'Heavy Tank',
      role: 'Melee • Defense',
      icon: 'local_shipping',
      kills: '1',
      damage: '2,150',
      accent: false,
    },
    {
      name: 'Scout Drone',
      role: 'Destroyed Turn 4',
      icon: 'flight',
      kills: '—',
      damage: '120 intel',
      accent: false,
      destroyed: true,
    },
  ];

  return (
    <main className="bg-[#102219] min-h-screen flex flex-col text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#283930] bg-[#102219]/95 backdrop-blur-sm px-4 lg:px-10 py-3">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="flex items-center gap-4 text-white">
            <div className="size-8 text-primary">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] hidden sm:block">ComCelo</h2>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <nav className="hidden md:flex items-center gap-6">
              <a className="text-white/70 text-sm font-medium hover:text-white transition-colors" href="/tournaments">Tournaments</a>
              <a className="text-white/70 text-sm font-medium hover:text-white transition-colors" href="/leaderboard">Leaderboard</a>
              <a className="text-white text-sm font-bold hover:text-primary transition-colors flex items-center gap-1" href="/match-history">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                History
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 h-9 px-4 rounded-lg bg-[#182c23] border border-[#13ec80]/30 text-white text-sm font-bold hover:bg-[#1f362b] transition-all">
                <span className="material-symbols-outlined text-primary text-[18px]">account_balance_wallet</span>
                <span className="truncate hidden sm:inline">0x71...3A92</span>
              </button>
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full size-9 border border-[#283930] cursor-pointer"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-LTdPSv5pZqeaiglt4ZywFbTyRHOOHo6Q-ur0xcbTiDSE3iShJgDtI4a0630_wg9e7Iep9A8vmfG8CpjtScy2N-V580ao6ZGgei-7R_L-0Hz1TuRVQ7cu7KW85OYqyXetMwWwK5Qlzh1MDbvHBveD10Sjd75hg_WFKthL-vhlfWkPe_iFzhvQdxDWqNcRjMAzmJshuQfH0zipd88Q14_Gahx8HY7mhRw_XivfDUDdMnTicPlQQw3jaWVn4PW2uV48NRPqCXVz78Q')" }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-grow flex flex-col items-center w-full px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#283930_1px,transparent_1px),linear-gradient(to_bottom,#283930_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
        <div className="w-full max-w-6xl flex flex-col gap-8 relative z-10">
          <div className="flex items-center gap-2 text-white/40 text-sm font-medium">
            <a className="hover:text-primary flex items-center gap-1 transition-colors" href="/match-history">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to Lobby
            </a>
            <span>/</span>
            <span className="text-white/70">Match #88291</span>
          </div>

          {/* Hero */}
          <section className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-6xl md:text-8xl font-black text-primary uppercase tracking-tighter drop-shadow-[0_0_25px_rgba(19,236,128,0.3)] leading-none mb-2">Victory</h1>
              <div className="flex items-center gap-3 text-[#3b5447] font-mono text-sm uppercase tracking-widest border-t border-b border-[#3b5447]/40 py-1 px-4">
                <span className="material-symbols-outlined text-primary text-sm">trophy</span>
                Ranked Match • Sector 7 • 14m 22s
              </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-6 rounded-xl bg-[#182c23]/80 backdrop-blur-sm border border-[#13ec80]/50 shadow-[0_0_15px_rgba(19,236,128,0.1)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-primary/10" />
                <div className="relative">
                  <div className="size-20 rounded-full border-2 border-primary p-1">
                    <div className="w-full h-full rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-LTdPSv5pZqeaiglt4ZywFbTyRHOOHo6Q-ur0xcbTiDSE3iShJgDtI4a0630_wg9e7Iep9A8vmfG8CpjtScy2N-V580ao6ZGgei-7R_L-0Hz1TuRVQ7cu7KW85OYqyXetMwWwK5Qlzh1MDbvHBveD10Sjd75hg_WFKthL-vhlfWkPe_iFzhvQdxDWqNcRjMAzmJshuQfH0zipd88Q14_Gahx8HY7mhRw_XivfDUDdMnTicPlQQw3jaWVn4PW2uV48NRPqCXVz78Q')" }} />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-[#0d1a13] text-xs font-bold px-2 py-0.5 rounded shadow-lg">WINNER</div>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-white">You</h3>
                  <p className="text-white/50 text-sm font-mono mb-2">Grandmaster League</p>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold text-sm">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span>
                    +25 MMR
                  </div>
                  <div className="mt-2 text-xs text-white/40 flex items-center justify-center md:justify-start gap-1">
                    <span className="material-symbols-outlined text-[14px] text-yellow-500">monetization_on</span>
                    +10 CELO
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-2">
                <span className="text-4xl font-black text-white/10 italic">VS</span>
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-4 p-6 rounded-xl bg-[#182c23]/40 backdrop-blur-sm border border-[#283930] relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                <div className="relative">
                  <div className="size-20 rounded-full border-2 border-white/10 p-1">
                    <div className="w-full h-full rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBi8xdg9pFCscgWFVN-0xF4QcuqXO0UUAKzQfDWGgMw2900nOA-KhFi5unZ7UPsz6rqUoaZxeTJyefUtUKXfM7IVFl6nU5_oEpe3QD0C1xb8B3MEsEf5gNREJdANGPmsq7nLJKB40EuFz89i5ka3btNoxllG5bmUKn6MWRduUacBfffpjxhlwX14Y5HmZL1znwdUZSCFle8XHkPQnahn2ObbZ1PksLdVCgkvIvrJj7_HmaCBQT8_0qT-TxhjYKf8E17Z5JduYhn5xw')" }} />
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <h3 className="text-xl font-bold text-white/80">@CipherOne</h3>
                  <p className="text-white/40 text-sm font-mono mb-2">Diamond League</p>
                  <div className="flex items-center justify-center md:justify-end gap-2 text-red-400 font-bold text-sm">
                    <span className="material-symbols-outlined text-[16px]">trending_down</span>
                    -18 MMR
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 w-full pt-2">
              <button className="h-12 px-8 rounded-lg bg-primary hover:bg-white text-[#0d1a13] font-bold text-base transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(19,236,128,0.2)] hover:shadow-[0_0_30px_rgba(19,236,128,0.4)] hover:-translate-y-0.5">
                <span className="material-symbols-outlined">play_circle</span>
                Watch Replay
              </button>
              <button className="h-12 px-6 rounded-lg bg-[#182c23] border border-[#283930] hover:border-primary/50 text-white font-bold text-sm transition-all flex items-center gap-2 hover:bg-[#1e352a]">
                <span className="material-symbols-outlined text-white/70">share</span>
                Share Result
              </button>
              <button className="h-12 px-6 rounded-lg bg-[#182c23] border border-[#283930] hover:border-red-400/50 text-white font-bold text-sm transition-all flex items-center gap-2 hover:bg-[#1e352a] group">
                <span className="material-symbols-outlined text-white/70 group-hover:text-red-400 transition-colors">swords</span>
                Rematch
              </button>
            </div>
          </section>

          {/* Analysis + Units */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
            <section className="lg:col-span-2 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-[#283930] pb-4">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                  Combat Analysis
                </h3>
                <div className="flex gap-2">
                  <span className="size-3 rounded-full bg-primary" title="You" />
                  <span className="size-3 rounded-full bg-white/30" title="Opponent" />
                </div>
              </div>

              <div className="bg-[#182c23] rounded-xl border border-[#283930] p-6 flex flex-col gap-6">
                {combatStats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-primary">{stat.you}</span>
                      <span className="text-white/50 uppercase text-xs tracking-wider font-medium mt-0.5">{stat.label}</span>
                      <span className="text-white/70">{stat.opponent}</span>
                    </div>
                    <div className="flex h-2 rounded-full overflow-hidden bg-[#102219]">
                      <div className="h-full bg-primary" style={{ width: stat.youWidth }} />
                      <div className="w-1 bg-[#102219] h-full" />
                      <div className="h-full bg-white/20" style={{ width: stat.oppWidth }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative w-full h-64 rounded-xl overflow-hidden border border-[#283930] hover:border-primary transition-colors cursor-pointer bg-[#102219]">
                <div className="absolute inset-0 bg-cover bg-center opacity-60 hover:opacity-40 transition-opacity" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAF1NeME75TRpiVSkF1Woq3ihc9emhlRtJim94MjkoVeUY8VbndjF9HMkyKfRxaHoCKkKuGq9oPCDQ_VZ4Z55sQCruEUYQapGXUxDFke5eQXnss54H3UT-EvVaKo1hLyZzZRGDkz9Vp3677f29fB3tAJ8SVv7u-uoAFiuDeIl-U7zf_pAKXG2Y-XZ512jmrcmYOYvFVAJhO5N9rk2lKCRVvDBolhhJw-lSvwIxFqmNlg2rS9TuJL9WM6Xiy1VXx_7Qfmo-hdvvusec')" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102219] via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-16 rounded-full bg-primary/90 text-[#0d1a13] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-4xl">play_arrow</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-end">
                  <div>
                    <h4 className="text-white font-bold text-lg">Watch Full Replay</h4>
                    <p className="text-white/60 text-sm">Review tactical decisions turn-by-turn</p>
                  </div>
                  <div className="text-xs font-mono bg-black/50 px-2 py-1 rounded text-white/80 border border-white/10">ID: 88291-RC</div>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-[#283930] pb-4">
                <h3 className="text-white font-bold text-lg">Unit Report</h3>
                <button className="text-xs text-primary font-bold hover:underline">View All</button>
              </div>
              <div className="flex flex-col gap-3">
                {unitReports.map((unit) => (
                  <div
                    key={unit.name}
                    className={`${unit.accent ? 'bg-gradient-to-br from-primary/10 to-[#182c23]' : 'bg-[#182c23]'} rounded-xl p-4 border ${unit.accent ? 'border-primary/30' : 'border-[#283930]'} relative ${unit.destroyed ? 'opacity-80' : ''}`}
                  >
                    {unit.tag && (
                      <div className="absolute top-2 right-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">{unit.tag}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="size-10 rounded bg-[#102219] border border-[#283930] flex items-center justify-center relative">
                        <span className="material-symbols-outlined text-white text-xl">{unit.icon}</span>
                        {unit.destroyed && (
                          <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-[2px] border border-[#102219]">
                            <span className="material-symbols-outlined text-[10px] text-white block">close</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className={`text-white font-bold text-sm ${unit.destroyed ? 'line-through decoration-red-500' : ''}`}>{unit.name}</h4>
                        <p className={`${unit.destroyed ? 'text-red-400' : 'text-white/50'} text-xs`}>{unit.role}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-[#0f1d17]/60 rounded p-2 border border-white/5 flex flex-col">
                        <span className="text-white/50 mb-0.5">Kills</span>
                        <span className={`font-bold ${unit.accent ? 'text-white' : 'text-white'}`}>{unit.kills}</span>
                      </div>
                      <div className="bg-[#0f1d17]/60 rounded p-2 border border-white/5 flex flex-col">
                        <span className="text-white/50 mb-0.5">Damage</span>
                        <span className={`${unit.accent ? 'text-primary' : 'text-white'} font-bold text-sm`}>{unit.damage}</span>
                      </div>
                    </div>
                    {unit.destroyed && (
                      <p className="text-xs text-white/50 italic mt-2">Gathered 120 intel before destruction.</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <footer className="mt-auto border-t border-[#283930] py-8 bg-[#102219]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/40 text-sm">© 2024 ComCelo. Built on Celo.</div>
          <div className="flex gap-6">
            <a className="text-white/40 hover:text-primary transition-colors text-sm font-medium" href="#">Discord</a>
            <a className="text-white/40 hover:text-primary transition-colors text-sm font-medium" href="#">Farcaster</a>
            <a className="text-white/40 hover:text-primary transition-colors text-sm font-medium" href="#">Docs</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
