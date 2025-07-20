'use client';

import { Suspense } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { CounterProvider } from '@/contexts/CounterContext';
import { getOptimizedSubmissionCount } from '@/lib/database-optimization';
import { usePerformanceOptimization } from '@/utils/performance';
import React from 'react';

// Loading component for the counter
function CounterLoader() {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
      <div className="text-sm text-gray-500">developers already on the waitlist</div>
    </div>
  );
}

// Client component to fetch initial count
function PageWithData() {
  const [submissionCount, setSubmissionCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const count = await getOptimizedSubmissionCount();
        setSubmissionCount(count);
      } catch (error) {
        console.error('Error fetching submission count:', error);
        setSubmissionCount(0);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  if (isLoading) {
    return <CounterLoader />;
  }
  
  return (
    <CounterProvider initialCount={submissionCount} autoUpdate={true} updateInterval={30000}>
      <HeroSection 
        submissionCount={submissionCount}
      />
      <SocialProofSection 
        submissionCount={submissionCount}
      />
    </CounterProvider>
  );
}

export default function HomePage() {
  // Initialize performance monitoring
  usePerformanceOptimization();
  
  return (
    <main>
      <Suspense fallback={<CounterLoader />}>
        <PageWithData />
      </Suspense>
    </main>
  );
}
