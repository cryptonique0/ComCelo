export default function ShopPage() {
  const items = [
    { id: 1, name: "Golden Sword", price: "0.5 CELO", category: "Cosmetic", icon: "⚔️" },
    { id: 2, name: "Crystal Shield", price: "0.4 CELO", category: "Cosmetic", icon: "🛡️" },
    { id: 3, name: "Health Potion", price: "0.1 CELO", category: "Consumable", icon: "🧪" },
    { id: 4, name: "Mana Boost", price: "0.15 CELO", category: "Consumable", icon: "✨" },
    { id: 5, name: "Legendary Cape", price: "1.0 CELO", category: "Cosmetic", icon: "👕" },
    { id: 6, name: "Victory Emote", price: "0.05 CELO", category: "Cosmetic", icon: "🎉" },
  ];

  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Shop</h1>
        <p className="text-slate-300 mt-2">Cosmetics, consumables, and power-ups for your heroes</p>
      </header>

      <div className="flex gap-2 mb-6">
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white text-sm transition">
          All
        </button>
        <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm transition">
          Cosmetics
        </button>
        <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm transition">
          Consumables
        </button>
        <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm transition">
          Limited
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 hover:border-cyan-500 transition">
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-xs text-slate-400 mb-3">{item.category}</p>
            <div className="flex justify-between items-center">
              <span className="text-cyan-400 font-semibold">{item.price}</span>
              <button className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded text-white text-sm transition">
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
