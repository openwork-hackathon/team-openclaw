import { createPublicClient, createWalletClient, http } from 'viem';
import { base } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

/**
 * Create viem clients for Base chain operations
 */
export function createClients(privateKey?: `0x${string}`) {
  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  if (!privateKey) {
    return { publicClient, walletClient: null, account: null };
  }

  const account = privateKeyToAccount(privateKey);
  
  const walletClient = createWalletClient({
    account,
    chain: base,
    transport: http(),
  });

  return { publicClient, walletClient, account };
}

/**
 * Get Base chain explorer URL for transaction
 */
export function getTxUrl(txHash: string): string {
  return `https://basescan.org/tx/${txHash}`;
}

/**
 * Get Base chain explorer URL for address
 */
export function getAddressUrl(address: string): string {
  return `https://basescan.org/address/${address}`;
}
