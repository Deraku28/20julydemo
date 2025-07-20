// Conversion tracking utilities
export class ConversionTracker {
  private static instance: ConversionTracker;
  private conversions: Map<string, number> = new Map();

  static getInstance(): ConversionTracker {
    if (!ConversionTracker.instance) {
      ConversionTracker.instance = new ConversionTracker();
    }
    return ConversionTracker.instance;
  }

  // Track form submission conversion
  trackFormConversion(formName: string, value?: number) {
    const conversionKey = `form_${formName}`;
    const currentCount = this.conversions.get(conversionKey) || 0;
    this.conversions.set(conversionKey, currentCount + 1);

    // Send to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        event_category: 'form_submission',
        event_label: formName,
        value: value || 1,
        custom_parameters: {
          conversion_count: currentCount + 1,
        },
      });
    }

    // Track in localStorage for persistence
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem('conversions') || '{}');
      stored[conversionKey] = currentCount + 1;
      localStorage.setItem('conversions', JSON.stringify(stored));
    }
  }

  // Track page engagement
  trackPageEngagement(page: string, timeSpent: number) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'engagement', {
        event_category: 'page_engagement',
        event_label: page,
        value: Math.round(timeSpent / 1000), // Convert to seconds
      });
    }
  }

  // Track scroll depth
  trackScrollDepth(depth: number) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'scroll', {
        event_category: 'engagement',
        event_label: 'scroll_depth',
        value: Math.round(depth),
      });
    }
  }

  // Get conversion statistics
  getConversionStats() {
    const stats: Record<string, number> = {};
    this.conversions.forEach((count, key) => {
      stats[key] = count;
    });
    return stats;
  }
}

export const conversionTracker = ConversionTracker.getInstance(); 