/**
 * Custom error types for token operations
 */

export class TokenError extends Error {
  constructor(message: string, public code: string, public details?: any) {
    super(message);
    this.name = 'TokenError';
  }
}

export class DeploymentError extends TokenError {
  constructor(message: string, details?: any) {
    super(message, 'DEPLOYMENT_ERROR', details);
    this.name = 'DeploymentError';
  }
}

export class InsufficientBalanceError extends TokenError {
  constructor(required: string, available: string) {
    super(
      `Insufficient balance. Required: ${required}, Available: ${available}`,
      'INSUFFICIENT_BALANCE',
      { required, available }
    );
    this.name = 'InsufficientBalanceError';
  }
}

export class ValidationError extends TokenError {
  constructor(field: string, message: string) {
    super(`Validation failed for ${field}: ${message}`, 'VALIDATION_ERROR', { field });
    this.name = 'ValidationError';
  }
}

export class TransactionError extends TokenError {
  constructor(message: string, txHash?: string) {
    super(message, 'TRANSACTION_ERROR', { txHash });
    this.name = 'TransactionError';
  }
}

/**
 * Format error for API response
 */
export function formatErrorResponse(error: unknown) {
  if (error instanceof TokenError) {
    return {
      error: error.message,
      code: error.code,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    return {
      error: error.message,
      code: 'UNKNOWN_ERROR',
    };
  }

  return {
    error: 'An unknown error occurred',
    code: 'UNKNOWN_ERROR',
  };
}
