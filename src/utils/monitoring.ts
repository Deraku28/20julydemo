// Performance monitoring utilities
export const monitoring = {
  // Track page load performance
  trackPageLoad: () => {
    if (typeof window !== 'undefined') {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      const metrics = {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        total: navigation.loadEventEnd - navigation.fetchStart,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      };
      
      // Send to analytics
      if (window.gtag) {
        window.gtag('event', 'page_load', {
          event_category: 'performance',
          value: Math.round(metrics.total),
          custom_parameters: metrics,
        });
      }
      
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Page Load Metrics:', metrics);
      }
    }
  },
  
  // Track form submission performance
  trackFormSubmission: (duration: number, success: boolean) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_submission', {
        event_category: 'performance',
        event_label: success ? 'success' : 'error',
        value: Math.round(duration),
      });
    }
  },
  
  // Track error occurrences
  trackError: (error: Error, context?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        custom_parameters: {
          context,
          stack: error.stack,
        },
      });
    }
  },
  
  // Track user interactions
  trackInteraction: (action: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: 'user_interaction',
        event_label: label,
        value: value,
      });
    }
  },
  
  // Track performance metrics
  trackPerformance: (metric: string, value: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'performance', {
        event_category: 'performance',
        event_label: metric,
        value: Math.round(value),
      });
    }
  },
};

// Declare global gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
} 