import { supabase } from './database';

// Query caching configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, { data: any; timestamp: number }>();

// Cached query function
export async function cachedQuery<T>(
  key: string,
  queryFn: () => Promise<T>,
  duration: number = CACHE_DURATION
): Promise<T> {
  const cached = cache.get(key);
  const now = Date.now();
  
  if (cached && (now - cached.timestamp) < duration) {
    return cached.data;
  }
  
  const data = await queryFn();
  cache.set(key, { data, timestamp: now });
  
  return data;
}

// Optimized submission count query
export async function getOptimizedSubmissionCount(): Promise<number> {
  return cachedQuery(
    'submission-count',
    async () => {
      const { count, error } = await supabase
        .from('interest_submissions')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error('Error fetching submission count:', error);
        return 0;
      }
      
      return count || 0;
    },
    30000 // 30 seconds cache for real-time feel
  );
}

// Batch queries for multiple data points
export async function getBatchData() {
  const [submissionCount, recentSubmissions] = await Promise.all([
    getOptimizedSubmissionCount(),
    supabase
      .from('interest_submissions')
      .select('created_at')
      .order('created_at', { ascending: false })
      .limit(10),
  ]);
  
  return {
    submissionCount,
    recentSubmissions: recentSubmissions.data || [],
  };
} 