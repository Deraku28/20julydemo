import React from 'react';
import { classNames } from '@/utils/styles';

interface SuccessMessageProps {
  className?: string;
}

export function SuccessMessage({ className = '' }: SuccessMessageProps) {
  return (
    <div className={classNames('bg-success-50 border border-success-200 rounded-lg p-6', className)}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-success-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-success-800">
            Thank you for your interest!
          </h3>
          <p className="text-sm text-success-700 mt-1">
            We'll be in touch soon with updates about the Vibe Coding Course.
          </p>
        </div>
      </div>
    </div>
  );
} 