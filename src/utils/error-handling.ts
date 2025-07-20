// Error types
export enum ErrorType {
  NETWORK = 'network',
  VALIDATION = 'validation',
  DATABASE = 'database',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  RATE_LIMIT = 'rate_limit',
  UNKNOWN = 'unknown',
}

// Error severity levels
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

// Error interface
export interface AppError {
  type: ErrorType;
  severity: ErrorSeverity;
  message: string;
  code?: string;
  details?: any;
  timestamp: Date;
  userAgent?: string;
  url?: string;
}

// Error handler class
export class ErrorHandler {
  private static instance: ErrorHandler;
  
  private constructor() {}
  
  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }
  
  // Create error object
  createError(
    type: ErrorType,
    message: string,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    details?: any
  ): AppError {
    return {
      type,
      severity,
      message,
      details,
      timestamp: new Date(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    };
  }
  
  // Handle different error types
  handleError(error: any): AppError {
    let appError: AppError;
    
    if (error instanceof Error) {
      // Network errors
      if (error.message.includes('fetch') || error.message.includes('network')) {
        appError = this.createError(
          ErrorType.NETWORK,
          'Network connection error. Please check your internet connection.',
          ErrorSeverity.HIGH
        );
      }
      // Database errors
      else if (error.message.includes('database') || error.message.includes('supabase')) {
        appError = this.createError(
          ErrorType.DATABASE,
          'Database connection error. Please try again later.',
          ErrorSeverity.HIGH
        );
      }
      // Validation errors
      else if (error.message.includes('validation')) {
        appError = this.createError(
          ErrorType.VALIDATION,
          error.message,
          ErrorSeverity.LOW
        );
      }
      // Rate limiting
      else if (error.message.includes('rate limit') || error.message.includes('429')) {
        appError = this.createError(
          ErrorType.RATE_LIMIT,
          'Too many requests. Please wait a moment and try again.',
          ErrorSeverity.MEDIUM
        );
      }
      // Unknown errors
      else {
        appError = this.createError(
          ErrorType.UNKNOWN,
          'An unexpected error occurred. Please try again.',
          ErrorSeverity.MEDIUM,
          { originalError: error.message }
        );
      }
    } else {
      appError = this.createError(
        ErrorType.UNKNOWN,
        'An unexpected error occurred.',
        ErrorSeverity.MEDIUM,
        { originalError: error }
      );
    }
    
    this.logError(appError);
    return appError;
  }
  
  // Log error to monitoring service
  private logError(error: AppError) {
    // Send to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'error', {
        event_category: 'error',
        event_label: error.type,
        value: error.severity === ErrorSeverity.CRITICAL ? 1 : 0,
        custom_parameters: {
          error_message: error.message,
          error_code: error.code,
          error_severity: error.severity,
        },
      });
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('Error Handler');
      console.error('Error:', error);
      console.groupEnd();
    }
    
    // Send to error tracking service (e.g., Sentry)
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error);
    // }
  }
  
  // Get user-friendly error message
  getUserFriendlyMessage(error: AppError): string {
    const messages = {
      [ErrorType.NETWORK]: 'Please check your internet connection and try again.',
      [ErrorType.DATABASE]: 'We\'re experiencing technical difficulties. Please try again in a moment.',
      [ErrorType.VALIDATION]: error.message,
      [ErrorType.AUTHENTICATION]: 'Please log in again to continue.',
      [ErrorType.AUTHORIZATION]: 'You don\'t have permission to perform this action.',
      [ErrorType.RATE_LIMIT]: 'You\'re making too many requests. Please wait a moment.',
      [ErrorType.UNKNOWN]: 'Something went wrong. Please try again.',
    };
    
    return messages[error.type] || messages[ErrorType.UNKNOWN];
  }
}

// Global error handler instance
export const errorHandler = ErrorHandler.getInstance(); 