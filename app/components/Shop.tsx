'use client';

import { useMemo, useState } from 'react';
import { useAccount } from 'wagmi';

interface ShopItem {
  name: string;
  description: string;
  price: number;
  category: 'Hero Skins' | 'Upgrades' | 'Avatars' | 'Legendary';
  tag: string;
  tagColor: string;
  image?: string;
  icon?: string;
  locked?: boolean;
  lockText?: string;
}

const items: ShopItem[] = [
  {
    name: 'Crimson Vanguard',
    description: 'Elite heavy armor skin with reactive light channels.',
    price: 1200,
    category: 'Hero Skins',
    tag: 'Skin',
    tagColor: 'text-secondary border-secondary/30',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBd4GhnidTrJPXgIdO6zunP1Yn6fkOJJsFtNhWnV4ys-8dBGJIEqEVZsGZGFnTV-rCZZG1feeg2c5KxqpK74Eodz-6bW5v5Gc4MlSlS2tHxz5UKFpTJP1QpedLm_joeQ644x-4uLeSXcpuR0HW3PPoLxLWa0vL6jNshpBFjX-Vx77lalmmCfQ1-Swsdmk8BlX6sEU7WdNgnptIaPeLnJnNioidRv1nc3Q9EcxNmQo8YQcb-GLHJniOqVf9gDuUnE3mP3Vyf1V7JsA0',
  },
  {
    name: 'Neural Glitch',
    description: 'Animated profile avatar with rare visual distortion effects.',
    price: 850,
    category: 'Avatars',
    tag: 'Avatar',
    tagColor: 'text-purple-400 border-purple-400/30',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB5LBqokVpFcG1oLI8hV6VTLS8I28WAIWtZ8DokRC1CbmWSU9t4LQK3-M3eb03AzQqq9YUY5VhuRr8zYTbIH_KE7c4qBoIN5y5j_IKpd6dPefP3D-5ThZl6KSixwBb0JZ1oeY4z5HA1mdftB4aHENYLT89e-R3Gs8n6DvlmSC8aYnJWQzWiVcIfM0lNttTHzqb1khHcI7wQXVLO6lPGMysXu6qq_ud1r8gL7d3A5imwPRJHi77y-WbklI_byEB06KkxaxdAJTJ9qr0',
  },
  {
    name: 'Titanium Plating',
    description: 'Increases unit durability visualization. Purely cosmetic.',
    price: 500,
    category: 'Upgrades',
    tag: 'Upgrade',
    tagColor: 'text-orange-400 border-orange-400/30',
    icon: 'shield',
  },
  {
    name: 'Arctic Operator',
    description: 'Camouflage designed for frozen tundra environments.',
    price: 950,
    category: 'Hero Skins',
    tag: 'Skin',
    tagColor: 'text-secondary border-secondary/30',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ-Yoolg08dNz1d32h5NxbOzuOLv7srIViZD45dHZVkyQFeeUp8YrdPVR0SXl7f3nUO5H2fKkEC8XJpNKWgIBBkJskutZ8lqddTo0C4UtTYLluV7znuXIIpkYXNYGPYyfxkYaDSB0Lg4bsKGZErtYBl5dwJI6gIMSgv6V144xAspezRj3ZumHP5vKQ0LE_RnxaEcxuccQblPCK00q93_CrqlFWrTWPxfksh4V2muexMHm-PR0YXpXM9HrNJagEqBl5z4zIi7VXbXY',
  },
  {
    name: 'Plasma Discharge',
    description: 'Adds blue plasma particle effects to standard projectiles.',
    price: 600,
    category: 'Upgrades',
    tag: 'Upgrade',
    tagColor: 'text-orange-400 border-orange-400/30',
    icon: 'bolt',
  },
  {
    name: 'Recon Helm',
    description: 'Standard issue reconnaissance helmet avatar.',
    price: 300,
    category: 'Avatars',
    tag: 'Avatar',
    tagColor: 'text-purple-400 border-purple-400/30',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ-Yoolg08dNz1d32h5NxbOzuOLv7srIViZD45dHZVkyQFeeUp8YrdPVR0SXl7f3nUO5H2fKkEC8XJpNKWgIBBkJskutZ8lqddTo0C4UtTYLluV7znuXIIpkYXNYGPYyfxkYaDSB0Lg4bsKGZErtYBl5dwJI6gIMSgv6V144xAspezRj3ZumHP5vKQ0LE_RnxaEcxuccQblPCK00q93_CrqlFWrTWPxfksh4V2muexMHm-PR0YXpXM9HrNJagEqBl5z4zIi7VXbXY',
  },
  {
    name: 'Shadow Ops',
    description: 'All-black tactical gear for night operations.',
    price: 1500,
    category: 'Hero Skins',
    tag: 'Skin',
    tagColor: 'text-secondary border-secondary/30',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDn-ZxeDXKm6HnDfoeBuo9S9SQhwYy37xkFgupRXm4hbGOXi50srRv05tey_B05i4gnIYvnrvJ3c1a0SdBKEeVgiXombEEDsrxiyDEefWgJtZMMsYunepYfNG96p4EMasV9vttJz-EaPZjHzj5znr0tHfWzE0Oce4CCGlJQDRNeY_ch-fw58L5xtiAgdyD-T4BXLYxVPNoO5Tmkr5JuXEIjw5xmc_6Jdik1jI3m1ySHhti1jvuwRKaWZsXdk_skQXeprKhWW3O8tsI',
  },
  {
    name: 'Golden General',
    description: 'The ultimate status symbol. Pure gold armor plating.',
    price: 5000,
    category: 'Legendary',
    tag: 'Legendary',
    tagColor: 'text-red-400 border-red-400/30',
    locked: true,
    lockText: 'Unlock at Rank Diamond I',
    icon: 'workspace_premium',
  },
];

