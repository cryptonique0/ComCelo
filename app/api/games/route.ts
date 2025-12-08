import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// Mock game storage (in production, query contract state)
const mockGames: Record<string, any> = {
  "1": {
    id: "1",
    player1: "0x1234567890123456789012345678901234567890",
    player2: "0x0987654321098765432109876543210987654321",
    status: "active",
    mode: "ranked",
    roundNumber: 1,
    currentTurn: "player2",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date().toISOString(),
    turnCount: 5,
    stake: 0,
  },
  "2": {
    id: "2",
    player1: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    player2: "0xfedcbafedcbafedcbafedcbafedcbafedcbafedcba",
    status: "pending",
    mode: "casual",
    roundNumber: 0,
    currentTurn: "player1",
    createdAt: new Date(Date.now() - 600000).toISOString(),
    updatedAt: new Date(Date.now() - 600000).toISOString(),
    turnCount: 0,
    stake: 0,
  },
};

/**
 * GET /api/games
 * Lists recent games or games for a player
 * Query params: ?player=address&status=active&limit=10&offset=0
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const playerAddress = searchParams.get("player");
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    let games = Object.values(mockGames);

    // Filter by player
    if (playerAddress) {
      games = games.filter(
        (g) =>
          g.player1.toLowerCase() === playerAddress.toLowerCase() ||
          g.player2.toLowerCase() === playerAddress.toLowerCase()
      );
    }

    // Filter by status
    if (status) {
      games = games.filter((g) => g.status === status);
    }

    // Sort by recent
    games.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    // Paginate
    const paginated = games.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: paginated,
      total: games.length,
      count: paginated.length,
      page: Math.floor(offset / limit) + 1,
      hasMore: offset + limit < games.length,
    });
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/games
 * Create a new game (initiates contract call)
 * Body: { player1: address, opponent: address, mode: 'ranked'|'casual', stake?: number }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { player1, opponent, mode = "casual", stake = 0 } = body;

    if (!player1 || !opponent) {
      return NextResponse.json(
        { success: false, error: "Missing player1 or opponent address" },
        { status: 400 }
      );
    }

    if (player1.toLowerCase() === opponent.toLowerCase()) {
      return NextResponse.json(
        { success: false, error: "Cannot play against yourself" },
        { status: 400 }
      );
    }

    // Create new game
    const gameId = String(Object.keys(mockGames).length + 1);
    const newGame = {
      id: gameId,
      player1,
      player2: opponent,
      status: "pending",
      mode,
      stake,
      roundNumber: 0,
      currentTurn: player1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      turnCount: 0,
    };

    mockGames[gameId] = newGame;

    // In production: call ComCeloCore.createGame() via ethers.js
    // const tx = await coreContract.createGame(opponent, stake, { value: stake });
    // const receipt = await tx.wait();

    return NextResponse.json(
      {
        success: true,
        data: newGame,
        message: "Game created successfully. Waiting for opponent acceptance.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating game:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create game" },
      { status: 500 }
    );
  }
}
