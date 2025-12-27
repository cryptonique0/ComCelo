'use client';

import { useState } from 'react';

interface Unit {
  id: string;
  type: 'hero' | 'soldier' | 'archer';
  position: string;
  health: number;
  maxHealth: number;
  level?: number;
  team: 'player' | 'enemy';
  icon: string;
  color: string;
}

export default function GameBoard() {
  const [selectedUnit, setSelectedUnit] = useState<string | null>('B2');
  const [timeRemaining, setTimeRemaining] = useState(45);

  const playerUnits: Unit[] = [
    { id: 'player-hero', type: 'hero', position: 'B2', health: 200, maxHealth: 200, team: 'player', icon: 'local_police', color: 'primary' },
    { id: 'player-soldier-a', type: 'soldier', position: 'B3', health: 96, maxHealth: 120, team: 'player', icon: 'shield', color: 'blue-400' },
    { id: 'player-archer', type: 'archer', position: 'C1', health: 32, maxHealth: 80, team: 'player', icon: 'gps_fixed', color: 'yellow-400' },
    { id: 'player-soldier-b', type: 'soldier', position: 'C3', health: 120, maxHealth: 120, team: 'player', icon: 'shield', color: 'blue-400' },
  ];

  const enemyUnits: Unit[] = [
    { id: 'enemy-archer', type: 'archer', position: 'A1', health: 80, maxHealth: 80, level: 4, team: 'enemy', icon: 'gps_fixed', color: 'red-500' },
    { id: 'enemy-soldier', type: 'soldier', position: 'A2', health: 72, maxHealth: 120, team: 'enemy', icon: 'shield', color: 'red-500' },
    { id: 'enemy-hero', type: 'hero', position: 'A3', health: 450, maxHealth: 500, team: 'enemy', icon: 'local_police', color: 'red-500' },
  ];

  const allUnits = [...playerUnits, ...enemyUnits];

  const getUnitAtPosition = (position: string) => {
    return allUnits.find(unit => unit.position === position);
  };

  const isValidMovePosition = (position: string) => {
    return position === 'C2' && selectedUnit === 'B2';
  };

  const gridPositions = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];

  return (
    <>
      <style jsx>{`
        .grid-cell {
          aspect-ratio: 1;
          transition: all 0.2s ease;
        }
        .grid-cell:hover {
          background-color: rgba(19, 236, 128, 0.1);
          border-color: rgba(19, 236, 128, 0.5);
        }
        .health-bar-container {
          background: rgba(0,0,0,0.5);
          border-radius: 2px;
          overflow: hidden;
          height: 4px;
          width: 100%;
        }
        .health-bar-fill {
          height: 100%;
          transition: width 0.3s ease;
        }
        .action-btn {
          background: linear-gradient(180deg, #283930 0%, #1c2721 100%);
        }
        .action-btn:hover {
          background: linear-gradient(180deg, #3e5246 0%, #283930 100%);
        }
      `}</style>

      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-20 h-full border-r border-[#283930] bg-[#111814] items-center py-4 z-30">
          <div className="mb-8">
            <span className="material-symbols-outlined text-primary text-3xl">token</span>
          </div>
          <nav className="flex flex-col gap-4 w-full px-2">
            <a className="flex justify-center p-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="/dashboard" title="Dashboard">
              <span className="material-symbols-outlined">dashboard</span>
            </a>
            <a className="flex justify-center p-3 rounded-lg bg-[#283930] text-primary border-l-2 border-primary transition-all" href="#" title="Active Match">
              <span className="material-symbols-outlined">stadia_controller</span>
            </a>
            <a className="flex justify-center p-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="#" title="Chat">
              <span className="material-symbols-outlined">chat</span>
            </a>
            <a className="flex justify-center p-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="#" title="Surrender">
              <span className="material-symbols-outlined text-red-400">flag</span>
            </a>
          </nav>
          <div className="mt-auto">
            <div className="w-10 h-10 rounded-full bg-cover bg-center border border-primary/30" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJ-Yoolg08dNz1d32h5NxbOzuOLv7srIViZD45dHZVkyQFeeUp8YrdPVR0SXl7f3nUO5H2fKkEC8XJpNKWgIBBkJskutZ8lqddTo0C4UtTYLluV7znuXIIpkYXNYGPYyfxkYaDSB0Lg4bsKGZErtYBl5dwJI6gIMSgv6V144xAspezRj3ZumHP5vKQ0LE_RnxaEcxuccQblPCK00q93_CrqlFWrTWPxfksh4V2muexMHm-PR0YXpXM9HrNJagEqBl5z4zIi7VXbXY')"}}></div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#102219]">
          {/* Header */}
          <header className="flex items-center justify-between border-b border-[#283930] bg-[#111814]/95 backdrop-blur-md px-6 py-3 z-20">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cover bg-center border border-primary" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJ-Yoolg08dNz1d32h5NxbOzuOLv7srIViZD45dHZVkyQFeeUp8YrdPVR0SXl7f3nUO5H2fKkEC8XJpNKWgIBBkJskutZ8lqddTo0C4UtTYLluV7znuXIIpkYXNYGPYyfxkYaDSB0Lg4bsKGZErtYBl5dwJI6gIMSgv6V144xAspezRj3ZumHP5vKQ0LE_RnxaEcxuccQblPCK00q93_CrqlFWrTWPxfksh4V2muexMHm-PR0YXpXM9HrNJagEqBl5z4zIi7VXbXY')"}}></div>
                <div>
                  <h2 className="text-white text-sm font-bold">Commander (You)</h2>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[85%]"></div>
                    </div>
                    <span className="text-[10px] text-primary font-mono">850/1000 HP</span>
                  </div>
                </div>
              </div>
              <div className="h-8 w-px bg-[#283930]"></div>
              <div className="flex items-center gap-2">
                <span className="text-[#9db9ab] text-xs font-mono uppercase">Turn 12</span>
                <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-bold border border-primary/30">YOUR TURN</span>
              </div>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bg-[#1c2721] px-6 py-2 rounded-b-xl border-x border-b border-[#283930] shadow-lg flex flex-col items-center">
              <span className="text-[10px] text-[#9db9ab] font-mono uppercase tracking-widest mb-1">Time Remaining</span>
              <span className="text-2xl font-bold font-mono text-white tabular-nums tracking-wider">00:{timeRemaining.toString().padStart(2, '0')}</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 text-right">
                <div>
                  <h2 className="text-white text-sm font-bold">@dwr.eth</h2>
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-[10px] text-red-400 font-mono">620/1000 HP</span>
                    <div className="h-1.5 w-24 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 w-[62%]"></div>
                    </div>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-cover bg-center border border-red-500/50" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAWXLyDz1ijJ0h2l_6cPFQt7-0T6stwOqzras7Olx32gIilkx-1UttTUO8boexbIKgA8gGKocUlOzl0UrZ_wN6IuRZxTlUIeNbptDerg2kwULErn0UGwEHWCSDn_pAsDbxYzBB16T5YYopOAtr_OeAXDXXUC3ktu5wWAHZmYk2z1D-EQF2UzFYiT1E7m5nKia8l1KefAvOTfbLl3t4aQK6veMiexDoKpdl6PYA_SbmxD1_F67QTy5JzXy7OW1gLHzNf-lbK-miyEps')"}}></div>
              </div>
            </div>
          </header>

          {/* Main Game Area */}
          <main className="flex-1 relative flex items-center justify-center p-4" style={{backgroundImage: "radial-gradient(circle at center, rgba(19, 236, 128, 0.03) 0%, rgba(16, 34, 25, 1) 70%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDn-ZxeDXKm6HnDfoeBuo9S9SQhwYy37xkFgupRXm4hbGOXi50srRv05tey_B05i4gnIYvnrvJ3c1a0SdBKEeVgiXombEEDsrxiyDEefWgJtZMMsYunepYfNG96p4EMasV9vttJz-EaPZjHzj5znr0tHfWzE0Oce4CCGlJQDRNeY_ch-fw58L5xtiAgdyD-T4BXLYxVPNoO5Tmkr5JuXEIjw5xmc_6Jdik1jI3m1ySHhti1jvuwRKaWZsXdk_skQXeprKhWW3O8tsI')", backgroundSize: 'cover'}}>
            
            {/* Squad Panel - Left Side */}
            <div className="absolute left-6 top-6 w-64 hidden lg:flex flex-col gap-3">
              <div className="bg-[#1c2721]/90 backdrop-blur-sm border border-[#283930] rounded-lg p-3">
                <h3 className="text-[#9db9ab] text-xs font-bold uppercase tracking-widest mb-2 border-b border-[#283930] pb-2">Your Squad</h3>
                <div className="space-y-2">
                  {playerUnits.map((unit, idx) => (
                    <div key={unit.id} className={`flex items-center justify-between p-2 bg-[#111814] border ${unit.position === selectedUnit ? 'border-primary/30' : 'border-[#283930]'} rounded cursor-pointer hover:bg-[#283930]`}>
                      <div className="flex items-center gap-2">
                        <span className={`material-symbols-outlined text-${unit.color} text-sm`}>{unit.icon}</span>
                        <span className="text-white text-xs font-bold">{unit.type === 'hero' ? 'Hero' : unit.type === 'archer' ? 'Archer' : idx === 0 ? 'Soldier A' : 'Soldier B'}</span>
                      </div>
                      <div className="text-right">
                        <div className={`text-[10px] text-${unit.color} font-mono`}>{Math.round((unit.health / unit.maxHealth) * 100)}%</div>
                        <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                          <div className={`h-full bg-${unit.color}`} style={{width: `${(unit.health / unit.maxHealth) * 100}%`}}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Game Board */}
            <div className="relative z-10">
              <div className="bg-[#111814] p-4 rounded-xl border border-[#283930] shadow-2xl relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
                
                <div className="grid grid-cols-3 gap-2 w-[340px] md:w-[480px] aspect-square relative z-10">
                  {gridPositions.map((position) => {
                    const unit = getUnitAtPosition(position);
                    const isSelected = position === selectedUnit;
                    const isValidMove = isValidMovePosition(position);

                    return (
                      <div 
                        key={position}
                        onClick={() => unit && setSelectedUnit(position)}
                        className={`grid-cell bg-[#1c2721] border rounded-lg relative group cursor-pointer ${
                          isSelected ? 'border-2 border-primary shadow-[0_0_20px_rgba(19,236,128,0.15)] transform scale-[1.02] z-20' :
                          isValidMove ? 'border border-dashed border-primary/30 hover:bg-primary/5' :
                          unit?.team === 'enemy' ? `border hover:border-red-500/50` :
                          unit?.team === 'player' ? `border hover:border-primary/50` :
                          'border-[#283930]'
                        }`}
                      >
                        <div className={`absolute top-1 right-1 text-[10px] ${isSelected ? 'text-primary font-mono font-bold' : 'text-[#9db9ab] font-mono'}`}>{position}</div>
                        
                        {isSelected && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-[#111814] text-[10px] px-2 py-0.5 rounded font-bold animate-bounce">SELECTED</div>
                        )}

                        {unit && (
                          <div className="absolute inset-2 flex flex-col items-center justify-center">
                            <div className="relative">
                              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-lg ${unit.team === 'player' ? 'bg-[#1c2721]' : 'bg-[#283930]'} flex items-center justify-center border-2 border-${unit.color} shadow-[0_0_${unit.type === 'hero' ? '15' : '10'}px_rgba(${unit.team === 'enemy' ? '239,68,68' : '19,236,128'},${unit.type === 'hero' ? '0.5' : '0.3'})]`}>
                                <span className={`material-symbols-outlined text-${unit.color} text-2xl md:text-4xl`}>{unit.icon}</span>
                              </div>
                              {unit.level && (
                                <div className="absolute -top-2 -right-2 bg-red-900 text-red-200 text-[10px] px-1.5 rounded border border-red-500 font-bold">LVL {unit.level}</div>
                              )}
                              {unit.type === 'hero' && unit.team === 'enemy' && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                  <span className="material-symbols-outlined text-yellow-500 text-sm">crown</span>
                                </div>
                              )}
                            </div>
                            <div className="mt-2 w-full px-2">
                              <div className="health-bar-container">
                                <div className={`health-bar-fill bg-${unit.color}`} style={{width: `${(unit.health / unit.maxHealth) * 100}%`}}></div>
                              </div>
                              <div className={`text-[9px] ${unit.team === 'player' && isSelected ? 'text-primary font-bold' : unit.team === 'enemy' ? 'text-red-400' : unit.color === 'blue-400' ? 'text-blue-300' : 'text-yellow-300'} text-center mt-0.5`}>
                                {unit.health}/{unit.maxHealth} HP
                              </div>
                            </div>
                          </div>
                        )}

                        {!unit && !isValidMove && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-2 h-2 rounded-full bg-white/20"></div>
                          </div>
                        )}

                        {isValidMove && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                            <span className="material-symbols-outlined text-primary/50 text-xl group-hover:text-primary transition-colors">arrow_downward</span>
                            <span className="text-[10px] text-primary/50 uppercase font-bold tracking-widest group-hover:text-primary transition-colors">Move</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Corner brackets */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
              </div>
            </div>

            {/* Action Bar - Bottom */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
              <div className="bg-[#111814]/90 backdrop-blur-md border border-[#283930] rounded-xl p-2 shadow-2xl flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 pl-2 border-r border-[#283930] pr-4">
                  <div className="w-10 h-10 rounded border border-primary bg-[#1c2721] flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl">local_police</span>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-white text-xs font-bold uppercase">Hero Unit</div>
                    <div className="text-[10px] text-[#9db9ab]">Rank 5 • Melee</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 px-2">
                  <button className="action-btn flex flex-col items-center justify-center w-16 h-16 rounded border border-[#283930] text-gray-300 hover:text-white hover:border-primary/50 transition-all shrink-0">
                    <span className="material-symbols-outlined mb-1">near_me</span>
                    <span className="text-[9px] font-bold uppercase">Move</span>
                  </button>
                  <button className="action-btn flex flex-col items-center justify-center w-16 h-16 rounded border border-[#283930] text-gray-300 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 transition-all shrink-0">
                    <span className="material-symbols-outlined mb-1 text-red-400">swords</span>
                    <span className="text-[9px] font-bold uppercase">Attack</span>
                  </button>
                  <button className="action-btn flex flex-col items-center justify-center w-16 h-16 rounded border border-[#283930] text-gray-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all shrink-0">
                    <span className="material-symbols-outlined mb-1 text-blue-400">shield</span>
                    <span className="text-[9px] font-bold uppercase">Defend</span>
                  </button>
                  <button className="action-btn flex flex-col items-center justify-center w-16 h-16 rounded border border-[#283930] text-gray-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all shrink-0 group">
                    <span className="material-symbols-outlined mb-1 text-purple-400 group-hover:animate-pulse">bolt</span>
                    <span className="text-[9px] font-bold uppercase">Skill</span>
                  </button>
                </div>
                
                <button className="ml-auto bg-primary hover:bg-[#10c96d] text-[#111814] px-4 h-12 rounded font-bold text-sm uppercase tracking-wider whitespace-nowrap shadow-[0_0_15px_rgba(19,236,128,0.3)] transition-all">
                  End Turn
                </button>
              </div>
            </div>

            {/* History Button - Bottom Right */}
            <div className="absolute bottom-6 right-6 hidden md:block">
              <button className="bg-[#1c2721] border border-[#283930] p-3 rounded-full text-[#9db9ab] hover:text-white hover:bg-[#283930] transition-colors relative">
                <span className="material-symbols-outlined">history_edu</span>
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-[#1c2721]"></span>
              </button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
