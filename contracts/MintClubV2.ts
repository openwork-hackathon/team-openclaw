/**
 * Mint Club V2 Contract ABIs for Base
 *
 * Contracts:
 * - MCV2_Bond: 0xc5a076cad94176c2996B32d8466Be1cE757FAa27
 * - MCV2_Token: 0xAa70bC79fD1cB4a6FBA717018351F0C3c64B79Df
 * - $OPENWORK: 0x299c30DD5974BF4D5bFE42C340CA40462816AB07
 */

export const MCV2_BOND_ADDRESS = '0xc5a076cad94176c2996B32d8466Be1cE757FAa27' as const;
export const MCV2_TOKEN_ADDRESS = '0xAa70bC79fD1cB4a6FBA717018351F0C3c64B79Df' as const;
export const OPENWORK_TOKEN_ADDRESS = '0x299c30DD5974BF4D5bFE42C340CA40462816AB07' as const;

// Extended MCV2_Bond ABI with view functions for analytics
export const MCV2_BOND_ABI = [
  { name: 'createToken', type: 'function', stateMutability: 'payable', inputs: [
    { name: 'tokenParams', type: 'tuple', components: [
      { name: 'name', type: 'string' },
      { name: 'symbol', type: 'string' },
    ]},
    { name: 'bondParams', type: 'tuple', components: [
      { name: 'mintRoyalty', type: 'uint16' },
      { name: 'burnRoyalty', type: 'uint16' },
      { name: 'reserveToken', type: 'address' },
      { name: 'maxSupply', type: 'uint128' },
      { name: 'stepRanges', type: 'uint128[]' },
      { name: 'stepPrices', type: 'uint128[]' },
    ]},
  ], outputs: [{ name: 'token', type: 'address' }] },
  { name: 'mint', type: 'function', stateMutability: 'nonpayable', inputs: [
    { name: 'token', type: 'address' },
    { name: 'tokensToMint', type: 'uint256' },
    { name: 'maxReserveAmount', type: 'uint256' },
    { name: 'receiver', type: 'address' },
  ], outputs: [{ name: 'reserveAmount', type: 'uint256' }] },
  { name: 'burn', type: 'function', stateMutability: 'nonpayable', inputs: [
    { name: 'token', type: 'address' },
    { name: 'tokensToBurn', type: 'uint256' },
    { name: 'minRefund', type: 'uint256' },
    { name: 'receiver', type: 'address' },
  ], outputs: [{ name: 'refund', type: 'uint256' }] },
  { name: 'creationFee', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  // View functions for analytics
  { name: 'getCurrentPrice', type: 'function', stateMutability: 'view', inputs: [{ name: 'token', type: 'address' }], outputs: [{ name: 'price', type: 'uint256' }] },
  { name: 'getReserveBalance', type: 'function', stateMutability: 'view', inputs: [{ name: 'token', type: 'address' }], outputs: [{ name: 'balance', type: 'uint256' }] },
  { name: 'tokensCreated', type: 'function', stateMutability: 'view', inputs: [{ name: '', type: 'uint256' }], outputs: [{ name: 'token', type: 'address' }] },
  { name: 'tokenCount', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ name: 'count', type: 'uint256' }] },
] as const;

// ERC20 ABI (for OPENWORK approvals)
export const ERC20_ABI = [
  { name: 'approve', type: 'function', stateMutability: 'nonpayable', inputs: [
    { name: 'spender', type: 'address' },
    { name: 'amount', type: 'uint256' },
  ], outputs: [{ name: '', type: 'bool' }] },
  { name: 'balanceOf', type: 'function', stateMutability: 'view', inputs: [{ name: 'account', type: 'address' }], outputs: [{ name: '', type: 'uint256' }] },
  { name: 'allowance', type: 'function', stateMutability: 'view', inputs: [
    { name: 'owner', type: 'address' },
    { name: 'spender', type: 'address' },
  ], outputs: [{ name: '', type: 'uint256' }] },
] as const;
