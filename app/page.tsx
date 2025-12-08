export default function HomePage() {
  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Farcaster Frame-first</p>
        <h1 className="text-4xl font-semibold">ComCelo</h1>
        <p className="text-slate-300 max-w-2xl">
          A 1v1 turn-based tactical duel on a compact 3x3 grid. Built for Farcaster Frames, secured by
          Celo. Heroes, soldiers, and archers clash in quick, high-stakes bouts.
        </p>
      </header>
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
        <ul className="space-y-2 text-sm text-slate-200">
          <li>• View frames (coming soon)</li>
          <li>• Start a duel (on-chain)</li>
          <li>• Read the docs</li>
        </ul>
      </section>
    </main>
  );
}
