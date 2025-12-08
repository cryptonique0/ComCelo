import { NextRequest, NextResponse } from 'next/server';

interface PlayerProfile {
  address: string;
  username?: string;
  totalMatches: number;
  wins: number;
  losses: number;
  eloRating: number;
  currentStreak: number;
  bestStreak: number;
  achievements: number;
  joinedAt: string;
  lastActiveAt: string;
  profileImageUrl?: string;
  bio?: string;
}

// Mock player database
const mockPlayers: Record<string, PlayerProfile> = {
  '0x1234567890123456789012345678901234567890': {
    address: '0x1234567890123456789012345678901234567890',
    username: 'Champion_Alpha',
    totalMatches: 127,
    wins: 89,
    losses: 38,
    eloRating: 1847,
    currentStreak: 8,
    bestStreak: 12,
    achievements: 6,
    joinedAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    lastActiveAt: new Date().toISOString(),
    bio: '🎮 Tactical Master | 🏆 Season 3 Top 100',
  },
  '0x0987654321098765432109876543210987654321': {
    address: '0x0987654321098765432109876543210987654321',
    username: 'StrategySage',
    totalMatches: 95,
    wins: 58,
    losses: 37,
    eloRating: 1634,
    currentStreak: 3,
    bestStreak: 7,
    achievements: 4,
    joinedAt: new Date(Date.now() - 86400000 * 45).toISOString(),
    lastActiveAt: new Date(Date.now() - 3600000).toISOString(),
    bio: 'Learning the game, grinding the ladder',
  },
};

/**
 * GET /api/players/[address]
 * Fetch player profile and stats
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const address = params.address?.toLowerCase();

    if (!address || !address.startsWith('0x')) {
      return NextResponse.json(
        { success: false, error: 'Invalid Ethereum address' },
        { status: 400 }
      );
    }

    const player = mockPlayers[address];

    if (!player) {
      // Return default profile for unknown player
      return NextResponse.json({
        success: true,
        data: {
          address,
          username: `Player_${address.slice(2, 8)}`,
          totalMatches: 0,
          wins: 0,
          losses: 0,
          eloRating: 1200,
          currentStreak: 0,
          bestStreak: 0,
          achievements: 0,
          joinedAt: new Date().toISOString(),
          lastActiveAt: null,
          bio: 'New player',
        },
      });
    }

    // In production: fetch from contract/database
    return NextResponse.json({
      success: true,
      data: player,
    });
  } catch (error) {
    console.error('Error fetching player:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch player profile' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/players/[address]
 * Update player profile (username, bio, etc.)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const address = params.address?.toLowerCase();
    const body = await request.json().catch(() => ({}));
    const { username, bio, profileImageUrl } = body;

    if (!address || !address.startsWith('0x')) {
      return NextResponse.json(
        { success: false, error: 'Invalid Ethereum address' },
        { status: 400 }
      );
    }

    // Validate username length
    if (username && (username.length < 3 || username.length > 32)) {
      return NextResponse.json(
        { success: false, error: 'Username must be between 3 and 32 characters' },
        { status: 400 }
      );
    }

    // Validate bio length
    if (bio && bio.length > 256) {
      return NextResponse.json(
        { success: false, error: 'Bio must be under 256 characters' },
        { status: 400 }
      );
    }

    let player = mockPlayers[address];
    if (!player) {
      player = {
        address,
        username: `Player_${address.slice(2, 8)}`,
        totalMatches: 0,
        wins: 0,
        losses: 0,
        eloRating: 1200,
        currentStreak: 0,
        bestStreak: 0,
        achievements: 0,
        joinedAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
      };
      mockPlayers[address] = player;
    }

    // Update profile
    if (username) player.username = username;
    if (bio) player.bio = bio;
    if (profileImageUrl) player.profileImageUrl = profileImageUrl;

    // In production: save to database/contract

    return NextResponse.json({
      success: true,
      data: player,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error('Error updating player:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
