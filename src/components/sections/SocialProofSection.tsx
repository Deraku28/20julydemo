'use client';

import React from 'react';
import { Testimonial } from '@/components/Testimonial';
import { useCounter } from '@/contexts/CounterContext';

interface SocialProofSectionProps {
  submissionCount: number;
  className?: string;
}

export function SocialProofSection({ submissionCount, className = '' }: SocialProofSectionProps) {
  const { displayCount, isLoading, error, lastUpdate, refresh } = useCounter();

  return (
    <section className={`bg-gray-50 dark:bg-gray-800 py-6 lg:py-8 ${className}`}>
      <div className="responsive-container">
        <div className="text-center space-y-5">
          {/* Main Social Proof */}
          <div className="space-y-2">
            <h2 className="heading-2">
              Join the Community
            </h2>
            <p className="body-large max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Hundreds of developers are already preparing to master rapid MVP development
            </p>
          </div>
          
          {/* Counter Display */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2 text-4xl">
              <span className="font-bold text-primary-600">
                {displayCount.toLocaleString()}
              </span>
              
              {isLoading && (
                <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              )}
              
              {error && (
                <button
                  onClick={refresh}
                  className="text-xs text-gray-500 hover:text-primary-600 transition-colors"
                  title="Refresh count"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              )}
            </div>
            <p className="body-medium text-gray-600 dark:text-gray-300">
              developers already on the waitlist
            </p>
            <span className="caption text-gray-500 dark:text-gray-400">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="heading-3 mb-2">
                Proven Methodology
              </h3>
              <p className="body-small text-gray-600 dark:text-gray-300">
                Tested framework used by successful founders
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-success-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="heading-3 mb-2">
                Real Results
              </h3>
              <p className="body-small text-gray-600 dark:text-gray-300">
                Students launch MVPs in 30 days or less
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="heading-3 mb-2">
                Community Support
              </h3>
              <p className="body-small text-gray-600 dark:text-gray-300">
                Join a network of like-minded developers
              </p>
            </div>
          </div>
          
          {/* Testimonials */}
          <div className="pt-6">
            <h3 className="heading-3 mb-5">
              What Our Students Say
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Testimonial
                quote="The Vibe Coding methodology helped me launch my SaaS in just 28 days. Game changer!"
                author="Sarah Chen"
                role="Full Stack Developer"
                company="TechStart Inc"
              />
              <Testimonial
                quote="Finally, a course that focuses on rapid execution rather than endless theory."
                author="Marcus Rodriguez"
                role="Product Manager"
                company="InnovateCorp"
              />
              <Testimonial
                quote="I went from idea to paying customers in 25 days. This framework is incredible!"
                author="Alex Thompson"
                role="Solo Founder"
              />
              <Testimonial
                quote="The community support and practical approach made all the difference."
                author="Maria Garcia"
                role="Product Designer"
                company="Design Studio"
              />
            </div>
          </div>
          
          {/* Component Features */}
          <div className="pt-6">
            <h3 className="heading-3 mb-5">
              Why Choose Vibe Coding?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-soft">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Proven Framework</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• 30-day timeline from idea to launch</li>
                  <li>• Market validation before full development</li>
                  <li>• Tested methodology used by successful founders</li>
                  <li>• Step-by-step guidance throughout the process</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-soft">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Community & Support</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Join a network of like-minded developers</li>
                  <li>• Real-time support and feedback</li>
                  <li>• Peer learning and collaboration</li>
                  <li>• Access to exclusive resources and tools</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 