import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get("gameId") || "0";

  return NextResponse.json({
    gameId,
    status: "placeholder",
    message: "State retrieval to be wired to Celo smart contract",
    units: [],
    turn: 0
  });
}
