import { supabase } from './database';

export async function testDatabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('interest_submissions')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Database connection failed:', error);
      return false;
    }
    
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
} 