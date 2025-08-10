'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Throttle function to limit how often the scroll handler fires
    const throttle = (fn: Function, delay: number) => {
      let lastCall = 0;
      return (...args: any[]) => {
        const now = Date.now();
        if (now - lastCall < delay) return;
        lastCall = now;
        return fn(...args);
      };
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = (totalScroll / windowHeight) * 100;
      setScrollProgress(scroll);
    };

    // Throttle scroll event to fire at most once every 16ms (~ 60fps)
    const throttledHandleScroll = throttle(handleScroll, 16);
    
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-pink-500 z-[9999] origin-left"
      style={{
        width: `${scrollProgress}%`,
        willChange: 'transform'
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 30 }}
    />
  );
}