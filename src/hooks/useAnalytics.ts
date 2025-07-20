import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { trackPageView, trackEvent, trackFormEvent } from '@/lib/analytics';

export function useAnalytics() {
  const router = useRouter();

  // Track page views
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Track form interactions
  const trackFormStart = useCallback((formName: string) => {
    trackFormEvent(formName, 'start');
  }, []);

  const trackFormComplete = useCallback((formName: string) => {
    trackFormEvent(formName, 'complete');
  }, []);

  const trackFormError = useCallback((formName: string, fieldName?: string) => {
    trackFormEvent(formName, 'error', fieldName);
  }, []);

  // Track user engagement
  const trackEngagement = useCallback((action: string, label?: string, value?: number) => {
    trackEvent(action, 'engagement', label, value);
  }, []);

  // Track performance
  const trackPerformance = useCallback((metric: string, value: number) => {
    trackEvent('timing_complete', 'performance', metric, Math.round(value));
  }, []);

  return {
    trackFormStart,
    trackFormComplete,
    trackFormError,
    trackEngagement,
    trackPerformance,
  };
} 