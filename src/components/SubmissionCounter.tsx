'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getOptimizedSubmissionCount } from '@/lib/database-optimization';
import { classNames } from '@/utils/styles';
import { performanceUtils } from '@/utils/performance';

interface SubmissionCounterProps {
  initialCount: number;
  className?: string;
  autoUpdate?: boolean;
  updateInterval?: number;
}

export function SubmissionCounter({ 
  initialCount, 
  className = '',
  autoUpdate = true,
  updateInterval = 30000 // 30 seconds
}: SubmissionCounterProps) {
  const [count, setCount] = useState(initialCount);
  const [displayCount, setDisplayCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const animationRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Performance monitoring
  const measureRender = performanceUtils.measureRender('SubmissionCounter');
  
  // Improved counter animation with requestAnimationFrame
  const animateCounter = useCallback((targetCount: number) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    const startCount = displayCount;
    const difference = targetCount - startCount;
    const duration = 1000; // 1 second
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = startCount + (difference * easeOutQuart);
      
      setDisplayCount(Math.floor(currentCount));
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayCount(targetCount);
        animationRef.current = null;
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  }, [displayCount]);
  
  // Fetch updated count
  const updateCount = useCallback(async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const newCount = await getOptimizedSubmissionCount();
      if (newCount !== count) {
        setCount(newCount);
        animateCounter(newCount);
        setLastUpdate(new Date());
      }
    } catch (err) {
      setError('Failed to update count');
      console.error('Error updating submission count:', err);
    } finally {
      setIsLoading(false);
    }
  }, [count, isLoading, animateCounter]);
  
  // Auto-update functionality
  useEffect(() => {
    if (!autoUpdate) return;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(updateCount, updateInterval);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoUpdate, updateInterval, updateCount]);
  
  // Initial animation
  useEffect(() => {
    if (count !== displayCount) {
      animateCounter(count);
    }
  }, [count, animateCounter]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // Manual refresh handler
  const handleRefresh = () => {
    updateCount();
  };
  
  // Measure render performance
  useEffect(() => {
    measureRender();
  }, [measureRender]);
  
  return (
    <div className={classNames('flex items-center space-x-2', className)}>
      <span className="font-bold text-primary-600 text-2xl">
        {displayCount.toLocaleString()}
      </span>
      
      {isLoading && (
        <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      )}
      
      {error && (
        <button
          onClick={handleRefresh}
          className="text-xs text-gray-500 hover:text-primary-600 transition-colors"
          title="Refresh count"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      )}
      
      <span className="caption">
        Last updated: {lastUpdate.toLocaleTimeString()}
      </span>
    </div>
  );
} 