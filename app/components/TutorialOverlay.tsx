'use client';

import { useState } from 'react';

type Step = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

export default function TutorialOverlay() {
  const steps: Step[] = [
    { id: 1, title: 'Board Navigation', description: 'Learn the 3x3 grid layout and tile focus.', icon: 'grid_view' },
    { id: 2, title: 'Movement Phase', description: 'Units can move one tile orthogonally per turn. Click the highlighted tile to advance.', icon: 'directions_walk' },
    { id: 3, title: 'Attack Phase', description: 'Attack adjacent enemies. Damage is based on ATK.', icon: 'swords' },
    { id: 4, title: 'Defend Phase', description: 'Defend to reduce incoming damage next turn.', icon: 'shield' },
    { id: 5, title: 'Skill Usage', description: 'Use unit special abilities to gain advantage.', icon: 'auto_fix' },
  ];

  const [stepIndex, setStepIndex] = useState(1);

  const current = steps[stepIndex - 1];
  const total = steps.length;

  const next = () => setStepIndex((i) => Math.min(total, i + 1));
  const prev = () => setStepIndex((i) => Math.max(1, i - 1));
  const skip = () => setStepIndex(total);

  return (
    <div className="bg-background-dark text-white flex flex-col h-screen">
      {/* Top Navigation */}
      <header className="flex items-center justify-between border-b border-[#283930] bg-[#111814] px-6 py-3">
        <div className="flex items-center gap-4">
          <div className="size-8 flex items-center justify-center bg-primary/20 rounded-lg text-primary">
            <span className="material-symbols-outlined">token</span>
          </div>
          <h2 className="text-xl font-bold tracking-wider uppercase">ComCelo</h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded border border-[#283930] bg-background-dark/50">
            <span className="material-symbols-outlined text-primary text-sm">account_balance_wallet</span>
            <span className="text-xs font-medium text-gray-300">0x71...39A2</span>
          </div>
          <div
            className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-[#283930]"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCiMnPMvKDqTOhEqxRArMkjIfnWfOUOT7zPnw2OFswg3EsMJ2O6akUxQNesWbU0SBnaQF3HwQL6-yNEcAujXph7HeXBtEcBf6f91i0IhFGaM1cSayTk4YmxDzXOjI-nDykjx4nBJd5Y88VLgGLZHPGYZBY7Dy8zngJ-MIW_2CuIlMTi2G2MDhgQG57JhrwlhfUvZioys48wk6UDxzDrWZxAvimTTBTAhkp-iahyZZKCkjnP7k0cV1MA_kraUsqEMDycpOp5dGHk5k8')",
            }}
          />
        </div>
      </header>

      {/* Main Area */}
      <main className="flex-1 flex relative overflow-hidden">
        {/* Board Section */}
        <section className="flex-1 flex flex-col items-center justify-center relative p-8">
          {/* Dim overlay */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none z-10 backdrop-blur-[2px]"></div>
          <div className="relative z-20 flex flex-col gap-4 w-full max-w-3xl">
            {/* Board header */}
            <div className="flex justify-between items-end w-full px-2 mb-2">
              <div>
                <h3 className="text-2xl font-bold tracking-widest">SECTOR 7-G</h3>
                <p className="text-primary text-xs uppercase tracking-wider">Turn 1 // Player Phase</p>
              </div>
              <div className="flex gap-2">
                <div className="size-3 rounded-full bg-primary animate-pulse"></div>
                <div className="size-3 rounded-full bg-gray-700"></div>
                <div className="size-3 rounded-full bg-gray-700"></div>
              </div>
            </div>

            {/* 3x3 Grid */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-[#15201b] border border-[#283930] rounded-xl shadow-2xl relative">
              {/* Tile 1 */}
              <div className="w-28 h-28 md:w-36 md:h-36 bg-[#1A2C22] rounded-lg border border-[#283930] flex items-center justify-center opacity-50">
                <span className="material-symbols-outlined text-gray-700 text-3xl md:text-4xl">grid_3x3</span>
              </div>
              {/* Tile 2 (Target highlight when movement step) */}
              <div
                className={`w-28 h-28 md:w-36 md:h-36 rounded-lg border flex items-center justify-center relative transition-all ${
                  stepIndex === 2
                    ? 'border-2 border-primary shadow-[0_0_20px_rgba(19,236,128,0.3)] bg-[#1A2C22]/80 ring-4 ring-primary/20 pulse-glow'
                    : 'border-[#283930] bg-[#1A2C22] opacity-50'
                }`}
                onClick={() => stepIndex === 2 && next()}
              >
                {stepIndex === 2 && (
                  <div className="flex flex-col items-center gap-1 animate-bounce">
                    <span className="material-symbols-outlined text-primary text-3xl font-bold">arrow_downward</span>
                    <span className="text-primary text-xs font-bold uppercase tracking-widest">Move Here</span>
                  </div>
                )}
              </div>
              {/* Tile 3 */}
              <div className="w-28 h-28 md:w-36 md:h-36 bg-[#1A2C22] rounded-lg border border-[#283930] opacity-50"></div>
              {/* Tile 4 */}
              <div className="w-28 h-28 md:w-36 md:h-36 bg-[#1A2C22] rounded-lg border border-[#283930] opacity-50"></div>
              {/* Tile 5 (Player unit) */}
              <div className="w-28 h-28 md:w-36 md:h-36 bg-[#1A2C22] rounded-lg border border-primary/50 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-primary/5 rounded-lg"></div>
                <div
                  className="relative w-20 h-20 md:w-24 md:h-24 bg-center bg-no-repeat bg-contain drop-shadow-[0_0_10px_rgba(19,236,128,0.6)]"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSOH2twRq4W_sKGHrkFEybeA7IZhqmCDjJF2vE2Ljt2o9GGOVF4oW8MW5Ddc80q1wu2Bf59G_IEcf3m-E5NfufFa8TGO8vbpVwdHb-ZinGaBestp5lRLy3OXazHzQf8YYo11MdpSOnJkv0Ynb50-b9nqgQzDszk3mvC9IhcoXCYbsU3Flns9Q3zfS2w_JiK7AkSAuZu5StmvL5u5tcWSU5PrvQSgq3FKaRlKnHVgNXX6eN3VWKaw0-jpWWPPBtNBbcGNAgAfPGpPU')",
                  }}
                ></div>
                {/* Health bar */}
                <div className="absolute bottom-2 left-2 right-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-primary"></div>
                </div>
              </div>
              {/* Tile 6 */}
              <div className="w-28 h-28 md:w-36 md:h-36 bg-[#1A2C22] rounded-lg border border-[#283930] opacity-50"></div>
              {/* Tile 7 (Enemy) */}
              <div className="w-28 h-28 md:w-36 md:h-36 bg-[#1A2C22] rounded-lg border border-[#283930] opacity-50 flex items-center justify-center">
                <div
                  className="relative w-16 h-16 md:w-20 md:h-20 bg-center bg-no-repeat bg-contain opacity-60 grayscale"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCgCOSsOUfgplwfjR77Tdusql2OXEHUAMwlxcJooD5ayvoGFeNnwfDxcrjuY44kswgeiIPtmQnTflaWiOPUeGKmLaLZxYyCP-wOnprs8j_4mAayUYHpxRPoiW9l3pzM8-watUESJf9mGcF4prmuMxPqNaIdYQ8p5SSNOa63XJVVlxAbZoeV6DshsBSOg-EwwYqSJBISyHaLKHvpt5epp3zfHLwHKZFgSRD7AsgMKgdDtsn7wvQI51hv4wWLBYNtNzVn57rgnR7hheE')",
                  }}
                ></div>
              </div>
              {/* Tile 8 */}
              <div className="w-28 h-28 md:w-36 md:h-36 bg-[#1A2C22] rounded-lg border border-[#283930] opacity-50"></div>
              {/* Tile 9 */}
              <div className="w-28 h-28 md:w-36 md:h-36 bg-[#1A2C22] rounded-lg border border-[#283930] opacity-50"></div>
            </div>

            {/* Instruction Card */}
            <div className="absolute right-4 top-0 w-[320px] bg-[#111814]/95 backdrop-blur-xl border border-primary rounded-xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-50 flex flex-col gap-4">
              <div className="flex justify-between items-center text-xs uppercase tracking-widest text-gray-400">
                <span>Tutorial Mode</span>
                <span>
                  Step {stepIndex} / {total}
                </span>
              </div>
              <div className="w-full h-1 bg-gray-800 rounded-full">
                <div className="h-full bg-primary rounded-full" style={{ width: `${(stepIndex / total) * 100}%` }}></div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="bg-primary/20 p-2 rounded-lg text-primary mt-1">
                  <span className="material-symbols-outlined">{current.icon}</span>
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold leading-tight">{current.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mt-2">{current.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <button onClick={skip} className="text-gray-500 hover:text-white text-xs uppercase tracking-wider font-bold transition-colors">
                  Skip
                </button>
                <div className="flex gap-3">
                  <button onClick={prev} className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/5 text-white text-sm font-medium transition-colors">
                    Back
                  </button>
                  <button onClick={next} className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-background-dark text-sm font-bold shadow-[0_0_15px_rgba(19,236,128,0.4)] transition-all flex items-center gap-1">
                    Next <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
              <div className="absolute top-10 -left-2 w-4 h-4 bg-[#111814] border-l border-b border-primary rotate-45"></div>
            </div>
          </div>
        </section>

        {/* Side Panel */}
        <aside className="w-80 bg-[#111814] border-l border-[#283930] hidden lg:flex flex-col z-20">
          <div className="p-5 border-b border-[#283930]">
            <h1 className="text-lg font-bold tracking-wide">TACTICAL DATA</h1>
            <p className="text-[#9db9ab] text-xs font-mono mt-1">Session ID: #TUT-001</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Selected Unit</div>
              <div className="bg-[#1A2C22] p-3 rounded-lg border border-[#283930] flex items-center gap-3">
                <div
                  className="size-12 rounded border border-gray-700 bg-center bg-cover"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAW6vS4pbTAZoCi0MZsVdf4IlRgCODAVgDCBLFGELIN49UHLvJ0RDz6L3BlXxFBkdsOAF8qtAtIZZf3LPuW2bL9T7QIePIjizel9S6bFx9EkzV2vNzsp43JeJiUcfTwJqMEvyeOJGylBHZvA-J795OEXwO5Q8BnxYkIyhnZ3PsRokvixGFLSUauT0AeNz34-CLw2IY9SEh3PGWvaWA7sfaKS5MsV9GiepjKVlIwnwi2cdz38kx7f1DX697R5TBJRa_eMqTTjBSnTZ0')",
                  }}
                ></div>
                <div>
                  <div className="text-primary font-bold">Vanguard Mk.IV</div>
                  <div className="text-xs text-gray-400">Class: Assault</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#1A2C22]/50 p-2 rounded flex flex-col gap-1">
                  <span className="text-[10px] uppercase text-gray-500">Health</span>
                  <span className="text-sm font-mono">100/100</span>
                </div>
                <div className="bg-[#1A2C22]/50 p-2 rounded flex flex-col gap-1">
                  <span className="text-[10px] uppercase text-gray-500">Attack</span>
                  <span className="text-sm font-mono">12 DMG</span>
                </div>
                <div className="bg-[#1A2C22]/50 p-2 rounded flex flex-col gap-1">
                  <span className="text-[10px] uppercase text-gray-500">Movement</span>
                  <span className="text-sm font-mono">1 Tile</span>
                </div>
                <div className="bg-[#1A2C22]/50 p-2 rounded flex flex-col gap-1">
                  <span className="text-[10px] uppercase text-gray-500">Range</span>
                  <span className="text-sm font-mono">Melee</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 opacity-50 grayscale">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Skills (Locked)</div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 p-2 rounded-lg border border-dashed border-gray-700">
                  <span className="material-symbols-outlined text-gray-600">flash_on</span>
                  <div className="flex-1">
                    <p className="text-gray-500 text-sm font-medium">Overcharge</p>
                    <p className="text-gray-700 text-[10px]">Boost attack by 50% for 1 turn</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg border border-dashed border-gray-700">
                  <span className="material-symbols-outlined text-gray-600">shield</span>
                  <div className="flex-1">
                    <p className="text-gray-500 text-sm font-medium">Energy Shield</p>
                    <p className="text-gray-700 text-[10px]">Block next incoming attack</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-[#283930] bg-[#1A2C22]">
            <button className="w-full py-3 rounded-lg bg-[#283930] text-gray-400 text-sm font-bold uppercase tracking-widest cursor-not-allowed">
              End Turn
            </button>
          </div>
        </aside>
      </main>

      <style jsx>{`
        .pulse-glow {
          animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px #13ec80; }
          50% { opacity: .85; box-shadow: 0 0 20px #13ec80; }
        }
      `}</style>
    </div>
  );
}
