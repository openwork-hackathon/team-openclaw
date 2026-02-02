/**
 * Example: Deploy OpenClaw token to Base
 * 
 * This shows how to use the deployment utilities programmatically
 */

import { deployToken } from '../lib/token/deploy';
import { checkDeploymentReadiness } from '../lib/token/status';
import { privateKeyToAccount } from 'viem/accounts';

async function example() {
  const privateKey = process.env.PRIVATE_KEY as `0x${string}`;
  
  if (!privateKey) {
    throw new Error('PRIVATE_KEY not set');
  }

  const account = privateKeyToAccount(privateKey);
  
  console.log('Checking deployment readiness...');
  const readiness = await checkDeploymentReadiness(account.address);
  
  if (!readiness.ready) {
    console.error(readiness.details);
    return;
  }

  console.log('Deploying token...');
  const result = await deployToken(privateKey);
  
  console.log('Success!');
  console.log('Token Address:', result.tokenAddress);
  console.log('Mint Club:', `https://mint.club/token/base/${result.symbol}`);
  console.log('BaseScan:', `https://basescan.org/address/${result.tokenAddress}`);
}

example().catch(console.error);
