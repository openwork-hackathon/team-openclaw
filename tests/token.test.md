# Token System Test Plan

## Unit Tests

### Validation Tests

- [ ] `validatePrivateKey()` rejects invalid keys
- [ ] `validatePrivateKey()` accepts valid 0x-prefixed keys
- [ ] `validateTokenAddress()` rejects invalid addresses
- [ ] `validateTokenAddress()` accepts valid Ethereum addresses
- [ ] `validateAmount()` rejects negative amounts
- [ ] `validateAmount()` rejects amounts exceeding max supply
- [ ] `validateAmount()` accepts valid amounts

### Configuration Tests

- [ ] Token config has correct bonding curve parameters
- [ ] Step ranges are cumulative and ordered
- [ ] Step prices are valid and increasing
- [ ] Max supply matches final step range

### Error Handling Tests

- [ ] `DeploymentError` includes transaction details
- [ ] `InsufficientBalanceError` includes balance info
- [ ] `ValidationError` includes field context
- [ ] `formatErrorResponse()` handles all error types

## Integration Tests

### Deployment Flow

- [ ] Check deployment readiness before attempting
- [ ] Verify ETH balance covers creation fee + gas
- [ ] Deploy token with correct parameters
- [ ] Extract token address from transaction receipt
- [ ] Verify token deployed at returned address

### Buy/Sell Flow

- [ ] Approve OPENWORK before minting
- [ ] Mint tokens with correct parameters
- [ ] Verify token balance increases
- [ ] Burn tokens and receive OPENWORK refund
- [ ] Verify royalties are applied correctly

### API Endpoints

- [ ] `GET /api/token/info` returns correct config
- [ ] `POST /api/token/buy` validates inputs
- [ ] `POST /api/token/buy` executes purchase
- [ ] `POST /api/token/buy` returns transaction hash
- [ ] API errors return proper HTTP status codes

## Manual Test Checklist

### Pre-Deployment

- [ ] Private key set in environment
- [ ] Wallet has sufficient ETH (~$0.50)
- [ ] Base RPC is accessible
- [ ] Creation fee is reasonable

### Deployment

- [ ] Run `npm run deploy:token`
- [ ] Token address is returned
- [ ] Transaction confirms on Base
- [ ] Token visible on BaseScan
- [ ] Mint Club page loads

### Post-Deployment

- [ ] Save `TOKEN_ADDRESS` to `.env`
- [ ] Register token URL on hackathon page
- [ ] Test buy on Mint Club
- [ ] Test sell on Mint Club
- [ ] Verify royalties collected

### API Testing

```bash
# Get token info
curl http://localhost:3000/api/token/info

# Buy tokens
curl -X POST http://localhost:3000/api/token/buy \
  -H "Content-Type: application/json" \
  -d '{"amount": "1000000000000000000", "privateKey": "0x..."}'
```

## Performance Tests

- [ ] Deployment completes in <30 seconds
- [ ] Buy transaction confirms in <10 seconds
- [ ] API responses return in <500ms
- [ ] No memory leaks during repeated operations

## Security Tests

- [ ] Private keys never logged
- [ ] Private keys never returned in API responses
- [ ] Input sanitization prevents injection
- [ ] Amount limits enforced
- [ ] Address validation prevents wrong-chain sends

## Edge Cases

- [ ] Buying with exactly max supply
- [ ] Buying more than max supply (should fail)
- [ ] Deploying without ETH (should fail gracefully)
- [ ] Invalid private key format (should fail with clear error)
- [ ] Network downtime (should retry/timeout gracefully)

## Regression Tests

After any changes to token code:

- [ ] Re-run all validation tests
- [ ] Verify bonding curve math unchanged
- [ ] Check deployment script still works
- [ ] Confirm API endpoints unchanged
- [ ] Test error messages still clear

## CI/CD Integration (Future)

- [ ] Automated tests run on PR
- [ ] Deployment script tested on testnet
- [ ] Contract ABIs match latest Mint Club version
- [ ] Dependencies are up to date
