import { useRef, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
  transitionSpeed?: number;
  glareOpacity?: number;
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 5,
  scale = 1.02,
  perspective = 1000,
  transitionSpeed = 400,
  glareOpacity = 0.2
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;
    
    const updateTransformStyle = (x: number, y: number) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const rotateX = maxTilt * (centerY - y) / (rect.height / 2);
      const rotateY = -maxTilt * (centerX - x) / (rect.width / 2);
      
      card.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
      
      // Update glare position
      if (glare) {
        const glareX = ((x - rect.left) / rect.width) * 100;
        const glareY = ((y - rect.top) / rect.height) * 100;
        
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, ${glareOpacity}), transparent)`;
      }
    };
    
    const resetStyles = () => {
      card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      if (glare) {
        glare.style.background = 'none';
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      updateTransformStyle(e.clientX, e.clientY);
    };
    
    const handleMouseLeave = () => {
      resetStyles();
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, scale, perspective, glareOpacity]);

  return (
    <motion.div
      ref={cardRef}
      className={`${className} transform-gpu transition-transform duration-${transitionSpeed} relative`}
      style={{ 
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      {children}
      {/* Glare effect */}
      <div 
        ref={glareRef} 
        className="absolute inset-0 pointer-events-none z-10 rounded-inherit" 
      />
    </motion.div>
  );
}
