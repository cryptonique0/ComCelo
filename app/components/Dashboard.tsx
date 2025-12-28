'use client';

export default function Dashboard() {
  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden">
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
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="#">
                <span className="material-symbols-outlined">dashboard</span>
                <span className="text-sm font-medium">Dashboard</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="#">
                <span className="material-symbols-outlined">target</span>
                <span className="text-sm font-medium">Missions</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="#">
                <span className="material-symbols-outlined">menu_book</span>
                <span className="text-sm font-medium">Rules &amp; Units</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg bg-[#283930] text-white border-l-2 border-primary group transition-all" href="#">
                <span className="material-symbols-outlined group-hover:text-primary transition-colors">manufacturing</span>
                <span className="text-sm font-medium">Customization</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="#">
                <span className="material-symbols-outlined">leaderboard</span>
                <span className="text-sm font-medium">Leaderboard</span>
              </a>
            </nav>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#1c2721] to-[#111814] border border-[#283930]">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full bg-cover bg-center border border-primary/30"
                data-alt="User Avatar"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJ-Yoolg08dNz1d32h5NxbOzuOLv7srIViZD45dHZVkyQFeeUp8YrdPVR0SXl7f3nUO5H2fKkEC8XJpNKWgIBBkJskutZ8lqddTo0C4UtTYLluV7znuXIIpkYXNYGPYyfxkYaDSB0Lg4bsKGZErtYBl5dwJI6gIMSgv6V144xAspezRj3ZumHP5vKQ0LE_RnxaEcxuccQblPCK00q93_CrqlFWrTWPxfksh4V2muexMHm-PR0YXpXM9HrNJagEqBl5z4zIi7VXbXY')",
                }}
              ></div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-bold">Commander</span>
                <span className="text-primary text-xs">Online</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="flex items-center justify-between border-b border-[#283930] bg-[#111814]/90 backdrop-blur-md px-6 py-4 sticky top-0 z-20">
          <div className="md:hidden flex items-center gap-3">
            <span className="material-symbols-outlined text-white">menu</span>
            <span className="text-white font-bold text-lg">ComCelo</span>
          </div>
          <div className="hidden md:flex flex-col">
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">UNIT FACTORY</h2>
            <p className="text-[#9db9ab] text-xs font-mono">UPGRADE CENTER // MODIFY SPECS</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-[#1c2721] rounded-lg border border-[#283930]">
              <span className="material-symbols-outlined text-yellow-400 text-sm">monetization_on</span>
              <span className="text-white font-mono font-bold text-sm">2,450 XP</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-[#1c2721] rounded-lg border border-[#283930]">
              <span className="material-symbols-outlined text-primary text-sm">token</span>
              <span className="text-white font-mono font-bold text-sm">150 CELO</span>
            </div>
            <button className="flex items-center gap-2 bg-[#1c2721] hover:bg-[#283930] border border-[#283930] rounded-lg px-3 py-2 text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-sm font-mono font-medium">0x71C...9A2</span>
            </button>
          </div>
        </header>

        <main
          className="flex-1 overflow-y-auto p-4 md:p-8 bg-cover bg-center relative"
          data-alt="Abstract digital grid background pattern"
          style={{
            backgroundImage:
              "linear-gradient(rgba(16, 34, 25, 0.95), rgba(16, 34, 25, 0.98)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDn-ZxeDXKm6HnDfoeBuo9S9SQhwYy37xkFgupRXm4hbGOXi50srRv05tey_B05i4gnIYvnrvJ3c1a0SdBKEeVgiXombEEDsrxiyDEefWgJtZMMsYunepYfNG96p4EMasV9vttJz-EaPZjHzj5znr0tHfWzE0Oce4CCGlJQDRNeY_ch-fw58L5xtiAgdyD-T4BXLYxVPNoO5Tmkr5JuXEIjw5xmc_6Jdik1jI3m1ySHhti1jvuwRKaWZsXdk_skQXeprKhWW3O8tsI')",
          }}
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-6 h-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#283930] pb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Unit Customization</h1>
                <p className="text-[#9db9ab] max-w-2xl">Invest resources to permanently enhance unit combat specifications. Strategic upgrades are irreversible.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
              <div className="lg:col-span-4 flex flex-col gap-4">
                <h3 className="text-[#9db9ab] text-xs font-bold uppercase tracking-widest mb-2">Select Unit Class</h3>

                <button className="card-glow w-full p-4 rounded-xl bg-[#1c2721] border border-primary/50 relative overflow-hidden group text-left transition-all">
                  <div className="absolute inset-0 bg-primary/5"></div>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-16 h-16 rounded-lg bg-[#111814] border border-primary/30 flex items-center justify-center overflow-hidden">
                      <img
                        alt="Hero Unit"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAh9xEflCwse9CfSiwx6zOYuWJYdrd9mg70qijC1COmIE6x0sInu8JiSJI1FdLz8MTxOYGwIGvNAmjnB7F3qIiuz-FNc6ek7vg_nFX9uatMT7fsw9Tuvp4liOgOG5kuDp3u2LgwFQKoVEgl7paQMHNMFuwDEG0XmyujFsI5gz_uBgOefaKQx_Zpb8T7zcvC18S7pw7GlNTPkMe0sJXUoe3PjEf2EcgWUBhIjGQyGASoWjsIeq1tXG7FDeiAwpzZRVhkrltTCC2adM"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-white font-bold text-lg">Commander</h4>
                        <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-bold border border-primary/30">LVL 5</span>
                      </div>
                      <p className="text-[#9db9ab] text-xs">Balanced stats, Leader</p>
                      <div className="flex gap-2 mt-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      </div>
                    </div>
                    <div className="text-primary">
                      <span className="material-symbols-outlined">chevron_right</span>
                    </div>
                  </div>
                </button>

                <button className="card-glow w-full p-4 rounded-xl bg-[#1c2721] border border-[#283930] hover:border-[#3e5246] relative overflow-hidden group text-left transition-all opacity-80 hover:opacity-100">
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-16 h-16 rounded-lg bg-[#111814] border border-[#283930] flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                      <img
                        alt="Soldier Unit"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeRaOzKrY_APo8-DZ8zId2FAzDUnQxsLJnlPP6k9-ozPZ6UOCvP9rlk2GvdiVHXwA35WQH93RgAU9_5IZbhozfmUX4BcAhYMLbCZjkIoGgM76_9R9HP7KEu1iOiT88hPbY8aswJwZwNHzC6LRhPCV0zfEeYMX6RV2EfHykp2qLij2g19NofsBYCUEWJZ24yJrp0U2x8koHf7JFrgVX4ZG1Jvhel5tt5tdQQHL0IE7kotTQI5HZt-Vi-0fjARNJSYe-YW4w9lw5L5U"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-white font-bold text-lg group-hover:text-primary transition-colors">Infantry</h4>
                        <span className="px-2 py-0.5 rounded bg-[#283930] text-[#9db9ab] text-[10px] font-bold border border-[#3e5246]">LVL 3</span>
                      </div>
                      <p className="text-[#9db9ab] text-xs">High DEF, Frontline</p>
                    </div>
                  </div>
                </button>

                <button className="card-glow w-full p-4 rounded-xl bg-[#1c2721] border border-[#283930] hover:border-[#3e5246] relative overflow-hidden group text-left transition-all opacity-80 hover:opacity-100">
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-16 h-16 rounded-lg bg-[#111814] border border-[#283930] flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                      <img
                        alt="Archer Unit"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUqQajQR8LZ6ztAYPd1ALVf-z_EGfXyXU7CsyJYR1dLEwkhMRpFBVptfsJx5psQ5rsv8s9KjajXaBNTQmNtz-qWb4JuE6RqpwHHLC48yZPGCVXABmUTk7WM9oEtN6v71hIZtDli6SPv1yKaByDVnhkWTDoKndJzqdPXxJcgK4MS7ZNE3YlyeKYSe7BGvMeY8552RL5P12gg621oLzufKMtQv-bCIaqe30k6UqzI0ZsICmnxaIw7yQEj9CpPhJryaZ1XU1U7TWbh78"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-white font-bold text-lg group-hover:text-primary transition-colors">Ranger</h4>
                        <span className="px-2 py-0.5 rounded bg-[#283930] text-[#9db9ab] text-[10px] font-bold border border-[#3e5246]">LVL 2</span>
                      </div>
                      <p className="text-[#9db9ab] text-xs">High ATK, Support</p>
                    </div>
                  </div>
                </button>
              </div>

              <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="bg-[#1c2721] border border-[#283930] rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                    <span className="material-symbols-outlined text-[120px]">hardware</span>
                  </div>
                  <div className="flex justify-between items-center mb-8 border-b border-[#283930] pb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        Commander Specs
                        <span className="material-symbols-outlined text-primary text-xl">verified</span>
                      </h2>
                      <p className="text-[#9db9ab] text-sm font-mono">UNIT ID: 8821-CMD // TIER 1</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#9db9ab] uppercase tracking-wider mb-1">Power Rating</div>
                      <div className="text-2xl font-bold text-primary font-mono">485</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#111814] border border-[#283930] rounded-lg p-4 hover:border-green-500/30 transition-colors group">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-green-500">favorite</span>
                          <span className="text-white font-bold">HP (Health)</span>
                        </div>
                        <span className="text-xs text-green-500 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">Tier 2</span>
                      </div>
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <span className="text-2xl font-bold text-white">120</span>
                          <span className="text-green-500 text-sm font-bold ml-1">+15</span>
                        </div>
                        <div className="text-[#9db9ab] text-xs">Max: 200</div>
                      </div>
                      <div className="unit-stat-bar bg-[#283930] mb-4">
                        <div className="unit-stat-preview" style={{ width: '67%' }}></div>
                        <div className="unit-stat-fill bg-green-500" style={{ width: '60%' }}></div>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#283930]">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#9db9ab] uppercase">Upgrade Cost</span>
                          <div className="flex items-center gap-1 text-white font-bold text-sm">
                            <span className="material-symbols-outlined text-yellow-400 text-xs">monetization_on</span> 250
                          </div>
                        </div>
                        <button className="bg-[#283930] hover:bg-green-600 text-white p-2 rounded transition-colors">
                          <span className="material-symbols-outlined">add</span>
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#111814] border border-[#283930] rounded-lg p-4 hover:border-red-500/30 transition-colors group">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-red-500">swords</span>
                          <span className="text-white font-bold">ATK (Attack)</span>
                        </div>
                        <span className="text-xs text-red-500 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">Tier 3</span>
                      </div>
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <span className="text-2xl font-bold text-white">45</span>
                          <span className="text-red-500 text-sm font-bold ml-1">+5</span>
                        </div>
                        <div className="text-[#9db9ab] text-xs">Max: 100</div>
                      </div>
                      <div className="unit-stat-bar bg-[#283930] mb-4">
                        <div className="unit-stat-preview" style={{ width: '50%' }}></div>
                        <div className="unit-stat-fill bg-red-500" style={{ width: '45%' }}></div>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#283930]">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#9db9ab] uppercase">Upgrade Cost</span>
                          <div className="flex items-center gap-1 text-white font-bold text-sm">
                            <span className="material-symbols-outlined text-yellow-400 text-xs">monetization_on</span> 400
                          </div>
                        </div>
                        <button className="bg-[#283930] hover:bg-red-600 text-white p-2 rounded transition-colors">
                          <span className="material-symbols-outlined">add</span>
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#111814] border border-[#283930] rounded-lg p-4 hover:border-blue-500/30 transition-colors group">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-blue-500">shield</span>
                          <span className="text-white font-bold">DEF (Defense)</span>
                        </div>
                        <span className="text-xs text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">Tier 1</span>
                      </div>
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <span className="text-2xl font-bold text-white">20</span>
                          <span className="text-blue-500 text-sm font-bold ml-1">+2</span>
                        </div>
                        <div className="text-[#9db9ab] text-xs">Max: 50</div>
                      </div>
                      <div className="unit-stat-bar bg-[#283930] mb-4">
                        <div className="unit-stat-preview" style={{ width: '44%' }}></div>
                        <div className="unit-stat-fill bg-blue-500" style={{ width: '40%' }}></div>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#283930]">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#9db9ab] uppercase">Upgrade Cost</span>
                          <div className="flex items-center gap-1 text-white font-bold text-sm">
                            <span className="material-symbols-outlined text-yellow-400 text-xs">monetization_on</span> 150
                          </div>
                        </div>
                        <button className="bg-[#283930] hover:bg-blue-600 text-white p-2 rounded transition-colors">
                          <span className="material-symbols-outlined">add</span>
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#111814] border border-[#283930] rounded-lg p-4 hover:border-yellow-500/30 transition-colors group relative">
                      <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center backdrop-blur-[1px] rounded-lg border border-[#283930]">
                        <div className="text-center">
                          <span className="material-symbols-outlined text-[#9db9ab] text-3xl mb-1">lock</span>
                          <p className="text-white font-bold text-sm">Max Level Reached</p>
                          <p className="text-[#9db9ab] text-xs">Range cannot be upgraded further</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-start mb-3 opacity-50">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-yellow-500">radar</span>
                          <span className="text-white font-bold">RNG (Range)</span>
                        </div>
                        <span className="text-xs text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">MAX</span>
                      </div>
                      <div className="flex justify-between items-end mb-2 opacity-50">
                        <div>
                          <span className="text-2xl font-bold text-white">1</span>
                        </div>
                        <div className="text-[#9db9ab] text-xs">Max: 1</div>
                      </div>
                      <div className="unit-stat-bar bg-[#283930] mb-4 opacity-50">
                        <div className="unit-stat-fill bg-yellow-500" style={{ width: '100%' }}></div>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#283930] opacity-50">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#9db9ab] uppercase">Upgrade Cost</span>
                          <div className="flex items-center gap-1 text-white font-bold text-sm">
                            <span className="material-symbols-outlined text-yellow-400 text-xs">monetization_on</span> -
                          </div>
                        </div>
                        <button className="bg-[#283930] text-white p-2 rounded cursor-not-allowed">
                          <span className="material-symbols-outlined">add</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-[#111814] border border-[#283930] rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-full border border-primary/20">
                        <span className="material-symbols-outlined text-primary">auto_fix_high</span>
                      </div>
                      <div>
                        <h4 className="text-white font-bold">Special Ability: Rally Cry</h4>
                        <p className="text-[#9db9ab] text-xs max-w-md">Passive: Increases nearby allies ATK by 10%. Upgrade available at Level 10.</p>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-[#283930] text-[#9db9ab] text-sm font-bold rounded border border-[#3e5246] cursor-not-allowed flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">lock</span>
                      Locked (Lvl 10)
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-20 md:h-0"></div>
          </div>
        </main>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#111814] border-t border-[#283930] flex justify-around p-4 z-50">
        <a className="flex flex-col items-center gap-1 text-[#9db9ab]" href="#">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px]">Home</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-[#9db9ab]" href="#">
          <span className="material-symbols-outlined">target</span>
          <span className="text-[10px]">Missions</span>
        </a>
        <div className="relative -top-8">
          <button className="bg-primary text-[#111814] p-4 rounded-full shadow-[0_0_15px_rgba(19,236,128,0.4)] border-4 border-[#111814]">
            <span className="material-symbols-outlined text-2xl font-bold">manufacturing</span>
          </button>
        </div>
        <a className="flex flex-col items-center gap-1 text-[#9db9ab]" href="#">
          <span className="material-symbols-outlined">swords</span>
          <span className="text-[10px]">Rules</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-[#9db9ab]" href="#">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px]">Settings</span>
        </a>
      </nav>
    </div>
  );
}
