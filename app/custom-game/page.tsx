'use client';

import { useState } from 'react';

export default function CustomGamePage() {
  const [gameMode, setGameMode] = useState<'ranked' | 'practice'>('ranked');
  const [turnTimer, setTurnTimer] = useState(30);
  const [wager, setWager] = useState('');
  const [opponent, setOpponent] = useState('');
  const [bannedUnits, setBannedUnits] = useState<string[]>(['bolt']);
  const [selectedMap, setSelectedMap] = useState('grid-zero');

  const maps = [
    { id: 'grid-zero', name: 'Grid Zero', desc: 'Standard 3x3 • Close Quarters' },
    { id: 'obsidian', name: 'Obsidian', desc: '4x4 • Medium Range' },
    { id: 'void', name: 'Void', desc: '5x5 • Open Field' },
  ];

  const units = [
    { id: 'swords', name: 'Warrior' },
    { id: 'bolt', name: 'Mage' },
    { id: 'arrow_range', name: 'Archer' },
    { id: 'visibility', name: 'Scout' },
  ];

  const toggleUnitBan = (unitId: string) => {
    setBannedUnits((prev) => (prev.includes(unitId) ? prev.filter((u) => u !== unitId) : [...prev, unitId]));
  };

  const getTimerLabel = () => {
    if (turnTimer <= 15) return 'Blitz (15s)';
    if (turnTimer <= 60) return 'Standard (60s)';
    return 'Tactical (120s)';
  };

  return (
    <main className="flex-1 w-full max-w-[1024px] mx-auto px-6 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <a className="hover:text-primary transition-colors" href="/">
          Home
        </a>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <a className="hover:text-primary transition-colors" href="/play">
          Play
        </a>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-slate-900 dark:text-white font-medium">Custom Match</span>
      </nav>

      {/* Page Heading */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 border-b border-gray-200 dark:border-white/10 pb-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Match Config</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg">
            Set the parameters for your tactical engagement on the Celo network. Configure rules, stakes, and invite your opponent.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-sm">rocket_launch</span>
          Frame Compatible
        </div>
      </div>

      {/* Configuration Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Settings */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Game Mode Selector */}
          <div className="space-y-3">
            <label className="text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">Game Mode</label>
            <div className="flex p-1 bg-gray-200 dark:bg-[#162e22] rounded-lg">
              <label className="flex-1 cursor-pointer">
                <input
                  checked={gameMode === 'ranked'}
                  className="peer sr-only"
                  name="mode"
                  onChange={() => setGameMode('ranked')}
                  type="radio"
                  value="ranked"
                />
                <div className="flex items-center justify-center gap-2 py-2.5 rounded-md transition-all peer-checked:bg-primary peer-checked:text-background-dark peer-checked:shadow-sm text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white">
                  <span className="material-symbols-outlined text-[18px]">trophy</span>
                  <span className="text-sm font-bold">Ranked</span>
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  checked={gameMode === 'practice'}
                  className="peer sr-only"
                  name="mode"
                  onChange={() => setGameMode('practice')}
                  type="radio"
                  value="practice"
                />
                <div className="flex items-center justify-center gap-2 py-2.5 rounded-md transition-all peer-checked:bg-primary peer-checked:text-background-dark peer-checked:shadow-sm text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white">
                  <span className="material-symbols-outlined text-[18px]">sports_esports</span>
                  <span className="text-sm font-bold">Practice</span>
                </div>
              </label>
            </div>
          </div>

          {/* Rules Card */}
          <div className="bg-white dark:bg-[#162e22] border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">tune</span>
              Match Rules
            </h3>

            {/* Turn Timer */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium">Turn Timer</label>
                <span className="text-primary font-mono font-bold text-lg">{turnTimer}s</span>
              </div>
              <input
                className="w-full h-2 bg-gray-200 dark:bg-black/40 rounded-lg appearance-none cursor-pointer accent-primary"
                max="120"
                min="15"
                onChange={(e) => setTurnTimer(parseInt(e.target.value))}
                step="15"
                type="range"
                value={turnTimer}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
                <span>Blitz (15s)</span>
                <span>Standard (60s)</span>
                <span>Tactical (120s)</span>
              </div>
            </div>

            {/* Wager & Unit Bans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Wager Amount (CELO)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary">currency_bitcoin</span>
                  </div>
                  <input
                    className="block w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-mono"
                    onChange={(e) => setWager(e.target.value)}
                    placeholder="0.00"
                    type="number"
                    value={wager}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-xs font-bold text-gray-500">CELO</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Balance: 0.42 CELO</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Restricted Units</label>
                <div className="flex gap-2">
                  {units.map((unit) => (
                    <button
                      key={unit.id}
                      onClick={() => toggleUnitBan(unit.id)}
                      className={`size-11 rounded-lg border transition-all flex items-center justify-center relative group ${
                        bannedUnits.includes(unit.id)
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 text-gray-400 hover:text-primary hover:border-primary'
                      }`}
                      title={`Ban ${unit.name}`}
                      type="button"
                    >
                      <span className="material-symbols-outlined">{unit.id}</span>
                      {bannedUnits.includes(unit.id) && (
                        <div className="absolute -top-1 -right-1 size-3 bg-red-500 rounded-full border-2 border-[#162e22] flex items-center justify-center">
                          <span className="material-symbols-outlined text-[8px] text-white font-bold">close</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Click to ban units from this match.</p>
              </div>
            </div>
          </div>

          {/* Opponent Selection */}
          <div className="space-y-3">
            <label className="text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">Opponent</label>
            <div className="bg-white dark:bg-[#162e22] border border-gray-200 dark:border-white/5 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex-1 w-full">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <span className="material-symbols-outlined text-[20px]">alternate_email</span>
                  </span>
                  <input
                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                    onChange={(e) => setOpponent(e.target.value)}
                    placeholder="Farcaster username or 0x..."
                    type="text"
                    value={opponent}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="text-xs text-gray-500 whitespace-nowrap hidden md:block">OR</span>
                <button
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-gray-300 dark:border-white/20 hover:border-primary hover:text-primary text-sm font-medium transition-all group"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] group-hover:rotate-45 transition-transform">link</span>
                  <span className="hidden sm:inline">Copy Invite Link</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visuals & Confirmation */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Map Selection Card */}
          <div className="bg-white dark:bg-[#162e22] border border-gray-200 dark:border-white/5 rounded-xl p-1 overflow-hidden">
            <div className="relative aspect-square w-full rounded-lg overflow-hidden group cursor-pointer">
              <div
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDm66nbI_MJO8YIuHIaVfNmgzTnIOVnDG84eZJha9nwFrnJM4V0KuJyxExLbJgMu3Tvz1R5PxZttRxhaqXr8WfSj1jJfMYMvDIcMdcjr8vy3rhe6McJwxSy7h257mrw64lbhYs7oO5V74N15KpZgQeo5BB-AqSZmGuk8MEiIgpYlrYZ-wHCDoyjpRU8mduJbwEg1bfhIRjI87FAhQLzOXRiSP42DysG1gMJjxB1t85f5O1yr_DCTo9pNQeWcsV13eZXhr0nP8ryHMU')",
                }}
              />

              {/* Map Overlay Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-primary text-xs font-bold uppercase tracking-wider mb-1 block">Selected Map</span>
                    <h3 className="text-2xl font-bold text-white">Grid Zero</h3>
                    <p className="text-gray-300 text-sm">Standard 3x3 • Close Quarters</p>
                  </div>
                  <button className="size-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-black transition-colors">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Map Variants */}
            <div className="flex gap-2 p-3 overflow-x-auto">
              {maps.map((map) => (
                <div
                  key={map.id}
                  onClick={() => setSelectedMap(map.id)}
                  className={`w-16 h-12 rounded border-2 overflow-hidden shrink-0 cursor-pointer transition-all ${
                    selectedMap === map.id ? 'border-primary' : 'border-gray-200 dark:border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        map.id === 'grid-zero'
                          ? "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCvU_J2Pe1hLZ_qaiISxR4yHgc4WLg19mipA7QXC2YN8tYk-lFpIWov438Rt3UQ9OhKxmERRJp5dQZTIAXhhyf5RUOzVa_lYCD6VzO3XOeRFcnKEiFq2q1RdoQPREADYF775kPWOLMh9MHIaBAyF9bMpobIWTrhr1D2BJzEw0eviIwdru8mpCQSq1pnSV2pDbV4y5xFh_PtQLGSkKnD50WLJM36Ch-Nkzk_JWzJUfeEhzp9SXf8oqBrpyUjPcESEARwRWxaZe0-iXg')"
                          : 'none',
                      backgroundColor:
                        map.id === 'grid-zero' ? 'transparent' : map.id === 'obsidian' ? '#1f2937' : '#0f172a',
                    }}
                  >
                    {map.id !== 'grid-zero' && (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-xs text-gray-500">
                          {map.id === 'obsidian' ? 'grid_4x4' : 'apps'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Area */}
          <div className="bg-gray-100 dark:bg-black/30 rounded-xl p-6 border border-gray-200 dark:border-white/5 flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Est. Network Fee</span>
              <div className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-[14px]">local_gas_station</span>
                <span className="font-mono">{'< 0.001 CELO'}</span>
              </div>
            </div>
            <button className="w-full py-4 bg-primary hover:bg-[#0fd671] active:bg-[#0dbd63] text-[#162e22] font-bold text-lg rounded-lg shadow-[0_0_20px_rgba(19,236,128,0.3)] hover:shadow-[0_0_30px_rgba(19,236,128,0.5)] transition-all flex items-center justify-center gap-3">
              <span className="material-symbols-outlined">swords</span>
              Create Game
            </button>
            <p className="text-center text-xs text-gray-400">
              By creating this match, you agree to the <a className="underline hover:text-white" href="#">Smart Contract Terms</a>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
