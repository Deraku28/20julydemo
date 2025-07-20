import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to get submission count
export async function getSubmissionCount(): Promise<number> {
  const { count, error } = await supabase
    .from('interest_submissions')
    .select('*', { count: 'exact', head: true });
  
  if (error) {
    console.error('Error fetching submission count:', error);
    return 0;
  }
  
  return count || 0;
}

// Helper function to submit interest
export async function submitInterest(data: {
  name: string;
  email: string;
  subscribe_newsletter: boolean;
  subscribe_updates: boolean;
  subscribe_releases: boolean;
}) {
  const { data: result, error } = await supabase
    .from('interest_submissions')
    .insert([data])
    .select()
    .single();
  
  return { data: result, error };
} 