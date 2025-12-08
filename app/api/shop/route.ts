import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

/**
 * GET /api/shop/items
 * List all shop items
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "all";

  // TODO: Fetch items from ComCeloItems contract
  return NextResponse.json({
    items: [
      {
        id: 1,
        name: "Golden Sword Skin",
        description: "Legendary weapon cosmetic",
        category: "cosmetic",
        price: "0.5 CELO",
        image: "https://example.com/items/golden-sword.png",
        rarity: "legendary",
        inStock: true,
      },
      {
        id: 2,
        name: "Health Potion",
        description: "Restore 20 HP",
        category: "consumable",
        price: "0.1 CELO",
        image: "https://example.com/items/potion.png",
        rarity: "common",
        inStock: true,
      },
    ],
    total: 2,
  });
}
