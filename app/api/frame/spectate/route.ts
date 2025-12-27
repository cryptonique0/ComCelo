import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => ({}));
    const { gameId } = data;

    if (!gameId) {
      return NextResponse.json({ ok: false, error: 'Missing gameId' }, { status: 400 });
    }

    // Spectate is read-only; return metadata or redirect to game view
    return NextResponse.json({
      ok: true,
      action: 'spectate',
      gameId,
      redirect: `/game?id=${gameId}`,
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
