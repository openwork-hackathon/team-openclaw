import { parseEther } from 'viem';

/**
 * OpenClaw Token Configuration
 * Platform token for the geopolitics + crypto trading agent
 */

export const TOKEN_CONFIG = {
  name: 'OpenClaw',
  symbol: 'CLAW',
  
  // Bonding curve parameters
  bondingCurve: {
    mintRoyalty: 100, // 1% (100 basis points)
    burnRoyalty: 100, // 1% (100 basis points)
    maxSupply: parseEther('1000000'), // 1M tokens
    
    // Step-based bonding curve
    // Price increases as supply grows
    stepRanges: [
      parseEther('100000'),  // 0-100K tokens
      parseEther('500000'),  // 100K-500K tokens
      parseEther('1000000'), // 500K-1M tokens
    ],
    stepPrices: [
      parseEther('0.001'),  // 0.001 OPENWORK per token
      parseEther('0.005'),  // 0.005 OPENWORK per token
      parseEther('0.01'),   // 0.01 OPENWORK per token
    ],
  },
} as const;

export const DEPLOYMENT_CONFIG = {
  // Team ID for token URL registration
  teamId: '27d1f0e7-f962-4a37-bc47-80a079c495a6',
  
  // Mint Club URL will be available after deployment
  getMintClubUrl: (symbol: string) => 
    `https://mint.club/token/base/${symbol}`,
} as const;
