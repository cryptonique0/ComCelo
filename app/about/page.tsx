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
