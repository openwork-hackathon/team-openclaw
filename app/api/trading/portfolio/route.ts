import { NextRequest, NextResponse } from 'next/server';
import { tradingEngine } from '@/lib/trading/engine';

export async function GET(request: NextRequest) {
  const wallet = request.nextUrl.searchParams.get('wallet');
  if (!wallet) return NextResponse.json({ error: 'Missing wallet' }, { status: 400 });
  return NextResponse.json(await tradingEngine.getPortfolio(wallet));
}
