'use client';

import React, { useState } from 'react';

interface Invite {
  id: string;
  from: string;
  timestamp: string;
  expiresIn: string;
  mode: 'casual' | 'ranked';
  status: 'pending' | 'accepted' | 'expired';
}

interface ChallengeForm {
  playerAddress: string;
  mode: 'casual' | 'ranked';
  message: string;
}

export default function InvitesPage() {
  const [activeTab, setActiveTab] = useState<'pending' | 'sent' | 'history'>('pending');
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [formData, setFormData] = useState<ChallengeForm>({
    playerAddress: '',
    mode: 'ranked',
    message: ''
  });

  const pendingInvites: Invite[] = [
    {
      id: '1',
      from: '0x7c89...a3f2',
      timestamp: '5 minutes ago',
      expiresIn: '24 hours',
      mode: 'ranked',
      status: 'pending'
    },
    {
      id: '2',
      from: '0x4b12...f891',
      timestamp: '1 hour ago',
      expiresIn: '23 hours',
      mode: 'casual',
      status: 'pending'
    },
    {
      id: '3',
      from: '0x9e2d...bc44',
      timestamp: '3 hours ago',
      expiresIn: '21 hours',
      mode: 'ranked',
      status: 'pending'
    }
  ];

  const sentInvites: Invite[] = [
    {
      id: '4',
      from: '0x2f41...d7e3',
      timestamp: 'Sent 2 hours ago',
      expiresIn: '22 hours left',
      mode: 'ranked',
      status: 'pending'
    },
    {
      id: '5',
      from: '0x8a9c...5e12',
      timestamp: 'Sent 6 hours ago',
      expiresIn: 'Expires soon',
      mode: 'casual',
      status: 'pending'
    }
  ];

  const recentMatches: Invite[] = [
    {
      id: '6',
      from: '0x7c89...a3f2',
      timestamp: 'Won 1 day ago',
      expiresIn: '1847 ELO +23',
      mode: 'ranked',
      status: 'accepted'
    },
    {
      id: '7',
      from: '0x4b12...f891',
      timestamp: 'Lost 2 days ago',
      expiresIn: '1824 ELO -18',
      mode: 'ranked',
      status: 'accepted'
    }
  ];

  const handleChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Challenge sent:', formData);
    setShowChallengeModal(false);
    setFormData({ playerAddress: '', mode: 'ranked', message: '' });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            ⚔️ Invitations & Challenges
          </h1>
          <p className="text-slate-400 text-lg">
            Challenge players to battles and manage your invites
          </p>
        </div>

        {/* Challenge Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowChallengeModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-xl font-bold text-lg text-white hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all"
          >
            + SEND CHALLENGE
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700">
          {(['pending', 'sent', 'history'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize transition-all border-b-2 -mb-[2px] ${
                activeTab === tab
                  ? 'text-cyan-400 border-cyan-400'
                  : 'text-slate-400 border-transparent hover:text-slate-300'
              }`}
            >
              {tab === 'pending' && `📬 Pending (${pendingInvites.length})`}
              {tab === 'sent' && `📤 Sent (${sentInvites.length})`}
              {tab === 'history' && `📋 Recent Matches (${recentMatches.length})`}
            </button>
          ))}
        </div>

        {/* Pending Invites */}
        {activeTab === 'pending' && (
          <div className="space-y-4">
            {pendingInvites.length === 0 ? (
              <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-12 text-center">
                <div className="text-5xl mb-4">📭</div>
                <p className="text-slate-400 text-lg">No pending invitations</p>
              </div>
            ) : (
              pendingInvites.map(invite => (
                <div
                  key={invite.id}
                  className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                          ⚔️
                        </div>
                        <div>
                          <div className="text-white font-bold">{invite.from}</div>
                          <div className="text-slate-400 text-sm">{invite.timestamp}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          invite.mode === 'ranked'
                            ? 'bg-cyan-900/50 text-cyan-400'
                            : 'bg-indigo-900/50 text-indigo-400'
                        }`}>
                          {invite.mode === 'ranked' ? '⭐ Ranked' : '🎮 Casual'}
                        </span>
                        <span className="text-slate-400 text-xs">
                          Expires in {invite.expiresIn}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                      <button className="flex-1 md:flex-none px-6 py-3 rounded-lg border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 transition-all font-semibold">
                        ✓ Accept
                      </button>
                      <button className="flex-1 md:flex-none px-6 py-3 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-800 transition-all font-semibold">
                        ✕ Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Sent Invites */}
        {activeTab === 'sent' && (
          <div className="space-y-4">
            {sentInvites.length === 0 ? (
              <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-12 text-center">
                <div className="text-5xl mb-4">📤</div>
                <p className="text-slate-400 text-lg">No sent invitations</p>
              </div>
            ) : (
              sentInvites.map(invite => (
                <div
                  key={invite.id}
                  className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 hover:border-indigo-500/50 transition-all"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          🎯
                        </div>
                        <div>
                          <div className="text-white font-bold">{invite.from}</div>
                          <div className="text-slate-400 text-sm">{invite.timestamp}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          invite.mode === 'ranked'
                            ? 'bg-cyan-900/50 text-cyan-400'
                            : 'bg-indigo-900/50 text-indigo-400'
                        }`}>
                          {invite.mode === 'ranked' ? '⭐ Ranked' : '🎮 Casual'}
                        </span>
                        <span className="text-slate-400 text-xs">
                          {invite.expiresIn}
                        </span>
                      </div>
                    </div>

                    <button className="px-6 py-3 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-800 transition-all font-semibold w-full md:w-auto">
                      Cancel
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* History */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {recentMatches.map(match => (
              <div
                key={match.id}
                className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                        ✓
                      </div>
                      <div>
                        <div className="text-white font-bold">{match.from}</div>
                        <div className="text-slate-400 text-sm">{match.timestamp}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        match.mode === 'ranked'
                          ? 'bg-cyan-900/50 text-cyan-400'
                          : 'bg-indigo-900/50 text-indigo-400'
                      }`}>
                        {match.mode === 'ranked' ? '⭐ Ranked' : '🎮 Casual'}
                      </span>
                      <span className="text-green-400 font-semibold text-sm">
                        {match.expiresIn}
                      </span>
                    </div>
                  </div>

                  <button className="px-6 py-3 rounded-lg border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 transition-all font-semibold w-full md:w-auto">
                    Rematch
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Challenge Modal */}
      {showChallengeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Send Challenge
              </h2>
              <button
                onClick={() => setShowChallengeModal(false)}
                className="text-slate-400 hover:text-white transition-colors text-2xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleChallenge} className="space-y-6">
              {/* Player Address Input */}
              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  Player Address or Username
                </label>
                <input
                  type="text"
                  value={formData.playerAddress}
                  onChange={(e) => setFormData({ ...formData, playerAddress: e.target.value })}
                  placeholder="0x7c89... or ShadowKnight"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* Game Mode Selection */}
              <div>
                <label className="block text-slate-300 font-semibold mb-3">
                  Game Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['ranked', 'casual'] as const).map(mode => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setFormData({ ...formData, mode })}
                      className={`py-3 rounded-lg font-semibold transition-all border ${
                        formData.mode === mode
                          ? 'bg-cyan-600 border-cyan-400 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {mode === 'ranked' ? '⭐ Ranked' : '🎮 Casual'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  Message (Optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Add a personal message to your challenge..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none h-24"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowChallengeModal(false)}
                  className="flex-1 px-6 py-3 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all font-semibold"
                >
                  Send Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
