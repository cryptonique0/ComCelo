import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

/**
 * POST /api/actions/move
 * Move a unit on the board
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { gameId, unitId, x, y, signature } = body;

  if (!gameId || unitId === undefined || x === undefined || y === undefined) {
    return NextResponse.json(
      { error: "Missing required parameters: gameId, unitId, x, y" },
      { status: 400 }
    );
  }

  if (x < 0 || x > 2 || y < 0 || y > 2) {
    return NextResponse.json({ error: "Position out of bounds (0-2)" }, { status: 400 });
  }

  // TODO: Call ComCeloCore.move() via contract (direct or relayer)
  // If signature provided, use meta-tx relay
  return NextResponse.json({
    ok: true,
    gameId,
    unitId,
    newPosition: { x, y },
    txHash: signature ? "0x..." : undefined,
  });
}
