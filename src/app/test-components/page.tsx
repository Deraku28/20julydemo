'use client';

import React from 'react';
import { SubmissionCounter } from '@/components/SubmissionCounter';
import { Testimonial } from '@/components/Testimonial';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { useSocialProof } from '@/hooks/useSocialProof';
import { CounterProvider } from '@/contexts/CounterContext';

export default function TestComponentsPage() {
  const { data: socialProofData, isLoading, error } = useSocialProof();

  return (
    <CounterProvider initialCount={0}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Social Proof & Counter Components Test
          </h1>

          {/* Enhanced Submission Counter Test */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Enhanced Submission Counter
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Auto-updating Counter (30s intervals)
                </h3>
                <SubmissionCounter 
                  initialCount={847}
                  autoUpdate={true}
                  updateInterval={30000}
                  className="text-3xl"
                />
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Manual Update Counter
                </h3>
                <SubmissionCounter 
                  initialCount={1234}
                  autoUpdate={false}
                  className="text-2xl"
                />
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Fast Update Counter (5s intervals)
                </h3>
                <SubmissionCounter 
                  initialCount={567}
                  autoUpdate={true}
                  updateInterval={5000}
                  className="text-xl"
                />
              </div>
            </div>
          </section>

          {/* Testimonial Component Test */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Testimonial Component
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </section>

          {/* Social Proof Hook Test */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Social Proof Hook Data
            </h2>
            {isLoading && (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading social proof data...</p>
              </div>
            )}
            
            {error && (
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">Error: {error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            )}
            
            {!isLoading && !error && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {socialProofData.stats.map((stat, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                        <div className="text-sm font-medium text-gray-900">{stat.label}</div>
                        <div className="text-xs text-gray-600">{stat.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Testimonials from Hook</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {socialProofData.testimonials.map((testimonial) => (
                      <Testimonial
                        key={testimonial.id}
                        quote={testimonial.quote}
                        author={testimonial.author}
                        role={testimonial.role}
                        company={testimonial.company}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Full Social Proof Section Test */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Complete Social Proof Section
            </h2>
            <SocialProofSection submissionCount={socialProofData.submissionCount} />
          </section>

          {/* Component Features Documentation */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Component Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">SubmissionCounter Features</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Real-time auto-updates (configurable interval)</li>
                  <li>• Smooth count animations</li>
                  <li>• Loading states with spinner</li>
                  <li>• Error handling with manual refresh</li>
                  <li>• Last update timestamp</li>
                  <li>• Responsive design</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Testimonial Features</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 5-star rating display</li>
                  <li>• Author information with role/company</li>
                  <li>• Optional avatar support</li>
                  <li>• Clean, modern design</li>
                  <li>• Responsive layout</li>
                  <li>• Accessible markup</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">SocialProofSection Features</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Integrated submission counter</li>
                  <li>• Trust indicators with icons</li>
                  <li>• Testimonial showcase</li>
                  <li>• Community statistics</li>
                  <li>• Responsive grid layout</li>
                  <li>• Consistent branding</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Hook Features</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Real-time counter management</li>
                  <li>• Social proof data loading</li>
                  <li>• Error handling & recovery</li>
                  <li>• Loading states</li>
                  <li>• Configurable update intervals</li>
                  <li>• Memory leak prevention</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </CounterProvider>
  );
} 