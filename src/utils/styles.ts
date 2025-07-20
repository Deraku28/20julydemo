// Style utility functions
export const classNames = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Responsive class utilities
export const responsiveClasses = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-12 lg:py-20',
  grid: 'grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16',
  text: {
    h1: 'text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight',
    h2: 'text-3xl sm:text-4xl font-bold text-gray-900 leading-tight',
    h3: 'text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight',
    body: 'text-xl sm:text-2xl text-gray-600 leading-relaxed',
    caption: 'text-sm text-gray-500',
  },
};

// Color utilities
export const colors = {
  primary: {
    50: 'bg-primary-50',
    100: 'bg-primary-100',
    500: 'bg-primary-500',
    600: 'bg-primary-600',
    700: 'bg-primary-700',
  },
  gray: {
    50: 'bg-gray-50',
    100: 'bg-gray-100',
    200: 'bg-gray-200',
    300: 'bg-gray-300',
    400: 'bg-gray-400',
    500: 'bg-gray-500',
    600: 'bg-gray-600',
    700: 'bg-gray-700',
    800: 'bg-gray-800',
    900: 'bg-gray-900',
  },
  success: {
    50: 'bg-success-50',
    100: 'bg-success-100',
    500: 'bg-success-500',
    600: 'bg-success-600',
  },
  error: {
    50: 'bg-error-50',
    100: 'bg-error-100',
    500: 'bg-error-500',
    600: 'bg-error-600',
  },
};

// Animation utilities
export const animations = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  scaleIn: 'animate-scale-in',
  bounce: 'animate-bounce-gentle',
};

// Shadow utilities
export const shadows = {
  soft: 'shadow-soft',
  medium: 'shadow-medium',
  large: 'shadow-large',
};

// Border radius utilities
export const radius = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  '4xl': 'rounded-4xl',
  full: 'rounded-full',
};

// Spacing utilities
export const spacing = {
  xs: 'space-y-1',
  sm: 'space-y-2',
  md: 'space-y-4',
  lg: 'space-y-6',
  xl: 'space-y-8',
  '2xl': 'space-y-12',
}; 