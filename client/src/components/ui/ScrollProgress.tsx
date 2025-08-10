'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Detect if device is mobile
  const isMobile = typeof window !== 'undefined' &&
    (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768);

  // Throttle function to limit how often the scroll handler runs
  const throttle = (callback: Function, delay: number) => {
    let lastCall = 0;
    return function(...args: any[]) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        callback(...args);
      }
    };
  };

  // Memoize the scroll handler to prevent unnecessary re-renders
  const handleScroll = useCallback(() => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Avoid division by zero
    if (windowHeight <= 0) return;
    
    const scroll = (totalScroll / windowHeight) * 100;
    setScrollProgress(scroll);
  }, []);

  useEffect(() => {
    // Apply more aggressive throttling on mobile devices
    const throttleTime = isMobile ? 100 : 50; // 100ms on mobile, 50ms on desktop
    const throttledScrollHandler = throttle(handleScroll, throttleTime);
    
    // Use passive event listener for better scroll performance
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    
    // Initial calculation
    handleScroll();
    
    return () => window.removeEventListener('scroll', throttledScrollHandler);
  }, [handleScroll, isMobile]);

  // Adjust spring settings for mobile
  const springConfig = isMobile
    ? { type: 'spring', stiffness: 150, damping: 25 } // Lighter animation for mobile
    : { type: 'spring', stiffness: 200, damping: 30 }; // Original animation for desktop

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-pink-500 z-[9999] origin-left"
      style={{
        width: `${scrollProgress}%`,
        willChange: 'transform', // Hint for hardware acceleration
        transform: 'translateZ(0)' // Force hardware acceleration
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={springConfig}
    />
  );
}