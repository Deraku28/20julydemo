import { errorHandler, ErrorType, ErrorSeverity } from './error-handling';

// Global error handler setup
export class GlobalErrorHandler {
  static setup() {
    if (typeof window === 'undefined') return;
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      
      const appError = errorHandler.handleError(event.reason);
      
      // Prevent default browser behavior
      event.preventDefault();
      
      // Show user-friendly error message
      this.showErrorNotification(appError);
    });
    
    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      console.error('JavaScript error:', event.error);
      
      const appError = errorHandler.handleError(event.error);
      
      // Show user-friendly error message
      this.showErrorNotification(appError);
    });
    
    // Handle resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        console.error('Resource loading error:', event);
        
        const appError = errorHandler.createError(
          ErrorType.NETWORK,
          'Failed to load resource',
          ErrorSeverity.MEDIUM,
          { resource: event.target }
        );
        
        this.showErrorNotification(appError);
      }
    }, true);
  }
  
  private static showErrorNotification(error: any) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `
      fixed top-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg
      max-w-sm z-50 transform transition-all duration-300 ease-in-out
    `;
    
    notification.innerHTML = `
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">
            Something went wrong
          </h3>
          <p class="text-sm text-red-700 mt-1">
            ${error.message || 'An unexpected error occurred'}
          </p>
        </div>
        <div class="ml-auto pl-3">
          <button class="text-red-400 hover:text-red-600" onclick="this.parentElement.parentElement.parentElement.remove()">
            <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);
  }
} 