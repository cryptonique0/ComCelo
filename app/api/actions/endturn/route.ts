import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

/**
 * POST /api/actions/endturn
 * End current player's turn
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { gameId, signature } = body;

  if (!gameId) {
    return NextResponse.json({ error: "Missing gameId" }, { status: 400 });
  }

  // TODO: Call ComCeloCore.endTurn() via contract
  return NextResponse.json({
    ok: true,
    gameId,
    message: "Turn ended. Switching to opponent.",
    txHash: signature ? "0x..." : undefined,
  });
}
