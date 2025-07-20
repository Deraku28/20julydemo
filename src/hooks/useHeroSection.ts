import { useState, useEffect } from 'react';

export function useHeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    // Trigger animation when component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Track scroll position for parallax effects
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const heroStyle = {
    transform: `translateY(${scrollY * 0.1}px)`,
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.6s ease-out',
  };
  
  return {
    isVisible,
    scrollY,
    heroStyle,
  };
} 