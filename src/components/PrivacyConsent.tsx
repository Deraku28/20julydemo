'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui';

interface PrivacyConsentProps {
  onConsentChange?: (consent: boolean) => void;
}

export function PrivacyConsent({ onConsentChange }: PrivacyConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has already given consent
    const storedConsent = localStorage.getItem('analytics-consent');
    if (storedConsent === null) {
      setShowBanner(true);
    } else {
      const consent = storedConsent === 'true';
      setConsentGiven(consent);
      onConsentChange?.(consent);
    }
  }, [onConsentChange]);

  const handleConsent = (consent: boolean) => {
    setConsentGiven(consent);
    setShowBanner(false);
    localStorage.setItem('analytics-consent', consent.toString());
    onConsentChange?.(consent);

    // If consent is denied, disable analytics
    if (!consent) {
      // Disable Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'GA_TRACKING_ID', {
          send_page_view: false,
        });
      }
    }
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-700">
            We use cookies and analytics to improve your experience and understand how you use our site. 
            By continuing to use this site, you consent to our use of cookies and analytics.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleConsent(false)}
          >
            Decline
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleConsent(true)}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
} 