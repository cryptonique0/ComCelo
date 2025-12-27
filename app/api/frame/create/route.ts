import { NextResponse } from 'next/server';

const CORE_ADDRESS = '0xa70b1163dB94bfdB38C11B820cF2C7094372c134' as const;

const coreAbi = [
  {
    name: 'createGame',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'opponent', type: 'address' },
      {
        name: 'options',
        type: 'tuple',
        components: [
          { name: 'ranked', type: 'bool' },
          { name: 'maxTurns', type: 'uint8' },
          { name: 'stake', type: 'uint256' },
        ],
      },
    ],
    outputs: [{ name: 'gameId', type: 'uint256' }],
  },
] as const;

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => ({}));
    const { address, opponent, ranked = true, maxTurns = 50, stake = '0' } = data;

    if (!address) {
      return NextResponse.json({ ok: false, error: 'Wallet not connected' }, { status: 401 });
    }

    if (!opponent || opponent === address) {
      return NextResponse.json({ ok: false, error: 'Invalid opponent address' }, { status: 400 });
    }

    // Return prepared contract call for createGame
    return NextResponse.json({
      ok: true,
      action: 'create',
      contractAddress: CORE_ADDRESS,
      functionName: 'createGame',
      args: [opponent, { ranked, maxTurns, stake: BigInt(stake) }],
      abi: coreAbi,
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
