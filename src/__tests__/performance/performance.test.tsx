import React from 'react';
import { render } from '@testing-library/react';
import { HeroSection } from '@/components/sections/HeroSection';

describe('Performance', () => {
  it('renders hero section within performance budget', () => {
    const startTime = performance.now();
    
    render(<HeroSection submissionCount={100} />);
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    expect(renderTime).toBeLessThan(100); // 100ms render time
  });

  it('handles large submission counts efficiently', () => {
    const startTime = performance.now();
    
    render(<HeroSection submissionCount={999999} />);
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    expect(renderTime).toBeLessThan(50); // 50ms render time
  });

  it('renders form components efficiently', () => {
    const startTime = performance.now();
    
    const { rerender } = render(<HeroSection submissionCount={100} />);
    
    // Re-render with different props
    rerender(<HeroSection submissionCount={200} />);
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    expect(renderTime).toBeLessThan(150); // 150ms total render time
  });

  it('handles rapid state changes efficiently', () => {
    const startTime = performance.now();
    
    const { rerender } = render(<HeroSection submissionCount={100} />);
    
    // Simulate rapid state changes
    for (let i = 0; i < 10; i++) {
      rerender(<HeroSection submissionCount={100 + i} />);
    }
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    expect(renderTime).toBeLessThan(500); // 500ms for 10 re-renders
  });

  it('maintains performance with complex props', () => {
    const startTime = performance.now();
    
    render(<HeroSection submissionCount={1000000} />);
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    expect(renderTime).toBeLessThan(100); // 100ms even with large numbers
  });
}); 