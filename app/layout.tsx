import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "ComCelo ⚔️ Tactical Combat Arena",
  description: "1v1 tactical duels on Base blockchain. Command your warriors in epic turn-based combat."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50">
        <Providers>
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">⚔️</div>
                <span className="text-xl font-black bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  COMCELO
                </span>
              </div>
              
              <div className="hidden md:flex items-center gap-6">
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors font-semibold">Arena</a>
                <a href="/custom-game" className="text-slate-400 hover:text-cyan-400 transition-colors font-semibold">Custom Game</a>
                <a href="/notifications" className="text-slate-400 hover:text-cyan-400 transition-colors font-semibold">Notifications</a>
                <a href="/messaging" className="text-slate-400 hover:text-cyan-400 transition-colors font-semibold">Comms</a>
                <a href="/about" className="text-slate-400 hover:text-cyan-400 transition-colors font-semibold">About</a>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors font-semibold">Docs</a>
                <a href="/profile#support" className="text-slate-400 hover:text-cyan-400 transition-colors font-semibold">Support</a>
              </div>
              
              <button className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-lg font-bold text-sm hover:scale-105 transition-transform">
                Connect Wallet
              </button>
            </div>
          </div>
        </nav>
        
          <div className="min-h-screen max-w-7xl mx-auto px-6 pt-24">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
