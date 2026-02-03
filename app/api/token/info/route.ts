import { NextResponse } from 'next/server';
import { TOKEN_CONFIG, DEPLOYMENT_CONFIG } from '@/lib/token/config';
import { MCV2_BOND_ADDRESS, OPENWORK_TOKEN_ADDRESS } from '@/contracts/MintClubV2';

export async function GET() {
  try {
    const { name, symbol, bondingCurve } = TOKEN_CONFIG;
    
    return NextResponse.json({
      token: {
        name,
        symbol,
        bondContract: MCV2_BOND_ADDRESS,
        reserveToken: OPENWORK_TOKEN_ADDRESS,
        maxSupply: bondingCurve.maxSupply.toString(),
        mintRoyalty: bondingCurve.mintRoyalty,
        burnRoyalty: bondingCurve.burnRoyalty,
        mintClubUrl: DEPLOYMENT_CONFIG.getMintClubUrl(symbol),
      },
      bondingCurve: {
        stepRanges: bondingCurve.stepRanges.map(r => r.toString()),
        stepPrices: bondingCurve.stepPrices.map(p => p.toString()),
      },
      network: 'Base',
      chain: {
        id: 8453,
        name: 'Base',
        rpcUrl: 'https://mainnet.base.org',
      },
    });
  } catch (error) {
    console.error('Token info error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch token info' },
      { status: 500 }
    );
  }
}
