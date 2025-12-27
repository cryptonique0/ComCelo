'use client';

interface UnitStats {
  name: string;
  type: 'hero' | 'soldier' | 'archer';
  description: string;
  hp: number;
  atk: number;
  def: number;
  range: string;
  badge: string;
  badgeColor: string;
  image: string;
  label: string;
}

export default function GameRules() {
  const units: UnitStats[] = [
    {
      name: 'Commander Unit',
      type: 'hero',
      description: 'High value target. Balanced stats with leadership capabilities.',
      hp: 120,
      atk: 45,
      def: 20,
      range: '1',
      badge: 'HERO',
      badgeColor: 'yellow',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAh9xEflCwse9CfSiwx6zOYuWJYdrd9mg70qijC1COmIE6x0sInu8JiSJI1FdLz8MTxOYGwIGvNAmjnB7F3qIiuz-FNc6ek7vg_nFX9uatMT7fsw9Tuvp4liOgOG5kuDp3u2LgwFQKoVEgl7paQMHNMFuwDEG0XmyujFsI5gz_uBgOefaKQx_Zpb8T7zcvC18S7pw7GlNTPkMe0sJXUoe3PjEf2EcgWUBhIjGQyGASoWjsIeq1tXG7FDeiAwpzZRVhkrltTCC2adM',
      label: 'CMD'
    },
    {
      name: 'Infantry Unit',
      type: 'soldier',
      description: 'Frontline defender. High HP and Defense, lower mobility.',
      hp: 150,
      atk: 30,
      def: 35,
      range: '1',
      badge: 'SOLDIER',
      badgeColor: 'blue',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeRaOzKrY_APo8-DZ8zId2FAzDUnQxsLJnlPP6k9-ozPZ6UOCvP9rlk2GvdiVHXwA35WQH93RgAU9_5IZbhozfmUX4BcAhYMLbCZjkIoGgM76_9R9HP7KEu1iOiT88hPbY8aswJwZwNHzC6LRhPCV0zfEeYMX6RV2EfHykp2qLij2g19NofsBYCUEWJZ24yJrp0U2x8koHf7JFrgVX4ZG1Jvhel5tt5tdQQHL0IE7kotTQI5HZt-Vi-0fjARNJSYe-YW4w9lw5L5U',
      label: 'INF'
    },
    {
      name: 'Ranged Support',
      type: 'archer',
      description: 'Glass cannon. Low HP, but can attack from distance.',
      hp: 80,
      atk: 55,
      def: 10,
      range: '2-3',
      badge: 'ARCHER',
      badgeColor: 'green',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUqQajQR8LZ6ztAYPd1ALVf-z_EGfXyXU7CsyJYR1dLEwkhMRpFBVptfsJx5psQ5rsv8s9KjajXaBNTQmNtz-qWb4JuE6RqpwHHLC48yZPGCVXABmUTk7WM9oEtN6v71hIZtDli6SPv1yKaByDVnhkWTDoKndJzqdPXxJcgK4MS7ZNE3YlyeKYSe7BGvMeY8552RL5P12gg621oLzufKMtQv-bCIaqe30k6UqzI0ZsICmnxaIw7yQEj9CpPhJryaZ1XU1U7TWbh78',
      label: 'RNG'
    }
  ];

  const getStatBarColor = (stat: 'hp' | 'atk' | 'def' | 'range') => {
    switch(stat) {
      case 'hp': return 'bg-green-500';
      case 'atk': return 'bg-red-500';
      case 'def': return 'bg-blue-500';
      case 'range': return 'bg-yellow-500';
    }
  };

  const getStatPercentage = (value: number, max: number = 150) => {
    return (value / max) * 100;
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar Navigation */}
      <aside className="hidden md:flex flex-col w-64 h-full border-r border-[#283930] bg-[#111814]">
        <div className="flex flex-col h-full p-4 justify-between">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col px-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-primary text-3xl">token</span>
                <h1 className="text-white text-xl font-bold tracking-tight">ComCelo</h1>
              </div>
              <p className="text-[#9db9ab] text-xs font-normal uppercase tracking-widest pl-1">Tactical Strategy</p>
            </div>
            <nav className="flex flex-col gap-2">
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="/dashboard">
                <span className="material-symbols-outlined">dashboard</span>
                <span className="text-sm font-medium">Dashboard</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="/game">
                <span className="material-symbols-outlined">target</span>
                <span className="text-sm font-medium">Missions</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg bg-[#283930] text-white border-l-2 border-primary group transition-all" href="/rules">
                <span className="material-symbols-outlined group-hover:text-primary transition-colors">menu_book</span>
                <span className="text-sm font-medium">Rules & Units</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="/tournaments">
                <span className="material-symbols-outlined">leaderboard</span>
                <span className="text-sm font-medium">Leaderboard</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="/profile">
                <span className="material-symbols-outlined">settings</span>
                <span className="text-sm font-medium">Settings</span>
              </a>
            </nav>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#1c2721] to-[#111814] border border-[#283930]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cover bg-center border border-primary/30" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJ-Yoolg08dNz1d32h5NxbOzuOLv7srIViZD45dHZVkyQFeeUp8YrdPVR0SXl7f3nUO5H2fKkEC8XJpNKWgIBBkJskutZ8lqddTo0C4UtTYLluV7znuXIIpkYXNYGPYyfxkYaDSB0Lg4bsKGZErtYBl5dwJI6gIMSgv6V144xAspezRj3ZumHP5vKQ0LE_RnxaEcxuccQblPCK00q93_CrqlFWrTWPxfksh4V2muexMHm-PR0YXpXM9HrNJagEqBl5z4zIi7VXbXY')"}}></div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-bold">Commander</span>
                <span className="text-primary text-xs">Online</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#283930] bg-[#111814]/90 backdrop-blur-md px-6 py-4 sticky top-0 z-20">
          <div className="md:hidden flex items-center gap-3">
            <span className="material-symbols-outlined text-white">menu</span>
            <span className="text-white font-bold text-lg">ComCelo</span>
          </div>
          <div className="hidden md:flex flex-col">
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">TACTICAL DATABASE</h2>
            <p className="text-[#9db9ab] text-xs font-mono">ARCHIVES ACCESSED // READ ONLY</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-[#1c2721] hover:bg-[#283930] border border-[#283930] rounded-lg px-3 py-2 text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-sm font-mono font-medium">0x71C...9A2</span>
            </button>
            <button className="relative p-2 rounded-lg bg-[#1c2721] hover:bg-[#283930] text-white transition-colors">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#1c2721]"></span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gradient-to-b from-background-dark to-[#0a1410]">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#283930] pb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Game Rules & Unit Analysis</h1>
                <p className="text-[#9db9ab] max-w-2xl">Essential combat protocols and unit specifications for ComCelo tactical engagements. Review before deployment.</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded bg-[#283930] text-xs text-[#9db9ab] border border-[#3e5246]">V 1.2.0</span>
                <span className="px-3 py-1 rounded bg-[#283930] text-xs text-primary border border-primary/20">LIVE</span>
              </div>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column - Rules */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Grid Protocol */}
                <section className="bg-[#1c2721] border border-[#283930] rounded-xl overflow-hidden">
                  <div className="bg-[#111814] px-6 py-4 border-b border-[#283930] flex items-center justify-between">
                    <h3 className="text-white font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-sm">grid_view</span>
                      Grid Protocol
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-24 h-24 border-2 border-[#283930] rounded bg-[#111814] grid grid-cols-3 grid-rows-3 gap-1 p-1">
                        <div className="bg-[#283930]/50 rounded-sm"></div>
                        <div className="bg-[#283930]/50 rounded-sm"></div>
                        <div className="bg-[#283930]/50 rounded-sm"></div>
                        <div className="bg-[#283930]/50 rounded-sm"></div>
                        <div className="bg-primary/20 rounded-sm border border-primary/40"></div>
                        <div className="bg-[#283930]/50 rounded-sm"></div>
                        <div className="bg-[#283930]/50 rounded-sm"></div>
                        <div className="bg-[#283930]/50 rounded-sm"></div>
                        <div className="bg-[#283930]/50 rounded-sm"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-lg mb-1">3x3 Tactical Grid</h4>
                        <p className="text-[#9db9ab] text-sm leading-relaxed">Compact battlefield requiring precise positioning. Movement is restricted to adjacent tiles (Cardinal directions only).</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-[#111814] border border-[#283930]">
                        <span className="material-symbols-outlined text-primary mt-1 text-lg">flag</span>
                        <div>
                          <h5 className="text-white text-sm font-bold">Win Condition</h5>
                          <p className="text-[#9db9ab] text-xs">Eliminate the enemy <span className="text-primary">Hero</span> unit or wipe out all enemy forces.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-[#111814] border border-[#283930]">
                        <span className="material-symbols-outlined text-blue-400 mt-1 text-lg">group</span>
                        <div>
                          <h5 className="text-white text-sm font-bold">Squad Composition (4 Units)</h5>
                          <ul className="text-[#9db9ab] text-xs list-disc pl-4 mt-1 space-y-1">
                            <li><span className="text-white">1x Hero</span> (Commander)</li>
                            <li><span className="text-white">2x Soldiers</span> (Frontline)</li>
                            <li><span className="text-white">1x Archer</span> (Support)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Turn Actions */}
                <section className="bg-[#1c2721] border border-[#283930] rounded-xl overflow-hidden">
                  <div className="bg-[#111814] px-6 py-4 border-b border-[#283930]">
                    <h3 className="text-white font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-sm">history_edu</span>
                      Turn Actions
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-[#9db9ab] text-sm mb-4">Each unit can perform one primary action per turn phase.</p>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center justify-between p-3 rounded bg-[#283930]/30 border border-[#283930] hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-400">
                            <span className="material-symbols-outlined text-lg">open_with</span>
                          </div>
                          <span className="text-white font-medium text-sm">Move</span>
                        </div>
                        <span className="text-[#9db9ab] text-xs">1 Tile (Orthogonal)</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded bg-[#283930]/30 border border-[#283930] hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-red-500/10 flex items-center justify-center text-red-400">
                            <span className="material-symbols-outlined text-lg">swords</span>
                          </div>
                          <span className="text-white font-medium text-sm">Attack</span>
                        </div>
                        <span className="text-[#9db9ab] text-xs">Deal Dmg based on ATK</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded bg-[#283930]/30 border border-[#283930] hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-yellow-500/10 flex items-center justify-center text-yellow-400">
                            <span className="material-symbols-outlined text-lg">shield</span>
                          </div>
                          <span className="text-white font-medium text-sm">Defend</span>
                        </div>
                        <span className="text-[#9db9ab] text-xs">-50% Dmg taken next turn</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded bg-[#283930]/30 border border-[#283930] hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-purple-500/10 flex items-center justify-center text-purple-400">
                            <span className="material-symbols-outlined text-lg">auto_fix</span>
                          </div>
                          <span className="text-white font-medium text-sm">Skill</span>
                        </div>
                        <span className="text-[#9db9ab] text-xs">Unit special ability</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded bg-[#283930]/30 border border-[#283930] hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-gray-500/10 flex items-center justify-center text-gray-400">
                            <span className="material-symbols-outlined text-lg">hourglass_bottom</span>
                          </div>
                          <span className="text-white font-medium text-sm">End Turn</span>
                        </div>
                        <span className="text-[#9db9ab] text-xs">Pass initiative</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column - Unit Cards */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                {units.map((unit, index) => (
                  <div key={index} className="relative bg-[#1c2721] border border-[#283930] rounded-xl overflow-hidden group hover:border-primary/50 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                      <span className="material-symbols-outlined text-9xl">chess</span>
                    </div>
                    <div className="p-6 flex flex-col sm:flex-row gap-6">
                      <div className="flex-shrink-0 flex flex-col items-center gap-3">
                        <div className="w-24 h-24 rounded-xl bg-[#111814] border border-[#283930] flex items-center justify-center relative overflow-hidden">
                          <img alt={unit.name} className="w-full h-full object-cover opacity-80" src={unit.image} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <span className="absolute bottom-1 text-[10px] font-bold text-white uppercase tracking-widest">{unit.label}</span>
                        </div>
                        <span className={`px-3 py-1 bg-${unit.badgeColor}-500/10 text-${unit.badgeColor}-${unit.badgeColor === 'yellow' ? '500' : '400'} text-xs font-bold rounded border border-${unit.badgeColor}-500/20`}>
                          {unit.badge}
                        </span>
                      </div>
                      <div className="flex-1 z-10">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white">{unit.name}</h3>
                            <p className="text-[#9db9ab] text-sm">{unit.description}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-[#9db9ab]">HP (Health)</span>
                              <span className="text-white font-bold">{unit.hp}</span>
                            </div>
                            <div className="h-1.5 bg-[#111814] rounded-full overflow-hidden">
                              <div className={`h-full ${getStatBarColor('hp')}`} style={{width: `${getStatPercentage(unit.hp)}%`}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-[#9db9ab]">ATK (Attack)</span>
                              <span className="text-white font-bold">{unit.atk}</span>
                            </div>
                            <div className="h-1.5 bg-[#111814] rounded-full overflow-hidden">
                              <div className={`h-full ${getStatBarColor('atk')}`} style={{width: `${getStatPercentage(unit.atk, 70)}%`}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-[#9db9ab]">DEF (Defense)</span>
                              <span className="text-white font-bold">{unit.def}</span>
                            </div>
                            <div className="h-1.5 bg-[#111814] rounded-full overflow-hidden">
                              <div className={`h-full ${getStatBarColor('def')}`} style={{width: `${getStatPercentage(unit.def, 40)}%`}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-[#9db9ab]">RNG (Range)</span>
                              <span className="text-white font-bold">{unit.range}</span>
                            </div>
                            <div className="h-1.5 bg-[#111814] rounded-full overflow-hidden">
                              <div className={`h-full ${getStatBarColor('range')}`} style={{width: unit.range === '2-3' ? '90%' : '20%'}}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="h-20 md:h-0"></div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#111814] border-t border-[#283930] flex justify-around p-4 z-50">
        <a className="flex flex-col items-center gap-1 text-[#9db9ab]" href="/dashboard">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px]">Home</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-[#9db9ab]" href="/game">
          <span className="material-symbols-outlined">target</span>
          <span className="text-[10px]">Missions</span>
        </a>
        <div className="relative -top-8">
          <a href="/rules" className="bg-primary text-[#111814] p-4 rounded-full shadow-[0_0_15px_rgba(19,236,128,0.4)] border-4 border-[#111814] flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl font-bold">menu_book</span>
          </a>
        </div>
        <a className="flex flex-col items-center gap-1 text-primary" href="/rules">
          <span className="material-symbols-outlined">swords</span>
          <span className="text-[10px]">Rules</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-[#9db9ab]" href="/profile">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px]">Settings</span>
        </a>
      </nav>
    </div>
  );
}
