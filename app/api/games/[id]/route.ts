import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// Mock game state database
const mockGameStates: Record<string, any> = {
  "1": {
    id: "1",
    gameId: "0x123abc...",
    status: "active",
    player1: {
      address: "0x1234567890123456789012345678901234567890",
      hero: { hp: 100, maxHp: 100, x: 0, y: 0, type: "hero", defended: false },
      soldiers: [
        { hp: 40, maxHp: 40, x: 1, y: 0, type: "soldier", defended: false },
        { hp: 40, maxHp: 40, x: 2, y: 0, type: "soldier", defended: false },
      ],
      archer: { hp: 30, maxHp: 30, x: 0, y: 1, type: "archer", defended: false },
    },
    player2: {
      address: "0x0987654321098765432109876543210987654321",
      hero: { hp: 95, maxHp: 100, x: 2, y: 2, type: "hero", defended: false },
      soldiers: [
        { hp: 40, maxHp: 40, x: 1, y: 2, type: "soldier", defended: false },
        { hp: 35, maxHp: 40, x: 0, y: 2, type: "soldier", defended: false },
      ],
      archer: { hp: 30, maxHp: 30, x: 2, y: 1, type: "archer", defended: false },
    },
    currentTurn: "player2",
    roundNumber: 1,
    turnCount: 5,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date().toISOString(),
    moveHistory: [
      { round: 1, player: "player1", action: "move", unit: "hero", from: { x: 0, y: 0 }, to: { x: 1, y: 0 } },
      { round: 1, player: "player2", action: "attack", unit: "archer", target: "soldier1", damage: 5 },
    ],
  },
};

/**
 * GET /api/games/[id]
 * Fetch detailed game state
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const gameId = params.id;

    if (!gameId || isNaN(Number(gameId))) {
      return NextResponse.json(
        { success: false, error: "Invalid game ID" },
        { status: 400 }
      );
    }

    const gameState = mockGameStates[gameId];

    if (!gameState) {
      return NextResponse.json(
        { success: false, error: "Game not found" },
        { status: 404 }
      );
    }

    // In production: fetch from contract
    // const gameState = await coreContract.getGameState(gameId);

    return NextResponse.json({
      success: true,
      data: gameState,
    });
  } catch (error) {
    console.error("Error fetching game state:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch game state" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/games/[id]
 * Update game state (accept, forfeit, etc.)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const gameId = params.id;
    const body = await request.json().catch(() => ({}));
    const { action, player } = body;

    if (!gameId || !action) {
      return NextResponse.json(
        { success: false, error: "Missing gameId or action" },
        { status: 400 }
      );
    }

    const gameState = mockGameStates[gameId];

    if (!gameState) {
      return NextResponse.json(
        { success: false, error: "Game not found" },
        { status: 404 }
      );
    }

    // Handle different actions
    if (action === "accept") {
      gameState.status = "active";
      gameState.updatedAt = new Date().toISOString();
    } else if (action === "forfeit") {
      gameState.status = "finished";
      gameState.winner = player === "player1" ? "player2" : "player1";
      gameState.updatedAt = new Date().toISOString();
    } else if (action === "pause") {
      gameState.status = "paused";
      gameState.updatedAt = new Date().toISOString();
    } else {
      return NextResponse.json(
        { success: false, error: "Unknown action" },
        { status: 400 }
      );
    }

    // In production: call contract methods
    // await coreContract.acceptGame(gameId);
    // await coreContract.forfeitGame(gameId);

    return NextResponse.json({
      success: true,
      data: gameState,
      message: `Game ${action} successful`,
    });
  } catch (error) {
    console.error("Error updating game:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update game" },
      { status: 500 }
    );
  }
}
