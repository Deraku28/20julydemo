// Error tracking utilities
export class ErrorTracker {
  private static instance: ErrorTracker;
  private errorCount = 0;
  private maxErrors = 10;

  static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }

  // Track JavaScript errors
  trackError(error: Error, context?: string) {
    this.errorCount++;

    // Send to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        custom_parameters: {
          context,
          stack: error.stack,
          error_count: this.errorCount,
        },
      });
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('Error Tracking');
      console.error('Error:', error);
      console.error('Context:', context);
      console.error('Error Count:', this.errorCount);
      console.groupEnd();
    }

    // Prevent error spam
    if (this.errorCount > this.maxErrors) {
      console.warn('Too many errors tracked, stopping error reporting');
      return;
    }
  }

  // Track API errors
  trackApiError(endpoint: string, status: number, message: string) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: `API Error: ${status} - ${message}`,
        fatal: false,
        custom_parameters: {
          endpoint,
          status_code: status,
          error_type: 'api_error',
        },
      });
    }
  }

  // Track form validation errors
  trackValidationError(field: string, message: string) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: `Validation Error: ${field} - ${message}`,
        fatal: false,
        custom_parameters: {
          field,
          error_type: 'validation_error',
        },
      });
    }
  }

  // Reset error count
  resetErrorCount() {
    this.errorCount = 0;
  }
}

export const errorTracker = ErrorTracker.getInstance(); 