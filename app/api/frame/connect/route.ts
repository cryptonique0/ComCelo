import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => ({}));
    const { address } = data;

    // Farcaster connect flow stub; could verify signature or link FID
    if (!address) {
      return NextResponse.json({ ok: false, error: 'Wallet required' }, { status: 401 });
    }

    return NextResponse.json({ ok: true, action: 'connect-farcaster', address });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