const categories = ['All Items', 'Hero Skins', 'Upgrades', 'Avatars', 'Legendary'] as const;
type Category = (typeof categories)[number];

export default function Shop() {
  const { address } = useAccount();
  const [category, setCategory] = useState<Category>('All Items');
  const [sort, setSort] = useState<string>('Recommended');

  const filtered = useMemo(() => {
    let list = items.filter((item) => (category === 'All Items' ? true : item.category === category));
    switch (sort) {
      case 'Price: Low to High':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'Newest':
        list = [...list].reverse();
        break;
      default:
        break;
    }
    return list;
  }, [category, sort]);

  const truncated = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet';

  return (
    <div className="bg-[#102219] text-white min-h-screen flex">
      {/* Slim Sidebar */}
      <aside className="hidden md:flex flex-col w-20 h-full border-r border-[#283930] bg-[#111814] items-center py-4 z-30">
        <div className="mb-8">
          <span className="material-symbols-outlined text-primary text-3xl">token</span>
        </div>
        <nav className="flex flex-col gap-4 w-full px-2">
          <a className="flex justify-center p-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="/dashboard" title="Dashboard">
            <span className="material-symbols-outlined">dashboard</span>
          </a>
          <a className="flex justify-center p-3 rounded-lg bg-[#283930] text-primary border-l-2 border-primary transition-all shadow-[0_0_15px_rgba(19,236,128,0.1)]" href="/shop" title="Shop">
            <span className="material-symbols-outlined">storefront</span>
          </a>
          <a className="flex justify-center p-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="/matchmaking" title="Matchmaking">
            <span className="material-symbols-outlined">swords</span>
          </a>
          <a className="flex justify-center p-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="/tournaments" title="Leaderboard">
            <span className="material-symbols-outlined">trophy</span>
          </a>
          <a className="flex justify-center p-3 rounded-lg hover:bg-[#1c2721] text-[#9db9ab] hover:text-white transition-all" href="/profile" title="Settings">
            <span className="material-symbols-outlined">settings</span>
          </a>
        </nav>
        <div className="mt-auto">
          <div
            className="w-10 h-10 rounded-full bg-cover bg-center border border-primary/30"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJ-Yoolg08dNz1d32h5NxbOzuOLv7srIViZD45dHZVkyQFeeUp8YrdPVR0SXl7f3nUO5H2fKkEC8XJpNKWgIBBkJskutZ8lqddTo0C4UtTYLluV7znuXIIpkYXNYGPYyfxkYaDSB0Lg4bsKGZErtYBl5dwJI6gIMSgv6V144xAspezRj3ZumHP5vKQ0LE_RnxaEcxuccQblPCK00q93_CrqlFWrTWPxfksh4V2muexMHm-PR0YXpXM9HrNJagEqBl5z4zIi7VXbXY')",
            }}
          ></div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#102219]">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#283930] bg-[#111814]/95 backdrop-blur-md px-6 py-3 z-20">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg bg-cover bg-center border border-primary"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJ-Yoolg08dNz1d32h5NxbOzuOLv7srIViZD45dHZVkyQFeeUp8YrdPVR0SXl7f3nUO5H2fKkEC8XJpNKWgIBBkJskutZ8lqddTo0C4UtTYLluV7znuXIIpkYXNYGPYyfxkYaDSB0Lg4bsKGZErtYBl5dwJI6gIMSgv6V144xAspezRj3ZumHP5vKQ0LE_RnxaEcxuccQblPCK00q93_CrqlFWrTWPxfksh4V2muexMHm-PR0YXpXM9HrNJagEqBl5z4zIi7VXbXY')",
                }}
              ></div>
              <div>
                <h2 className="text-white text-sm font-bold">Commander (You)</h2>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-primary font-mono bg-primary/10 px-1.5 rounded border border-primary/20">ONLINE</span>
                  <span className="text-[10px] text-[#9db9ab] font-mono">Rank: Diamond II</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-[#1c2721] rounded-full border border-[#283930] shadow-lg">
              <span className="material-symbols-outlined text-sm text-[#9db9ab]">shopping_bag</span>
              <span className="text-xs font-bold text-[#9db9ab] uppercase tracking-widest">Supply Depot</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#1c2721]/50 border border-[#283930]">
              <span className="material-symbols-outlined text-yellow-400 text-sm">monetization_on</span>
              <div className="flex flex-col items-end leading-none">
                <span className="text-xs text-white font-mono font-bold">4,250</span>
                <span className="text-[9px] text-[#9db9ab] uppercase">Credits</span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#1c2721] border border-[#283930] hover:border-primary/30 transition-colors">
              <span className="material-symbols-outlined text-[#9db9ab] text-sm">wallet</span>
              <span className="text-xs text-white font-mono">{truncated}</span>
            </button>
          </div>
        </header>

        <main
          className="flex-1 relative flex flex-col p-6 overflow-y-auto scroll-smooth"
          style={{
            backgroundImage:
              "radial-gradient(circle at top right, rgba(19, 236, 128, 0.05) 0%, rgba(16, 34, 25, 1) 60%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDn-ZxeDXKm6HnDfoeBuo9S9SQhwYy37xkFgupRXm4hbGOXi50srRv05tey_B05i4gnIYvnrvJ3c1a0SdBKEeVgiXombEEDsrxiyDEefWgJtZMMsYunepYfNG96p4EMasV9vttJz-EaPZjHzj5znr0tHfWzE0Oce4CCGlJQDRNeY_ch-fw58L5xtiAgdyD-T4BXLYxVPNoO5Tmkr5JuXEIjw5xmc_6Jdik1jI3m1ySHhti1jvuwRKaWZsXdk_skQXeprKhWW3O8tsI')",
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
          }}
        >
          {/* Hero Banner */}
          <div className="w-full max-w-6xl mx-auto mb-10">
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-[#283930] group shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAWXLyDz1ijJ0h2l_6cPFQt7-0T6stwOqzras7Olx32gIilkx-1UttTUO8boexbIKgA8gGKocUlOzl0UrZ_wN6IuRZxTlUIeNbptDerg2kwULErn0UGwEHWCSDn_pAsDbxYzBB16T5YYopOAtr_OeAXDXXUC3ktu5wWAHZmYk2z1D-EQF2UzFYiT1E7m5nKia8l1KefAvOTfbLl3t4aQK6veMiexDoKpdl6PYA_SbmxD1_F67QTy5JzXy7OW1gLHzNf-lbK-miyEps')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#102219] via-[#102219]/80 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-black text-[10px] font-bold uppercase tracking-widest rounded w-fit mb-4">
                  <span className="material-symbols-outlined text-sm">star</span>
                  Featured Bundle
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2 leading-tight">
                  Void Walker <br />
                  <span className="text-primary">Spec-Ops Kit</span>
                </h1>
                <p className="text-[#9db9ab] max-w-md mb-6 text-sm md:text-base">
                  Equip your units with the latest stealth technology and phantom aesthetics. Includes hero skin, weapon shader, and exclusive avatar.
                </p>
                <div className="flex items-center gap-4">
                  <button className="bg-primary hover:bg-white hover:scale-105 text-black font-bold py-3 px-8 rounded-lg transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(19,236,128,0.3)]">
                    Purchase Bundle
                    <span className="bg-black/10 px-2 py-0.5 rounded text-xs ml-2">2400 CR</span>
                  </button>
                  <button className="px-6 py-3 rounded-lg border border-[#9db9ab]/30 text-white hover:bg-white/5 transition-colors text-sm font-bold uppercase tracking-wide">
                    View Details
                  </button>
                </div>
              </div>
              <div className="absolute top-4 right-4 flex gap-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-primary/30"></div>
                <div className="w-2 h-2 rounded-full bg-primary/10"></div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="w-full max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sticky top-0 bg-[#102219]/95 backdrop-blur-lg py-4 z-20 border-b border-[#283930]">
              <div className="flex items-center gap-2 bg-[#1c2721] p-1 rounded-lg border border-[#283930]">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wide transition-colors ${category === c ? 'bg-primary text-[#111814] shadow-sm' : 'hover:bg-[#283930] text-[#9db9ab] hover:text-white'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 text-xs text-[#9db9ab] font-mono">
                <span>Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-[#1c2721] border-none text-white text-xs rounded py-1 pl-2 pr-8 focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
              {filtered.map((item, i) => (
                <div
                  key={item.name + i}
                  className={`group relative bg-[#1c2721] rounded-xl overflow-hidden border border-[#283930] item-card-hover transition-all duration-300 ${item.locked ? 'opacity-75' : ''}`}
                >
                  {item.locked && (
                    <div className="absolute inset-0 bg-[#111814]/80 z-20 flex flex-col items-center justify-center backdrop-blur-sm">
                      <span className="material-symbols-outlined text-4xl text-[#9db9ab] mb-2">lock</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-white">{item.lockText}</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`px-2 py-1 bg-[#111814]/80 backdrop-blur rounded text-[10px] font-bold uppercase tracking-wider border ${item.tagColor}`}>{item.tag}</span>
                  </div>
                  <div className="h-48 overflow-hidden relative">
                    {item.image ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                    ) : (
                      <div className="absolute inset-0 bg-[#102219] flex items-center justify-center">
                        <span className="material-symbols-outlined text-6xl text-[#283930] group-hover:text-primary/50 transition-colors scale-150">
                          {item.icon ?? 'image' }
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c2721] to-transparent opacity-60"></div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-display font-bold text-lg leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
                    </div>
                    <p className="text-[#9db9ab] text-xs mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1.5 text-yellow-400">
                        <span className="material-symbols-outlined text-sm">monetization_on</span>
                        <span className="font-mono font-bold text-sm">{item.price.toLocaleString()}</span>
                      </div>
                      <button
                        className={`w-8 h-8 rounded flex items-center justify-center ${item.locked ? 'bg-[#283930] text-[#9db9ab] cursor-not-allowed' : 'bg-[#283930] text-primary hover:bg-primary hover:text-[#111814] transition-all'}`}
                        disabled={item.locked}
                      >
                        <span className="material-symbols-outlined text-sm">{item.locked ? 'lock' : 'add_shopping_cart'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-6 right-6 hidden md:block opacity-50 pointer-events-none z-0">
            <span className="text-[10px] text-[#283930] font-mono">BASE-STORE-V2.1 // CONNECTED</span>
          </div>
        </main>
      </div>
    </div>
  );
}
