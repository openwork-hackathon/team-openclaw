import { NextRequest, NextResponse } from 'next/server';
import { buyTokens } from '@/lib/token/deploy';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, privateKey } = body;

    if (!amount || !privateKey) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, privateKey' },
        { status: 400 }
      );
    }

    if (!privateKey.startsWith('0x')) {
      return NextResponse.json(
        { error: 'privateKey must start with 0x' },
        { status: 400 }
      );
    }

    const tokenAddress = process.env.TOKEN_ADDRESS;
    if (!tokenAddress) {
      return NextResponse.json(
        { error: 'TOKEN_ADDRESS not configured' },
        { status: 500 }
      );
    }

    const result = await buyTokens(
      tokenAddress as `0x${string}`,
      BigInt(amount),
      privateKey as `0x${string}`
    );

    return NextResponse.json({
      success: result.success,
      transactionHash: result.transactionHash,
      explorer: `https://basescan.org/tx/${result.transactionHash}`,
    });
  } catch (error) {
    console.error('Token buy error:', error);
    return NextResponse.json(
      { error: 'Failed to buy tokens', details: String(error) },
      { status: 500 }
    );
  }
}
