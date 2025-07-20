import { useState, useEffect } from 'react';

interface SocialProofData {
  submissionCount: number;
  testimonials: Array<{
    id: string;
    quote: string;
    author: string;
    role: string;
    company?: string;
    avatar?: string;
  }>;
  stats: Array<{
    label: string;
    value: string;
    description: string;
  }>;
}

export function useSocialProof() {
  const [data, setData] = useState<SocialProofData>({
    submissionCount: 0,
    testimonials: [],
    stats: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadSocialProofData = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, you might fetch this from an API
        const mockData: SocialProofData = {
          submissionCount: 847,
          testimonials: [
            {
              id: '1',
              quote: "The Vibe Coding methodology helped me launch my SaaS in just 28 days. Game changer!",
              author: "Sarah Chen",
              role: "Full Stack Developer",
              company: "TechStart Inc"
            },
            {
              id: '2',
              quote: "Finally, a course that focuses on rapid execution rather than endless theory.",
              author: "Marcus Rodriguez",
              role: "Product Manager",
              company: "InnovateCorp"
            }
          ],
          stats: [
            {
              label: "Average Launch Time",
              value: "28 days",
              description: "From idea to MVP"
            },
            {
              label: "Success Rate",
              value: "94%",
              description: "Of students launch successfully"
            },
            {
              label: "Community Size",
              value: "2,400+",
              description: "Active developers"
            }
          ]
        };
        
        setData(mockData);
      } catch (err) {
        setError('Failed to load social proof data');
        console.error('Error loading social proof data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSocialProofData();
  }, []);
  
  return {
    data,
    isLoading,
    error,
  };
} 