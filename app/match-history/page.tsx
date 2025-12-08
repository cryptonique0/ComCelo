import React from 'react';

interface Match {
  id: string;
  opponent: string;
  result: 'win' | 'loss';
  eloChange: number;
  date: string;
  duration: string;
  heroHPRemaining: number;
  opponentHeroHPRemaining: number;
  mode: 'ranked' | 'casual' | 'tournament';
}

const mockMatches: Match[] = [
  {
    id: '0x1abc...def2',
    opponent: '0x7c89...a3f2',
    result: 'win',
    eloChange: 24,
    date: '2 hours ago',
    duration: '8:42',
    heroHPRemaining: 67,
    opponentHeroHPRemaining: 0,
    mode: 'ranked',
  },
  {
    id: '0x2bcd...abc1',
    opponent: '0x4b12...f891',
    result: 'loss',
    eloChange: -18,
    date: '5 hours ago',
    duration: '12:15',
    heroHPRemaining: 0,
    opponentHeroHPRemaining: 45,
    mode: 'ranked',
  },
  {
    id: '0x3cde...bcd2',
    opponent: '0x9e2d...bc44',
    result: 'win',
    eloChange: 21,
    date: '1 day ago',
    duration: '7:33',
    heroHPRemaining: 89,
    opponentHeroHPRemaining: 12,
    mode: 'casual',
  },
  {
    id: '0x4def...cde3',
    opponent: '0x2f41...d7e3',
    result: 'win',
    eloChange: 19,
    date: '2 days ago',
    duration: '6:18',
    heroHPRemaining: 100,
    opponentHeroHPRemaining: 0,
    mode: 'tournament',
  },
  {
    id: '0x5e01...def4',
    opponent: '0x8a9c...5e12',
    result: 'loss',
    eloChange: -22,
    date: '3 days ago',
    duration: '14:02',
    heroHPRemaining: 15,
    opponentHeroHPRemaining: 38,
    mode: 'ranked',
  },
];

