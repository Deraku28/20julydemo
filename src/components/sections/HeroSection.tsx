'use client';

import React from 'react';
import { InterestForm } from '@/components/forms/InterestForm';
import { useCounter } from '@/contexts/CounterContext';

interface HeroSectionProps {
  submissionCount: number;
}

export function HeroSection({ submissionCount }: HeroSectionProps) {
  const { displayCount, isLoading, error, lastUpdate, refresh } = useCounter();

  const handleFormSuccess = () => {
    // Handle form success - could trigger analytics or other actions
    console.log('Form submitted successfully');
  };

  const handleFormError = (error: string) => {
    // Handle form error - could log to error tracking service
    console.error('Form submission error:', error);
  };

  return (
    <section className="gradient-hero py-8 lg:py-12">
      <div className="responsive-container">
        <div className="responsive-grid items-center">
          {/* Left Side - Content (60% on desktop) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="heading-1">
                Master Rapid{' '}
                <span className="text-gradient">MVP Development</span>
                {' '}with Vibe Coding
              </h1>
              
              <p className="body-large max-w-3xl">
                Transform your ideas into market-ready products in just 30 days. 
                Join hundreds of developers who've learned to build, validate, 
                and launch MVPs with confidence.
              </p>
            </div>
            
            {/* Social Proof - Improved Layout */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-primary-600 text-2xl">
                  {displayCount.toLocaleString()}
                </span>
                
                {isLoading && (
                  <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                )}
                
                {error && (
                  <button
                    onClick={refresh}
                    className="text-xs text-gray-500 hover:text-primary-600 transition-colors"
                    title="Refresh count"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                )}
              </div>
              
              <span className="text-gray-600 dark:text-gray-300 font-medium">
                developers already on the waitlist
              </span>
              
              <span className="text-xs text-gray-400 dark:text-gray-500">
                • Updated {lastUpdate.toLocaleTimeString()}
              </span>
            </div>
            
            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">30-Day Timeline</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">From idea to launch in one month</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Market Validation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Test ideas before full development</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Launch Ready</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Deploy with confidence</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Form (40% on desktop) */}
          <div className="lg:col-span-2">
            <div className="card shadow-large p-8 bg-white dark:bg-gray-800">
              <div className="text-center mb-6">
                <h2 className="heading-3 mb-2 text-gray-900 dark:text-white">
                  Join the Waitlist
                </h2>
                <p className="body-small text-gray-600 dark:text-gray-300">
                  Be the first to know when we launch
                </p>
              </div>
              
              <InterestForm
                onSuccess={handleFormSuccess}
                onError={handleFormError}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 