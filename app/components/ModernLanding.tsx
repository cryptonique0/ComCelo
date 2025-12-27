'use client';

import { useState } from 'react';

export default function ModernLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        .grid-bg {
          background-image: linear-gradient(to right, #283930 1px, transparent 1px),
                            linear-gradient(to bottom, #283930 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>

      <div className="dark bg-background-dark text-white font-display min-h-screen">
        {/* Navbar */}
        <header className="sticky top-0 z-50 w-full border-b border-surface-border bg-background-dark/90 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">hexagon</span>
              <span className="text-xl font-bold tracking-tight">ComCelo</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-text-dim hover:text-white transition-colors">How to Play</a>
              <a href="#" className="text-sm font-medium text-text-dim hover:text-white transition-colors">Leaderboard</a>
              <a href="#" className="text-sm font-medium text-text-dim hover:text-white transition-colors">Docs</a>
            </nav>

            <div className="flex items-center gap-4">
              <button className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                Connect
              </button>
              <button className="flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-bold text-background-dark transition-transform hover:scale-105 hover:bg-[#34f092]">
                <a href="/dashboard">Play Now</a>
              </button>
            </div>
          </div>
        </header>

        <main className="flex flex-col">
          {/* Hero Section */}
          <section className="relative isolate overflow-hidden pt-14 lg:pt-24 pb-20">
            <div className="absolute inset-0 -z-10 h-full w-full grid-bg opacity-20 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]"></div>
            
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
                {/* Left Content */}
                <div className="lg:col-span-6 flex flex-col gap-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 self-center lg:self-start rounded-full border border-surface-border bg-surface-dark px-3 py-1 text-xs font-medium text-primary">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Live on Base + Stacks
                  </div>

                  <h1 className="text-4xl font-bold tracking-tight sm:text-6xl xl:text-7xl leading-[1.1]">
                    Tactical Duels <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">On The Grid</span>
                  </h1>

                  <p className="text-lg leading-8 text-text-dim max-w-2xl mx-auto lg:mx-0">
                    Master the 1v1 turn-based strategy game built natively for Base and Stacks. 
                    Secure, verifiable, and gas-sponsored battles on decentralized networks.
                  </p>

                  <div className="mt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <a href="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-base font-bold text-background-dark transition-all hover:bg-[#34f092] hover:shadow-[0_0_20px_rgba(19,236,128,0.4)]">
                      <span className="material-symbols-outlined">swords</span>
                      Start Duel
                    </a>
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg border border-surface-border bg-surface-dark px-8 py-3.5 text-base font-bold hover:bg-surface-border transition-colors">
                      <span className="material-symbols-outlined">description</span>
                      Read Whitepaper
                    </button>
                  </div>

                  <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-text-dim uppercase tracking-widest">Powered By</span>
                    </div>
                    <div className="h-6 w-px bg-surface-border"></div>
                    <span className="text-sm font-bold">Base</span>
                    <span className="text-sm font-bold">Stacks</span>
                    <span className="text-sm font-bold">Celo</span>
                  </div>
                </div>

                {/* Right - Game Preview */}
                <div className="lg:col-span-6 mt-16 lg:mt-0 relative">
                  <div className="relative rounded-xl border border-surface-border bg-[#0f1512] shadow-2xl">
                    {/* Frame Header */}
                    <div className="flex items-center justify-between border-b border-surface-border px-4 py-3 bg-surface-dark/50 rounded-t-xl">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                      </div>
                      <div className="text-xs text-text-dim font-mono">match_id: 0x8f...2a</div>
                    </div>

                    {/* Game Area */}
                    <div className="aspect-[1.91/1] w-full overflow-hidden bg-surface-dark relative group" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD5JGIE2qhhhnrzZmEv6p_nuPc5KpzmPmzN6IHk7xnDBg6YEbwbUlZhbqut98JEYggtFoHI1-SeBrbc4mzwosc6sqvbqXgjj8pY8n0ZL0kGrHFaay4vhh82kUNQL8Gu2fZKk1l3vS7D7C1apKl6-x9gski2jt8aQad_27sNRNcDYvpO0adHts9CIGyizJIIWyq6lEWd0DaNDgVPTpBGLAE3cbUsXxgsfB9XtbEEcSlKFFtJMiBr0eioFgMZ0-LG2c5ClYe8g9AQnfQ")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>
                      <div style={{background: 'linear-gradient(to top, rgb(17, 24, 20), transparent)'}} className="absolute inset-0"></div>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/60 backdrop-blur-sm border border-primary/30 p-4 rounded-lg text-center transform group-hover:scale-105 transition-transform duration-300">
                          <p className="text-primary font-mono text-sm mb-1">YOUR TURN</p>
                          <h3 className="text-white text-2xl font-bold">DEPLOY UNIT</h3>
                        </div>
                      </div>
                    </div>

                    {/* Frame Buttons */}
                    <div className="grid grid-cols-2 gap-px bg-surface-border p-px rounded-b-xl overflow-hidden">
                      <button className="bg-surface-dark hover:bg-[#233029] py-3 text-sm font-medium transition-colors">Move</button>
                      <button className="bg-surface-dark hover:bg-[#233029] py-3 text-sm font-medium transition-colors">Attack</button>
                    </div>
                  </div>

                  {/* Decorative Glow */}
                  <div className="absolute -inset-4 -z-10 bg-primary/20 blur-3xl opacity-30 rounded-full"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="border-y border-surface-border bg-surface-dark/30 py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center divide-y sm:divide-y-0 sm:divide-x divide-surface-border">
                <div className="flex flex-col items-center p-4">
                  <div className="text-3xl font-bold tabular-nums mb-1">12,450+</div>
                  <div className="text-sm font-medium text-text-dim uppercase tracking-wider">Total Duels Battled</div>
                </div>
                <div className="flex flex-col items-center p-4">
                  <div className="text-3xl font-bold tabular-nums mb-1">1,200+</div>
                  <div className="text-sm font-medium text-text-dim uppercase tracking-wider">Active Strategists</div>
                </div>
                <div className="flex flex-col items-center p-4">
                  <div className="text-3xl font-bold tabular-nums mb-1">$5k+</div>
                  <div className="text-sm font-medium text-text-dim uppercase tracking-wider">Gas Fees Sponsored</div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-24 bg-background-dark relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
            
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Next-Gen Strategy on Chain</h2>
                <p className="text-text-dim text-lg">Built for speed, security, and seamless gameplay across Base and Stacks.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="group relative rounded-2xl border border-surface-border bg-surface-dark p-8 hover:border-primary/50 transition-colors duration-300">
                  <div className="absolute top-0 right-0 -mr-px -mt-px h-24 w-24 overflow-hidden rounded-tr-2xl">
                    <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-primary/10 to-transparent"></div>
                  </div>
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-background-dark border border-surface-border text-primary group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined">smartphone</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Multi-Chain Gaming</h3>
                  <p className="text-text-dim leading-relaxed">
                    Play on Base for speed, Stacks for Bitcoin integration, or Celo for mobile-first experience. Choose your network.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="group relative rounded-2xl border border-surface-border bg-surface-dark p-8 hover:border-primary/50 transition-colors duration-300">
                  <div className="absolute top-0 right-0 -mr-px -mt-px h-24 w-24 overflow-hidden rounded-tr-2xl">
                    <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-primary/10 to-transparent"></div>
                  </div>
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-background-dark border border-surface-border text-primary group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined">bolt</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Blazing Speed &amp; Gasless</h3>
                  <p className="text-text-dim leading-relaxed">
                    Experience near-instant moves with sponsored gas relayers. Blockchain gaming that feels as fast as Web2.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="group relative rounded-2xl border border-surface-border bg-surface-dark p-8 hover:border-primary/50 transition-colors duration-300">
                  <div className="absolute top-0 right-0 -mr-px -mt-px h-24 w-24 overflow-hidden rounded-tr-2xl">
                    <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-primary/10 to-transparent"></div>
                  </div>
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-background-dark border border-surface-border text-primary group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined">verified_user</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">True Ownership</h3>
                  <p className="text-text-dim leading-relaxed">
                    Every unit, upgrade, and victory is verifiable on-chain. Build your reputation and trade assets freely.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-24 bg-surface-dark border-t border-surface-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How To Enter The Arena</h2>
              </div>

              <div className="relative">
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-surface-border"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                  {/* Step 1 */}
                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-4 border-surface-dark bg-surface-border font-bold shadow-lg mb-6 hover:bg-primary hover:text-background-dark hover:scale-110 transition-all duration-300">
                      <span className="material-symbols-outlined text-4xl">link</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">1. Connect Identity</h3>
                    <p className="text-text-dim text-sm max-w-[250px]">Link your wallet to create your strategist profile on-chain.</p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-4 border-surface-dark bg-surface-border font-bold shadow-lg mb-6 hover:bg-primary hover:text-background-dark hover:scale-110 transition-all duration-300">
                      <span className="material-symbols-outlined text-4xl">person_search</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">2. Find Match</h3>
                    <p className="text-text-dim text-sm max-w-[250px]">Enter the matchmaking queue or challenge a friend directly.</p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-4 border-surface-dark bg-surface-border font-bold shadow-lg mb-6 hover:bg-primary hover:text-background-dark hover:scale-110 transition-all duration-300">
                      <span className="material-symbols-outlined text-4xl">sports_esports</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">3. Battle &amp; Earn</h3>
                    <p className="text-text-dim text-sm max-w-[250px]">Outsmart your opponent on the grid. Win matches to climb the leaderboard.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-80" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD392H7zyRCtlVOU_9wcWm6agCUsGPMJO2gwui-F-M5JPCXWRcguhTnsIA6PEPI4WmCRTQG9t7gzHFd8NgIMaKCnOVLoGAqfsaiBrUIU5p7LYFxBi6ngqz4qvjhT7L18Es7_pRl1QeNEZ44ytA9Z2GP72EMdbLL4aQvBT6i0rlXtWNwPMJRktEDmvQ2-4wz0VE4IiEMisVfCH1U0Kn0qPWbV2F4LlMPYEcsRaRKiMROc5GoaEA2A45Fd1-uJrI4RnnONfc7QYYf3IQ")'}}></div>
            <div className="absolute inset-0 z-0 bg-background-dark/90"></div>

            <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Ready to Command?</h2>
              <p className="text-xl text-text-dim mb-10 max-w-2xl mx-auto">
                Join the first wave of tactical commanders on Base and Stacks. The grid awaits your strategy.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="/dashboard" className="flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-bold text-background-dark transition-transform hover:scale-105 hover:bg-[#34f092] shadow-lg shadow-primary/20">
                  Play Now
                </a>
                <button className="flex items-center justify-center gap-2 rounded-lg border border-surface-border bg-black/40 backdrop-blur-sm px-8 py-4 text-lg font-bold transition-colors hover:bg-surface-border">
                  <span className="material-symbols-outlined">chat</span>
                  Join Community
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-background-dark border-t border-surface-border pt-16 pb-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary text-2xl">hexagon</span>
                  <span className="text-lg font-bold">ComCelo</span>
                </div>
                <p className="text-sm text-text-dim">
                  1v1 Tactical Strategy on Base, Stacks & Celo. Built for the decentralized future.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-4">Game</h4>
                <ul className="space-y-2 text-sm text-text-dim">
                  <li><a href="#" className="hover:text-primary transition-colors">Play Now</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Leaderboard</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">How to Play</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-text-dim">
                  <li><a href="#" className="hover:text-primary transition-colors">Whitepaper</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Smart Contracts</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Press Kit</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Social</h4>
                <ul className="space-y-2 text-sm text-text-dim">
                  <li><a href="#" className="hover:text-primary transition-colors">Farcaster</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-surface-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-text-dim">© 2024 ComCelo. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="#" className="text-xs text-text-dim hover:text-white">Privacy Policy</a>
                <a href="#" className="text-xs text-text-dim hover:text-white">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
