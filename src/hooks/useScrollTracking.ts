import { useEffect, useCallback } from 'react';
import { conversionTracker } from '@/utils/conversion-tracking';

export function useScrollTracking() {
  const trackScrollDepth = useCallback((depth: number) => {
    conversionTracker.trackScrollDepth(depth);
  }, []);

  useEffect(() => {
    let lastScrollDepth = 0;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollDepth = Math.round((scrollTop / docHeight) * 100);

      // Only track if scroll depth has changed significantly (every 10%)
      if (scrollDepth >= lastScrollDepth + 10 || scrollDepth === 100) {
        trackScrollDepth(scrollDepth);
        lastScrollDepth = scrollDepth;
      }
    };

    // Debounce scroll events
    const debouncedScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', debouncedScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      clearTimeout(scrollTimeout);
    };
  }, [trackScrollDepth]);
} 