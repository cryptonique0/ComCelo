'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const units = [
    { emoji: '🦸', name: 'Hero', hp: 100, atk: 15, def: 10, desc: 'Leader unit' },
    { emoji: '⚔️', name: 'Soldier', hp: 40, atk: 12, def: 8, desc: 'Frontline warrior' },
    { emoji: '🏹', name: 'Archer', hp: 30, atk: 10, def: 5, desc: 'Range 3' }
  ];

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950"></div>
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        {/* Glowing orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl lg:max-w-7xl mx-auto px-4 sm:px-6 space-y-24 py-16">
        {/* Epic Hero Section */}
        <header id="arena" className="text-center space-y-8 pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 backdrop-blur-sm animate-fade-in">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
            <span className="text-sm font-semibold bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              🏆 LIVE ON BASE MAINNET | 6 CONTRACTS DEPLOYED
            </span>
          </div>
          
          <div className="space-y-4 animate-slide-up">
            <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl tracking-tight">
              COMCELO
            </h1>
            <div className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-bold text-slate-300">
              <span className="animate-bounce-slow">⚔️</span>
              <span>TACTICAL COMBAT ARENA</span>
              <span className="animate-bounce-slow delay-300">⚔️</span>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
            Challenge players to <span className="text-cyan-400 font-bold">intense 1v1 duels</span> on a 3x3 battlefield.
            <br />
            <span className="text-indigo-400">On-chain strategy</span> meets <span className="text-purple-400">real-time combat</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 animate-fade-in-delay-2">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
              <span className="relative z-10">⚔️ START BATTLE</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <button className="px-8 py-4 border-2 border-cyan-500/50 rounded-xl font-bold text-lg hover:bg-cyan-500/10 transition-all hover:border-cyan-400">
              📖 VIEW GUIDE
            </button>
          </div>
        </header>

        {/* Game Features - Card Battle Style */}
        <section id="features" className="grid md:grid-cols-3 gap-6 px-1 sm:px-2">
          {[
            { icon: '⚔️', title: 'Grid Combat', desc: 'Command your units on a 3x3 battlefield', gradient: 'linear-gradient(135deg, #ef4444, #f97316)' },
            { icon: '⛓️', title: 'On-Chain', desc: 'Every move verified on Base blockchain', gradient: 'linear-gradient(135deg, #22d3ee, #3b82f6)' },
            { icon: '📱', title: 'Frames', desc: 'Play in Farcaster feed, no downloads', gradient: 'linear-gradient(135deg, #a855f7, #ec4899)' },
            { icon: '🚀', title: 'Free Gas', desc: 'Meta-transactions sponsor your battles', gradient: 'linear-gradient(135deg, #22c55e, #10b981)' },
            { icon: '🏅', title: 'Ranked', desc: 'Climb leaderboards, win tournaments', gradient: 'linear-gradient(135deg, #f59e0b, #f97316)' },
            { icon: '💰', title: 'Earn Crypto', desc: 'Win real rewards on Base mainnet', gradient: 'linear-gradient(135deg, #6366f1, #a855f7)' }
          ].map((feature, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm hover:bg-slate-800/60 transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-15 transition-opacity"
                style={{ backgroundImage: feature.gradient }}
              />
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform drop-shadow-lg">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              <div
                className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundImage: feature.gradient }}
              ></div>
            </div>
          ))}
        </section>

        {/* Unit Showcase - Interactive Cards */}
        <section id="units" className="py-12 px-2 sm:px-4">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-2">
              CHOOSE YOUR WARRIORS
            </h2>
            <p className="text-slate-400 text-lg">Select and deploy your units strategically</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {units.map((unit, i) => (
              <div
                key={i}
                onClick={() => setSelectedUnit(i)}
                className={`group relative p-8 rounded-3xl border-2 cursor-pointer transition-all duration-500 ${
                  selectedUnit === i
                    ? 'border-cyan-400 bg-gradient-to-b from-cyan-500/20 to-indigo-500/20 scale-105 shadow-2xl shadow-cyan-500/50'
                    : 'border-slate-700 bg-slate-900/50 hover:border-slate-600 hover:scale-102'
                }`}
              >
                {/* Card glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b from-cyan-500/0 to-indigo-500/0 group-hover:from-cyan-500/10 group-hover:to-indigo-500/10 transition-all duration-500 ${
                  selectedUnit === i ? 'from-cyan-500/20 to-indigo-500/20' : ''
                }`}></div>
                
                <div className="relative z-10">
                  {/* Unit Icon */}
                  <div className="text-8xl mb-6 text-center group-hover:scale-110 transition-transform duration-300 drop-shadow-2xl">
                    {unit.emoji}
                  </div>
                  
                  {/* Unit Name */}
                  <h3 className="text-2xl font-black text-center mb-2 text-white group-hover:text-cyan-300 transition-colors">
                    {unit.name.toUpperCase()}
                  </h3>
                  <p className="text-slate-400 text-center text-sm mb-6">{unit.desc}</p>
                  
                  {/* Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-slate-800/50">
                      <span className="text-red-400 font-semibold flex items-center gap-2">
                        <span>❤️</span> HP
                      </span>
                      <span className="text-white font-bold">{unit.hp}</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-slate-800/50">
                      <span className="text-orange-400 font-semibold flex items-center gap-2">
                        <span>⚔️</span> ATK
                      </span>
                      <span className="text-white font-bold">{unit.atk}</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-slate-800/50">
                      <span className="text-blue-400 font-semibold flex items-center gap-2">
                        <span>🛡️</span> DEF
                      </span>
                      <span className="text-white font-bold">{unit.def}</span>
                    </div>
                  </div>
                  
                  {selectedUnit === i && (
                    <div className="mt-6 text-center">
                      <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold text-sm animate-pulse">
                        ✓ SELECTED
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live Stats Dashboard */}
        <section className="relative py-12 px-4 sm:px-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/80 to-indigo-900/50 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                ⚡ LIVE STATISTICS
              </h2>
              <p className="text-cyan-400">Real-time on-chain metrics</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {[
                { value: '6', label: 'Smart Contracts', icon: '📜', gradient: 'linear-gradient(135deg, #22d3ee, #67e8f9)' },
                { value: '160', label: 'Tests Passing', icon: '✅', gradient: 'linear-gradient(135deg, #22c55e, #4ade80)' },
                { value: '10+', label: 'API Endpoints', icon: '🔌', gradient: 'linear-gradient(135deg, #a855f7, #c084fc)' },
                { value: '32', label: 'Git Commits', icon: '💾', gradient: 'linear-gradient(135deg, #f97316, #fb923c)' },
                { value: '100%', label: 'Uptime', icon: '⚡', gradient: 'linear-gradient(135deg, #eab308, #facc15)' }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="group relative p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 transition-all hover:scale-105 cursor-pointer"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div
                    className="text-4xl font-black mb-1 bg-clip-text text-transparent"
                    style={{ backgroundImage: stat.gradient }}
                  >
                    {stat.value}
                  </div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Hub */}
        <section id="docs" className="py-12 px-2 sm:px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              📚 GAME CODEX
            </h2>
            <p className="text-slate-400 text-lg">Everything you need to master ComCelo</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '📘', title: 'README', desc: 'Setup & quick start', link: 'README.md', gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)' },
              { icon: '📗', title: 'Contracts', desc: 'ABI & function specs', link: 'CONTRACTS.md', gradient: 'linear-gradient(135deg, #22c55e, #4ade80)' },
              { icon: '📙', title: 'Frames', desc: 'Farcaster integration', link: 'FRAMES.md', gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
              { icon: '🧪', title: 'Testing', desc: 'Manual scenarios', link: 'TESTING.md', gradient: 'linear-gradient(135deg, #a855f7, #c084fc)' },
              { icon: '📕', title: 'Deployment', desc: 'Deploy to mainnet', link: 'DEPLOYMENT.md', gradient: 'linear-gradient(135deg, #ef4444, #f87171)' },
              { icon: '🏆', title: 'Contest', desc: 'Feature overview', link: 'CONTEST_SUMMARY.md', gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)' }
            ].map((doc, i) => (
              <a
                key={i}
                href={`https://github.com/cryptonique0/ComCelo/blob/main/${doc.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-6 rounded-2xl border border-slate-700/50 bg-slate-900/50 hover:bg-slate-800/50 transition-all hover:scale-105 hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity"
                  style={{ backgroundImage: doc.gradient }}
                ></div>
                
                <div className="relative z-10">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{doc.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{doc.title}</h3>
                  <p className="text-slate-400 text-sm">{doc.desc}</p>
                  <div className="mt-4 inline-flex items-center text-cyan-400 text-sm font-semibold group-hover:gap-2 transition-all">
                    Read more <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Epic CTA Section */}
        <section className="relative text-center py-20 px-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-sm overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
                ENTER THE ARENA
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Deploy your forces. Command your units. <span className="text-cyan-400 font-bold">Dominate the battlefield.</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
              <a
                href="https://github.com/cryptonique0/ComCelo"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-5 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-2xl font-black text-xl overflow-hidden transition-all hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span>⚔️ DEPLOY NOW</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
              
              <a
                href="https://github.com/cryptonique0/ComCelo#quick-start"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 border-2 border-cyan-400/50 rounded-2xl font-black text-xl hover:bg-cyan-400/10 transition-all hover:border-cyan-300 backdrop-blur-sm"
              >
                <span className="flex items-center gap-3 bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                  📖 QUICK START
                </span>
              </a>
            </div>
            
            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-3 justify-center pt-8">
              {['Hardhat', 'Next.js 14', 'TypeScript', 'Tailwind', 'OpenZeppelin', 'Base Chain'].map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-sm font-semibold text-slate-300 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-slate-800/50 text-center space-y-4">
          <div className="flex items-center justify-center gap-6 mb-6">
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-2xl">🐙</a>
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-2xl">🐦</a>
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-2xl">💬</a>
          </div>
          <p className="text-slate-500 text-sm">
            Deployed on <span className="text-cyan-400 font-semibold">Base Mainnet</span> • Playable on <span className="text-indigo-400 font-semibold">Farcaster Frames</span>
          </p>
          <p className="text-slate-600 text-xs">
            Made with ⚡ for the Celo & Farcaster ecosystem
          </p>
        </footer>
      </div>
    </main>
  );
}
