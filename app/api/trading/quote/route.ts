import { NextRequest, NextResponse } from 'next/server';
import { tradingEngine, BASE_TOKENS } from '../../../../lib/trading/engine';

export async function GET(request: NextRequest) {
  const tokenIn = request.nextUrl.searchParams.get('tokenIn') || 'ETH';
  const tokenOut = request.nextUrl.searchParams.get('tokenOut') || 'USDC';
  const amount = request.nextUrl.searchParams.get('amount') || '1000';
  
  if (!BASE_TOKENS[tokenIn] || !BASE_TOKENS[tokenOut]) {
    return NextResponse.json({ error: 'Unsupported token' }, { status: 400 });
  }
  
  return NextResponse.json(await tradingEngine.getQuote(tokenIn, tokenOut, amount));
}
