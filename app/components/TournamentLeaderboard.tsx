'use client';

import { useState } from 'react';

interface Tournament {
  id: string;
  title: string;
  sponsor: string;
  prizePool: string;
  format: string;
  entryFee: string;
  participants: string;
  status: 'live' | 'upcoming' | 'soon';
  startTime?: string;
  imageUrl: string;
}

interface LeaderboardPlayer {
  rank: number;
  username: string;
  avatar: string;
  title: string;
  winRate: number;
  rating: number;
  wins: number;
  losses: number;
  isCurrentUser?: boolean;
}

export default function TournamentLeaderboard() {
  const [activeTab, setActiveTab] = useState<'tournaments' | 'leaderboard'>('tournaments');
  const [seasonFilter, setSeasonFilter] = useState('season4');

  const tournaments: Tournament[] = [
    {
      id: '1',
      title: 'Summer Skirmish',
      sponsor: 'Celo Foundation',
      prizePool: '5,000 CELO',
      format: '1v1 Elimination',
      entryFee: 'Free',
      participants: '128/256',
      status: 'live',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF1NeME75TRpiVSkF1Woq3ihc9emhlRtJim94MjkoVeUY8VbndjF9HMkyKfRxaHoCKkKuGq9oPCDQ_VZ4Z55sQCruEUYQapGXUxDFke5eQXnss54H3UT-EvVaKo1hLyZzZRGDkz9Vp3677f29fB3tAJ8SVv7u-uoAFiuDeIl-U7zf_pAKXG2Y-XZ512jmrcmYOYvFVAJhO5N9rk2lKCRVvDBolhhJw-lSvwIxFqmNlg2rS9TuJL9WM6Xiy1VXx_7Qfmo-hdvvusec'
    },
    {
      id: '2',
      title: 'Weekly Tactical',
      sponsor: 'Community Cup',
      prizePool: '500 USDC',
      format: 'Swiss Rounds',
      entryFee: '5 CELO',
      participants: '45 Players',
      status: 'upcoming',
      startTime: 'Starts in 2d 4h',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZZbaOpotCgnAMW149bR4FL0vU1f1qglGMaVuFtdo-hqGZLwS018WdQciDgnUcrL1d1dQsIbhkfLCRTKcK8y9CloSRwXzM8Lzbmqvpu2QGwBFg2YmBh7i5Z0Z9c7HJC5_UYhyjSosIufYpTw27AOAruIM7mLkuehICyB-KyrRJtU5aq-Cr6ZVm8fiTRCMwvIeehPYOo2TWMouu7uYNbPuW-KPReZ84ulOhPUvVj9_7iwCdRbZxI8455Brlxa0XfVyk-BIZQTOd7wo'
    },
    {
      id: '3',
      title: 'Grand Prix Qualifier',
      sponsor: 'Official Season',
      prizePool: '10k cUSD',
      format: 'Ranked Only',
      entryFee: 'Rank 1000+',
      participants: '850 Players',
      status: 'soon',
      startTime: 'Oct 15th',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdSKHfjSjdyQLkmXzMXM_UPKAA_HVmC1ddurKMCO68vA97HzGXN6UivClq1YUrPGBwCyj-x1HJxmCRUNqeghOVFykpIRHZJmYFykLMJ_OL0vLy1aKCAzxpDdpEPp-H5i3XIkg5sHjrHgmpDiMQXYJ1bz34N9UGxKdgT4iRI9EXEvFlCUSHXZZP-g6iRKpefeiWxY0DTdHxlGOWTLlyMBifpt16t4fWjWqf9gbZuF3uV_x8Thr9UlZeuon4Alcf1dvO0hyQjWMmOPg'
    }
  ];

  const leaderboard: LeaderboardPlayer[] = [
    {
      rank: 1,
      username: '@CipherOne',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi8xdg9pFCscgWFVN-0xF4QcuqXO0UUAKzQfDWGgMw2900nOA-KhFi5unZ7UPsz6rqUoaZxeTJyefUtUKXfM7IVFl6nU5_oEpe3QD0C1xb8B3MEsEf5gNREJdANGPmsq7nLJKB40EuFz89i5ka3btNoxllG5bmUKn6MWRduUacBfffpjxhlwX14Y5HmZL1znwdUZSCFle8XHkPQnahn2ObbZ1PksLdVCgkvIvrJj7_HmaCBQT8_0qT-TxhjYKf8E17Z5JduYhn5xw',
      title: 'Farcaster OG',
      winRate: 85,
      rating: 2450,
      wins: 142,
      losses: 25
    },
    {
      rank: 2,
      username: '@TacMaster',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDayZ-CE_6fPZCKS7Q0QnD4mvTyR5DF6QJOYDnkUkCT5VlpRRKSPXvP-bElANAMgvvpDGzh87r5hPiF08Si0ZH1JMmLKUZ3GaQ4fWA2eKPlX9KYLfiVYfytBZ0UbtSDn2TDUNhWm8cIt5GWpB3thDZw6RdGthUnpWzuMd56jwcT7pdlIWDRseCQW-wOC96QhqMCrk_YFvdlzxGRfXk3ORdjGqECRfVEUiHpDdaVdU6uIaUC9rtIpSsK8IMLHwQIce-yYRlDuB21mLo',
      title: 'Strategist',
      winRate: 78,
      rating: 2310,
      wins: 110,
      losses: 31
    },
    {
      rank: 3,
      username: '@VitalikFan',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr8XNEVTwBAF1Y-HAU1yOnBoz9n9Skl8CM8OGxNGUeskaw5cqc8yivFngWN2U0lXc4y-h70ToY4Mbw0Lvap2J3sP0IFkMzyHvFhrdfmRZA71UXTjD0YdFhewMxZ0gCbDDov49M0ABEN_JUrisvwB9xu2rThSZnmGy-6gH98-G6DVDTBWfTSlVckQxePmaoi_LjC3Cp8YINChlthV7ajiuR7FVl2ow6cD611nMYuxQ9uxxVnkppK79lXriouOyIpx97lbga1IlstbE',
      title: 'Newcomer',
      winRate: 72,
      rating: 2185,
      wins: 85,
      losses: 33
    },
    {
      rank: 4,
      username: '@CryptoKnight',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC__-1GFGkmULE8UWjta2sDmc8TEFHl6Ou_PCmlZui_jcXNaM5hNtYir1zJ4ykkIbQgKiw5BhulNMcnjtZ0WKmYHfY0MM_AnJVGQbPdDLmyaR9ybUYkH_ziHrxIT-S-vCbJXEXfO0_3IkZTNG24Ttvz91bmH3e2mW3vhcJiuglC_qC9ChthPc0Mf0OD56mtk18B7DmF-wT4ZLLru2RZqVGIlyT8f345KsvtDlDEmgLALFxCQhtsPYDCjmLNV2XbtpD2UddN-CJgo3c',
      title: '',
      winRate: 65,
      rating: 2050,
      wins: 90,
      losses: 48
    },
    {
      rank: 42,
      username: 'You',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7z6AXmLwKlWE2EQmZ9moJ2qFeak1v_RSN7zC3wHoJgilXuHJYt3nu3a4qZFVKia_MSK62BWrkO0GESN-D5CEhqVp-XIhCtJjEqKjMf-Y1fTgUSw4bEaeNLejwsIj_VjvludXVrWewH5-vGZWeUjRvkXcLGTU2Cjx4B4kawunRZ-EHg_2ARcAwpYBJ90iK6wc_2rLmuk5WYzCpKAuRyFugiPn4rrxaIQ1dnhZM5w4kGdPYAY-9SeEdPUWJ6N0FKEaf3YRYXpGaOB8',
      title: '',
      winRate: 55,
      rating: 1250,
      wins: 42,
      losses: 34,
      isCurrentUser: true
    }
  ];

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
              <a className="text-white text-sm font-bold hover:text-primary transition-colors" href="/tournaments">Tournaments</a>
              <a className="text-white/70 text-sm font-medium hover:text-white transition-colors" href="/dashboard">Dashboard</a>
              <a className="text-white/70 text-sm font-medium hover:text-white transition-colors" href="/profile">Profile</a>
            </nav>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 h-9 px-4 rounded-lg bg-surface-dark border border-primary/30 text-white text-sm font-bold hover:bg-surface-dark/80 transition-all">
                <span className="material-symbols-outlined text-primary text-[18px]">account_balance_wallet</span>
                <span className="truncate hidden sm:inline">0x8F...7a</span>
              </button>
              <a href="/profile" className="bg-center bg-no-repeat bg-cover rounded-full size-9 border border-border-green cursor-pointer hover:border-primary transition-colors" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-LTdPSv5pZqeaiglt4ZywFbTyRHOOHo6Q-ur0xcbTiDSE3iShJgDtI4a0630_wg9e7Iep9A8vmfG8CpjtScy2N-V580ao6ZGgei-7R_L-0Hz1TuRVQ7cu7KW85OYqyXetMwWwK5Qlzh1MDbvHBveD10Sjd75hg_WFKthL-vhlfWkPe_iFzhvQdxDWqNcRjMAzmJshuQfH0zipd88Q14_Gahx8HY7mhRw_XivfDUDdMnTicPlQQw3jaWVn4PW2uV48NRPqCXVz78Q')"}}></a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-7xl flex flex-col gap-8">
          {/* Hero Section */}
          <section className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h1 className="text-white tracking-tight text-[32px] md:text-4xl font-bold leading-tight">Battle Command Center</h1>
              <div className="flex items-center gap-2 text-accent-green text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                SEASON 4: TACTICAL DAWN
              </div>
            </div>

            {/* User Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col gap-2 rounded-xl p-5 bg-surface-dark border border-accent-green shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-4xl text-white">trophy</span>
                </div>
                <p className="text-white/60 text-sm font-medium uppercase tracking-wider">Global Rank</p>
                <p className="text-white text-2xl font-bold">#42</p>
                <div className="text-primary text-xs font-bold flex items-center gap-1 mt-auto">
                  <span className="material-symbols-outlined text-sm">arrow_upward</span> Top 5%
                </div>
              </div>
              <div className="flex flex-col gap-2 rounded-xl p-5 bg-surface-dark border border-accent-green shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-4xl text-white">local_fire_department</span>
                </div>
                <p className="text-white/60 text-sm font-medium uppercase tracking-wider">Current Streak</p>
                <p className="text-white text-2xl font-bold">3 Matches</p>
                <div className="text-white/40 text-xs mt-auto">Best: 12 Matches</div>
              </div>
              <div className="flex flex-col gap-2 rounded-xl p-5 bg-surface-dark border border-accent-green shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-4xl text-white">payments</span>
                </div>
                <p className="text-white/60 text-sm font-medium uppercase tracking-wider">Total Earnings</p>
                <p className="text-white text-2xl font-bold">150 CELO</p>
                <div className="text-primary text-xs font-bold mt-auto">≈ $75.50 USD</div>
              </div>
              <div className="flex flex-col gap-2 rounded-xl p-5 bg-surface-dark border border-accent-green shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-4xl text-white">psychology</span>
                </div>
                <p className="text-white/60 text-sm font-medium uppercase tracking-wider">Tactical Rating</p>
                <p className="text-white text-2xl font-bold">1250</p>
                <div className="text-white/40 text-xs mt-auto">Grandmaster League</div>
              </div>
            </div>
          </section>

          {/* Navigation Tabs */}
          <section className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-border-green gap-4">
              <div className="flex gap-8">
                <button 
                  onClick={() => setActiveTab('tournaments')}
                  className="relative pb-4 px-2 text-sm font-bold tracking-[0.015em] transition-colors"
                  style={{color: activeTab === 'tournaments' ? 'white' : 'rgba(255,255,255,0.5)'}}
                >
                  Active Tournaments
                  <span 
                    className="absolute bottom-0 left-0 w-full h-0.5 transition-colors"
                    style={{backgroundColor: activeTab === 'tournaments' ? '#13ec80' : 'transparent'}}
                  ></span>
                </button>
                <button 
                  onClick={() => setActiveTab('leaderboard')}
                  className="relative pb-4 px-2 text-sm font-bold tracking-[0.015em] transition-colors"
                  style={{color: activeTab === 'leaderboard' ? 'white' : 'rgba(255,255,255,0.5)'}}
                >
                  Global Leaderboard
                  <span 
                    className="absolute bottom-0 left-0 w-full h-0.5 transition-colors"
                    style={{backgroundColor: activeTab === 'leaderboard' ? '#13ec80' : 'transparent'}}
                  ></span>
                </button>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto pb-3">
                <div className="relative w-full sm:w-64">
                  <input 
                    className="w-full h-10 pl-10 pr-4 bg-surface-dark border border-border-green rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary text-sm" 
                    placeholder="Search tournaments..." 
                    type="text"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-white/40 text-[20px]">search</span>
                </div>
                <button className="h-10 w-10 flex items-center justify-center rounded-lg border border-border-green bg-surface-dark hover:bg-border-green transition-colors text-white">
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
              </div>
            </div>
          </section>

          {/* Tournaments Tab */}
          {activeTab === 'tournaments' && (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-lg font-bold">Featured Operations</h3>
                <a className="text-primary text-sm font-bold flex items-center gap-1 hover:underline" href="#">
                  View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tournaments.map((tournament) => (
                  <div key={tournament.id} className={`group flex flex-col rounded-2xl bg-surface-dark overflow-hidden transition-all duration-300 ${tournament.status === 'live' ? 'border border-primary/40 hover:shadow-[0_0_20px_rgba(19,236,128,0.15)]' : 'border border-border-green hover:border-primary/50'}`}>
                    <div 
                      className="h-40 bg-cover bg-center relative"
                      style={{backgroundImage: `url('${tournament.imageUrl}')`}}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        {tournament.status === 'live' ? (
                          <span className="px-2 py-1 rounded bg-primary text-background-dark text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-background-dark animate-pulse"></span> Live Now
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">schedule</span> {tournament.startTime}
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white/70 text-xs font-bold uppercase mb-1">{tournament.sponsor}</p>
                        <h3 className="text-white text-xl font-bold leading-none">{tournament.title}</h3>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col gap-4 flex-grow">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-white/50 text-xs mb-1">Prize Pool</p>
                          <p className="text-primary text-lg font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">savings</span> {tournament.prizePool}
                          </p>
                        </div>
                        <div>
                          <p className="text-white/50 text-xs mb-1">Format</p>
                          <p className="text-white text-sm font-medium">{tournament.format}</p>
                        </div>
                        <div>
                          <p className="text-white/50 text-xs mb-1">Entry Fee</p>
                          <p className="text-white text-sm font-medium">{tournament.entryFee}</p>
                        </div>
                        <div>
                          <p className="text-white/50 text-xs mb-1">{tournament.status === 'live' ? 'Participants' : 'Registered'}</p>
                          <p className="text-white text-sm font-medium">{tournament.participants}</p>
                        </div>
                      </div>
                      <div className="mt-auto pt-2">
                        {tournament.status === 'live' && (
                          <button className="w-full h-10 rounded-lg bg-primary text-background-dark font-bold text-sm hover:bg-white transition-colors flex items-center justify-center gap-2">
                            Join Arena
                            <span className="material-symbols-outlined text-[18px]">swords</span>
                          </button>
                        )}
                        {tournament.status === 'upcoming' && (
                          <button className="w-full h-10 rounded-lg bg-surface-dark border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-colors">
                            Pre-Register
                          </button>
                        )}
                        {tournament.status === 'soon' && (
                          <button className="w-full h-10 rounded-lg bg-surface-dark border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-colors" disabled>
                            Coming Soon
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Leaderboard Tab */}
          {activeTab === 'leaderboard' && (
            <section className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-lg font-bold">Global Rankings</h3>
                <div className="flex gap-2">
                  <select 
                    value={seasonFilter}
                    onChange={(e) => setSeasonFilter(e.target.value)}
                    className="bg-surface-dark text-white text-sm border border-border-green rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary"
                  >
                    <option value="season4">Season 4</option>
                    <option value="alltime">All Time</option>
                  </select>
                </div>
              </div>
              <div className="w-full overflow-x-auto rounded-xl border border-border-green bg-surface-dark">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-border-green text-xs uppercase text-white/50">
                      <th className="p-4 font-medium tracking-wider w-16">Rank</th>
                      <th className="p-4 font-medium tracking-wider">Agent</th>
                      <th className="p-4 font-medium tracking-wider">Win Rate</th>
                      <th className="p-4 font-medium tracking-wider text-right">Rating</th>
                      <th className="p-4 font-medium tracking-wider text-right hidden md:table-cell">W/L</th>
                      <th className="p-4 font-medium tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-border-green">
                    {leaderboard.map((player) => (
                      <tr 
                        key={player.rank} 
                        className={`hover:bg-white/5 transition-colors group ${player.isCurrentUser ? 'border-t-2 border-primary/20 bg-primary/5' : ''}`}
                      >
                        <td className="p-4">
                          {player.rank <= 3 ? (
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border ${
                              player.rank === 1 ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' :
                              player.rank === 2 ? 'bg-gray-400/20 text-gray-400 border-gray-400/50' :
                              'bg-orange-700/20 text-orange-600 border-orange-700/50'
                            }`}>
                              {player.rank}
                            </div>
                          ) : (
                            <span className={`w-8 flex justify-center font-bold ${player.isCurrentUser ? 'text-primary' : 'text-white/50'}`}>
                              {player.rank}
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className={`size-8 rounded-full bg-cover bg-center ${!player.isCurrentUser && player.rank > 3 ? 'grayscale group-hover:grayscale-0' : ''} ${player.isCurrentUser ? 'border border-primary' : ''}`}
                              style={{backgroundImage: `url('${player.avatar}')`}}
                            ></div>
                            <div>
                              <p className="text-white font-bold">{player.username}</p>
                              {player.title && <p className="text-white/40 text-xs">{player.title}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 w-48">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-1.5 bg-background-dark rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${player.isCurrentUser || player.rank <= 3 ? 'bg-primary' : 'bg-white/30'}`}
                                style={{width: `${player.winRate}%`}}
                              ></div>
                            </div>
                            <span className={`font-bold ${player.isCurrentUser || player.rank <= 3 ? 'text-primary' : 'text-white/70'}`}>
                              {player.winRate}%
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-right font-mono text-white text-base">{player.rating}</td>
                        <td className="p-4 text-right hidden md:table-cell text-white/70">{player.wins}/{player.losses}</td>
                        <td className="p-4 text-right">
                          <button className={`text-xs font-bold px-3 py-1.5 rounded transition-colors ${
                            player.isCurrentUser 
                              ? 'text-background-dark bg-primary hover:bg-primary/90' 
                              : 'text-white bg-white/10 hover:bg-white/20'
                          }`}>
                            {player.isCurrentUser ? 'Details' : 'View'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-border-green py-8 bg-background-dark">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/40 text-sm">
            © 2024 ComCelo. Built on Celo.
          </div>
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
