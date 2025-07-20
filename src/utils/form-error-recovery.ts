import { errorHandler, ErrorType } from './error-handling';

// Form error recovery utilities
export class FormErrorRecovery {
  private static formDataCache = new Map<string, any>();
  
  // Cache form data for recovery
  static cacheFormData(formId: string, data: any) {
    this.formDataCache.set(formId, {
      data,
      timestamp: Date.now(),
    });
  }
  
  // Recover form data
  static recoverFormData(formId: string): any | null {
    const cached = this.formDataCache.get(formId);
    if (cached && Date.now() - cached.timestamp < 30 * 60 * 1000) { // 30 minutes
      return cached.data;
    }
    return null;
  }
  
  // Clear cached form data
  static clearFormData(formId: string) {
    this.formDataCache.delete(formId);
  }
  
  // Handle form submission errors
  static handleFormError(error: any, formId: string) {
    const appError = errorHandler.handleError(error);
    
    // Determine recovery action based on error type
    switch (appError.type) {
      case ErrorType.NETWORK:
        return {
          action: 'retry',
          message: 'Network error. Your data has been saved. Click "Try Again" to submit.',
          canRetry: true,
        };
        
      case ErrorType.VALIDATION:
        return {
          action: 'fix',
          message: appError.message,
          canRetry: false,
        };
        
      case ErrorType.RATE_LIMIT:
        return {
          action: 'wait',
          message: 'Too many submissions. Please wait a moment before trying again.',
          canRetry: true,
          retryDelay: 5000, // 5 seconds
        };
        
      case ErrorType.DATABASE:
        return {
          action: 'retry',
          message: 'Server error. Your data has been saved. Please try again.',
          canRetry: true,
        };
        
      default:
        return {
          action: 'retry',
          message: 'An error occurred. Please try again.',
          canRetry: true,
        };
    }
  }
  
  // Auto-save form data
  static setupAutoSave(formId: string, getFormData: () => any) {
    if (typeof window === 'undefined') return;
    
    const autoSave = () => {
      const data = getFormData();
      if (data && Object.keys(data).length > 0) {
        this.cacheFormData(formId, data);
      }
    };
    
    // Auto-save every 30 seconds
    const interval = setInterval(autoSave, 30000);
    
    // Auto-save on page unload
    const handleBeforeUnload = () => {
      autoSave();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }
} 