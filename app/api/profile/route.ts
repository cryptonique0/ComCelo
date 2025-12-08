import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

/**
 * GET /api/profile
 * Returns player profile with stats
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Missing address parameter" }, { status: 400 });
  }

  // TODO: Fetch from blockchain (ComCeloRanking + ComCeloTreasury)
  return NextResponse.json({
    address,
    profile: {
      username: `Player-${address.slice(-4)}`,
      elo: 1650,
      wins: 10,
      losses: 8,
      gamesPlayed: 18,
      totalEarnings: "5.32",
      clan: "Celo Warriors",
      joinedDate: "2025-10-15T00:00:00Z",
    },
    stats: {
      winRate: 55.56,
      averageTurnsPerGame: 12,
      favoriteUnit: "Hero",
      totalUnitsDefeated: 47,
      totalDamageDealt: 1250,
    },
    achievements: [
      {
        id: "first_win",
        name: "First Victory",
        earned: true,
        timestamp: "2025-10-16T00:00:00Z",
      },
      {
        id: "10_wins",
        name: "10 Victories",
        earned: true,
        progress: 10,
        total: 10,
      },
      {
        id: "perfect_game",
        name: "Perfect Game (No units lost)",
        earned: false,
        progress: 0,
        total: 1,
      },
    ],
  });
}
