import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => ({}));
    const { lobbyId = 'forest' } = data;

    // TODO: invoke backend / contract hooks for join
    return NextResponse.json({ ok: true, action: 'join', lobbyId });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
