export default function TournamentsPage() {
  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Tournaments</h1>
        <p className="text-slate-300 mt-2">Compete in seasonal tournaments and earn prizes</p>
      </header>

      <section className="grid gap-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold mb-4">Season 1 Grand Championship</h2>
          <div className="space-y-2 text-sm text-slate-300">
            <p>🏆 Prize Pool: <span className="text-cyan-400">42 CELO</span></p>
            <p>👥 Participants: <span className="text-cyan-400">42/64</span></p>
            <p>⏱️ Status: <span className="text-yellow-400">In Progress</span></p>
            <p>💰 Entry Fee: <span className="text-cyan-400">1.0 CELO</span></p>
          </div>
          <button className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white transition">
            View Brackets
          </button>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Tournament (Daily)</h2>
          <div className="space-y-2 text-sm text-slate-300">
            <p>🏆 Prize Pool: <span className="text-cyan-400">5 CELO</span></p>
            <p>👥 Participants: <span className="text-cyan-400">8/32</span></p>
            <p>⏱️ Status: <span className="text-green-400">Registration Open</span></p>
            <p>💰 Entry Fee: <span className="text-cyan-400">0.5 CELO</span></p>
          </div>
          <button className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition">
            Register Now
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Past Tournaments</h2>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center pb-4 border-b border-slate-700">
              <div>
                <p className="font-semibold">Pre-Season Championship</p>
                <p className="text-xs text-slate-400">Completed 2 days ago</p>
              </div>
              <div className="text-right">
                <p className="text-cyan-400">Winner: 0x5678...</p>
                <p className="text-slate-300">Prize: 20 CELO</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
