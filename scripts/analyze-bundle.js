const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Bundle analysis script
async function analyzeBundle() {
  console.log('🔍 Analyzing bundle size...');
  
  try {
    // Run bundle analyzer
    execSync('ANALYZE=true npm run build', { stdio: 'inherit' });
    
    // Generate bundle report
    const reportPath = path.join(process.cwd(), '.next/analyze');
    if (fs.existsSync(reportPath)) {
      console.log('📊 Bundle analysis complete!');
      console.log('📁 Report generated in .next/analyze/');
    }
  } catch (error) {
    console.error('❌ Bundle analysis failed:', error);
  }
}

// Performance budget check
function checkPerformanceBudget() {
  const budget = {
    'initial-js': '200kb',
    'initial-css': '50kb',
    'total-js': '500kb',
    'total-css': '100kb',
  };
  
  console.log('💰 Performance budget:', budget);
  console.log('📈 Monitor these metrics in production');
}

if (require.main === module) {
  analyzeBundle();
  checkPerformanceBudget();
}

module.exports = { analyzeBundle, checkPerformanceBudget }; 