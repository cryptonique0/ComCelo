/**
 * Error handling system for ComCelo
 * Custom error types and wrapper utilities for consistent error management
 */

// ============ Custom Error Classes ============

/**
 * Base error class for all ComCelo errors
 */
export class ComCeloError extends Error {
  constructor(
    public code: string,
    message: string,
    public context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ComCeloError';
  }
}

/**
 * Validation error - user input is invalid
 */
export class ValidationError extends ComCeloError {
  constructor(message: string, context?: Record<string, unknown>) {
    super('VALIDATION_ERROR', message, context);
    this.name = 'ValidationError';
  }
}

/**
 * Contract error - transaction/call failed on-chain
 */
export class ContractError extends ComCeloError {
  constructor(
    message: string,
    public revertReason?: string,
    context?: Record<string, unknown>
  ) {
    super('CONTRACT_ERROR', message, context);
    this.name = 'ContractError';
  }
}

/**
 * Network error - RPC/connection issue
 */
export class NetworkError extends ComCeloError {
  constructor(message: string, context?: Record<string, unknown>) {
    super('NETWORK_ERROR', message, context);
    this.name = 'NetworkError';
  }
}

/**
 * Gas error - transaction would exceed gas limits
 */
export class GasError extends ComCeloError {
  constructor(
    message: string,
    public required?: bigint,
    public available?: bigint,
    context?: Record<string, unknown>
  ) {
    super('GAS_ERROR', message, context);
    this.name = 'GasError';
  }
}

/**
 * Authentication error - user not authorized
 */
export class AuthError extends ComCeloError {
  constructor(message: string, context?: Record<string, unknown>) {
    super('AUTH_ERROR', message, context);
    this.name = 'AuthError';
  }
}

/**
 * Game logic error - game state violation
 */
export class GameError extends ComCeloError {
  constructor(message: string, context?: Record<string, unknown>) {
    super('GAME_ERROR', message, context);
    this.name = 'GameError';
  }
}

/**
 * Not found error - resource doesn't exist
 */
export class NotFoundError extends ComCeloError {
  constructor(message: string, context?: Record<string, unknown>) {
    super('NOT_FOUND', message, context);
    this.name = 'NotFoundError';
  }
}

// ============ Error Type Guards ============

export function isComCeloError(error: unknown): error is ComCeloError {
  return error instanceof ComCeloError;
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

export function isContractError(error: unknown): error is ContractError {
  return error instanceof ContractError;
}

export function isNetworkError(error: unknown): error is NetworkError {
  return error instanceof NetworkError;
}

export function isGasError(error: unknown): error is GasError {
  return error instanceof GasError;
}

// ============ Error Wrapping & Conversion ============

/**
 * Safely convert any error to ComCeloError
 */
export function toComCeloError(error: unknown, defaultMessage = 'An unknown error occurred'): ComCeloError {
  if (isComCeloError(error)) {
    return error;
  }

  if (error instanceof Error) {
    const message = error.message || defaultMessage;

    // Detect contract revert errors
    if (message.includes('revert') || message.includes('reverted')) {
      const reason = extractRevertReason(message);
      return new ContractError(message, reason);
    }

    // Detect network errors
    if (
      message.includes('network') ||
      message.includes('ECONNREFUSED') ||
      message.includes('timeout') ||
      message.includes('getBalance')
    ) {
      return new NetworkError(message);
    }

    // Detect gas errors
    if (message.includes('out of gas') || message.includes('intrinsic gas')) {
      return new GasError(message);
    }

    return new ComCeloError('UNKNOWN_ERROR', message);
  }

  return new ComCeloError('UNKNOWN_ERROR', defaultMessage);
}

/**
 * Extract revert reason from error message
 */
function extractRevertReason(message: string): string | undefined {
  // Look for common patterns: "execution reverted: CustomError()"
  const match = message.match(/reverted: ([^(]+)/);
  return match ? match[1].trim() : undefined;
}

/**
 * Wrap an async function with error handling
 */
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  errorMessage = 'Operation failed',
  context?: Record<string, unknown>
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    const comceloError = toComCeloError(error, errorMessage);
    if (context) {
      comceloError.context = { ...comceloError.context, ...context };
    }
    throw comceloError;
  }
}

/**
 * Wrap a sync function with error handling
 */
export function withErrorHandlingSync<T>(
  fn: () => T,
  errorMessage = 'Operation failed',
  context?: Record<string, unknown>
): T {
  try {
    return fn();
  } catch (error) {
    const comceloError = toComCeloError(error, errorMessage);
    if (context) {
      comceloError.context = { ...comceloError.context, ...context };
    }
    throw comceloError;
  }
}

// ============ Retry Logic ============

export interface RetryOptions {
  readonly maxAttempts: number;
  readonly delayMs: number;
  readonly backoffMultiplier: number;
  readonly timeout?: number;
}

export const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxAttempts: 3,
  delayMs: 1000,
  backoffMultiplier: 2,
  timeout: 30000,
};

/**
 * Retry an async operation with exponential backoff
 */
export async function retryAsync<T>(
  fn: () => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const config = { ...DEFAULT_RETRY_OPTIONS, ...options };
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      return await Promise.race([
        fn(),
        new Promise<T>((_, reject) =>
          setTimeout(() => reject(new Error('Operation timeout')), config.timeout)
        ),
      ]);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === config.maxAttempts) {
        break;
      }

      const delay = config.delayMs * Math.pow(config.backoffMultiplier, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error('Operation failed');
}

// ============ User-Friendly Messages ============

/**
 * Convert error to user-friendly message
 */
export function getErrorMessage(error: unknown): string {
  if (isComCeloError(error)) {
    switch (error.code) {
      case 'VALIDATION_ERROR':
        return error.message;
      case 'CONTRACT_ERROR':
        return `Smart contract error: ${error.revertReason || error.message}`;
      case 'NETWORK_ERROR':
        return 'Network connection issue. Please check your internet and try again.';
      case 'GAS_ERROR':
        return 'Insufficient gas to execute transaction.';
      case 'AUTH_ERROR':
        return 'You are not authorized to perform this action.';
      case 'GAME_ERROR':
        return error.message;
      case 'NOT_FOUND':
        return error.message;
      default:
        return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred. Please try again.';
}
