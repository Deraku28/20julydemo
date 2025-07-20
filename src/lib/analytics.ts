// Google Analytics configuration
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) return;

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // Initialize data layer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  // Configure gtag
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
    custom_map: {
      custom_parameter_1: 'user_type',
      custom_parameter_2: 'page_section',
    },
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    page_title: title || document.title,
  });
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track form interactions
export const trackFormEvent = (
  formName: string,
  action: 'start' | 'complete' | 'error',
  fieldName?: string
) => {
  trackEvent(action, 'form_interaction', `${formName}_${fieldName || 'general'}`);
};

// Track conversion events
export const trackConversion = (value?: number) => {
  trackEvent('conversion', 'engagement', 'form_submission', value);
};

// Track performance metrics
export const trackPerformance = (metric: string, value: number) => {
  trackEvent('timing_complete', 'performance', metric, Math.round(value));
}; 