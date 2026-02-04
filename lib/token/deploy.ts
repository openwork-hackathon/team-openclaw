import { createPublicClient, createWalletClient, http } from 'viem';
import { base } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import {
  MCV2_BOND_ADDRESS,
  MCV2_BOND_ABI,
  OPENWORK_TOKEN_ADDRESS,
  ERC20_ABI,
} from '../../contracts/MintClubV2';
import { TOKEN_CONFIG } from './config';

/**
 * Deploy the OpenClaw token on Base via Mint Club V2
 */
export async function deployToken(privateKey: `0x${string}`) {
  const account = privateKeyToAccount(privateKey);
  
  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });
  
  const walletClient = createWalletClient({
    account,
    chain: base,
    transport: http(),
  });

  console.log('🚀 Deploying OpenClaw token...');
  console.log('Deployer:', account.address);

  // Step 1: Check creation fee (narrow cast to avoid viem 2.x typing churn)
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

  console.log(`Creation fee: ${creationFee} wei`);

  // Step 2: Check ETH balance for gas + fee
  const balance = await publicClient.getBalance({ address: account.address });
  if (balance < creationFee) {
    throw new Error(
      `Insufficient ETH. Need ${creationFee} wei for creation fee + gas. Balance: ${balance}`
    );
  }

  // Step 3: Create the token
  const { name, symbol, bondingCurve } = TOKEN_CONFIG;
  
  // viem writeContract types also churn; keep the script callable by using a narrow cast.
  const writeContract = walletClient.writeContract as unknown as (args: unknown) => Promise<`0x${string}`>;

  const hash = await writeContract({
    address: MCV2_BOND_ADDRESS,
    abi: MCV2_BOND_ABI,
    functionName: 'createToken',
    args: [
      { name, symbol },
      {
        mintRoyalty: bondingCurve.mintRoyalty,
        burnRoyalty: bondingCurve.burnRoyalty,
        reserveToken: OPENWORK_TOKEN_ADDRESS,
        maxSupply: bondingCurve.maxSupply,
        stepRanges: bondingCurve.stepRanges,
        stepPrices: bondingCurve.stepPrices,
      },
    ],
    value: creationFee,
  });

  console.log(`Transaction hash: ${hash}`);
  console.log('Waiting for confirmation...');

  // Wait for transaction
  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  if (receipt.status !== 'success') {
    throw new Error('Token deployment failed');
  }

  // Extract token address from logs
  const tokenAddress = receipt.logs[0]?.address;
  
  if (!tokenAddress) {
    throw new Error('Could not extract token address from deployment');
  }

  console.log('✅ Token deployed successfully!');
  console.log(`Token address: ${tokenAddress}`);
  console.log(`Mint Club URL: https://mint.club/token/base/${symbol}`);

  return {
    tokenAddress,
    transactionHash: hash,
    symbol,
    name,
  };
}

/**
 * Buy tokens via Mint Club bonding curve
 */
export async function buyTokens(
  tokenAddress: `0x${string}`,
  amount: bigint,
  privateKey: `0x${string}`
) {
  const account = privateKeyToAccount(privateKey);
  
  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });
  
  const walletClient = createWalletClient({
    account,
    chain: base,
    transport: http(),
  });

  // Step 1: Approve OPENWORK spending
  const writeContract = walletClient.writeContract as unknown as (args: unknown) => Promise<`0x${string}`>;

  const approvalHash = await writeContract({
    address: OPENWORK_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'approve',
    args: [MCV2_BOND_ADDRESS, amount],
  });

  await publicClient.waitForTransactionReceipt({ hash: approvalHash });

  // Step 2: Mint tokens
  const mintHash = await writeContract({
    address: MCV2_BOND_ADDRESS,
    abi: MCV2_BOND_ABI,
    functionName: 'mint',
    args: [tokenAddress, amount, amount, account.address],
  });

  const receipt = await publicClient.waitForTransactionReceipt({ hash: mintHash });

  return {
    success: receipt.status === 'success',
    transactionHash: mintHash,
  };
}
