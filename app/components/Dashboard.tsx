'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full">
      {/* Side Navigation */}
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
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg bg-[#283930] text-white border-l-2 border-primary group transition-all" href="/dashboard">
                <span className="material-symbols-outlined group-hover:text-primary transition-colors">dashboard</span>
                <span className="text-sm font-medium">Dashboard</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="/game">
                <span className="material-symbols-outlined">target</span>
                <span className="text-sm font-medium">Missions</span>
              </a>
               <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="/rules">
                 <span className="material-symbols-outlined">menu_book</span>
                 <span className="text-sm font-medium">Rules & Units</span>
               </a>
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="/matchmaking">
                <span className="material-symbols-outlined">swords</span>
                <span className="text-sm font-medium">Armory</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="/tournaments">
                <span className="material-symbols-outlined">leaderboard</span>
                <span className="text-sm font-medium">Leaderboard</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="/wallet">
                <span className="material-symbols-outlined">account_balance_wallet</span>
                <span className="text-sm font-medium">Wallet</span>
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

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Navigation */}
        <header className="flex items-center justify-between border-b border-[#283930] bg-[#111814]/90 backdrop-blur-md px-6 py-4 sticky top-0 z-20">
          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span className="material-symbols-outlined text-white">menu</span>
            </button>
            <span className="text-white font-bold text-lg">ComCelo</span>
          </div>
          <div className="hidden md:flex flex-col">
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">COMMAND CENTER</h2>
            <p className="text-[#9db9ab] text-xs font-mono">SYSTEMS ONLINE // CELO MAINNET</p>
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

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-cover bg-center relative" style={{backgroundImage: "linear-gradient(rgba(16, 34, 25, 0.95), rgba(16, 34, 25, 0.98)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDn-ZxeDXKm6HnDfoeBuo9S9SQhwYy37xkFgupRXm4hbGOXi50srRv05tey_B05i4gnIYvnrvJ3c1a0SdBKEeVgiXombEEDsrxiyDEefWgJtZMMsYunepYfNG96p4EMasV9vttJz-EaPZjHzj5znr0tHfWzE0Oce4CCGlJQDRNeY_ch-fw58L5xtiAgdyD-T4BXLYxVPNoO5Tmkr5JuXEIjw5xmc_6Jdik1jI3m1ySHhti1jvuwRKaWZsXdk_skQXeprKhWW3O8tsI')"}}>
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
            {/* LEFT COLUMN: Main Actions & Active Games (Span 8) */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Deployment / Quick Actions */}
              <section>
                <h2 className="text-white text-sm font-bold tracking-widest uppercase mb-4 text-[#9db9ab] flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">rocket_launch</span> Deployment
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Quick Match Card */}
                  <a href="/matchmaking" className="relative group overflow-hidden rounded-xl border border-[#283930] bg-[#1c2721] p-6 hover:border-primary/50 transition-all cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDue1YS4lRHvxTjPCZoqxcfh8ZTsMNhQ0dWyXhKWsDbw6rpjIxt0IH2V5kVKTPxTOe-8RMyTB6HAVAg8n_xe9pHVwD23VSbGjplRjeuqwk_rI5IEgRkrDL2-NzxLtsic8jspQ-zWJUh2935ETrnOqQpOdBwfhBGz66asLVREMWm4V5yBR6rmwL4XUcgo-nfSUxgf5rz5UsuyzjYpQ85Ln9UQHSs-kiIcv987H_yO3oEEhGkSSf9HJ-NEokK3xvJWU1N-NU05XChlJ0')"}}></div>
                    <div className="relative z-20 flex flex-col h-full justify-between min-h-[140px]">
                      <div>
                        <div className="inline-flex items-center justify-center p-2 rounded-lg bg-primary/20 text-primary mb-3">
                          <span className="material-symbols-outlined">search</span>
                        </div>
                        <h3 className="text-white text-xl font-bold mb-1">Quick Match</h3>
                        <p className="text-[#9db9ab] text-sm">Scan network for opponents.</p>
                      </div>
                      <div className="flex items-center gap-2 text-primary font-bold text-sm mt-4">
                        <span>INITIATE SCAN</span>
                        <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                      </div>
                    </div>
                  </a>

                  {/* Invite Friend Card */}
                  <div className="relative group overflow-hidden rounded-xl border border-[#283930] bg-[#1c2721] p-6 hover:border-white/30 transition-all cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhHlkE33zgKxHWhLE0NCqSAhbo0aI9ZKK51grwaxWQlPi-8EJumOvn0VcFdHj-ni1Rq6bw__QKxoSfkmKLlC7IyrxvmiHv1pUsCH0tA-LhiRDotSnEGgggAILJMQxk-AWx5l7E6BzQv1iMaNE07zlDJ3kMRUIw_DAJfJYs1ExiWno87N_uZgD7pyLT9Xprm92fpMuaCfgWavd0Sbk320cWFURqdvqfwJ20fbEd5iQvSrKiez4Drkl1eTP1lXKrkxp5pvbaL8mWtoQ')"}}></div>
                    <div className="relative z-20 flex flex-col h-full justify-between min-h-[140px]">
                      <div>
                        <div className="inline-flex items-center justify-center p-2 rounded-lg bg-blue-500/20 text-blue-400 mb-3">
                          <span className="material-symbols-outlined">group_add</span>
                        </div>
                        <h3 className="text-white text-xl font-bold mb-1">Invite Friend</h3>
                        <p className="text-[#9db9ab] text-sm">Challenge a Farcaster connection.</p>
                      </div>
                      <div className="flex items-center gap-2 text-white font-bold text-sm mt-4">
                        <span>SEND INVITE</span>
                        <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Active Operations List */}
              <section className="flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white text-sm font-bold tracking-widest uppercase text-[#9db9ab] flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">stadia_controller</span> Active Operations
                  </h2>
                  <button className="text-xs text-primary font-medium hover:underline">VIEW ARCHIVE</button>
                </div>
                <div className="flex flex-col gap-3">
                  {/* Active Game Item: Your Turn */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl bg-[#1c2721] border border-primary/40 shadow-[0_0_15px_rgba(19,236,128,0.05)] hover:bg-[#232f29] transition-colors gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img alt="Opponent Avatar" className="w-12 h-12 rounded-full border-2 border-[#283930]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWXLyDz1ijJ0h2l_6cPFQt7-0T6stwOqzras7Olx32gIilkx-1UttTUO8boexbIKgA8gGKocUlOzl0UrZ_wN6IuRZxTlUIeNbptDerg2kwULErn0UGwEHWCSDn_pAsDbxYzBB16T5YYopOAtr_OeAXDXXUC3ktu5wWAHZmYk2z1D-EQF2UzFYiT1E7m5nKia8l1KefAvOTfbLl3t4aQK6veMiexDoKpdl6PYA_SbmxD1_F67QTy5JzXy7OW1gLHzNf-lbK-miyEps"/>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#283930] rounded-full flex items-center justify-center border border-[#1c2721]">
                          <span className="text-[10px] font-bold text-white">VS</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-white font-bold text-lg">@dwr.eth</h4>
                          <span className="text-[#9db9ab] text-xs px-1.5 py-0.5 rounded bg-[#283930]">Rank 14</span>
                        </div>
                        <p className="text-[#9db9ab] text-sm font-mono">Match #8821 • Turn 12</p>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-1 w-full md:w-auto justify-between md:justify-center">
                      <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold animate-pulse flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        YOUR TURN
                      </div>
                      <span className="text-[#9db9ab] text-xs">24m remaining</span>
                    </div>
                    <a href="/game" className="w-full md:w-auto h-10 px-6 rounded-lg bg-primary hover:bg-[#10c96d] text-[#111814] font-bold text-sm tracking-wide transition-colors flex items-center justify-center gap-2">
                      ENTER FRAME
                      <span className="material-symbols-outlined text-sm">login</span>
                    </a>
                  </div>

                  {/* Active Game Item: Opponent Turn */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl bg-[#1c2721] border border-[#283930] hover:bg-[#232f29] transition-colors gap-4 opacity-90">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img alt="Opponent Avatar" className="w-12 h-12 rounded-full border-2 border-[#283930] grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCywK5gT7ks-iYw6iVfShrf3sHLB9ohw826R3mOxXLw9MkkgAHeGtIu3N6i2OE71BEcauxdKBe7V-rZdgF8OcRBWwHLa2_6kd6U25muEm_5mWpOsYNThW1JNONLbmfrMBAgbo_U3opIroxavfuauVXIgrhXPBd_oIUbgAwv14NhO88GXPkbcBMw-rBqe-pA2aIPXIVbjVW-mq87NmRAJKhqsCShNunFdcP2NMmTsymedqcK0MCyeTm3tMTqZkuna3faDw9Pt0Sr5w0"/>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#283930] rounded-full flex items-center justify-center border border-[#1c2721]">
                          <span className="text-[10px] font-bold text-white">VS</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-white font-bold text-lg">@vitalik.eth</h4>
                          <span className="text-[#9db9ab] text-xs px-1.5 py-0.5 rounded bg-[#283930]">Rank 2</span>
                        </div>
                        <p className="text-[#9db9ab] text-sm font-mono">Match #9004 • Turn 4</p>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-1 w-full md:w-auto justify-between md:justify-center">
                      <div className="px-3 py-1 rounded-full bg-[#283930] border border-transparent text-gray-400 text-xs font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-[14px]">hourglass_empty</span>
                        WAITING
                      </div>
                      <span className="text-[#9db9ab] text-xs">Moved 2h ago</span>
                    </div>
                    <button className="w-full md:w-auto h-10 px-6 rounded-lg bg-[#283930] hover:bg-[#34463d] text-white font-bold text-sm tracking-wide transition-colors flex items-center justify-center gap-2">
                      SPECTATE
                      <span className="material-symbols-outlined text-sm">visibility</span>
                    </button>
                  </div>

                  {/* Active Game Item: Opponent Turn */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl bg-[#1c2721] border border-[#283930] hover:bg-[#232f29] transition-colors gap-4 opacity-90">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full border-2 border-[#283930] bg-[#283930] flex items-center justify-center text-white font-bold text-lg">LJ</div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#283930] rounded-full flex items-center justify-center border border-[#1c2721]">
                          <span className="text-[10px] font-bold text-white">VS</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-white font-bold text-lg">@lindajones</h4>
                          <span className="text-[#9db9ab] text-xs px-1.5 py-0.5 rounded bg-[#283930]">Rank 45</span>
                        </div>
                        <p className="text-[#9db9ab] text-sm font-mono">Match #8892 • Turn 22</p>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-1 w-full md:w-auto justify-between md:justify-center">
                      <div className="px-3 py-1 rounded-full bg-[#283930] border border-transparent text-gray-400 text-xs font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-[14px]">hourglass_empty</span>
                        WAITING
                      </div>
                      <span className="text-[#9db9ab] text-xs">Moved 5m ago</span>
                    </div>
                    <button className="w-full md:w-auto h-10 px-6 rounded-lg bg-[#283930] hover:bg-[#34463d] text-white font-bold text-sm tracking-wide transition-colors flex items-center justify-center gap-2">
                      SPECTATE
                      <span className="material-symbols-outlined text-sm">visibility</span>
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN: Service Record / Stats (Span 4) */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Main Stats Card */}
              <div className="bg-[#1c2721] rounded-xl border border-[#283930] p-6 relative overflow-hidden">
                {/* Decorative Background element */}
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <span className="material-symbols-outlined text-9xl">military_tech</span>
                </div>
                <h2 className="text-white text-sm font-bold tracking-widest uppercase mb-6 flex items-center gap-2 relative z-10">
                  <span className="material-symbols-outlined text-sm text-primary">badge</span> Service Record
                </h2>
                <div className="flex flex-col gap-6 relative z-10">
                  <div className="flex items-end justify-between border-b border-[#283930] pb-4">
                    <div>
                      <p className="text-[#9db9ab] text-sm mb-1">Current Rank</p>
                      <p className="text-white text-2xl font-bold tracking-tight">SILVER COMMANDER</p>
                    </div>
                    <div className="text-right">
                      <span className="text-primary text-3xl font-black font-mono">#145</span>
                      <p className="text-xs text-[#9db9ab]">Global</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#111814] p-3 rounded-lg border border-[#283930]">
                      <p className="text-[#9db9ab] text-xs mb-1">Wins</p>
                      <p className="text-primary text-xl font-bold">42</p>
                    </div>
                    <div className="bg-[#111814] p-3 rounded-lg border border-[#283930]">
                      <p className="text-[#9db9ab] text-xs mb-1">Losses</p>
                      <p className="text-red-400 text-xl font-bold">12</p>
                    </div>
                    <div className="bg-[#111814] p-3 rounded-lg border border-[#283930]">
                      <p className="text-[#9db9ab] text-xs mb-1">Win Rate</p>
                      <p className="text-white text-xl font-bold">77.8%</p>
                    </div>
                    <div className="bg-[#111814] p-3 rounded-lg border border-[#283930]">
                      <p className="text-[#9db9ab] text-xs mb-1">Played</p>
                      <p className="text-white text-xl font-bold">54</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini Leaderboard */}
              <div className="bg-[#1c2721] rounded-xl border border-[#283930] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-yellow-500">trophy</span> Top Commanders
                  </h3>
                  <a className="text-xs text-[#9db9ab] hover:text-white" href="#">View All</a>
                </div>
                <div className="flex flex-col gap-1">
                  {/* Rank 1 */}
                  <div className="flex items-center justify-between p-2 rounded hover:bg-[#283930] transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-500 font-bold font-mono w-4">1</span>
                      <div className="w-8 h-8 rounded-full bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDAh9xEflCwse9CfSiwx6zOYuWJYdrd9mg70qijC1COmIE6x0sInu8JiSJI1FdLz8MTxOYGwIGvNAmjnB7F3qIiuz-FNc6ek7vg_nFX9uatMT7fsw9Tuvp4liOgOG5kuDp3u2LgwFQKoVEgl7paQMHNMFuwDEG0XmyujFsI5gz_uBgOefaKQx_Zpb8T7zcvC18S7pw7GlNTPkMe0sJXUoe3PjEf2EcgWUBhIjGQyGASoWjsIeq1tXG7FDeiAwpzZRVhkrltTCC2adM')"}}></div>
                      <span className="text-white text-sm font-medium group-hover:text-primary transition-colors">@master_tact</span>
                    </div>
                    <span className="text-[#9db9ab] text-xs font-mono">2400 LP</span>
                  </div>
                  {/* Rank 2 */}
                  <div className="flex items-center justify-between p-2 rounded hover:bg-[#283930] transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 font-bold font-mono w-4">2</span>
                      <div className="w-8 h-8 rounded-full bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDeRaOzKrY_APo8-DZ8zId2FAzDUnQxsLJnlPP6k9-ozPZ6UOCvP9rlk2GvdiVHXwA35WQH93RgAU9_5IZbhozfmUX4BcAhYMLbCZjkIoGgM76_9R9HP7KEu1iOiT88hPbY8aswJwZwNHzC6LRhPCV0zfEeYMX6RV2EfHykp2qLij2g19NofsBYCUEWJZ24yJrp0U2x8koHf7JFrgVX4ZG1Jvhel5tt5tdQQHL0IE7kotTQI5HZt-Vi-0fjARNJSYe-YW4w9lw5L5U')"}}></div>
                      <span className="text-white text-sm font-medium group-hover:text-primary transition-colors">@strategy_king</span>
                    </div>
                    <span className="text-[#9db9ab] text-xs font-mono">2350 LP</span>
                  </div>
                  {/* Rank 3 */}
                  <div className="flex items-center justify-between p-2 rounded hover:bg-[#283930] transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <span className="text-orange-700 font-bold font-mono w-4">3</span>
                      <div className="w-8 h-8 rounded-full bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCUqQajQR8LZ6ztAYPd1ALVf-z_EGfXyXU7CsyJYR1dLEwkhMRpFBVptfsJx5psQ5rsv8s9KjajXaBNTQmNtz-qWb4JuE6RqpwHHLC48yZPGCVXABmUTk7WM9oEtN6v71hIZtDli6SPv1yKaByDVnhkWTDoKndJzqdPXxJcgK4MS7ZNE3YlyeKYSe7BGvMeY8552RL5P12gg621oLzufKMtQv-bCIaqe30k6UqzI0ZsICmnxaIw7yQEj9CpPhJryaZ1XU1U7TWbh78')"}}></div>
                      <span className="text-white text-sm font-medium group-hover:text-primary transition-colors">@queen_gambit</span>
                    </div>
                    <span className="text-[#9db9ab] text-xs font-mono">2310 LP</span>
                  </div>
                </div>
              </div>

              {/* System Status */}
              <div className="rounded-xl border border-[#283930] bg-[#111814] p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-xs text-[#9db9ab] font-mono">SERVER STATUS</span>
                </div>
                <span className="text-xs text-primary font-bold">OPTIMAL</span>
              </div>
            </aside>
          </div>
          {/* Footer for mobile spacer */}
          <div className="h-20 md:h-0"></div>
        </main>
      </div>

      {/* Mobile Bottom Nav (Visible only on small screens) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#111814] border-t border-[#283930] flex justify-around p-4 z-50">
        <a className="flex flex-col items-center gap-1 text-primary" href="/dashboard">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px]">Home</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-[#9db9ab]" href="/game">
          <span className="material-symbols-outlined">target</span>
          <span className="text-[10px]">Missions</span>
        </a>
        <div className="relative -top-8">
          <a href="/matchmaking" className="bg-primary text-[#111814] p-4 rounded-full shadow-[0_0_15px_rgba(19,236,128,0.4)] border-4 border-[#111814] flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl font-bold">add</span>
          </a>
        </div>
        <a className="flex flex-col items-center gap-1 text-[#9db9ab]" href="/tournaments">
          <span className="material-symbols-outlined">leaderboard</span>
          <span className="text-[10px]">Leaderboard</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-[#9db9ab]" href="/wallet">
          <span className="material-symbols-outlined">account_balance_wallet</span>
          <span className="text-[10px]">Wallet</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-[#9db9ab]" href="/profile">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px]">Settings</span>
        </a>
      </nav>
    </div>
  );
}
