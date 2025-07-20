'use client';

import React, { useEffect } from 'react';
import { initGA, trackPageView } from '@/lib/analytics';
import { performanceMonitor } from '@/utils/performance-monitoring';
import { errorTracker } from '@/utils/error-tracking';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  useEffect(() => {
    // Initialize analytics
    initGA();

    // Track initial page view
    trackPageView(window.location.pathname);

    // Initialize performance monitoring
    performanceMonitor.trackCoreWebVitals();

    // Set up error tracking
    const handleError = (event: ErrorEvent) => {
      errorTracker.trackError(event.error, 'global_error');
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      errorTracker.trackError(new Error(event.reason), 'unhandled_rejection');
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return <>{children}</>;
} 