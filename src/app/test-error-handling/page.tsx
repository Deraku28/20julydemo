'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import { ErrorRecovery } from '@/components/ErrorRecovery';
import { errorHandler, ErrorType, ErrorSeverity } from '@/utils/error-handling';
import { NetworkErrorHandler } from '@/utils/network-error-handling';
import { FormErrorRecovery } from '@/utils/form-error-recovery';

export default function TestErrorHandlingPage() {
  const [currentError, setCurrentError] = useState<any>(null);
  const [testFormData, setTestFormData] = useState({ name: '', email: '' });

  const testNetworkError = () => {
    const error = new Error('Network connection failed');
    const appError = errorHandler.handleError(error);
    setCurrentError(appError);
  };

  const testDatabaseError = () => {
    const error = new Error('Database connection timeout');
    const appError = errorHandler.handleError(error);
    setCurrentError(appError);
  };

  const testValidationError = () => {
    const error = new Error('validation: Email format is invalid');
    const appError = errorHandler.handleError(error);
    setCurrentError(appError);
  };

  const testRateLimitError = () => {
    const error = new Error('HTTP 429: Too Many Requests');
    const appError = errorHandler.handleError(error);
    setCurrentError(appError);
  };

  const testUnknownError = () => {
    const error = new Error('Something unexpected happened');
    const appError = errorHandler.handleError(error);
    setCurrentError(appError);
  };

  const testFormDataRecovery = () => {
    // Cache some test form data
    FormErrorRecovery.cacheFormData('test-form', { name: 'John Doe', email: 'john@example.com' });
    alert('Form data cached! Try the "Recover Form Data" test.');
  };

  const testFormDataRecoveryRetrieval = () => {
    const recovered = FormErrorRecovery.recoverFormData('test-form');
    if (recovered) {
      setTestFormData(recovered);
      alert('Form data recovered!');
    } else {
      alert('No cached form data found. Try caching some data first.');
    }
  };

  const testNetworkConnectivity = async () => {
    const isConnected = await NetworkErrorHandler.checkConnectivity();
    alert(`Network connectivity: ${isConnected ? 'Connected' : 'Disconnected'}`);
  };

  const clearError = () => {
    setCurrentError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Error Handling Test Page
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Error Test Buttons */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Test Error Scenarios
              </h2>
              
              <div className="space-y-3">
                <Button
                  variant="outline"
                  onClick={testNetworkError}
                  className="w-full"
                >
                  Test Network Error
                </Button>
                
                <Button
                  variant="outline"
                  onClick={testDatabaseError}
                  className="w-full"
                >
                  Test Database Error
                </Button>
                
                <Button
                  variant="outline"
                  onClick={testValidationError}
                  className="w-full"
                >
                  Test Validation Error
                </Button>
                
                <Button
                  variant="outline"
                  onClick={testRateLimitError}
                  className="w-full"
                >
                  Test Rate Limit Error
                </Button>
                
                <Button
                  variant="outline"
                  onClick={testUnknownError}
                  className="w-full"
                >
                  Test Unknown Error
                </Button>
              </div>
            </div>

            {/* Form Recovery Tests */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Form Recovery Tests
              </h2>
              
              <div className="space-y-3">
                <Button
                  variant="outline"
                  onClick={testFormDataRecovery}
                  className="w-full"
                >
                  Cache Form Data
                </Button>
                
                <Button
                  variant="outline"
                  onClick={testFormDataRecoveryRetrieval}
                  className="w-full"
                >
                  Recover Form Data
                </Button>
                
                <Button
                  variant="outline"
                  onClick={testNetworkConnectivity}
                  className="w-full"
                >
                  Test Network Connectivity
                </Button>
                
                <Button
                  variant="outline"
                  onClick={clearError}
                  className="w-full"
                >
                  Clear Current Error
                </Button>
              </div>

              {/* Test Form Display */}
              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Recovered Form Data:
                </h3>
                <div className="text-sm text-gray-600">
                  <p>Name: {testFormData.name || 'Not set'}</p>
                  <p>Email: {testFormData.email || 'Not set'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Error Recovery Display */}
          {currentError && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Error Recovery Component
              </h2>
              <ErrorRecovery
                error={currentError}
                onRetry={() => {
                  alert('Retry clicked!');
                  setCurrentError(null);
                }}
                onRecover={(data) => {
                  alert('Recover clicked!');
                  setCurrentError(null);
                }}
                formId="test-form"
              />
            </div>
          )}

          {/* Error Details */}
          {currentError && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Error Details:
              </h3>
              <div className="text-xs font-mono text-gray-600">
                <p>Type: {currentError.type}</p>
                <p>Severity: {currentError.severity}</p>
                <p>Message: {currentError.message}</p>
                <p>Timestamp: {currentError.timestamp?.toISOString()}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 