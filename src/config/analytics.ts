// Analytics configuration
export const analyticsConfig = {
  // Google Analytics
  googleAnalytics: {
    trackingId: process.env.NEXT_PUBLIC_GA_ID,
    anonymizeIp: true,
    respectDnt: true,
  },

  // Performance monitoring
  performance: {
    trackCoreWebVitals: true,
    trackCustomMetrics: true,
    sampleRate: 1.0, // Track 100% of users
  },

  // Error tracking
  errorTracking: {
    enabled: true,
    maxErrors: 10,
    ignorePatterns: [
      /Script error/,
      /ResizeObserver loop/,
      /Network request failed/,
    ],
  },

  // Conversion tracking
  conversionTracking: {
    enabled: true,
    trackFormSubmissions: true,
    trackPageEngagement: true,
    trackScrollDepth: true,
  },

  // Privacy settings
  privacy: {
    respectDnt: true,
    anonymizeIp: true,
    cookieConsent: true,
  },
};

// Event definitions
export const analyticsEvents = {
  // Form events
  FORM_START: 'form_start',
  FORM_COMPLETE: 'form_complete',
  FORM_ERROR: 'form_error',
  
  // Engagement events
  PAGE_VIEW: 'page_view',
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page',
  
  // Conversion events
  FORM_SUBMISSION: 'form_submission',
  NEWSLETTER_SIGNUP: 'newsletter_signup',
  
  // Performance events
  PERFORMANCE_METRIC: 'performance_metric',
  ERROR_OCCURRED: 'error_occurred',
};

// Custom dimensions
export const customDimensions = {
  USER_TYPE: 'user_type',
  PAGE_SECTION: 'page_section',
  FORM_NAME: 'form_name',
  ERROR_TYPE: 'error_type',
}; 