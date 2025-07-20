const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingVars.forEach(varName => {
    console.error(`   - ${varName}`);
  });
  console.error('\n💡 Please set these environment variables before deployment.');
  process.exit(1);
}

console.log('✅ All required environment variables are set');
console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`📍 Supabase URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
console.log(`📍 Site URL: ${process.env.NEXT_PUBLIC_SITE_URL || 'Not set'}`); 