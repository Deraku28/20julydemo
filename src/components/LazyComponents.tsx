'use client';

import React, { Suspense, lazy } from 'react';
import { LoadingSpinner } from '@/components/ui';

// Lazy load components with named exports
const SubmissionCounter = lazy(() => 
  import('./SubmissionCounter').then(module => ({ default: module.SubmissionCounter }))
);
const SocialProofSection = lazy(() => 
  import('./sections/SocialProofSection').then(module => ({ default: module.SocialProofSection }))
);
const Testimonial = lazy(() => 
  import('./Testimonial').then(module => ({ default: module.Testimonial }))
);

// Loading fallback components
const CounterLoader = () => (
  <div className="flex items-center space-x-2">
    <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
    <LoadingSpinner size="sm" />
  </div>
);

const SectionLoader = () => (
  <div className="space-y-4">
    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
  </div>
);

// Lazy component wrappers
export function LazySubmissionCounter(props: any) {
  return (
    <Suspense fallback={<CounterLoader />}>
      <SubmissionCounter {...props} />
    </Suspense>
  );
}

export function LazySocialProofSection(props: any) {
  return (
    <Suspense fallback={<SectionLoader />}>
      <SocialProofSection {...props} />
    </Suspense>
  );
}

export function LazyTestimonial(props: any) {
  return (
    <Suspense fallback={<div className="h-32 bg-gray-200 rounded animate-pulse"></div>}>
      <Testimonial {...props} />
    </Suspense>
  );
} 