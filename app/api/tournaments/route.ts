import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

/**
 * GET /api/tournaments
 * List all tournaments
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "all";
  const limit = parseInt(searchParams.get("limit") || "10");

  // TODO: Fetch from Celo contract
  return NextResponse.json({
    tournaments: [
      {
        id: 1,
        name: "Season 1 Grand Championship",
        entryFee: "1.0 CELO",
        maxPlayers: 64,
        participantCount: 42,
        prizePool: "42.0 CELO",
        status: "in_progress",
        startsAt: new Date().toISOString(),
      },
    ],
    total: 1,
  });
}

/**
 * POST /api/tournaments
 * Create new tournament (admin only)
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { name, entryFee, maxPlayers, prizePool } = body;

  if (!name || !maxPlayers) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // TODO: Call contract to create tournament
  return NextResponse.json({
    ok: true,
    tournamentId: 1,
    message: "Tournament created successfully",
  });
}
