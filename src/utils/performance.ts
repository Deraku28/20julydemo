import React from 'react';

// Performance monitoring utilities
export const performanceUtils = {
  // Measure page load time
  measurePageLoad: () => {
    if (typeof window !== 'undefined') {
      const navigation = (performance as any).getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        total: navigation.loadEventEnd - navigation.fetchStart,
      };
    }
    return null;
  },
  
  // Measure component render time
  measureRender: (componentName: string) => {
    const start = (performance as any).now();
    return () => {
      const duration = (performance as any).now() - start;
      console.log(`${componentName} render time: ${duration.toFixed(2)}ms`);
      
      // Send to analytics if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'component_render', {
          event_category: 'performance',
          event_label: componentName,
          value: Math.round(duration),
        });
      }
    };
  },
  
  // Monitor Core Web Vitals
  monitorWebVitals: () => {
    if (typeof window !== 'undefined') {
      // LCP (Largest Contentful Paint)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });
      
      // FID (First Input Delay)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as any;
          console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
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
        console.log('CLS:', cls);
      }).observe({ entryTypes: ['layout-shift'] });
    }
  },
};

// Performance optimization hooks
export function usePerformanceOptimization() {
  React.useEffect(() => {
    // Preload critical resources
    const preloadLinks = [
      { rel: 'preload', href: '/api/submission-count', as: 'fetch' },
      { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', as: 'style' },
    ];
    
    preloadLinks.forEach(({ rel, href, as }) => {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (as) link.setAttribute('as', as);
      document.head.appendChild(link);
    });
    
    // Monitor performance
    performanceUtils.monitorWebVitals();
  }, []);
} 