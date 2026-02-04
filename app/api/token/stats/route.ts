import { NextResponse } from 'next/server';
import { createPublicClient, http, formatEther, formatUnits } from 'viem';
import { base } from 'viem/chains';
import { MCV2_BOND_ADDRESS, MCV2_BOND_ABI } from '@/contracts/MintClubV2';

/**
 * GET /api/token/stats
 *
 * Returns real-time statistics for the CLAW token
 */
export async function GET() {
  try {
    const tokenAddress = process.env.TOKEN_ADDRESS;
    if (!tokenAddress) {
      return NextResponse.json(
        { error: 'TOKEN_ADDRESS not configured' },
        { status: 500 }
      );
    }

    const publicClient = createPublicClient({
      chain: base,
      transport: http(),
    });

    // ERC20 ABI for totalSupply
    const erc20Abi = [
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
    ] as const;

    // Fetch multiple stats in parallel
    const [totalSupply, currentPriceRaw, reserveBalanceRaw] = await Promise.all([
      publicClient.readContract({
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: 'totalSupply',
      }),
      publicClient.readContract({
        address: MCV2_BOND_ADDRESS,
        abi: MCV2_BOND_ABI,
        functionName: 'getCurrentPrice',
        args: [tokenAddress as `0x${string}`],
      }).catch(() => 0n),
      publicClient.readContract({
        address: MCV2_BOND_ADDRESS,
        abi: MCV2_BOND_ABI,
        functionName: 'getReserveBalance',
        args: [tokenAddress as `0x${string}`],
      }).catch(() => 0n),
    ]);

    const totalSupplyFormatted = formatEther(totalSupply);
    const currentPrice = formatUnits(currentPriceRaw, 18);
    const reserveBalance = formatEther(reserveBalanceRaw);
    const marketCap = Number(currentPrice) * Number(totalSupplyFormatted);

    const stats = {
      token: {
        address: tokenAddress,
        symbol: 'CLAW',
        name: 'OpenClaw',
      },
      supply: {
        total: totalSupplyFormatted,
        max: '1000000',
        circulating: totalSupplyFormatted,
        percentage: (Number(totalSupplyFormatted) / 1000000 * 100).toFixed(2) + '%',
      },
      price: {
        current: currentPrice,
        unit: 'OPENWORK',
        formatted: `${currentPrice} OPENWORK`,
      },
      liquidity: {
        reserveBalance: reserveBalance,
        reserveToken: 'OPENWORK',
        marketCap: marketCap.toFixed(2),
      },
      network: 'Base',
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Token stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch token statistics' },
      { status: 500 }
    );
  }
}
