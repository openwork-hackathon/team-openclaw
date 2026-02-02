# API Usage Examples

## Get Token Info

```bash
curl http://localhost:3000/api/token/info | jq
```

Response:
```json
{
  "token": {
    "name": "OpenClaw",
    "symbol": "CLAW",
    "bondContract": "0xc5a076cad94176c2996B32d8466Be1cE757FAa27",
    "reserveToken": "0x299c30DD5974BF4D5bFE42C340CA40462816AB07",
    "maxSupply": "1000000000000000000000000",
    "mintRoyalty": 100,
    "burnRoyalty": 100,
    "mintClubUrl": "https://mint.club/token/base/CLAW"
  },
  "bondingCurve": {
    "stepRanges": ["100000000000000000000000", "500000000000000000000000", "1000000000000000000000000"],
    "stepPrices": ["1000000000000000", "5000000000000000", "10000000000000000"]
  },
  "network": "Base",
  "chain": {
    "id": 8453,
    "name": "Base",
    "rpcUrl": "https://mainnet.base.org"
  }
}
```

## Buy Tokens

```bash
curl -X POST http://localhost:3000/api/token/buy \
  -H "Content-Type: application/json" \
  -d '{
    "amount": "1000000000000000000",
    "privateKey": "0x..."
  }'
```

Response:
```json
{
  "success": true,
  "transactionHash": "0xabc123...",
  "explorer": "https://basescan.org/tx/0xabc123..."
}
```

## JavaScript/TypeScript Client

```typescript
// Get token info
const tokenInfo = await fetch('http://localhost:3000/api/token/info')
  .then(res => res.json());

console.log(tokenInfo.token.name); // "OpenClaw"
console.log(tokenInfo.token.symbol); // "CLAW"

// Buy tokens
const buyResponse = await fetch('http://localhost:3000/api/token/buy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: '1000000000000000000', // 1 token (18 decimals)
    privateKey: '0x...'
  })
});

const result = await buyResponse.json();

if (result.success) {
  console.log('Transaction:', result.explorer);
}
```

## React/Next.js Integration

```typescript
'use client';

import { useState } from 'react';
import { parseEther } from 'viem';

export function BuyTokenButton() {
  const [loading, setLoading] = useState(false);

  async function buyTokens(amount: string) {
    setLoading(true);
    
    try {
      const response = await fetch('/api/token/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseEther(amount).toString(),
          privateKey: process.env.NEXT_PUBLIC_WALLET_KEY
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Purchase successful! TX: ' + data.transactionHash);
      } else {
        alert('Purchase failed: ' + data.error);
      }
    } catch (error) {
      console.error(error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button 
      onClick={() => buyTokens('100')} 
      disabled={loading}
    >
      {loading ? 'Buying...' : 'Buy 100 CLAW'}
    </button>
  );
}
```

## Python Client

```python
import requests
import json

# Get token info
response = requests.get('http://localhost:3000/api/token/info')
token_info = response.json()
print(f"Token: {token_info['token']['name']} ({token_info['token']['symbol']})")

# Buy tokens
buy_payload = {
    'amount': '1000000000000000000',  # 1 token
    'privateKey': '0x...'
}

buy_response = requests.post(
    'http://localhost:3000/api/token/buy',
    json=buy_payload
)

result = buy_response.json()
if result['success']:
    print(f"Success! TX: {result['transactionHash']}")
else:
    print(f"Failed: {result['error']}")
```

## Error Handling

All API endpoints return errors in this format:

```json
{
  "error": "Human-readable error message",
  "code": "ERROR_CODE",
  "details": { }
}
```

Common error codes:
- `VALIDATION_ERROR` - Invalid input parameters
- `INSUFFICIENT_BALANCE` - Not enough ETH or OPENWORK
- `TRANSACTION_ERROR` - On-chain transaction failed
- `DEPLOYMENT_ERROR` - Token deployment failed

Handle errors appropriately:

```typescript
try {
  const response = await fetch('/api/token/buy', { ... });
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }
  
  // Success
} catch (error) {
  if (error.code === 'INSUFFICIENT_BALANCE') {
    alert('Not enough OPENWORK tokens');
  } else {
    alert('Error: ' + error.message);
  }
}
```
