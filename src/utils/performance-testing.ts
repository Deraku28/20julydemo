// Performance testing utilities
export const performanceTesting = {
  // Test page load performance
  testPageLoad: async (url: string) => {
    const start = performance.now();
    
    try {
      const response = await fetch(url);
      const end = performance.now();
      
      return {
        url,
        loadTime: end - start,
        status: response.status,
        size: response.headers.get('content-length'),
      };
    } catch (error) {
      return {
        url,
        error: (error as Error).message,
      };
    }
  },
  
  // Test component render performance
  testComponentRender: (componentName: string, renderFn: () => void) => {
    const iterations = 100;
    const times: number[] = [];
    
    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      renderFn();
      const end = performance.now();
      times.push(end - start);
    }
    
    const average = times.reduce((a, b) => a + b, 0) / times.length;
    const min = Math.min(...times);
    const max = Math.max(...times);
    
    return {
      component: componentName,
      average: average.toFixed(2),
      min: min.toFixed(2),
      max: max.toFixed(2),
      iterations,
    };
  },
  
  // Test database query performance
  testDatabasePerformance: async () => {
    const { getOptimizedSubmissionCount, getBatchData } = await import('@/lib/database-optimization');
    
    const queries = [
      { name: 'submission-count', fn: () => getOptimizedSubmissionCount() },
      { name: 'batch-data', fn: () => getBatchData() },
    ];
    
    const results = [];
    
    for (const query of queries) {
      const start = performance.now();
      try {
        await query.fn();
        const end = performance.now();
        results.push({
          query: query.name,
          time: (end - start).toFixed(2),
          success: true,
        });
      } catch (error) {
        results.push({
          query: query.name,
          error: (error as Error).message,
          success: false,
        });
      }
    }
    
    return results;
  },
}; 