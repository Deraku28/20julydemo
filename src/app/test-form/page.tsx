'use client';

import React from 'react';
import { InterestForm } from '@/components/forms';

export default function TestFormPage() {
  const handleSuccess = () => {
    console.log('Form submitted successfully!');
  };

  const handleError = (error: string) => {
    console.error('Form submission error:', error);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Test Interest Form
            </h1>
            <p className="text-gray-600">
              Test the interest capture form functionality
            </p>
          </div>
          
          <InterestForm
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>
      </div>
    </div>
  );
} 