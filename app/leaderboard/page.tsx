"use client";

import React from 'react';

interface LeaderboardEntry {
  rank: number;
  address: string;
  wins: number;
  losses: number;
  eloRating: number;
  streak: number;
  achievements: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    address: '0x7c89...a3f2',
    wins: 127,
    losses: 23,
    eloRating: 1847,
    streak: 8,
    achievements: 7,
  },
  {
    rank: 2,
    address: '0x4b12...f891',
    wins: 114,
    losses: 31,
    eloRating: 1792,
    streak: 5,
    achievements: 6,
  },
  {
    rank: 3,
    address: '0x9e2d...bc44',
    wins: 98,
    losses: 42,
    eloRating: 1734,
    streak: 3,
    achievements: 5,
  },
  {
    rank: 4,
    address: '0x2f41...d7e3',
    wins: 87,
    losses: 49,
    eloRating: 1678,
    streak: 1,
    achievements: 4,
  },
  {
    rank: 5,
    address: '0x8a9c...5e12',
    wins: 76,
    losses: 58,
    eloRating: 1621,
    streak: 0,
    achievements: 3,
  },
];

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = React.useState<'all' | 'season' | 'month'>('season');
  const [selectedEntry, setSelectedEntry] = React.useState<LeaderboardEntry | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 mb-2">
            Leaderboard
          </h1>
          <p className="text-gray-400 text-lg">
            Top players ranked by ELO rating
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex justify-center gap-4 mb-8">
          {(['all', 'season', 'month'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                timeframe === tf
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              {tf === 'all' && 'All Time'}
              {tf === 'season' && 'This Season'}
              {tf === 'month' && 'This Month'}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl overflow-hidden backdrop-blur-sm">
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-gradient-to-r from-cyan-900/40 to-indigo-900/40 border-b border-slate-700 font-semibold text-sm">
            <div className="text-gray-300">Rank</div>
            <div className="text-gray-300 col-span-2">Player</div>
            <div className="text-gray-300 text-center">Record</div>
            <div className="text-cyan-400 text-center">ELO</div>
            <div className="text-indigo-400 text-right">Streak</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-800">
            {mockLeaderboard.map((entry, idx) => (
              <div
                key={entry.rank}
                onClick={() => setSelectedEntry(entry)}
                className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-slate-800/50 cursor-pointer transition-colors duration-200"
              >
                {/* Rank */}
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                    entry.rank === 1
                      ? 'bg-yellow-500 text-slate-900'
                      : entry.rank === 2
                      ? 'bg-gray-400 text-slate-900'
                      : entry.rank === 3
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-700 text-gray-300'
                  }`}>
                    {entry.rank}
                  </div>
                </div>

                {/* Player Address */}
                <div className="col-span-2 flex items-center">
                  <div>
                    <div className="font-semibold text-white">{entry.address}</div>
                    <div className="text-sm text-gray-400">
                      {entry.achievements} achievements
                    </div>
                  </div>
                </div>

                {/* Win/Loss Record */}
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-bold text-white">{entry.wins}W</div>
                    <div className="text-sm text-gray-400">{entry.losses}L</div>
                  </div>
                </div>

                {/* ELO Rating */}
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">
                      {entry.eloRating}
                    </div>
                    <div className="text-xs text-gray-500">ELO</div>
                  </div>
                </div>

                {/* Win Streak */}
                <div className="flex items-center justify-end">
                  {entry.streak > 0 ? (
                    <div className="text-right">
                      <div className="text-lg font-bold text-indigo-400">
                        🔥 {entry.streak}
                      </div>
                      <div className="text-xs text-gray-500">win streak</div>
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">-</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 max-w-md w-full">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-white">
                {selectedEntry.address}
              </h2>
              <button
                onClick={() => setSelectedEntry(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Rank</div>
                <div className="text-3xl font-bold text-cyan-400">
                  #{selectedEntry.rank}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">ELO Rating</div>
                  <div className="text-2xl font-bold text-indigo-400">
                    {selectedEntry.eloRating}
                  </div>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Win Rate</div>
                  <div className="text-2xl font-bold text-green-400">
                    {Math.round(
                      (selectedEntry.wins / (selectedEntry.wins + selectedEntry.losses)) * 100
                    )}%
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Wins</div>
                  <div className="text-2xl font-bold text-white">
                    {selectedEntry.wins}
                  </div>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Losses</div>
                  <div className="text-2xl font-bold text-white">
                    {selectedEntry.losses}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-900/40 to-cyan-900/40 p-4 rounded-lg border border-indigo-700/50">
                <div className="text-sm text-gray-400 mb-2">Current Streak</div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🔥</span>
                  <div className="text-2xl font-bold text-indigo-400">
                    {selectedEntry.streak} wins
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-2">Achievements</div>
                <div className="flex gap-2">
                  {Array.from({ length: selectedEntry.achievements }).map((_, i) => (
                    <span key={i} className="text-2xl">🏆</span>
                  ))}
                  {Array.from({ length: 8 - selectedEntry.achievements }).map((_, i) => (
                    <span key={i} className="text-2xl opacity-30">🏆</span>
                  ))}
                </div>
              </div>

              <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/50">
                Challenge Player
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Seasonal Info */}
      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Season 3 Ends In</div>
          <div className="text-3xl font-bold text-cyan-400">14 days</div>
          <div className="text-gray-500 text-sm mt-2">
            Climb the ladder for seasonal rewards
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Top Player</div>
          <div className="text-2xl font-bold text-indigo-400">
            {mockLeaderboard[0].address}
          </div>
          <div className="text-gray-500 text-sm mt-2">
            {mockLeaderboard[0].eloRating} ELO • {mockLeaderboard[0].wins} wins
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Total Players</div>
          <div className="text-3xl font-bold text-green-400">4,127</div>
          <div className="text-gray-500 text-sm mt-2">
            +342 this week
          </div>
        </div>
      </div>
    </div>
  );
}
