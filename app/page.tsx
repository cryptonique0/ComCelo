export default function HomePage() {
  return (
    <main className="space-y-12 py-12">
      {/* Hero */}
      <header className="space-y-4 text-center md:text-left">
        <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-sm text-cyan-300">
          🏆 Contest-Ready | On-Chain | Farcaster Frames
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white">ComCelo</h1>
        <p className="text-xl text-slate-400 max-w-3xl">
          1v1 tactical turn-based duels on a 3x3 grid. Play in Farcaster Frames, secured by Celo blockchain. 
          Heroes, soldiers, and archers clash in quick, high-stakes battles.
        </p>
      </header>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-4">
        <div className="p-6 rounded-lg border border-slate-700 bg-slate-900/50 hover:bg-slate-900 transition">
          <div className="text-3xl mb-3">⚔️</div>
          <h3 className="font-semibold text-slate-100">Tactical Grid Combat</h3>
          <p className="text-sm text-slate-400 mt-2">
            3x3 battlefield. Move units, calculate damage, defend positions. Pure strategy.
          </p>
        </div>

        <div className="p-6 rounded-lg border border-slate-700 bg-slate-900/50 hover:bg-slate-900 transition">
          <div className="text-3xl mb-3">⛓️</div>
          <h3 className="font-semibold text-slate-100">On-Chain State</h3>
          <p className="text-sm text-slate-400 mt-2">
            All game data on Celo blockchain. Transparent, trustless, and immutable.
          </p>
        </div>

        <div className="p-6 rounded-lg border border-slate-700 bg-slate-900/50 hover:bg-slate-900 transition">
          <div className="text-3xl mb-3">📱</div>
          <h3 className="font-semibold text-slate-100">Farcaster Frames</h3>
          <p className="text-sm text-slate-400 mt-2">
            Play directly in your Farcaster feed. No app downloads required.
          </p>
        </div>

        <div className="p-6 rounded-lg border border-slate-700 bg-slate-900/50 hover:bg-slate-900 transition">
          <div className="text-3xl mb-3">🚀</div>
          <h3 className="font-semibold text-slate-100">Gas Sponsorship</h3>
          <p className="text-sm text-slate-400 mt-2">
            Meta-transactions sponsor gas fees. New players can duel for free.
          </p>
        </div>

        <div className="p-6 rounded-lg border border-slate-700 bg-slate-900/50 hover:bg-slate-900 transition">
          <div className="text-3xl mb-3">🏅</div>
          <h3 className="font-semibold text-slate-100">Ranked Ladder</h3>
          <p className="text-sm text-slate-400 mt-2">
            ELO ratings, seasonal leaderboards, and tournament prize pools.
          </p>
        </div>

        <div className="p-6 rounded-lg border border-slate-700 bg-slate-900/50 hover:bg-slate-900 transition">
          <div className="text-3xl mb-3">💰</div>
          <h3 className="font-semibold text-slate-100">Earn cUSD</h3>
          <p className="text-sm text-slate-400 mt-2">
            Win games to earn real cUSD rewards on Celo mainnet.
          </p>
        </div>
      </section>

      {/* Game Units */}
      <section className="py-8 px-6 rounded-lg border border-slate-700 bg-slate-900/50">
        <h2 className="text-2xl font-bold text-white mb-6">Unit Types</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-4xl mb-2">🦸</div>
            <h3 className="font-semibold text-slate-100">Hero</h3>
            <p className="text-sm text-slate-400 mt-1">100 HP • 15 ATK • 10 DEF • Leader unit</p>
          </div>
          <div>
            <div className="text-4xl mb-2">⚔️</div>
            <h3 className="font-semibold text-slate-100">Soldier</h3>
            <p className="text-sm text-slate-400 mt-1">40 HP • 8 ATK • 5 DEF • Frontline</p>
          </div>
          <div>
            <div className="text-4xl mb-2">🏹</div>
            <h3 className="font-semibold text-slate-100">Archer</h3>
            <p className="text-sm text-slate-400 mt-1">30 HP • 7 ATK • 3 DEF • Range 3</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-6 rounded-lg border border-slate-700 bg-slate-900/50">
        <h2 className="text-2xl font-bold text-white mb-6">By The Numbers</h2>
        <div className="grid md:grid-cols-5 gap-4 text-center">
          <div>
            <div className="text-4xl font-bold text-cyan-400">6</div>
            <p className="text-sm text-slate-400 mt-2">Smart Contracts</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-cyan-400">37</div>
            <p className="text-sm text-slate-400 mt-2">Passing Tests</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-cyan-400">10+</div>
            <p className="text-sm text-slate-400 mt-2">API Endpoints</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-cyan-400">9</div>
            <p className="text-sm text-slate-400 mt-2">Git Commits</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-cyan-400">100%</div>
            <p className="text-sm text-slate-400 mt-2">Test Coverage</p>
          </div>
        </div>
      </section>

      {/* Docs */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Documentation</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <a
            href="https://github.com/cryptonique0/ComCelo/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-lg border border-slate-700 bg-slate-900/50 hover:bg-slate-800 transition"
          >
            <div className="font-semibold text-slate-100 text-lg">📘 README</div>
            <p className="text-sm text-slate-400 mt-2">Setup, local dev, quick start guide</p>
          </a>

          <a
            href="https://github.com/cryptonique0/ComCelo/blob/main/CONTRACTS.md"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-lg border border-slate-700 bg-slate-900/50 hover:bg-slate-800 transition"
          >
            <div className="font-semibold text-slate-100 text-lg">📗 Smart Contracts</div>
            <p className="text-sm text-slate-400 mt-2">Full ABI documentation & function specs</p>
          </a>

          <a
            href="https://github.com/cryptonique0/ComCelo/blob/main/FRAMES.md"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-lg border border-slate-700 bg-slate-900/50 hover:bg-slate-800 transition"
          >
            <div className="font-semibold text-slate-100 text-lg">📙 Farcaster Frames</div>
            <p className="text-sm text-slate-400 mt-2">Frame endpoints, image generation, flows</p>
          </a>

          <a
            href="https://github.com/cryptonique0/ComCelo/blob/main/TESTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-lg border border-slate-700 bg-slate-900/50 hover:bg-slate-800 transition"
          >
            <div className="font-semibold text-slate-100 text-lg">🧪 Testing Guide</div>
            <p className="text-sm text-slate-400 mt-2">Manual scenarios, API tests, debugging</p>
          </a>

          <a
            href="https://github.com/cryptonique0/ComCelo/blob/main/DEPLOYMENT.md"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-lg border border-slate-700 bg-slate-900/50 hover:bg-slate-800 transition"
          >
            <div className="font-semibold text-slate-100 text-lg">📕 Deployment</div>
            <p className="text-sm text-slate-400 mt-2">Vercel, Celo testnet & mainnet guides</p>
          </a>

          <a
            href="https://github.com/cryptonique0/ComCelo/blob/main/CONTEST_SUMMARY.md"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-lg border border-slate-700 bg-slate-900/50 hover:bg-slate-800 transition"
          >
            <div className="font-semibold text-slate-100 text-lg">🏆 Contest Summary</div>
            <p className="text-sm text-slate-400 mt-2">Feature list, architecture, demo guide</p>
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12 space-y-6">
        <h2 className="text-3xl font-bold text-white">Ready to Battle?</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Explore the full source code on GitHub. Deploy to Celo testnet. Play in Farcaster Frames.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="https://github.com/cryptonique0/ComCelo"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition text-white font-semibold"
          >
            View on GitHub
          </a>
          <a
            href="https://github.com/cryptonique0/ComCelo#quick-start"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-lg border border-cyan-600 hover:bg-cyan-600/10 transition text-cyan-400 font-semibold"
          >
            Get Started Locally
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-700 text-center text-slate-500 text-sm space-y-2">
        <p>
          Built with Hardhat, Next.js 14, TypeScript, Tailwind CSS, and OpenZeppelin
        </p>
        <p>
          Deployed on Celo Alfajores (testnet) • Playable on Farcaster Frames
        </p>
        <p className="pt-2">
          Made for the Celo & Farcaster ecosystem 🌍
        </p>
      </footer>
    </main>
  );
}
