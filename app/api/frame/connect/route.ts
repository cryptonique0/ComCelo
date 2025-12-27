import { NextResponse } from 'next/server';

export async function POST() {
  // Stub endpoint for Farcaster connect; replace with auth flow
  return NextResponse.json({ ok: true, action: 'connect-farcaster' });
}
