'use client';

import { useEffect } from 'react';
import { GlobalErrorHandler } from '@/utils/global-error-handler';
import { NetworkErrorHandler } from '@/utils/network-error-handling';

export function ErrorHandlerInitializer() {
  useEffect(() => {
    // Initialize global error handler
    GlobalErrorHandler.setup();
    
    // Setup network connectivity handling
    const cleanup = NetworkErrorHandler.setupConnectivityHandling();
    
    return cleanup;
  }, []);

  return null; // This component doesn't render anything
} 