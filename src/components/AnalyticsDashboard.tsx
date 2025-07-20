'use client';

import React, { useState, useEffect } from 'react';
import { performanceMonitor } from '@/utils/performance-monitoring';
import { conversionTracker } from '@/utils/conversion-tracking';

interface AnalyticsDashboardProps {
  className?: string;
}

export function AnalyticsDashboard({ className = '' }: AnalyticsDashboardProps) {
  const [performanceStats, setPerformanceStats] = useState<any>({});
  const [conversionStats, setConversionStats] = useState<any>({});

  useEffect(() => {
    // Update stats every 30 seconds
    const interval = setInterval(() => {
      const perfStats = {
        lcp: performanceMonitor.getMetricStats('lcp'),
        fid: performanceMonitor.getMetricStats('fid'),
        cls: performanceMonitor.getMetricStats('cls'),
      };
      setPerformanceStats(perfStats);

      const convStats = conversionTracker.getConversionStats();
      setConversionStats(convStats);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null; // Only show in development
  }

  return (
    <div className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm ${className}`}>
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Analytics Dashboard</h3>
      
      <div className="space-y-3">
        {/* Performance Metrics */}
        <div>
          <h4 className="text-xs font-medium text-gray-700 mb-2">Performance</h4>
          <div className="space-y-1 text-xs">
            {performanceStats.lcp && (
              <div>LCP: {performanceStats.lcp.avg?.toFixed(0)}ms</div>
            )}
            {performanceStats.fid && (
              <div>FID: {performanceStats.fid.avg?.toFixed(0)}ms</div>
            )}
            {performanceStats.cls && (
              <div>CLS: {performanceStats.cls.avg?.toFixed(3)}</div>
            )}
          </div>
        </div>

        {/* Conversion Metrics */}
        <div>
          <h4 className="text-xs font-medium text-gray-700 mb-2">Conversions</h4>
          <div className="space-y-1 text-xs">
            {Object.entries(conversionStats).map(([key, value]) => (
              <div key={key}>
                {key}: {String(value)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 