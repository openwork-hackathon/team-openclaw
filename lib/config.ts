// OpenClaw Configuration
export const config = {
  supabase: {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
  },
  farcaster: {
    apiKey: process.env.FARCASTER_API_KEY || '',
    signerId: process.env.FARCASTER_SIGNER_ID || '',
  },
  moltbook: {
    apiKey: process.env.MOLTBOOK_API_KEY || '',
  },
  base: {
    rpcUrl: process.env.BASE_RPC_URL || 'https://base.blockpi.cn/rpc/v1/pool',
    chainId: 8453,
  },
  openwork: {
    apiUrl: 'https://www.openwork.bot/api',
    tokenAddress: '0x299c30DD5974BF4D5bFE42C340CA40462816AB07',
  },
};

export const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'FARCASTER_API_KEY',
  'MOLTBOOK_API_KEY',
  'BASE_RPC_URL',
];
