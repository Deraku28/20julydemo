import { useCallback } from 'react';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function useFormAnalytics() {
  const trackFormStart = useCallback(() => {
    // Track when user starts filling the form
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_start', {
        event_category: 'engagement',
        event_label: 'interest_form'
      });
    }
  }, []);
  
  const trackFormSubmit = useCallback((success: boolean) => {
    // Track form submission
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_submit', {
        event_category: 'conversion',
        event_label: 'interest_form',
        value: success ? 1 : 0
      });
    }
  }, []);
  
  const trackFieldFocus = useCallback((fieldName: string) => {
    // Track field focus for engagement analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_field_focus', {
        event_category: 'engagement',
        event_label: fieldName
      });
    }
  }, []);
  
  const trackFormError = useCallback((errorType: string) => {
    // Track form errors for debugging
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_error', {
        event_category: 'error',
        event_label: errorType
      });
    }
  }, []);
  
  return {
    trackFormStart,
    trackFormSubmit,
    trackFieldFocus,
    trackFormError,
  };
} 