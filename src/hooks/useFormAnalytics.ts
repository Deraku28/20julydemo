import { useCallback } from 'react';
import { trackFormEvent, trackConversion } from '@/lib/analytics';
import { conversionTracker } from '@/utils/conversion-tracking';

export function useFormAnalytics() {
  const trackFormStart = useCallback(() => {
    // Track when user starts filling the form
    trackFormEvent('interest_form', 'start');
  }, []);
  
  const trackFormSubmit = useCallback((success: boolean) => {
    // Track form submission
    if (success) {
      trackFormEvent('interest_form', 'complete');
      trackConversion(1);
      conversionTracker.trackFormConversion('interest_form', 1);
    } else {
      trackFormEvent('interest_form', 'error');
    }
  }, []);
  
  const trackFieldFocus = useCallback((fieldName: string) => {
    // Track field focus for engagement analytics
    trackFormEvent('interest_form', 'start', fieldName);
  }, []);
  
  const trackFormError = useCallback((errorType: string) => {
    // Track form errors for debugging
    trackFormEvent('interest_form', 'error', errorType);
  }, []);
  
  return {
    trackFormStart,
    trackFormSubmit,
    trackFieldFocus,
    trackFormError,
  };
} 