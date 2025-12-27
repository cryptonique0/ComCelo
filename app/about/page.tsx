export default function AboutPage() {
  const values = [
    {
      title: 'Blockchain Innovation',
      icon: 'token',
      desc: 'On-chain actions feel instant thanks to Celo speed, Base-ready relayers, and battle-tested contract patterns.',
    },
    {
      title: 'Competitive Integrity',
      icon: 'swords',
      desc: 'Skill-first 1v1 tactics with transparent rules, no pay-to-win, and clear telemetry for every move.',
    },
    {
      title: 'Community Ownership',
      icon: 'groups',
      desc: 'Farcaster-native loops, player governance, and content shaped by the commanders who play daily.',
    },
  ];

  const tech = [
    { name: 'Celo', label: 'Layer 2', icon: 'deployed_code' },
    { name: 'Farcaster', label: 'Frames', icon: 'hub' },
    { name: 'Next.js', label: 'App Router', icon: 'integration_instructions' },
    { name: 'Solidity', label: 'Smart Contracts', icon: 'security' },
  ];

  const roadmap = [
    {
      phase: 'Phase 1: Deployment',
      detail: 'Frames launch with core 1v1 mechanics and base contracts verified.',
      status: 'Completed',
      accent: 'bg-primary',
      badge: 'bg-[#3b5447] text-white',
    },
    {
      phase: 'Phase 2: Escalation',
      detail: 'Mainnet push, leaderboards, player profiles, and first sanctioned tournament.',
      status: 'In Progress',
      accent: 'bg-[#1c2721] border-primary',
      badge: 'bg-primary/20 text-primary animate-pulse',
    },
    {
      phase: 'Phase 3: Governance',
      detail: 'DAO voting on maps, balance, and cosmetics. Community-designed operations.',
      status: 'Queued',
      accent: 'bg-[#1c2721] border-[#3b5447]',
      badge: 'bg-[#3b5447] text-white',
    },
  ];

  const team = [
    {
      name: "Alex 'Zero'",
      role: 'Founder / Architect',
      bio: 'Systems thinker behind the tactical grid and contract topology.',
      image:
        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDNuCG3KBJno3hrB0ODaVoz1qhQ2Kn9-7SxNDSDdtKKr-fPYDzNpEgVWvlZP881O-p4O8-YB74vy3WHgagpKkr5cLGwINkMCiU3Zvx8YP0vnB0w0iFZkeVfeF9LU1fvV1A3cC6FdUQsjesduFr_AEjdOGEtjShqXyfy4WMTAI73efIWK9FpXyef_8jD8u8dRKxax8rZ2uIffEP3vjiL2IcNh1SP5nOzMaWba8VNQRCdGuMw17hxXHWhKZa0-2oLL5Wm-zqQmQvzifw')",
    },
    {
      name: "Elena 'Pixel'",
      role: 'UI/UX Strategist',
      bio: 'Owns the neon HUD language and makes every frame feed-friendly.',
      image:
        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSEf61b7P1hMggwFil3VySAoLY6ADFg9o0cUOOAKU03GU99L_ZkTSk9C0V0bdJ6SVuCnOt1bNsKDmD09djIa99F04DpWZ53h_A4NHUlWaCBGOteou9hMVipRXNZTiglkp6DNqnOYOlCuY6VxqwwSOeYfNXc_PboVI_aCW3szEXSSDZGcoOajDlVnn7Hw4sALLIa3FGd46QxiwUEZTDZ5Ua_FpDzDBjeFTdg0roq9cXMtfCchiDbXCgTp-SqelO8mFG65UfbY2Pf7k')",
    },
    {
      name: "Marcus 'Ops'",
      role: 'Community Lead',
      bio: 'Runs the Discord battlegrounds and feedback loops with commanders.',
      image:
        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJYeFBZg0fJl6nhVz0KTBsG0-js1t_kNjh1cfegzQeA28YVMtTmnc3Qujbtha6JrUVW4i1gFp-x8Ux00N48t6pNqTeDIzwenMyYWcQeYHLbx5BP1aB1Wh6jkLd83KGu93HfPWe_7TbaCbqiMHJropSYTzHslfcE4FBvn4MTrwDpzlJQI4Vi8vrm215kr8lEdMAfCEtS7JAsj9hnBFYyWEC6n6k-1rLB9oSAshTY0h5X-bGimUrfz1tbnDtOp9pKyYPk6dFW_tEdHA')",
    },
    {
      name: "Sarah 'Sol'",
      role: 'Smart Contract Lead',
      bio: 'Secures the on-chain logic, audits battle flows, and keeps gas lean.',
      image:
        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAoGOd_HdM_Y8oXrrisITG5g7gYXrJ7GA5s-VJpz8KRm6Jf9TH6l2vNIi1g3O8oAVlDmnBkh4Dwgj5yR5dBqIP8_tKj1Eta3i_ZpzBRTcAcmrhmtJJ_eIBUNJF_kY1B11Hf6zIJrws5s8jdC579S_TDMl_4lxSh4FAbYpkElnGK_i8LjrIWY58AubdzRRRng_UooV24C9X-hxSTvfsK3sWi23VxeM3z451hm4dezJlVbwxsb6PICiYrNOr7AOgkINZQKmYhhD5GjKk')",
    },
  ];

  return (
    <main className="relative isolate flex flex-col gap-12 pb-16 text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#132d21] via-[#0f231b] to-[#0b1812]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(19,236,128,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(19,236,128,0.08),transparent_40%)]" />
        <div className="absolute inset-0 mix-blend-overlay opacity-30" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDn-ZxeDXKm6HnDfoeBuo9S9SQhwYy37xkFgupRXm4hbGOXi50srRv05tey_B05i4gnIYvnrvJ3c1a0SdBKEeVgiXombEEDsrxiyDEefWgJtZMMsYunepYfNG96p4EMasV9vttJz-EaPZjHzj5znr0tHfWzE0Oce4CCGlJQDRNeY_ch-fw58L5xtiAgdyD-T4BXLYxVPNoO5Tmkr5JuXEIjw5xmc_6Jdik1jI3m1ySHhti1jvuwRKaWZsXdk_skQXeprKhWW3O8tsI')" }} />
      </div>

      {/* Hero */}
      <section className="relative w-full overflow-hidden rounded-3xl border border-[#3b5447] bg-[#111814]/70 backdrop-blur-xl shadow-2xl shadow-[rgba(19,236,128,0.08)]">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAWXLyDz1ijJ0h2l_6cPFQt7-0T6stwOqzras7Olx32gIilkx-1UttTUO8boexbIKgA8gGKocUlOzl0UrZ_wN6IuRZxTlUIeNbptDerg2kwULErn0UGwEHWCSDn_pAsDbxYzBB16T5YYopOAtr_OeAXDXXUC3ktu5wWAHZmYk2z1D-EQF2UzFYiT1E7m5nKia8l1KefAvOTfbLl3t4aQK6veMiexDoKpdl6PYA_SbmxD1_F67QTy5JzXy7OW1gLHzNf-lbK-miyEps')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="relative z-10 flex flex-col gap-6 p-8 md:p-12 text-center">
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.4em] text-primary">
            <span className="material-symbols-outlined text-xs">radar</span>
            Tactical Vision
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">Forging the Future of On-Chain Strategy</h1>
          <p className="mx-auto max-w-3xl text-lg text-[#c8d6ce]">
            ComCelo is a Farcaster Frame-first, blockchain-backed 1v1 tactical strategy game. We blend precision gameplay with transparent, lightning-fast settlement on Celo.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a className="flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-[#0d1a13] shadow-[0_0_25px_rgba(19,236,128,0.25)] transition hover:scale-105" href="#values">
              Read the Manifesto
            </a>
            <a className="flex items-center justify-center rounded-xl border border-primary/30 bg-primary/10 px-6 py-3 text-sm font-bold text-primary transition hover:bg-primary/20" href="https://warpcast.com/" target="_blank" rel="noreferrer">
              Join Warpcast
            </a>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section id="values" className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-black">Our Mission</h2>
          <p className="max-w-3xl text-lg text-[#9db9ab]">
            ComCelo brings tactical depth to on-chain competition. Sub-second confirmations, verifiable fairness, and community-led evolution—built for commanders who live in the feed.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="flex flex-col gap-4 rounded-2xl border border-[#3b5447] bg-[#1c2721]/90 p-6 transition hover:-translate-y-1 hover:border-primary/50"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                <span className="material-symbols-outlined text-2xl">{value.icon}</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{value.title}</h3>
                <p className="text-sm text-[#9db9ab] leading-relaxed">{value.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-[#9db9ab]">
          <span className="material-symbols-outlined text-base">grid_view</span>
          Tech Arsenal
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tech.map((stack) => (
            <div
              key={stack.name}
              className="flex flex-col items-center gap-2 rounded-xl border border-[#3b5447] bg-[#1c2721] p-6 text-center transition hover:bg-[#233029]"
            >
              <span className="material-symbols-outlined text-4xl text-primary">{stack.icon}</span>
              <h3 className="text-lg font-bold">{stack.name}</h3>
              <p className="text-xs text-[#9db9ab]">{stack.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="grid gap-10 border-t border-[#3b5447]/40 pt-10 md:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <h2 className="text-3xl font-black">Battle Plan</h2>
          <p className="text-[#9db9ab] max-w-xl">The strategic roadmap guiding ComCelo to competitive dominance.</p>
          <div className="h-48 rounded-2xl border border-[#3b5447] bg-[#1c2721] flex items-center justify-center opacity-70">
            <span className="material-symbols-outlined text-5xl text-[#3b5447]">map</span>
          </div>
        </div>
        <div className="relative ml-2 border-l-2 border-[#3b5447] pl-6">
          <div className="absolute left-[-11px] top-0 h-full w-[22px] rounded-full bg-gradient-to-b from-primary/40 to-transparent" />
          <div className="space-y-8">
            {roadmap.map((step, idx) => (
              <div key={step.phase} className="relative">
                <div
                  className={`absolute -left-[37px] top-1 h-5 w-5 rounded-full border-4 ${idx === 0 ? 'border-[#0d1a13]' : 'border-primary/40'} ${step.accent}`}
                />
                <h3 className={`text-lg font-bold ${idx === 1 ? 'text-primary' : 'text-white'}`}>{step.phase}</h3>
                <p className="text-sm text-[#9db9ab]">{step.detail}</p>
                <span className={`mt-2 inline-block rounded px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ${step.badge}`}>
                  {step.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-black">The Squad</h2>
            <p className="text-[#9db9ab]">Operators building the grid.</p>
          </div>
          <span className="hidden text-xs font-mono uppercase tracking-[0.25em] text-primary/80 sm:inline">Core Team</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="group flex flex-col gap-3 rounded-xl border border-[#3b5447] bg-[#1c2721]/90 p-4 transition duration-300 hover:-translate-y-1 hover:border-primary/60"
            >
              <div
                className="w-full aspect-square rounded-lg bg-cover bg-center grayscale transition duration-300 group-hover:grayscale-0"
                style={{ backgroundImage: member.image }}
              />
              <div>
                <p className="text-lg font-bold">{member.name}</p>
                <p className="text-sm font-medium text-primary mb-1">{member.role}</p>
                <p className="text-xs text-[#9db9ab] leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community & Social */}
      <section className="grid gap-10 border-t border-[#3b5447]/40 pt-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-black">Join the Network</h2>
            <p className="text-[#9db9ab]">Connect with developers and fellow strategists across our secure channels.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href="https://warpcast.com/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-[#855DCD]/30 bg-[#855DCD]/10 p-4 transition hover:border-[#855DCD] hover:bg-[#855DCD]/20"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-[#855DCD] text-white transition group-hover:scale-110">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm4.24-5.24c-.75.75-1.96.75-2.71 0-.36-.36-.53-.86-.53-1.35 0-.49.17-.99.53-1.35.75-.75 1.96-.75 2.71 0 .75.75.75 1.96 0 2.7zm-8.48 0c-.75.75-1.96.75-2.71 0-.75-.75-.75-1.96 0-2.7.75-.75 1.96-.75 2.71 0 .36.36.53.86.53 1.35 0 .49-.17.99-.53 1.35z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold">Farcaster</h3>
                <p className="text-xs text-[#9db9ab]">@ComCelo</p>
              </div>
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-[#1DA1F2]/30 bg-[#1DA1F2]/10 p-4 transition hover:border-[#1DA1F2] hover:bg-[#1DA1F2]/20"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-[#1DA1F2] text-white transition group-hover:scale-110">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold">Twitter</h3>
                <p className="text-xs text-[#9db9ab]">@ComCeloGame</p>
              </div>
            </a>
            <a
              href="https://discord.com/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-[#5865F2]/30 bg-[#5865F2]/10 p-4 transition hover:border-[#5865F2] hover:bg-[#5865F2]/20"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-[#5865F2] text-white transition group-hover:scale-110">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold">Discord</h3>
                <p className="text-xs text-[#9db9ab]">Official Server</p>
              </div>
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-[#333]/50 bg-[#24292e]/20 p-4 transition hover:border-white/20 hover:bg-[#24292e]/40"
            >
              <div className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-[#24292e] text-white transition group-hover:scale-110">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold">GitHub</h3>
                <p className="text-xs text-[#9db9ab]">View Source</p>
              </div>
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-black">Transmission Log</h2>
            <a href="#" className="text-xs font-bold uppercase tracking-wider text-primary transition hover:text-white">
              View All
            </a>
          </div>
          <div className="space-y-3">
            <div className="group cursor-pointer rounded-xl border border-[#3b5447] bg-[#1c2721] p-4 transition hover:border-primary/50">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded bg-[#3b5447]/30 text-center">
                  <span className="text-[10px] font-bold uppercase text-[#9db9ab]">Oct</span>
                  <span className="text-lg font-bold">24</span>
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold transition group-hover:text-primary">Season 1 Tournament Registration</h3>
                  <p className="line-clamp-2 text-sm text-[#9db9ab]">Sign-ups for the inaugural on-chain battle are now live. Prize pool includes 5000 CELO.</p>
                </div>
              </div>
            </div>
            <div className="group cursor-pointer rounded-xl border border-[#3b5447] bg-[#1c2721] p-4 transition hover:border-primary/50">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded bg-[#3b5447]/30 text-center">
                  <span className="text-[10px] font-bold uppercase text-[#9db9ab]">Oct</span>
                  <span className="text-lg font-bold">15</span>
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold transition group-hover:text-primary">Developer Update: Frame v2 Support</h3>
                  <p className="line-clamp-2 text-sm text-[#9db9ab]">We've updated our Farcaster Frame to support the latest interactive standards.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-[#3b5447] bg-gradient-to-r from-[#1c2721] to-[#0f241a] p-8 text-center shadow-[0_0_30px_rgba(19,236,128,0.05)]">
        <h2 className="text-2xl md:text-3xl font-bold">Ready to Deploy?</h2>
        <p className="mx-auto mb-6 mt-2 max-w-2xl text-[#9db9ab]">
          Join the ranks of elite strategists. Connect your wallet, drop into a Farcaster Frame, and claim your slot on the leaderboard.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a className="inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3 text-sm font-bold text-[#0d1a13] transition hover:bg-white" href="/matchmaking">
            Launch Game
          </a>
          <a className="inline-flex items-center justify-center rounded-xl border border-primary/40 bg-primary/10 px-7 py-3 text-sm font-bold text-primary transition hover:bg-primary/20" href="/shop">
            View Cosmetics
          </a>
        </div>
      </section>
    </main>
  );
}
