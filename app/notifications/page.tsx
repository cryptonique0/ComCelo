'use client';

import { useState } from 'react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'action',
      icon: 'swords',
      title: 'Your Turn',
      badge: 'Action Required',
      badgeColor: 'bg-primary text-background-dark',
      message: 'Match #8824 vs @CyberKnight. You have 24h to make a move.',
      timestamp: '2 mins ago',
      borderColor: 'border-primary/40',
      action: { label: 'Enter Match', primary: true },
      read: false,
    },
    {
      id: 2,
      type: 'invitation',
      icon: 'mail',
      title: 'Match Invitation',
      iconBg: 'bg-accent-blue/20',
      iconColor: 'text-accent-blue',
      message: '@CryptoQueen challenged you to a Ranked Duel on the Neon Wasteland map.',
      timestamp: '15 mins ago',
      borderColor: 'border-[#3b5447]',
      actions: [
        { label: 'Decline', primary: false },
        { label: 'Accept Challenge', primary: true, color: 'bg-accent-blue' },
      ],
      read: false,
    },
    {
      id: 3,
      type: 'tournament',
      icon: 'trophy',
      title: 'Tournament Update',
      iconBg: 'bg-accent-purple/20',
      iconColor: 'text-accent-purple',
      message: 'Season 1: Quarter Finals brackets have been generated. Check your opponent.',
      timestamp: '2 hours ago',
      borderColor: 'border-[#3b5447]',
      action: { label: 'View Bracket', color: 'border-accent-purple/30 bg-accent-purple/10 text-accent-purple' },
      read: false,
    },
    {
      id: 4,
      type: 'alert',
      icon: 'warning',
      title: 'System Alert',
      iconBg: 'bg-accent-red/20',
      iconColor: 'text-accent-red',
      message: 'Scheduled maintenance for the Celo node infrastructure.',
      timestamp: 'Yesterday',
      borderColor: 'border-accent-red/30',
      action: { label: 'Dismiss', secondary: true },
      read: false,
    },
    {
      id: 5,
      type: 'content',
      icon: 'article',
      title: 'New Content Available',
      message: 'Patch 1.2 notes are live. New units added to the roster.',
      timestamp: '2 days ago',
      borderColor: 'border-[#3b5447]/50',
      action: { label: 'Read Notes', secondary: true },
      muted: true,
      read: true,
    },
    {
      id: 6,
      type: 'reward',
      icon: 'military_tech',
      title: 'Reward Claimed',
      message: 'You successfully claimed 50 $CELO from the weekly pool.',
      timestamp: '3 days ago',
      borderColor: 'border-[#3b5447]/50',
      action: { label: 'Clear', secondary: true },
      muted: true,
      read: true,
    },
  ]);

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDismiss = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <main className="relative isolate flex flex-col pb-16 text-white">
      <div className="flex-1 flex justify-center w-full py-8">
        <div className="flex flex-col max-w-[960px] w-full px-4 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-white text-3xl font-black leading-tight tracking-[-0.033em]">Notifications</h1>
              <p className="text-[#9db9ab] text-sm mt-1">Stay updated on your matches, tournaments, and system alerts.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleMarkAllAsRead}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#3b5447] bg-[#1c2721] text-xs font-bold text-[#9db9ab] hover:text-white hover:border-primary/50 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">done_all</span>
                Mark all as read
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#3b5447] bg-[#1c2721] text-xs font-bold text-[#9db9ab] hover:text-white hover:border-primary/50 transition-colors">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                Filter
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`w-full relative overflow-hidden rounded-xl border transition-all duration-300 ${
                  notif.muted
                    ? 'border-[#3b5447]/50 bg-[#102219] opacity-75 hover:opacity-100'
                    : `${notif.borderColor} bg-[#1c2721] ${notif.type === 'action' ? 'shadow-[0_0_15px_rgba(19,236,128,0.1)]' : 'hover:bg-[#233029]'}`
                } group`}
              >
                {notif.type === 'action' && <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>}
                {notif.type === 'invitation' && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#3b82f6] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                )}
                {notif.type === 'alert' && <div className="absolute top-0 left-0 w-1 h-full bg-[#ef4444]"></div>}

                <div className="p-5 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-1 flex-shrink-0 size-10 rounded-full flex items-center justify-center ${
                        notif.type === 'action' ? 'bg-primary/20 text-primary animate-pulse' : `${notif.iconBg || 'bg-[#3b5447]/30'} ${notif.iconColor || 'text-[#9db9ab]'}`
                      }`}
                    >
                      <span className="material-symbols-outlined">{notif.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`${notif.muted ? 'text-[#9db9ab]' : 'text-white'} text-${notif.type === 'action' ? 'lg' : 'base'} font-bold`}>
                          {notif.title}
                        </h3>
                        {notif.badge && <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${notif.badgeColor}`}>{notif.badge}</span>}
                        {!notif.read && notif.type !== 'action' && <span className="size-2 rounded-full bg-primary"></span>}
                      </div>
                      <p
                        className={`text-sm ${
                          notif.muted
                            ? 'text-[#5f7468]'
                            : notif.type === 'action'
                              ? 'text-[#d1d5db]'
                              : 'text-[#9db9ab]'
                        }`}
                      >
                        {notif.message.split('@').map((part, i) => (
                          <span key={i}>
                            {i > 0 && <span className="text-primary font-medium">@{part.split(' ')[0]} </span>}
                            {i > 0 && part.split(' ').slice(1).join(' ')}
                            {i === 0 && part}
                          </span>
                        ))}
                      </p>
                      <p className={`text-xs mt-2 font-mono ${notif.muted ? 'text-[#3b5447]' : 'text-[#5f7468]'}`}>{notif.timestamp}</p>
                    </div>
                  </div>

                  <div className={`${notif.actions ? 'flex gap-3' : ''} flex-shrink-0 w-full md:w-auto`}>
                    {notif.actions ? (
                      notif.actions.map((actionBtn, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleDismiss(notif.id)}
                          className={`flex-1 md:flex-none flex cursor-pointer items-center justify-center rounded-lg h-9 px-4 text-xs font-bold transition-colors ${
                            actionBtn.primary
                              ? `${actionBtn.color || 'bg-[#3b82f6]'} text-white hover:opacity-90`
                              : 'border border-[#3b5447] bg-transparent text-white hover:bg-[#3b5447]/30'
                          }`}
                        >
                          {actionBtn.label}
                        </button>
                      ))
                    ) : notif.action ? (
                      <button
                        onClick={() => handleMarkAsRead(notif.id)}
                        className={`w-full md:w-auto flex cursor-pointer items-center justify-center rounded-lg px-6 text-sm font-bold transition-all ${
                          notif.action.primary
                            ? 'h-10 bg-primary text-background-dark hover:bg-opacity-90'
                            : notif.action.secondary
                              ? 'h-9 px-4 text-[#5f7468] hover:text-white'
                              : `h-9 px-4 border ${notif.action.color || 'border-[#3b5447]/30 bg-[#3b5447]/10 text-[#9db9ab]'} hover:opacity-90`
                        }`}
                      >
                        {notif.action.label}
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button className="text-[#9db9ab] text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">history</span>
              Load older notifications
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
