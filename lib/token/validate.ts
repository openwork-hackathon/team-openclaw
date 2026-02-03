import { isAddress } from 'viem';
import { TOKEN_CONFIG } from './config';

/**
 * Validation utilities for token operations
 */

export function validatePrivateKey(key: string): { valid: boolean; error?: string } {
  if (!key) {
    return { valid: false, error: 'Private key is required' };
  }
  
  if (!key.startsWith('0x')) {
    return { valid: false, error: 'Private key must start with 0x' };
  }
  
  if (key.length !== 66) {
    return { valid: false, error: 'Private key must be 66 characters (0x + 64 hex)' };
  }
  
  return { valid: true };
}

export function validateTokenAddress(address: string): { valid: boolean; error?: string } {
  if (!address) {
    return { valid: false, error: 'Token address is required' };
  }
  
  if (!isAddress(address)) {
    return { valid: false, error: 'Invalid Ethereum address' };
  }
  
  return { valid: true };
}

export function validateAmount(amount: string | bigint): { valid: boolean; error?: string } {
  try {
    const value = typeof amount === 'string' ? BigInt(amount) : amount;
    
    if (value <= 0n) {
      return { valid: false, error: 'Amount must be greater than 0' };
    }
    
    if (value > TOKEN_CONFIG.bondingCurve.maxSupply) {
      return { valid: false, error: `Amount exceeds max supply (${TOKEN_CONFIG.bondingCurve.maxSupply})` };
    }
    
    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid amount format' };
  }
}

/**
 * Validate all parameters for token deployment
 */
export function validateDeploymentParams(privateKey: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  const pkValidation = validatePrivateKey(privateKey);
  if (!pkValidation.valid) {
    errors.push(pkValidation.error!);
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate all parameters for token purchase
 */
export function validatePurchaseParams(
  tokenAddress: string,
  amount: string | bigint,
  privateKey: string
): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  const addressValidation = validateTokenAddress(tokenAddress);
  if (!addressValidation.valid) {
    errors.push(addressValidation.error!);
  }
  
  const amountValidation = validateAmount(amount);
  if (!amountValidation.valid) {
    errors.push(amountValidation.error!);
  }
  
  const pkValidation = validatePrivateKey(privateKey);
  if (!pkValidation.valid) {
    errors.push(pkValidation.error!);
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}
