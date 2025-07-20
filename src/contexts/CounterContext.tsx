'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { getSubmissionCount } from '@/lib/database';

interface CounterContextType {
  count: number;
  displayCount: number;
  isLoading: boolean;
  error: string | null;
  lastUpdate: Date;
  refresh: () => void;
}

const CounterContext = createContext<CounterContextType | null>(null);

interface CounterProviderProps {
  children: React.ReactNode;
  initialCount: number;
  autoUpdate?: boolean;
  updateInterval?: number;
}

export function CounterProvider({ 
  children, 
  initialCount, 
  autoUpdate = true, 
  updateInterval = 30000 
}: CounterProviderProps) {
  const [count, setCount] = useState(initialCount);
  const [displayCount, setDisplayCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const animationRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
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
      const newCount = await getSubmissionCount();
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
  
  const refresh = useCallback(() => {
    updateCount();
  }, [updateCount]);
  
  const value: CounterContextType = {
    count,
    displayCount,
    isLoading,
    error,
    lastUpdate,
    refresh,
  };
  
  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
} 