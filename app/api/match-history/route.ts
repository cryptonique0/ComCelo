import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

/**
 * GET /api/match-history
 * Returns match history for a player
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const player = searchParams.get("player");
  const limit = searchParams.get("limit") || "20";

  if (!player) {
    return NextResponse.json({ error: "Missing player address" }, { status: 400 });
  }

  // TODO: Query event logs from blockchain
  return NextResponse.json({
    player,
    matches: [
      {
        gameId: 5,
        opponent: "0x1234...",
        result: "win",
        playerHpRemaining: 45,
        opponentHpRemaining: 0,
        turns: 12,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        ranked: false,
      },
      {
        gameId: 4,
        opponent: "0x5678...",
        result: "loss",
        playerHpRemaining: 0,
        opponentHpRemaining: 30,
        turns: 15,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        ranked: true,
      },
      {
        gameId: 3,
        opponent: "0xabcd...",
        result: "win",
        playerHpRemaining: 78,
        opponentHpRemaining: 0,
        turns: 8,
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        ranked: false,
      },
    ],
    total: 23,
    limit: parseInt(limit),
    winRate: (2 / 3) * 100,
  });
}
