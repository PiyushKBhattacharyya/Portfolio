import { useRef, useEffect, ReactNode, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
  transitionSpeed?: number;
  glareOpacity?: number;
  disableTiltOnMobile?: boolean;
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 20,
  scale = 1.03,
  perspective = 1500,
  transitionSpeed = 300,
  glareOpacity = 0.3,
  disableTiltOnMobile = false
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  // Detect if device is mobile
  const isMobile = typeof window !== 'undefined' &&
    (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768);

  // Throttle function to limit how often the event handler runs
  const throttle = useCallback((callback: Function, delay: number) => {
    let lastCall = 0;
    return function(...args: any[]) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        callback(...args);
      }
    };
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;

    // Disable tilt effect on mobile if specified
    if (disableTiltOnMobile && isMobile) return;

    // Adjust glare opacity for mobile
    const effectiveGlareOpacity = isMobile ? glareOpacity * 0.7 : glareOpacity;
    
    // Simplified transform calculation for mobile
    const updateTransformStyle = (x: number, y: number) => {
      const rect = card.getBoundingClientRect();
      
      // Calculate glare position
      const glareX = ((x - rect.left) / rect.width) * 100;
      const glareY = ((y - rect.top) / rect.height) * 100;

      // Use simpler gradient on mobile
      if (isMobile) {
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, ${effectiveGlareOpacity}), transparent)`;
      } else {
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, ${effectiveGlareOpacity}), transparent 80%)`;
      }
    };

    const resetStyles = () => {
      card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      glare.style.background = 'none';
    };

    // Handle both mouse and touch events
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX: number, clientY: number;
      
      // Handle touch events
      if ('touches' in e) {
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      
      updateTransformStyle(clientX, clientY);
    };
    
    const handlePointerLeave = () => resetStyles();

    // Apply more aggressive throttling on mobile
    const throttleTime = isMobile ? 100 : 50; // 100ms on mobile, 50ms on desktop
    const throttledPointerHandler = throttle(handlePointerMove, throttleTime);

    // Add event listeners with passive option for better performance
    card.addEventListener('mousemove', throttledPointerHandler as EventListener, { passive: true });
    card.addEventListener('touchmove', throttledPointerHandler as EventListener, { passive: true });
    card.addEventListener('mouseleave', handlePointerLeave);
    card.addEventListener('touchend', handlePointerLeave);

    return () => {
      card.removeEventListener('mousemove', throttledPointerHandler as EventListener);
      card.removeEventListener('touchmove', throttledPointerHandler as EventListener);
      card.removeEventListener('mouseleave', handlePointerLeave);
      card.removeEventListener('touchend', handlePointerLeave);
    };
  }, [maxTilt, scale, perspective, glareOpacity, disableTiltOnMobile, isMobile, throttle]);

  // Adjust animation settings for mobile
  const hoverAnimation = {
    scale: isMobile ? Math.min(scale, 1.02) : scale, // Reduce scale on mobile
    transition: {
      duration: isMobile ? 0.2 : 0.3,
      ease: "easeOut"
    }
  };

  return (
    <motion.div
      ref={cardRef}
      whileHover={hoverAnimation}
      className={`
        relative rounded-2xl overflow-hidden transform-gpu
        transition-transform duration-${transitionSpeed}
        border border-white/10 backdrop-blur-lg
        bg-gradient-to-br from-slate-800/70 via-slate-900/60 to-black/80
        shadow-[0_15px_45px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)]
        group
        ${className}
      `}
      style={{
        willChange: "transform", // Hint for hardware acceleration
        transform: "translateZ(0)", // Force hardware acceleration
        backfaceVisibility: "hidden", // Prevent flickering
        perspective: perspective // Set perspective for 3D transforms
      }}
    >
      {/* Glare Effect */}
      <div
        ref={glareRef}
        className="absolute inset-0 pointer-events-none z-30 rounded-inherit"
      />

      {/* Neon Border Glow - Reduced animation complexity on mobile */}
      <div className="absolute inset-0 z-20 rounded-inherit pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className={`absolute inset-0 rounded-inherit border-2 border-cyan-400/30 ${isMobile ? '' : 'animate-pulse'} blur-[2px]`} />
      </div>

      {/* Inner Light Overlay - Simplified gradient on mobile */}
      <div className="absolute inset-0 z-10 rounded-inherit bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-40 p-6">
        {children}
      </div>
    </motion.div>
  );
}