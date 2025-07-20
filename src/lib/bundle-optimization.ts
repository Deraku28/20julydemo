// Bundle optimization utilities
export const bundleOptimization = {
  // Critical CSS extraction
  criticalCSS: [
    'tailwindcss/base',
    'tailwindcss/components',
    'tailwindcss/utilities',
  ],
  
  // Preload critical resources
  preloadResources: [
    '/fonts/inter-var.woff2',
    '/api/submission-count',
  ],
  
  // Lazy load components
  lazyComponents: [
    'SubmissionCounter',
    'SocialProofSection',
    'Testimonial',
  ],
  
  // Code splitting boundaries
  codeSplitting: {
    vendor: ['react', 'react-dom'],
    supabase: ['@supabase/supabase-js'],
    utils: ['@/utils/validation', '@/utils/styles'],
  },
};

// Dynamic imports for code splitting
export const dynamicImports = {
  SubmissionCounter: () => import('@/components/SubmissionCounter'),
  SocialProofSection: () => import('@/components/sections/SocialProofSection'),
  Testimonial: () => import('@/components/Testimonial'),
}; 