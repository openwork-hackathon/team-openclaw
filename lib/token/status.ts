import { createClients } from './client';
import { MCV2_BOND_ADDRESS, MCV2_BOND_ABI, OPENWORK_TOKEN_ADDRESS, ERC20_ABI } from '../../contracts/MintClubV2';

/**
 * Get detailed status of token deployment and balances
 */
export async function getTokenStatus(tokenAddress?: `0x${string}`, walletAddress?: `0x${string}`) {
  const { publicClient } = createClients();
  
  const status: Record<string, unknown> = {
    network: 'Base',
    chainId: 8453,
    bondContract: MCV2_BOND_ADDRESS,
    reserveToken: OPENWORK_TOKEN_ADDRESS,
  };

  if (tokenAddress) {
    status.token = {
      address: tokenAddress,
      mintClubUrl: `https://mint.club/token/base/${tokenAddress}`,
      baseScanUrl: `https://basescan.org/address/${tokenAddress}`,
    };
  }

  if (walletAddress) {
    // Check ETH balance
    const ethBalance = await publicClient.getBalance({ address: walletAddress });
    
    // Check OPENWORK balance
    const readBalanceOf = publicClient.readContract as unknown as (args: {
      address: typeof OPENWORK_TOKEN_ADDRESS;
      abi: typeof ERC20_ABI;
      functionName: 'balanceOf';
      args: readonly [`0x${string}`];
    }) => Promise<bigint>;

    const openworkBalance = await readBalanceOf({
      address: OPENWORK_TOKEN_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [walletAddress],
    });

    status.wallet = {
      address: walletAddress,
      ethBalance: ethBalance.toString(),
      openworkBalance: openworkBalance.toString(),
    };
  }

  return status;
}

/**
 * Check if wallet is ready for deployment
 */
export async function checkDeploymentReadiness(walletAddress: `0x${string}`) {
  const { publicClient } = createClients();
  
  // Check ETH balance
  const ethBalance = await publicClient.getBalance({ address: walletAddress });
  
  // Check creation fee (narrow cast to avoid viem 2.x typing churn)
  const readCreationFee = publicClient.readContract as unknown as (args: {
    address: typeof MCV2_BOND_ADDRESS;
    abi: typeof MCV2_BOND_ABI;
    functionName: 'creationFee';
  }) => Promise<bigint>;

  const creationFee = await readCreationFee({
    address: MCV2_BOND_ADDRESS,
    abi: MCV2_BOND_ABI,
    functionName: 'creationFee',
  });

  const hasEnoughEth = ethBalance > creationFee + BigInt(1e15); // Fee + some buffer for gas

  return {
    ready: hasEnoughEth,
    ethBalance: ethBalance.toString(),
    creationFee: creationFee.toString(),
    requiredEth: (creationFee + BigInt(1e15)).toString(),
    details: hasEnoughEth
      ? 'Wallet is ready for deployment'
      : `Insufficient ETH. Need ${(creationFee + BigInt(1e15)).toString()} wei, have ${ethBalance.toString()} wei`,
  };
}
