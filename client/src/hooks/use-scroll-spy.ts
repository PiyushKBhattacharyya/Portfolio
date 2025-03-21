import { useState, useEffect } from 'react';

interface UseScrollSpyOptions {
  offsetTop?: number;
  throttleMs?: number;
}

export function useScrollSpy(
  sectionIds: string[],
  options: UseScrollSpyOptions = {}
): string | null {
  const { offsetTop = 0, throttleMs = 100 } = options;
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    // Debounce/throttle function for scroll events
    function throttle(fn: Function, delay: number) {
      let lastCall = 0;
      return function(...args: any[]) {
        const now = Date.now();
        if (now - lastCall < delay) return;
        lastCall = now;
        return fn(...args);
      };
    }

    // Calculate which section is in view
    const calculateVisibleSection = () => {
      let currentSectionId: string | null = null;
      let currentVisibility = 0;

      // Check each section's visibility
      sectionIds.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionHeight = rect.height;
          
          // Section is considered "visible" when its top is near the viewport top
          if (sectionTop <= offsetTop + 100) {
            // Calculate how far it is from the ideal position (the closer to 0, the better)
            const visibility = 1 - Math.min(Math.abs(sectionTop - offsetTop) / sectionHeight, 1);
            
            // If this section is more visible than the current one, update the current one
            if (visibility > currentVisibility) {
              currentSectionId = sectionId;
              currentVisibility = visibility;
            }
          }
        }
      });

      // Special case: if we've scrolled to the bottom of the page, activate last section
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        currentSectionId = sectionIds[sectionIds.length - 1];
      }

      if (currentSectionId !== activeSection) {
        setActiveSection(currentSectionId);
      }
    };

    // Throttled version of the calculation function
    const throttledCalculate = throttle(calculateVisibleSection, throttleMs);

    // Add scroll listener
    window.addEventListener('scroll', throttledCalculate);
    
    // Initial calculation
    calculateVisibleSection();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledCalculate);
    };
  }, [sectionIds, offsetTop, throttleMs, activeSection]);

  return activeSection;
}
