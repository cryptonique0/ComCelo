'use client';

import React from 'react';

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
  progress: number;
  maxProgress: number;
}

const mockAchievements: Achievement[] = [
  {
    id: 1,
    name: 'First Victory',
    description: 'Win your first match',
    icon: '🎖️',
    unlockedAt: 'Dec 1, 2024',
    progress: 1,
    maxProgress: 1,
  },
  {
    id: 2,
    name: 'Hot Streak',
    description: 'Win 5 matches in a row',
    icon: '🔥',
    unlockedAt: 'Dec 5, 2024',
    progress: 1,
    maxProgress: 1,
  },
  {
    id: 3,
    name: 'Victory Royale',
    description: 'Win 10 matches',
    icon: '👑',
    unlockedAt: 'Dec 8, 2024',
    progress: 1,
    maxProgress: 1,
  },
  {
    id: 4,
    name: 'Perfect Game',
    description: 'Win without taking damage',
    icon: '⭐',
    unlockedAt: 'Dec 3, 2024',
    progress: 1,
    maxProgress: 1,
  },
  {
    id: 5,
    name: 'Tournament Champion',
    description: 'Win a tournament',
    icon: '🏆',
    unlockedAt: null,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 6,
    name: 'Collector',
    description: 'Own 10 cosmetics',
    icon: '💎',
    unlockedAt: 'Dec 7, 2024',
    progress: 1,
    maxProgress: 1,
  },
  {
    id: 7,
    name: 'Season Legend',
    description: 'Reach top 100 on leaderboard',
    icon: '⚡',
    unlockedAt: null,
    progress: 45,
    maxProgress: 100,
  },
  {
    id: 8,
    name: 'Legendary',
    description: 'Reach 2000 ELO',
    icon: '🌟',
    unlockedAt: null,
    progress: 1847,
    maxProgress: 2000,
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'achievements' | 'cosmetics'>('overview');

  const userStats = {
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f1234',
    joinDate: 'November 15, 2024',
    totalMatches: 127,
    wins: 89,
    losses: 38,
    eloRating: 1847,
    currentStreak: 8,
    bestStreak: 12,
    favoriteUnit: 'Hero',
    seasonReward: 500,
    cosmetics: 12,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6">
      {/* Header / Banner */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="relative mb-8">
          {/* Banner Background */}
          <div className="h-40 bg-gradient-to-r from-cyan-900/40 to-indigo-900/40 rounded-xl border border-slate-700 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent)]" />
          </div>

          {/* Profile Card */}
          <div className="absolute left-6 bottom-0 transform translate-y-1/2">
            <div className="flex items-end gap-6">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 border-4 border-slate-950 shadow-xl flex items-center justify-center">
                <div className="text-6xl">⚔️</div>
              </div>

              {/* Quick Stats */}
              <div className="pb-4">
                <h1 className="text-3xl font-bold text-white mb-1">
                  {userStats.address.slice(0, 6)}...{userStats.address.slice(-4)}
                </h1>
                <p className="text-gray-400">Joined {userStats.joinDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer for avatar */}
        <div className="h-20" />

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="text-gray-400 text-xs mb-1">TOTAL MATCHES</div>
            <div className="text-2xl font-bold text-white">{userStats.totalMatches}</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="text-gray-400 text-xs mb-1">WINS</div>
            <div className="text-2xl font-bold text-green-400">{userStats.wins}</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="text-gray-400 text-xs mb-1">LOSSES</div>
            <div className="text-2xl font-bold text-red-400">{userStats.losses}</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="text-gray-400 text-xs mb-1">WIN RATE</div>
            <div className="text-2xl font-bold text-indigo-400">
              {Math.round((userStats.wins / userStats.totalMatches) * 100)}%
            </div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="text-gray-400 text-xs mb-1">ELO RATING</div>
            <div className="text-2xl font-bold text-cyan-400">{userStats.eloRating}</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="text-gray-400 text-xs mb-1">CURRENT STREAK</div>
            <div className="text-2xl font-bold text-yellow-400">🔥 {userStats.currentStreak}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700">
          {(['overview', 'achievements', 'cosmetics'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold border-b-2 transition-all duration-300 ${
                activeTab === tab
                  ? 'text-cyan-400 border-cyan-400'
                  : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'achievements' && 'Achievements'}
              {tab === 'cosmetics' && 'Cosmetics'}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Detailed Stats */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Recent Performance</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div>
                      <div className="text-white font-semibold">Win Rate This Week</div>
                      <div className="text-gray-400 text-sm">Last 7 days</div>
                    </div>
                    <div className="text-3xl font-bold text-green-400">78%</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div>
                      <div className="text-white font-semibold">Best Win Streak</div>
                      <div className="text-gray-400 text-sm">Career high</div>
                    </div>
                    <div className="text-3xl font-bold text-indigo-400">12</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div>
                      <div className="text-white font-semibold">ELO Gained</div>
                      <div className="text-gray-400 text-sm">This season</div>
                    </div>
                    <div className="text-3xl font-bold text-cyan-400">+247</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Game Preferences</h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-white font-semibold mb-2">Favorite Unit</div>
                    <div className="text-cyan-400 text-lg">{userStats.favoriteUnit}</div>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-2">Preferred Mode</div>
                    <div className="text-indigo-400 text-lg">Ranked</div>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-2">Average Game Duration</div>
                    <div className="text-green-400 text-lg">9:23</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seasonal Info */}
            <div className="bg-gradient-to-br from-indigo-900/40 to-cyan-900/40 border border-indigo-700/50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Season 3</h2>
              
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-2">Season Progress</div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-2 rounded-full" style={{ width: '72%' }} />
                  </div>
                  <div className="text-white font-semibold mt-2">Level 18</div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-2">Seasonal Reward</div>
                  <div className="text-2xl font-bold text-cyan-400">{userStats.seasonReward} CELO</div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-2">Next Level XP</div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: '45%' }} />
                  </div>
                  <div className="text-gray-400 text-xs mt-2">2,250 / 5,000 XP</div>
                </div>

                <button className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/50">
                  View Battle Pass
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div>
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">🏆</div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {mockAchievements.filter(a => a.unlockedAt).length} / {mockAchievements.length} Unlocked
                  </h2>
                  <p className="text-gray-400">
                    {mockAchievements.filter(a => a.unlockedAt).length * 10} points earned
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`rounded-lg p-4 border transition-all duration-300 ${
                    achievement.unlockedAt
                      ? 'bg-slate-900/50 border-slate-700 hover:border-cyan-600'
                      : 'bg-slate-900/30 border-slate-700/50 opacity-60'
                  }`}
                >
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h3 className="text-white font-bold text-sm mb-1">{achievement.name}</h3>
                  <p className="text-gray-400 text-xs mb-3">{achievement.description}</p>
                  
                  {achievement.unlockedAt ? (
                    <div className="text-cyan-400 text-xs font-semibold">
                      ✓ Unlocked {achievement.unlockedAt}
                    </div>
                  ) : (
                    <div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5 mb-1">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-1.5 rounded-full"
                          style={{
                            width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="text-gray-400 text-xs">
                        {achievement.progress} / {achievement.maxProgress}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cosmetics Tab */}
        {activeTab === 'cosmetics' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Your Collection
              </h2>
              <p className="text-gray-400">
                {userStats.cosmetics} cosmetics owned
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-slate-900/50 border border-slate-700 rounded-lg overflow-hidden hover:border-cyan-600 transition-all duration-300 cursor-pointer group"
                >
                  <div className="aspect-square bg-gradient-to-br from-cyan-900/40 to-indigo-900/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-4xl">
                      {['🎨', '🌟', '💎', '⚔️', '🔥', '❄️', '🌪️', '🌊', '🦅', '👑', '🎭', '🎪'][i]}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {['Cosmic Aura', 'Starlight', 'Diamond Shine', 'Infernal', 'Glacial', 'Storm', 'Tidal', 'Eagle Eye', 'Royal', 'Masked', 'Carnival', 'Festival'][i]}
                    </h3>
                    <p className="text-gray-400 text-xs">Skin</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/50">
                Visit Shop
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
