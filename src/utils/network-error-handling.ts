import { errorHandler, ErrorType, ErrorSeverity } from './error-handling';

// Network error handling utilities
export class NetworkErrorHandler {
  private static retryAttempts = new Map<string, number>();
  private static maxRetries = 3;
  private static retryDelay = 1000; // 1 second
  
  // Handle fetch errors with retry logic
  static async fetchWithRetry(
    url: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<Response> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
    } catch (error) {
      const currentRetries = this.retryAttempts.get(url) || 0;
      
      if (currentRetries < this.maxRetries && this.isRetryableError(error)) {
        this.retryAttempts.set(url, currentRetries + 1);
        
        // Exponential backoff
        const delay = this.retryDelay * Math.pow(2, currentRetries);
        await this.delay(delay);
        
        return this.fetchWithRetry(url, options, currentRetries + 1);
      }
      
      // Reset retry count on success or max retries
      this.retryAttempts.delete(url);
      
      const appError = errorHandler.handleError(error);
      throw appError;
    }
  }
  
  // Check if error is retryable
  private static isRetryableError(error: any): boolean {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return true; // Network error
    }
    
    if (error.message) {
      const statusCode = parseInt(error.message.match(/HTTP (\d+)/)?.[1] || '0');
      return [408, 429, 500, 502, 503, 504].includes(statusCode);
    }
    
    return false;
  }
  
  // Delay utility
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Check network connectivity
  static async checkConnectivity(): Promise<boolean> {
    try {
      const response = await fetch('/api/health', { 
        method: 'HEAD',
        cache: 'no-cache'
      });
      return response.ok;
    } catch {
      return false;
    }
  }
  
  // Handle offline/online events
  static setupConnectivityHandling() {
    if (typeof window === 'undefined') return;
    
    const handleOnline = () => {
      console.log('Network connection restored');
      // Optionally refresh data or show notification
    };
    
    const handleOffline = () => {
      console.log('Network connection lost');
      // Show offline notification
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }
} 