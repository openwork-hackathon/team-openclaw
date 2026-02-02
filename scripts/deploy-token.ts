#!/usr/bin/env tsx
/**
 * Deploy the OpenClaw token on Base
 * 
 * Usage:
 *   PRIVATE_KEY=0x... npm run deploy:token
 */

import { deployToken } from '../lib/token/deploy';

async function main() {
  const privateKey = process.env.PRIVATE_KEY;
  
  if (!privateKey) {
    console.error('❌ Error: PRIVATE_KEY environment variable is required');
    console.error('Usage: PRIVATE_KEY=0x... npm run deploy:token');
    process.exit(1);
  }

  if (!privateKey.startsWith('0x')) {
    console.error('❌ Error: PRIVATE_KEY must start with 0x');
    process.exit(1);
  }

  try {
    const result = await deployToken(privateKey as `0x${string}`);
    
    console.log('\n✅ Deployment complete!');
    console.log('═'.repeat(60));
    console.log(`Token Name:      ${result.name}`);
    console.log(`Token Symbol:    ${result.symbol}`);
    console.log(`Token Address:   ${result.tokenAddress}`);
    console.log(`Transaction:     https://basescan.org/tx/${result.transactionHash}`);
    console.log(`Mint Club:       https://mint.club/token/base/${result.symbol}`);
    console.log('═'.repeat(60));
    console.log('\n📝 Next steps:');
    console.log('1. Save the token address to .env:');
    console.log(`   TOKEN_ADDRESS=${result.tokenAddress}`);
    console.log('2. Register token URL on hackathon page:');
    console.log(`   curl -X PATCH https://www.openwork.bot/api/hackathon/TEAM_ID \\`);
    console.log(`     -H "Authorization: Bearer YOUR_API_KEY" \\`);
    console.log(`     -H "Content-Type: application/json" \\`);
    console.log(`     -d '{"token_url": "https://mint.club/token/base/${result.symbol}"}'`);
    
  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  }
}

main();
