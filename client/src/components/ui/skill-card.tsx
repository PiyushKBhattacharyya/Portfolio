'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TiltCard from './tilt-card'; // Import TiltCard

interface SkillCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export default function SkillCard({ icon, title, description, delay = 0 }: SkillCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouchDevice();
  }, []);

  const colorClasses = [
    { border: 'border-primary/20 hover:border-primary/50', bg: 'bg-primary/5', text: 'text-primary' },
    { border: 'border-secondary/20 hover:border-secondary/50', bg: 'bg-secondary/5', text: 'text-secondary' },
    { border: 'border-pink-500/20 hover:border-pink-500/50', bg: 'bg-pink-500/5', text: 'text-pink-500' },
  ];

  const colorIndex = title.charCodeAt(0) % colorClasses.length;
  const colors = colorClasses[colorIndex];

  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <TiltCard className={`cursor-pointer bg-black/40 backdrop-blur-xl rounded-xl border ${colors.border} transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_-5px_rgba(var(--primary),0.2)] group h-full relative overflow-hidden`}
    >
      <div
        className="p-6 flex flex-col items-center justify-center min-h-[180px]"
        onClick={toggleExpand}
        {...(!isTouch && {
          onMouseEnter: () => setExpanded(true),
          onMouseLeave: () => setExpanded(false),
        })}
      >
        {/* Tech Decor */}
        <div className="absolute top-0 right-0 w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity">
          <svg viewBox="0 0 10 10" className={`w-full h-full fill-current ${colors.text}`}>
            <path d="M0 0 H10 V2 H2 V10 H0 Z" />
          </svg>
        </div>

        <div
          className={`w-16 h-16 flex items-center justify-center rounded-xl ${colors.bg} border border-white/5 transition-all duration-500 mb-4 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
        >
          <div className={`${colors.text} transform transition-transform`}>
            {icon}
          </div>
        </div>

        <h3 className="text-lg font-heading font-bold mb-2 text-white group-hover:text-glow transition-all duration-300 tracking-wide text-center">
          {title}
        </h3>

        {/* Expandable section - Always visible somewhat but expands for details? Or just show description always with new layout? */}
        {/* Let's show description always but smaller text to keep it compact */}
        <motion.div
          animate={expanded ? { opacity: 1, height: 'auto' } : { opacity: 0.7, height: 'auto' }}
          className="overflow-hidden text-center"
        >
          {/* Line */}
          <div className={`h-px w-10 mx-auto my-3 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-300 ${expanded ? 'w-20 opacity-100' : 'w-10 opacity-50'}`} />
          <p className="text-slate-400 text-xs font-light leading-relaxed px-2">
            {description}
          </p>
        </motion.div>
      </div>
    </TiltCard>
  );
}