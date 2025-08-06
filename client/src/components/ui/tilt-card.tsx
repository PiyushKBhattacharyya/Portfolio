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

  useEffect(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;

    if (disableTiltOnMobile && window.innerWidth < 768) return;

    const updateTransformStyle = (x: number, y: number) => {
      const rect = card.getBoundingClientRect();
      
      const glareX = ((x - rect.left) / rect.width) * 100;
      const glareY = ((y - rect.top) / rect.height) * 100;

      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, ${glareOpacity}), transparent 80%)`;
    };

    const resetStyles = () => {
      card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      glare.style.background = 'none';
    };

    const handleMouseMove = (e: MouseEvent) => updateTransformStyle(e.clientX, e.clientY);
    const handleMouseLeave = () => resetStyles();

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, scale, perspective, glareOpacity, disableTiltOnMobile]);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ scale: scale }}
      className={`
        relative rounded-2xl overflow-hidden transform-gpu
        transition-transform duration-${transitionSpeed}
        border border-white/10 backdrop-blur-lg
        bg-gradient-to-br from-slate-800/70 via-slate-900/60 to-black/80
        shadow-[0_15px_45px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)]
        group
        ${className}
      `}

    >
      {/* Glare Effect */}
      <div
        ref={glareRef}
        className="absolute inset-0 pointer-events-none z-30 rounded-inherit"
      />

      {/* Neon Border Glow */}
      <div className="absolute inset-0 z-20 rounded-inherit pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 rounded-inherit border-2 border-cyan-400/30 animate-pulse blur-[2px]" />
      </div>

      {/* Inner Light Overlay */}
      <div className="absolute inset-0 z-10 rounded-inherit bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-40 p-6">
        {children}
      </div>
    </motion.div>
  );
}