'use client';

export default function NewsUpdates() {
  return (
    <div className="bg-background-dark min-h-screen flex flex-col text-white">
      <header className="sticky top-0 z-50 w-full border-b border-[#283930] bg-background-dark/95 backdrop-blur-sm px-4 lg:px-10 py-3">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="flex items-center gap-4">
            <div className="size-8 text-primary">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-[-0.015em] hidden sm:block">ComCelo</h2>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <nav className="hidden md:flex items-center gap-6">
              <a className="text-white text-sm font-bold hover:text-primary transition-colors" href="#">News</a>
              <a className="text-white/70 text-sm font-medium hover:text-white transition-colors" href="#">Tournaments</a>
              <a className="text-white/70 text-sm font-medium hover:text-white transition-colors" href="#">Leaderboard</a>
              <a className="text-white/70 text-sm font-medium hover:text-white transition-colors" href="#">My History</a>
            </nav>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 h-9 px-4 rounded-lg bg-surface-dark border border-primary/30 text-white text-sm font-bold hover:bg-surface-dark/80 transition-all">
                <span className="material-symbols-outlined text-primary text-[18px]">account_balance_wallet</span>
                <span className="truncate hidden sm:inline">0x71...3A92</span>
              </button>
              <div className="bg-center bg-no-repeat bg-cover rounded-full size-9 border border-[#283930] cursor-pointer" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-LTdPSv5pZqeaiglt4ZywFbTyRHOOHo6Q-ur0xcbTiDSE3iShJgDtI4a0630_wg9e7Iep9A8vmfG8CpjtScy2N-V580ao6ZGgei-7R_L-0Hz1TuRVQ7cu7KW85OYqyXetMwWwK5Qlzh1MDbvHBveD10Sjd75hg_WFKthL-vhlfWkPe_iFzhvQdxDWqNcRjMAzmJshuQfH0zipd88Q14_Gahx8HY7mhRw_XivfDUDdMnTicPlQQw3jaWVn4PW2uV48NRPqCXVz78Q')"}}></div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-7xl flex flex-col gap-8">
          <section className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h1 className="tracking-tight text-[32px] md:text-4xl font-bold leading-tight">Battle Command Center</h1>
              <div className="flex items-center gap-2 text-[#3b5447] text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                SEASON 4: TACTICAL DAWN
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Unread News', value: '3', icon: 'mark_email_unread' },
                { label: 'Next Event', value: '2d 4h', icon: 'event' },
                { label: 'Patch Ver.', value: '4.0.2', icon: 'build' },
                { label: 'Global Status', value: 'Online', icon: 'public', valueClass: 'text-primary' },
              ].map((card, idx) => (
                <div key={idx} className="flex flex-col gap-1 rounded-xl p-4 bg-surface-dark border border-[#3b5447]/50 shadow-sm relative overflow-hidden group">
                  <p className="text-white/60 text-xs font-medium uppercase tracking-wider">{card.label}</p>
                  <p className={`text-xl font-bold ${card.valueClass ?? ''}`}>{card.value}</p>
                  <div className="absolute top-3 right-3 opacity-20"><span className="material-symbols-outlined">{card.icon}</span></div>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-[#283930] gap-4">
              <div className="flex gap-8 overflow-x-auto w-full sm:w-auto">
                <button className="relative pb-4 px-2 text-white text-sm font-bold tracking-[0.015em] hover:text-primary transition-colors whitespace-nowrap">
                  News & Updates
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                </button>
                <button className="relative pb-4 px-2 text-white/50 text-sm font-bold tracking-[0.015em] hover:text-white transition-colors whitespace-nowrap">
                  Active Tournaments
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent"></span>
                </button>
                <button className="relative pb-4 px-2 text-white/50 text-sm font-bold tracking-[0.015em] hover:text-white transition-colors whitespace-nowrap">
                  Global Leaderboard
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent"></span>
                </button>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto pb-3">
                <div className="relative w-full sm:w-64">
                  <input className="w-full h-10 pl-10 pr-4 bg-surface-dark border border-[#283930] rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary text-sm" placeholder="Search updates..." type="text" />
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-white/40 text-[20px]">search</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {['All Updates', 'Patch Notes', 'Announcements', 'Events', 'Community'].map((tag, i) => (
                <button key={i} className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase whitespace-nowrap ${i === 0 ? 'bg-primary text-[#102219]' : 'bg-surface-dark border border-[#283930] text-white/70 hover:text-white hover:border-primary/50'}`}>{tag}</button>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3 group relative rounded-2xl bg-surface-dark border border-[#283930] overflow-hidden hover:border-primary/50 transition-all cursor-pointer h-[420px] shadow-lg">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBdSKHfjSjdyQLkmXzMXM_UPKAA_HVmC1ddurKMCO68vA97HzGXN6UivClq1YUrPGBwCyj-x1HJxmCRUNqeghOVFykpIRHZJmYFykLMJ_OL0vLy1aKCAzxpDdpEPp-H5i3XIkg5sHjrHgmpDiMQXYJ1bz34N9UGxKdgT4iRI9EXEvFlCUSHXZZP-g6iRKpefeiWxY0DTdHxlGOWTLlyMBifpt16t4fWjWqf9gbZuF3uV_x8Thr9UlZeuon4Alcf1dvO0hyQjWMmOPg')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-primary text-[#102219] text-xs font-bold uppercase rounded tracking-wide shadow-md">Major Update</span>
                  <span className="text-white/80 text-sm font-medium flex items-center gap-1 backdrop-blur-md bg-black/30 px-2 py-1 rounded">
                    <span className="material-symbols-outlined text-[16px]">calendar_today</span> Oct 24, 2024
                  </span>
                </div>
                <div className="max-w-3xl">
                  <h2 className="text-3xl md:text-5xl font-bold mb-3 leading-tight drop-shadow-lg">Season 4: Tactical Dawn is Live</h2>
                  <p className="text-white/90 text-base md:text-lg mb-6 line-clamp-2 drop-shadow-md">The wait is over. Dive into the biggest update of the year featuring the new 'Cyber Ruins' map, 3 new tactical units, and a complete overhaul of the ranked matchmaking system.</p>
                  <button className="h-11 px-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold text-sm hover:bg-primary hover:text-[#102219] hover:border-primary transition-all flex items-center gap-2 w-fit">
                    Read Full Patch Notes
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {[
              { iconColor: 'text-blue-400', iconBg: 'bg-blue-500/10', title: 'Server Maintenance Complete', time: '2h ago', desc: 'Servers are back online following scheduled database optimization. Ranked queues are now open with improved stability.' },
              { iconColor: 'text-purple-400', iconBg: 'bg-purple-500/10', title: 'Grand Prix: Finals Results', time: '1d ago', desc: 'Congratulations to @CipherOne for taking the crown in the Season 3 Finale! View the full tournament bracket and replay highlights.' },
              { iconColor: 'text-orange-400', iconBg: 'bg-orange-500/10', title: 'Hotfix 4.0.2 Deployed', time: '3d ago', desc: "Fixed an issue where Heavy Infantry units would get stuck on the 'Factory' map tiles. Adjusted turn timer for Blitz mode." },
            ].map((card, i) => (
              <div key={i} className="flex flex-col bg-surface-dark rounded-xl border border-[#283930] p-6 hover:border-primary/40 hover:-translate-y-0.5 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-lg ${card.iconBg} border border-white/10 flex items-center justify-center ${card.iconColor}`}>
                    <span className="material-symbols-outlined">campaign</span>
                  </div>
                  <span className="text-white/40 text-xs font-mono">{card.time}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">{card.title}</h3>
                <p className="text-white/50 text-sm mb-6 flex-grow leading-relaxed">{card.desc}</p>
                <div className="mt-auto pt-4 border-t border-white/5">
                  <a className="text-white/70 text-sm font-bold hover:text-white flex items-center justify-between transition-colors" href="#">
                    Read Details <span className="material-symbols-outlined text-[16px] text-primary">chevron_right</span>
                  </a>
                </div>
              </div>
            ))}
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#283930] pb-4">
              <h3 className="text-lg font-bold">Previous Updates</h3>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded bg-surface-dark border border-[#283930] flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="w-8 h-8 rounded bg-surface-dark border border-[#283930] flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { date: 'Oct 18, 2024', tag: 'Community', title: 'Community Spotlight: Strategy Guide by @TacMaster', summary: 'Check out this in-depth guide on mastering the Recon unit class and controlling the high ground.' },
                { date: 'Oct 15, 2024', tag: 'Dev Log', title: 'Dev Diary #42: The Future of Base Gaming', summary: 'Our lead developer shares insights on upcoming blockchain features, gas-free transactions, and mobile support.' },
                { date: 'Oct 10, 2024', tag: 'Event', title: 'Mid-Season Brawl: Registration Open', summary: 'Sign ups are now open for the mid-season brawl. Entry fee is 0.01 ETH, winner takes 3 ETH prize pool.' },
              ].map((item, i) => (
                <a key={i} className="group flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl bg-surface-dark/50 border border-[#283930] hover:bg-surface-dark hover:border-primary/30 transition-all" href="#">
                  <div className="md:w-32 flex-shrink-0">
                    <span className="text-white/40 text-xs font-mono group-hover:text-primary transition-colors">{item.date}</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/50 text-[10px] font-bold uppercase">{item.tag}</span>
                      <h4 className="font-bold text-base group-hover:text-primary transition-colors">{item.title}</h4>
                    </div>
                    <p className="text-white/50 text-sm line-clamp-1">{item.summary}</p>
                  </div>
                  <div className="hidden md:block text-white/20 group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">arrow_outward</span>
                  </div>
                </a>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button className="px-6 py-2 rounded-lg bg-surface-dark border border-[#283930] font-bold text-sm hover:bg-white hover:text-background-dark transition-colors">
                Load More Archives
              </button>
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-auto border-t border-[#283930] py-8 bg-background-dark">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/40 text-sm">© 2025 ComCelo. Built on Base.</div>
          <div className="flex gap-6">
            <a className="text-white/40 hover:text-primary transition-colors text-sm font-medium" href="#">Discord</a>
            <a className="text-white/40 hover:text-primary transition-colors text-sm font-medium" href="#">Farcaster</a>
            <a className="text-white/40 hover:text-primary transition-colors text-sm font-medium" href="#">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
