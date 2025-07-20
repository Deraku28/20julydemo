import { useState, useEffect, useCallback, useRef } from 'react';
import { getSubmissionCount } from '@/lib/database';

interface UseRealtimeCounterOptions {
  initialCount: number;
  updateInterval?: number;
  autoUpdate?: boolean;
  onUpdate?: (newCount: number) => void;
}

export function useRealtimeCounter({
  initialCount,
  updateInterval = 30000,
  autoUpdate = true,
  onUpdate
}: UseRealtimeCounterOptions) {
  const [count, setCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const updateCount = useCallback(async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const newCount = await getSubmissionCount();
      if (newCount !== count) {
        setCount(newCount);
        setLastUpdate(new Date());
        onUpdate?.(newCount);
      }
    } catch (err) {
      setError('Failed to update count');
      console.error('Error updating submission count:', err);
    } finally {
      setIsLoading(false);
    }
  }, [count, isLoading, onUpdate]);
  
  const startAutoUpdate = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(updateCount, updateInterval);
  }, [updateInterval, updateCount]);
  
  const stopAutoUpdate = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  
  useEffect(() => {
    if (autoUpdate) {
      startAutoUpdate();
    }
    
    return () => {
      stopAutoUpdate();
    };
  }, [autoUpdate, startAutoUpdate, stopAutoUpdate]);
  
  const refresh = useCallback(() => {
    updateCount();
  }, [updateCount]);
  
  return {
    count,
    isLoading,
    error,
    lastUpdate,
    refresh,
    startAutoUpdate,
    stopAutoUpdate,
  };
} 