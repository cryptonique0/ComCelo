'use client';

import { useState } from 'react';

export default function Profile() {
  const [soundEffects, setSoundEffects] = useState(true);
  const [frameNotifications, setFrameNotifications] = useState(true);
  const [showPublicStats, setShowPublicStats] = useState(true);
  const [username, setUsername] = useState('Commander_X');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('Tactical strategist exploring the grid. Ready for any challenge on Celo.');

  return (
    <div className="min-h-screen bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border-green bg-background-dark/95 backdrop-blur-sm px-4 lg:px-10 py-3">
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
              <a className="text-white/70 text-sm font-medium hover:text-white transition-colors" href="/">Play</a>
              <a className="text-white/70 text-sm font-medium hover:text-white transition-colors" href="/leaderboard">Leaderboard</a>
              <a className="text-white text-sm font-bold hover:text-primary transition-colors" href="/profile">Profile</a>
            </nav>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 h-9 px-4 rounded-lg bg-surface-dark border border-primary/30 text-white text-sm font-bold hover:bg-surface-dark/80 transition-all">
                <span className="material-symbols-outlined text-primary text-[18px]">account_balance_wallet</span>
                <span className="truncate hidden sm:inline">0x8F...7a</span>
              </button>
              <button className="size-9 flex items-center justify-center rounded-lg border border-border-green hover:bg-surface-dark transition-colors">
                <span className="material-symbols-outlined text-white">settings</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
              <a href="#profile" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 border border-primary/20 text-primary font-medium text-sm whitespace-nowrap lg:whitespace-normal">
                <span className="material-symbols-outlined text-[20px]">person</span>
                <span>Profile Overview</span>
              </a>
              <a href="#preferences" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-dark text-white/70 hover:text-white font-medium text-sm whitespace-nowrap lg:whitespace-normal transition-colors">
                <span className="material-symbols-outlined text-[20px]">tune</span>
                <span>Game Preferences</span>
              </a>
              <a href="#wallet" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-dark text-white/70 hover:text-white font-medium text-sm whitespace-nowrap lg:whitespace-normal transition-colors">
                <span className="material-symbols-outlined text-[20px]">shield</span>
                <span>Security & Wallet</span>
              </a>
              <a href="#achievements" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-dark text-white/70 hover:text-white font-medium text-sm whitespace-nowrap lg:whitespace-normal transition-colors">
                <span className="material-symbols-outlined text-[20px]">emoji_events</span>
                <span>Achievements</span>
              </a>
            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            {/* Profile Header */}
            <section className="flex flex-col md:flex-row gap-6 items-start md:items-center bg-surface-dark rounded-2xl border border-accent-green p-6">
              <div className="relative">
                <div 
                  className="size-24 rounded-full bg-cover bg-center border-2 border-primary"
                  style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-LTdPSv5pZqeaiglt4ZywFbTyRHOOHo6Q-ur0xcbTiDSE3iShJgDtI4a0630_wg9e7Iep9A8vmfG8CpjtScy2N-V580ao6ZGgei-7R_L-0Hz1TuRVQ7cu7KW85OYqyXetMwWwK5Qlzh1MDbvHBveD10Sjd75hg_WFKthL-vhlfWkPe_iFzhvQdxDWqNcRjMAzmJshuQfH0zipd88Q14_Gahx8HY7mhRw_XivfDUDdMnTicPlQQw3jaWVn4PW2uV48NRPqCXVz78Q')"}}
                ></div>
                <button className="absolute bottom-0 right-0 size-8 rounded-full bg-primary text-background-dark flex items-center justify-center border-2 border-surface-dark hover:bg-white transition-colors">
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                  <h1 className="text-white text-2xl font-bold">Commander_X</h1>
                  <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wide w-fit">
                    Pro Tier
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
                  <span className="material-symbols-outlined text-[16px]">alternate_email</span>
                  <span>commander.eth</span>
                  <span className="mx-2">•</span>
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  <span>Joined Oct 2023</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 h-2 bg-background-dark rounded-full overflow-hidden max-w-xs">
                    <div className="h-full bg-gradient-to-r from-primary to-cyan-400 w-[75%]"></div>
                  </div>
                  <span className="text-white text-sm font-bold">XP: 7,500</span>
                  <span className="text-white/40 text-xs">Next Level: 10,000</span>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-dark border border-primary/30 text-white text-sm font-medium hover:bg-border-green transition-colors">
                  <span className="material-symbols-outlined text-[18px]">share</span>
                  Share Profile
                </button>
              </div>
              <div className="flex sm:flex-row lg:flex-col gap-4 w-full sm:w-auto">
                <button className="flex-1 sm:flex-initial px-6 py-2.5 rounded-lg bg-primary text-background-dark font-bold text-sm hover:bg-white transition-colors">
                  <span className="material-symbols-outlined text-[18px] mr-1 align-middle">brush</span>
                  Edit
                </button>
              </div>
            </section>

            {/* Stats Grid */}
            <section>
              <h2 className="text-white text-xl font-bold mb-4">Season 1 Ends In</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-surface-dark rounded-xl border border-accent-green p-5 text-center">
                  <p className="text-primary text-3xl font-bold mb-1">04</p>
                  <p className="text-white/40 text-xs uppercase tracking-wider">Days</p>
                </div>
                <div className="bg-surface-dark rounded-xl border border-accent-green p-5 text-center">
                  <p className="text-primary text-3xl font-bold mb-1">12</p>
                  <p className="text-white/40 text-xs uppercase tracking-wider">Wins</p>
                </div>
                <div className="bg-surface-dark rounded-xl border border-accent-green p-5 text-center">
                  <p className="text-primary text-3xl font-bold mb-1">3</p>
                  <p className="text-white/40 text-xs uppercase tracking-wider">Losses</p>
                </div>
                <div className="bg-surface-dark rounded-xl border border-accent-green p-5 text-center">
                  <p className="text-primary text-3xl font-bold mb-1">68%</p>
                  <p className="text-white/40 text-xs uppercase tracking-wider">+3.4% this week</p>
                </div>
              </div>
            </section>

            {/* Win History Graph */}
            <section className="bg-surface-dark rounded-2xl border border-accent-green p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-lg font-bold">Win Rate</h2>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <span className="material-symbols-outlined text-[18px]">trending_up</span>
                  <span>+3.4% this week</span>
                </div>
              </div>
              <div className="h-48 flex items-end justify-between gap-2">
                {[42, 58, 45, 72, 68, 55, 78, 83, 75, 82, 88, 90, 85, 92].map((height, idx) => (
                  <div key={idx} className="flex-1 bg-primary/20 rounded-t hover:bg-primary/40 transition-colors cursor-pointer relative group" style={{height: `${height}%`}}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-background-dark px-2 py-1 rounded text-xs text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {height}%
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-white/40">
                <span>Week 1</span>
                <span>Week 14</span>
              </div>
            </section>

            {/* Matches Played */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-dark rounded-2xl border border-accent-green p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-lg font-bold">Matches Played</h3>
                  <span className="material-symbols-outlined text-primary text-[24px]">sports_esports</span>
                </div>
                <p className="text-white text-3xl font-bold mb-2">142</p>
                <p className="text-white/60 text-sm">Total since Oct 2023</p>
              </div>
              <div className="bg-surface-dark rounded-2xl border border-accent-green p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-lg font-bold">Current Rank</h3>
                  <span className="material-symbols-outlined text-primary text-[24px]">military_tech</span>
                </div>
                <p className="text-white text-3xl font-bold mb-2">#42</p>
                <p className="text-white/60 text-sm">Top 5% of all players</p>
              </div>
            </section>

            {/* Account Details */}
            <section className="bg-surface-dark rounded-2xl border border-accent-green p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary text-[24px]">account_circle</span>
                <h2 className="text-white text-lg font-bold">Account Details</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-white/60 text-sm font-medium mb-2">Username</label>
                  <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full h-12 px-4 bg-background-dark border border-border-green rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary text-sm"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm font-medium mb-2">Email (Optional)</label>
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Add your email for notifications"
                    className="w-full h-12 px-4 bg-background-dark border border-border-green rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary text-sm"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm font-medium mb-2">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-background-dark border border-border-green rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary text-sm resize-none"
                  />
                </div>
                <button className="w-full h-12 rounded-lg bg-surface-dark border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-colors">
                  Save Changes
                </button>
              </div>
            </section>

            {/* Linked Connections */}
            <section className="bg-surface-dark rounded-2xl border border-accent-green p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary text-[24px]">link</span>
                <h2 className="text-white text-lg font-bold">Linked Connections</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background-dark rounded-lg border border-border-green">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-purple-400 text-[20px]">hub</span>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Farcaster</p>
                      <p className="text-white/40 text-xs">@commander</p>
                    </div>
                  </div>
                  <button className="text-red-400 text-xs font-bold hover:text-red-300 transition-colors">Unlink</button>
                </div>
                <div className="flex items-center justify-between p-4 bg-background-dark rounded-lg border border-border-green">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-blue-400 text-[20px]">account_balance_wallet</span>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Celo Wallet</p>
                      <p className="text-white/40 text-xs">0x8F...2A4c</p>
                    </div>
                  </div>
                  <button className="text-white/60 text-xs font-bold hover:text-white transition-colors">Change</button>
                </div>
              </div>
            </section>

            {/* Preferences */}
            <section className="bg-surface-dark rounded-2xl border border-accent-green p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary text-[24px]">settings</span>
                <h2 className="text-white text-lg font-bold">Preferences</h2>
              </div>
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium text-sm">Sound Effects</p>
                    <p className="text-white/40 text-xs">Enable tactical audio</p>
                  </div>
                  <button 
                    onClick={() => setSoundEffects(!soundEffects)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${soundEffects ? 'bg-primary' : 'bg-white/20'}`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${soundEffects ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium text-sm">Frame Notifications</p>
                    <p className="text-white/40 text-xs">Alerts via Farcaster</p>
                  </div>
                  <button 
                    onClick={() => setFrameNotifications(!frameNotifications)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${frameNotifications ? 'bg-primary' : 'bg-white/20'}`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${frameNotifications ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium text-sm">Show Public Stats</p>
                    <p className="text-white/40 text-xs">Visible on leaderboard</p>
                  </div>
                  <button 
                    onClick={() => setShowPublicStats(!showPublicStats)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${showPublicStats ? 'bg-primary' : 'bg-white/20'}`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${showPublicStats ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-border-green py-8 bg-background-dark">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/40 text-sm">
            © 2024 ComCelo. Built on Celo.
          </div>
          <div className="flex gap-6">
            <a className="text-white/40 hover:text-primary transition-colors text-sm font-medium" href="#">Privacy Policy</a>
            <a className="text-white/40 hover:text-primary transition-colors text-sm font-medium" href="#">Terms of Service</a>
            <a className="text-white/40 hover:text-primary transition-colors text-sm font-medium" href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
