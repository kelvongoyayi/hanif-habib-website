// Error types for better error handling
export interface AppError {
  message: string;
  code?: string;
  details?: unknown;
  timestamp: Date;
}

// Error categories
export enum ErrorCategory {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  CALCULATION = 'CALCULATION',
  FILE_PROCESSING = 'FILE_PROCESSING',
  AUTHENTICATION = 'AUTHENTICATION',
  UNKNOWN = 'UNKNOWN'
}

// Error handler utility
export class ErrorHandler {
  static createError(
    message: string,
    category: ErrorCategory = ErrorCategory.UNKNOWN,
    details?: unknown
  ): AppError {
    return {
      message,
      code: category,
      details,
      timestamp: new Date()
    };
  }

  static logError(error: AppError | Error, context?: string): void {
    const errorInfo = error instanceof Error ? {
      message: error.message,
      code: 'UNKNOWN',
      details: error.stack,
      timestamp: new Date()
    } : error;

    // In development, log to console
    if (import.meta.env.DEV) {
      console.error(`[${context || 'APP_ERROR'}]`, errorInfo);
    }

    // In production, you would send to error tracking service
    // Example: Sentry, LogRocket, etc.
  }

  static handleAsyncError<T>(
    asyncFn: Promise<T>,
    fallbackValue?: T,
    context?: string
  ): Promise<T | undefined> {
    return asyncFn.catch((error) => {
      this.logError(error, context);
      return fallbackValue;
    });
  }
}

// HOC for error boundary-like behavior in hooks
export const withErrorHandling = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  context?: string,
  fallbackValue?: ReturnType<T>
): T => {
  return ((...args: Parameters<T>) => {
    try {
      const result = fn(...args);
      
      // Handle async functions
      if (result instanceof Promise) {
        return result.catch((error) => {
          ErrorHandler.logError(error, context);
          return fallbackValue;
        });
      }
      
      return result;
    } catch (error) {
      ErrorHandler.logError(error as Error, context);
      return fallbackValue;
    }
  }) as T;
};

// Validation helpers
export const validateRequired = (value: unknown, fieldName: string): void => {
  if (value === null || value === undefined || value === '') {
    throw ErrorHandler.createError(
      `${fieldName} is required`,
      ErrorCategory.VALIDATION
    );
  }
};

export const validateNumber = (value: unknown, fieldName: string, min?: number, max?: number): void => {
  if (typeof value !== 'number' || isNaN(value)) {
    throw ErrorHandler.createError(
      `${fieldName} must be a valid number`,
      ErrorCategory.VALIDATION
    );
  }
  
  if (min !== undefined && value < min) {
    throw ErrorHandler.createError(
      `${fieldName} must be at least ${min}`,
      ErrorCategory.VALIDATION
    );
  }
  
  if (max !== undefined && value > max) {
    throw ErrorHandler.createError(
      `${fieldName} must be at most ${max}`,
      ErrorCategory.VALIDATION
    );
  }
};

export const validateEmail = (email: string): void => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw ErrorHandler.createError(
      'Please enter a valid email address',
      ErrorCategory.VALIDATION
    );
  }
};

// Safe parsing utilities
export const safeParseNumber = (value: string | number, defaultValue: number = 0): number => {
  try {
    const parsed = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(parsed) ? defaultValue : parsed;
  } catch {
    return defaultValue;
  }
};

export const safeParseJson = <T>(jsonString: string, defaultValue: T): T => {
  try {
    return JSON.parse(jsonString);
  } catch {
    return defaultValue;
  }
}; 