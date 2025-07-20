'use client';

import React, { useState, useEffect } from 'react';
import { Button, ErrorMessage } from '@/components/ui';
import { NetworkErrorHandler } from '@/utils/network-error-handling';
import { FormErrorRecovery } from '@/utils/form-error-recovery';

interface ErrorRecoveryProps {
  error: any;
  onRetry?: () => void;
  onRecover?: (data: any) => void;
  formId?: string;
  className?: string;
}

export function ErrorRecovery({ 
  error, 
  onRetry, 
  onRecover, 
  formId,
  className = '' 
}: ErrorRecoveryProps) {
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [canRetry, setCanRetry] = useState(true);
  const [recoveryData, setRecoveryData] = useState<any>(null);
  
  useEffect(() => {
    // Check for cached form data
    if (formId) {
      const cached = FormErrorRecovery.recoverFormData(formId);
      if (cached) {
        setRecoveryData(cached);
      }
    }
    
    // Check network connectivity
    NetworkErrorHandler.checkConnectivity().then(isConnected => {
      setCanRetry(isConnected);
    });
  }, [formId]);
  
  const handleRetry = async () => {
    if (!canRetry || isRetrying) return;
    
    setIsRetrying(true);
    setRetryCount(prev => prev + 1);
    
    try {
      // Check connectivity before retry
      const isConnected = await NetworkErrorHandler.checkConnectivity();
      if (!isConnected) {
        throw new Error('No internet connection');
      }
      
      // Call retry function
      if (onRetry) {
        await onRetry();
      }
    } catch (error) {
      console.error('Retry failed:', error);
    } finally {
      setIsRetrying(false);
    }
  };
  
  const handleRecover = () => {
    if (recoveryData && onRecover) {
      onRecover(recoveryData);
    }
  };
  
  const handleReload = () => {
    window.location.reload();
  };
  
  return (
    <div className={`space-y-4 ${className}`}>
      <ErrorMessage message={error.message} />
      
      <div className="flex flex-wrap gap-3">
        {canRetry && (
          <Button
            variant="primary"
            onClick={handleRetry}
            disabled={isRetrying}
            loading={isRetrying}
          >
            {isRetrying ? 'Retrying...' : 'Try Again'}
          </Button>
        )}
        
        {recoveryData && (
          <Button
            variant="outline"
            onClick={handleRecover}
          >
            Recover Data
          </Button>
        )}
        
        <Button
          variant="outline"
          onClick={handleReload}
        >
          Reload Page
        </Button>
      </div>
      
      {retryCount > 0 && (
        <p className="text-sm text-gray-500">
          Retry attempt {retryCount} of 3
        </p>
      )}
      
      {!canRetry && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
          <p className="text-sm text-yellow-800">
            No internet connection. Please check your network and try again.
          </p>
        </div>
      )}
    </div>
  );
} 