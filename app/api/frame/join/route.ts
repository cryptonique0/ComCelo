import { NextResponse } from 'next/server';
import { createPublicClient, createWalletClient, http, parseEther } from 'viem';
import { base, baseSepolia } from 'viem/chains';

const CORE_ADDRESS = '0xa70b1163dB94bfdB38C11B820cF2C7094372c134' as const;

const coreAbi = [
  {
    name: 'joinGame',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'gameId', type: 'uint256' }],
    outputs: [],
  },
] as const;

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => ({}));
    const { gameId, address } = data;

    if (!address) {
      return NextResponse.json({ ok: false, error: 'Wallet not connected' }, { status: 401 });
    }

    if (!gameId) {
      return NextResponse.json({ ok: false, error: 'Missing gameId' }, { status: 400 });
    }

    // Client-side will sign the tx; we return the prepared call data
    return NextResponse.json({
      ok: true,
      action: 'join',
      contractAddress: CORE_ADDRESS,
      functionName: 'joinGame',
      args: [BigInt(gameId)],
      abi: coreAbi,
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
