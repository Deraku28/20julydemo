'use client';

import { useState, useEffect } from 'react';
import { getSubmissionCount, submitInterest } from '@/lib/database';
import { testDatabaseConnection } from '@/lib/test-connection';

export default function TestDatabasePage() {
  const [connectionStatus, setConnectionStatus] = useState<string>('Testing...');
  const [submissionCount, setSubmissionCount] = useState<number>(0);
  const [testResult, setTestResult] = useState<string>('');

  useEffect(() => {
    testConnection();
    getCount();
  }, []);

  const testConnection = async () => {
    const isConnected = await testDatabaseConnection();
    setConnectionStatus(isConnected ? '✅ Connected' : '❌ Failed');
  };

  const getCount = async () => {
    const count = await getSubmissionCount();
    setSubmissionCount(count);
  };

  const testSubmission = async () => {
    try {
      const result = await submitInterest({
        name: 'Test User',
        email: `test-${Date.now()}@example.com`,
        subscribe_newsletter: true,
        subscribe_updates: false,
        subscribe_releases: true,
      });

      if (result.error) {
        setTestResult(`❌ Error: ${result.error.message}`);
      } else {
        setTestResult('✅ Test submission successful!');
        getCount(); // Refresh count
      }
    } catch (error) {
      setTestResult(`❌ Error: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Database Connection Test
          </h1>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-base font-medium text-gray-700">Connection Status:</span>
              <span className="text-base font-semibold">{connectionStatus}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-base font-medium text-gray-700">Submission Count:</span>
              <span className="text-base font-mono font-semibold">{submissionCount}</span>
            </div>
            
            <div className="pt-4">
              <button
                onClick={testSubmission}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg"
              >
                Test Submission
              </button>
            </div>
            
            {testResult && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <p className="text-base">{testResult}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 