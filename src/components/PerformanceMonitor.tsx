'use client';

import React, { useEffect, useState } from 'react';
import { performanceUtils } from '@/utils/performance';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  pageLoad?: {
    domContentLoaded: number;
    loadComplete: number;
    total: number;
  };
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
    }

    // Monitor Core Web Vitals
    if (typeof window !== 'undefined') {
      // LCP (Largest Contentful Paint)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // FID (First Input Delay)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as any;
          const fid = fidEntry.processingStart - fidEntry.startTime;
          setMetrics(prev => ({ ...prev, fid }));
        });
      }).observe({ entryTypes: ['first-input'] });

      // CLS (Cumulative Layout Shift)
      new PerformanceObserver((list) => {
        let cls = 0;
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        });
        setMetrics(prev => ({ ...prev, cls }));
      }).observe({ entryTypes: ['layout-shift'] });

      // Page load metrics
      const pageLoadMetrics = performanceUtils.measurePageLoad();
      if (pageLoadMetrics) {
        setMetrics(prev => ({ ...prev, pageLoad: pageLoadMetrics }));
      }
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-xs font-mono z-50 max-w-xs">
      <div className="font-semibold mb-2">Performance Metrics</div>
      <div className="space-y-1">
        {metrics.lcp && (
          <div className="flex justify-between">
            <span>LCP:</span>
            <span className={metrics.lcp < 2500 ? 'text-green-600' : 'text-red-600'}>
              {metrics.lcp.toFixed(0)}ms
            </span>
          </div>
        )}
        {metrics.fid && (
          <div className="flex justify-between">
            <span>FID:</span>
            <span className={metrics.fid < 100 ? 'text-green-600' : 'text-red-600'}>
              {metrics.fid.toFixed(0)}ms
            </span>
          </div>
        )}
        {metrics.cls && (
          <div className="flex justify-between">
            <span>CLS:</span>
            <span className={metrics.cls < 0.1 ? 'text-green-600' : 'text-red-600'}>
              {metrics.cls.toFixed(3)}
            </span>
          </div>
        )}
        {metrics.pageLoad && (
          <div className="flex justify-between">
            <span>Total Load:</span>
            <span className={metrics.pageLoad.total < 3000 ? 'text-green-600' : 'text-red-600'}>
              {metrics.pageLoad.total.toFixed(0)}ms
            </span>
          </div>
        )}
      </div>
    </div>
  );
} 