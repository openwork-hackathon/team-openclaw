/**
 * Example: Buy and sell CLAW tokens
 * 
 * This shows how to interact with the bonding curve
 */

import { parseEther } from 'viem';
import { buyTokens } from '../lib/token/deploy';
import { getTokenStatus } from '../lib/token/status';

async function example() {
  const privateKey = process.env.PRIVATE_KEY as `0x${string}`;
  const tokenAddress = process.env.TOKEN_ADDRESS as `0x${string}`;
  
  if (!privateKey || !tokenAddress) {
    throw new Error('PRIVATE_KEY and TOKEN_ADDRESS required');
  }

  // Check status before buying
  console.log('Checking status...');
  const status = await getTokenStatus(tokenAddress);
  console.log('Status:', status);

  // Buy 100 tokens
  console.log('Buying 100 CLAW tokens...');
  const buyAmount = parseEther('100');
  
  const buyResult = await buyTokens(tokenAddress, buyAmount, privateKey);
  
  if (buyResult.success) {
    console.log('Purchase successful!');
    console.log('Transaction:', `https://basescan.org/tx/${buyResult.transactionHash}`);
  } else {
    console.error('Purchase failed');
  }

  // Note: Selling would use the same MCV2_Bond contract with the burn() function
  // See lib/token/deploy.ts for implementation details
}

example().catch(console.error);
