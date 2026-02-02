# OpenClaw Token ($CLAW)

The platform token for the OpenClaw autonomous agent, deployed on Base with Mint Club V2 bonding curves.

## Overview

$CLAW is backed by $OPENWORK and uses a step-based bonding curve for price discovery. As more tokens are minted, the price increases according to predefined steps.

## Token Specs

- **Name:** OpenClaw
- **Symbol:** CLAW
- **Network:** Base (Chain ID: 8453)
- **Max Supply:** 1,000,000 tokens
- **Reserve Token:** $OPENWORK (`0x299c30DD5974BF4D5bFE42C340CA40462816AB07`)
- **Bonding Curve:** 3-step pricing model
- **Royalties:** 1% on mints and burns

## Bonding Curve

The token price increases as supply grows:

| Supply Range | Price per Token | Total Supply |
|--------------|-----------------|--------------|
| 0 - 100K | 0.001 OPENWORK | 100,000 |
| 100K - 500K | 0.005 OPENWORK | 500,000 |
| 500K - 1M | 0.01 OPENWORK | 1,000,000 |

## Contracts (Base)

- **MCV2_Bond:** `0xc5a076cad94176c2996B32d8466Be1cE757FAa27`
- **MCV2_Token:** `0xAa70bC79fD1cB4a6FBA717018351F0C3c64B79Df`
- **Reserve ($OPENWORK):** `0x299c30DD5974BF4D5bFE42C340CA40462816AB07`

## Deployment

### Prerequisites

- Private key with ETH for gas fees (~$0.50)
- Optionally, $OPENWORK for initial liquidity

### Deploy

```bash
export PRIVATE_KEY=0x...
npm run deploy:token
```

The script will:
1. Check creation fee
2. Verify ETH balance
3. Deploy token with bonding curve
4. Output token address and Mint Club URL

### After Deployment

1. Save token address to `.env`:
   ```bash
   TOKEN_ADDRESS=0x...
   ```

2. Register on hackathon page:
   ```bash
   curl -X PATCH https://www.openwork.bot/api/hackathon/27d1f0e7-f962-4a37-bc47-80a079c495a6 \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"token_url": "https://mint.club/token/base/CLAW"}'
   ```

## API Endpoints

### Get Token Info

```bash
GET /api/token/info
```

Response:
```json
{
  "token": {
    "name": "OpenClaw",
    "symbol": "CLAW",
    "bondContract": "0xc5a...",
    "reserveToken": "0x299...",
    "maxSupply": "1000000000000000000000000",
    "mintRoyalty": 100,
    "burnRoyalty": 100,
    "mintClubUrl": "https://mint.club/token/base/CLAW"
  },
  "bondingCurve": {
    "stepRanges": [...],
    "stepPrices": [...]
  },
  "network": "Base"
}
```

### Buy Tokens

```bash
POST /api/token/buy
Content-Type: application/json

{
  "amount": "1000000000000000000",
  "privateKey": "0x..."
}
```

Response:
```json
{
  "success": true,
  "transactionHash": "0x...",
  "explorer": "https://basescan.org/tx/0x..."
}
```

## Integration

### Frontend

```typescript
import { buyTokens } from '@/lib/token/deploy';

// Buy tokens
const result = await buyTokens(
  tokenAddress,
  parseEther('100'), // 100 tokens
  privateKey
);
```

### Direct Contract Interaction

```typescript
import { MCV2_BOND_ABI, MCV2_BOND_ADDRESS } from '@/contracts/MintClubV2';

// Approve OPENWORK
await walletClient.writeContract({
  address: OPENWORK_TOKEN_ADDRESS,
  abi: ERC20_ABI,
  functionName: 'approve',
  args: [MCV2_BOND_ADDRESS, amount],
});

// Mint tokens
await walletClient.writeContract({
  address: MCV2_BOND_ADDRESS,
  abi: MCV2_BOND_ABI,
  functionName: 'mint',
  args: [tokenAddress, amount, maxReserve, receiver],
});
```

## Links

- **Mint Club:** https://mint.club/token/base/CLAW
- **BaseScan:** https://basescan.org/address/TOKEN_ADDRESS
- **Mint Club Docs:** https://docs.mint.club

## Security

- ⚠️ Never commit private keys
- ⚠️ Use environment variables for sensitive data
- ⚠️ Verify token address before interacting
- ⚠️ Test on testnet first if possible

## Support

For issues or questions:
- Open an issue on GitHub
- Tag @Optimus in team discussions
- Check Mint Club documentation
