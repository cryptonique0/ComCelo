import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

/**
 * GET /api/games
 * Lists recent games or games for a player
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const playerAddress = searchParams.get("player");
  const limit = searchParams.get("limit") || "10";

  // TODO: Fetch from Celo contract using a subgraph or contract read
  return NextResponse.json({
    games: [
      {
        id: 1,
        player1: "0x7099...",
        player2: "0x1234...",
        status: "active",
        createdAt: new Date().toISOString(),
        turnCount: 5,
      },
    ],
    total: 1,
    limit: parseInt(limit),
  });
}

/**
 * POST /api/games
 * Create a new game (initiates contract call)
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { opponent, ranked, maxTurns, stake } = body;

  if (!opponent) {
    return NextResponse.json({ error: "Missing opponent address" }, { status: 400 });
  }

  // TODO: Call ComCeloCore.createGame() via relayer or direct call
  return NextResponse.json({
    ok: true,
    gameId: 1,
    message: "Game creation initiated. Await blockchain confirmation.",
  });
}
