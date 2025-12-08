import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const gameId = params.id;

  if (!gameId || isNaN(Number(gameId))) {
    return NextResponse.json({ error: "Invalid game ID" }, { status: 400 });
  }

  // TODO: Fetch game state from Celo contract
  return NextResponse.json({
    gameId,
    status: "active",
    player1: "0x7099...",
    player2: "0x1234...",
    currentTurn: 0,
    turnCount: 5,
    units: [
      { id: 0, type: "Hero", hp: 100, x: 1, y: 0 },
      { id: 1, type: "Soldier", hp: 40, x: 0, y: 0 },
      { id: 2, type: "Soldier", hp: 40, x: 2, y: 0 },
      { id: 3, type: "Archer", hp: 30, x: 1, y: 1 },
      { id: 4, type: "Hero", hp: 90, x: 2, y: 2 },
      { id: 5, type: "Soldier", hp: 40, x: 1, y: 2 },
      { id: 6, type: "Soldier", hp: 40, x: 0, y: 2 },
      { id: 7, type: "Archer", hp: 30, x: 1, y: 1 },
    ],
  });
}
