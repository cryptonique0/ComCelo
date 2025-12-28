/**
 * Structured logging utility for ComCelo
 * Centralized, level-based logging with context tracking
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  context?: Record<string, unknown>;
  error?: string;
  stack?: string;
}

// ============ Logger Configuration ============

let currentLogLevel: LogLevel = process.env.NODE_ENV === 'production'
  ? LogLevel.INFO
  : LogLevel.DEBUG;

let logHandlers: Array<(entry: LogEntry) => void> = [];

// ============ Logger Class ============

export class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  /**
   * Log at DEBUG level
   */
  debug(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  /**
   * Log at INFO level
   */
  info(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, message, context);
  }

  /**
   * Log at WARN level
   */
  warn(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.WARN, message, context);
  }

  /**
   * Log at ERROR level (with optional error object)
   */
  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    const errorContext = {
      ...context,
      error: error?.message,
      stack: error?.stack,
    };
    this.log(LogLevel.ERROR, message, errorContext);
  }

  /**
   * Internal log method
   */
  private log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    if (level < currentLogLevel) {
      return;
    }

    const levelName = LogLevel[level];
    const timestamp = new Date().toISOString();

    const entry: LogEntry = {
      timestamp,
      level: levelName,
      message: `[${this.context}] ${message}`,
      context,
    };

    // Add error info if present
    if (context?.error) {
      entry.error = String(context.error);
    }
    if (context?.stack) {
      entry.stack = String(context.stack);
    }

    // Call registered handlers
    logHandlers.forEach((handler) => {
      try {
        handler(entry);
      } catch (error) {
        console.error('Error in log handler:', error);
      }
    });

    // Default console output
    const output = `${timestamp} [${levelName}] ${entry.message}`;
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(output, context);
        break;
      case LogLevel.INFO:
        console.log(output, context);
        break;
      case LogLevel.WARN:
        console.warn(output, context);
        break;
      case LogLevel.ERROR:
        console.error(output, context);
        break;
    }
  }
}

// ============ Global Logger Functions ============

/**
 * Create a logger instance for a specific context
 */
export function createLogger(context: string): Logger {
  return new Logger(context);
}

/**
 * Set global log level
 */
export function setLogLevel(level: LogLevel): void {
  currentLogLevel = level;
}

/**
 * Get current log level
 */
export function getLogLevel(): LogLevel {
  return currentLogLevel;
}

/**
 * Register a log handler (for integrations like Sentry, LogRocket, etc)
 */
export function registerLogHandler(handler: (entry: LogEntry) => void): void {
  logHandlers.push(handler);
}

/**
 * Remove a log handler
 */
export function removeLogHandler(handler: (entry: LogEntry) => void): void {
  logHandlers = logHandlers.filter((h) => h !== handler);
}

/**
 * Clear all log handlers
 */
export function clearLogHandlers(): void {
  logHandlers = [];
}

// ============ Convenience Exports ============

export const logger = createLogger('ComCelo');
export const debugLogger = createLogger('Debug');
export const contractLogger = createLogger('Contract');
export const networkLogger = createLogger('Network');
export const gameLogger = createLogger('Game');
export const authLogger = createLogger('Auth');

// ============ Analytics Integration Support ============

/**
 * Send structured log to analytics service
 */
export function logToAnalytics(
  event: string,
  properties?: Record<string, unknown>
): void {
  if (typeof window !== 'undefined' && (window as any).analytics) {
    (window as any).analytics.track(event, properties);
  }
}

/**
 * Send error to error tracking service (Sentry-like)
 */
export function captureException(error: Error, context?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureException(error, {
      contexts: { custom: context },
    });
  }
}

/**
 * Send message to error tracking service
 */
export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info'): void {
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureMessage(message, level);
  }
}

// ============ Performance Logging ============

export class PerformanceTimer {
  private startTime: number;
  private label: string;
  private logger: Logger;

  constructor(label: string, context = 'Performance') {
    this.label = label;
    this.logger = createLogger(context);
    this.startTime = performance.now();
    this.logger.debug(`⏱️  Started: ${label}`);
  }

  /**
   * End timer and log duration
   */
  end(): number {
    const duration = performance.now() - this.startTime;
    this.logger.info(`⏱️  Completed: ${this.label} (${duration.toFixed(2)}ms)`);
    return duration;
  }

  /**
   * Mark a checkpoint
   */
  mark(checkpointName: string): number {
    const duration = performance.now() - this.startTime;
    this.logger.debug(`⏱️  Checkpoint: ${this.label} > ${checkpointName} (${duration.toFixed(2)}ms)`);
    return duration;
  }
}

/**
 * Measure function execution time
 */
export async function measureAsync<T>(
  label: string,
  fn: () => Promise<T>
): Promise<T> {
  const timer = new PerformanceTimer(label);
  try {
    const result = await fn();
    timer.end();
    return result;
  } catch (error) {
    timer.end();
    throw error;
  }
}

/**
 * Measure sync function execution time
 */
export function measureSync<T>(
  label: string,
  fn: () => T
): T {
  const timer = new PerformanceTimer(label);
  try {
    const result = fn();
    timer.end();
    return result;
  } catch (error) {
    timer.end();
    throw error;
  }
}
