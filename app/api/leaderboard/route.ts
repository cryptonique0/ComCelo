import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

/**
 * GET /api/leaderboard
 * Returns top-ranked players
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || "10";
  const season = searchParams.get("season") || "1";

  // TODO: Fetch from ComCeloRanking contract
  return NextResponse.json({
    season,
    leaderboard: [
      {
        rank: 1,
        address: "0x7099...",
        elo: 1850,
        wins: 15,
        losses: 3,
        gamesPlayed: 18,
      },
      {
        rank: 2,
        address: "0x1234...",
        elo: 1750,
        wins: 12,
        losses: 5,
        gamesPlayed: 17,
      },
      {
        rank: 3,
        address: "0x5678...",
        elo: 1650,
        wins: 10,
        losses: 8,
        gamesPlayed: 18,
      },
    ],
    total: 42,
    limit: parseInt(limit),
  });
}
