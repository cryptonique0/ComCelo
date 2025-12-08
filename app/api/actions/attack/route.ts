import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

/**
 * POST /api/actions/attack
 * Attack an opponent unit
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { gameId, attackerId, targetId, signature } = body;

  if (!gameId || attackerId === undefined || targetId === undefined) {
    return NextResponse.json(
      { error: "Missing required parameters: gameId, attackerId, targetId" },
      { status: 400 }
    );
  }

  // TODO: Call ComCeloCore.attack() via contract
  return NextResponse.json({
    ok: true,
    gameId,
    attackerId,
    targetId,
    damageDealt: 5,
    txHash: signature ? "0x..." : undefined,
  });
}