export default function MatchHistoryPage() {
  const [filter, setFilter] = React.useState<'all' | 'ranked' | 'casual' | 'tournament'>('all');
  const [selectedMatch, setSelectedMatch] = React.useState<Match | null>(null);

  const filteredMatches = filter === 'all'
    ? mockMatches
    : mockMatches.filter(m => m.mode === filter);

  const stats = {
    totalMatches: mockMatches.length,
    wins: mockMatches.filter(m => m.result === 'win').length,
    losses: mockMatches.filter(m => m.result === 'loss').length,
    winRate: Math.round(
      (mockMatches.filter(m => m.result === 'win').length / mockMatches.length) * 100
    ),
    totalEloGain: mockMatches.reduce((sum, m) => sum + (m.result === 'win' ? m.eloChange : 0), 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 mb-2">
            Match History
          </h1>
          <p className="text-gray-400 text-lg">
            Review your past battles and stats
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-center">
            <div className="text-gray-400 text-sm mb-1">Total Matches</div>
            <div className="text-2xl font-bold text-white">{stats.totalMatches}</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-center">
            <div className="text-gray-400 text-sm mb-1">Wins</div>
            <div className="text-2xl font-bold text-green-400">{stats.wins}</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-center">
            <div className="text-gray-400 text-sm mb-1">Losses</div>
            <div className="text-2xl font-bold text-red-400">{stats.losses}</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-center">
            <div className="text-gray-400 text-sm mb-1">Win Rate</div>
            <div className="text-2xl font-bold text-indigo-400">{stats.winRate}%</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-center">
            <div className="text-gray-400 text-sm mb-1">ELO Gained</div>
            <div className="text-2xl font-bold text-cyan-400">+{stats.totalEloGain}</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 flex-wrap">
          {(['all', 'ranked', 'casual', 'tournament'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                filter === mode
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              {mode === 'all' && 'All Matches'}
              {mode === 'ranked' && 'Ranked'}
              {mode === 'casual' && 'Casual'}
              {mode === 'tournament' && 'Tournament'}
            </button>
          ))}
        </div>
      </div>

      {/* Match List */}
      <div className="max-w-6xl mx-auto space-y-4">
        {filteredMatches.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🎮</div>
            <p className="text-gray-400 text-lg">No matches found</p>
          </div>
        ) : (
          filteredMatches.map((match) => (
            <div
              key={match.id}
              onClick={() => setSelectedMatch(match)}
              className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-600 cursor-pointer transition-all duration-300 hover:bg-slate-900/70"
            >
              <div className="flex items-center justify-between">
                {/* Result Badge */}
                <div className="flex items-center gap-4">
                  <div
                    className={`flex items-center justify-center w-16 h-16 rounded-full font-bold text-white ${
                      match.result === 'win'
                        ? 'bg-gradient-to-br from-green-500 to-green-600'
                        : 'bg-gradient-to-br from-red-500 to-red-600'
                    }`}
                  >
                    {match.result === 'win' ? '✓' : '✗'}
                  </div>

                  {/* Match Info */}
                  <div>
                    <div className="text-white font-semibold text-lg">
                      vs {match.opponent}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {match.date} • {match.duration}
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-8">
                  {/* Mode Badge */}
                  <div className="hidden md:block">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      match.mode === 'ranked'
                        ? 'bg-indigo-900 text-indigo-200'
                        : match.mode === 'tournament'
                        ? 'bg-yellow-900 text-yellow-200'
                        : 'bg-slate-800 text-gray-300'
                    }`}>
                      {match.mode === 'ranked' && '⭐ Ranked'}
                      {match.mode === 'casual' && '🎮 Casual'}
                      {match.mode === 'tournament' && '🏆 Tournament'}
                    </span>
                  </div>

                  {/* ELO Change */}
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${
                      match.result === 'win' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {match.result === 'win' ? '+' : ''}{match.eloChange}
                    </div>
                    <div className="text-gray-400 text-sm">ELO</div>
                  </div>

                  {/* HP Info */}
                  <div className="text-right hidden sm:block">
                    <div className="text-white font-semibold">
                      {match.heroHPRemaining > 0 ? match.heroHPRemaining : 0}
                      <span className="text-gray-400 text-sm"> / 100</span>
                    </div>
                    <div className="text-gray-400 text-sm">Hero HP</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Match {selectedMatch.id.slice(0, 8)}
                </h2>
                <p className="text-gray-400">{selectedMatch.date}</p>
              </div>
              <button
                onClick={() => setSelectedMatch(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Your Team */}
              <div className="bg-slate-800/50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4">You</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hero HP</span>
                    <span className="text-white font-semibold">
                      {selectedMatch.heroHPRemaining} / 100
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
                      style={{
                        width: `${(selectedMatch.heroHPRemaining / 100) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Opponent Team */}
              <div className="bg-slate-800/50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  {selectedMatch.opponent}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hero HP</span>
                    <span className="text-white font-semibold">
                      {selectedMatch.opponentHeroHPRemaining} / 100
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full"
                      style={{
                        width: `${(selectedMatch.opponentHeroHPRemaining / 100) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Match Details */}
            <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-white mb-4">Match Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-gray-400 text-sm">Duration</div>
                  <div className="text-white font-semibold">{selectedMatch.duration}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Mode</div>
                  <div className="text-white font-semibold capitalize">{selectedMatch.mode}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Result</div>
                  <div className={`font-semibold capitalize ${
                    selectedMatch.result === 'win' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {selectedMatch.result}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">ELO Change</div>
                  <div className={`font-semibold ${
                    selectedMatch.result === 'win' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {selectedMatch.result === 'win' ? '+' : ''}{selectedMatch.eloChange}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/50">
                Rematch
              </button>
              <button className="flex-1 px-6 py-3 border border-slate-600 text-white font-bold rounded-lg hover:bg-slate-800 transition-all duration-300">
                Watch Replay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
