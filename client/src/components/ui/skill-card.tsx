'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
    { border: 'border-primary/20 hover:border-primary/60', bg: 'bg-primary/10' },
    { border: 'border-purple-500/20 hover:border-purple-500/60', bg: 'bg-purple-500/10' },
    { border: 'border-pink-500/20 hover:border-pink-500/60', bg: 'bg-pink-500/10' },
    { border: 'border-blue-400/20 hover:border-blue-400/60', bg: 'bg-blue-400/10' },
  ];

  const colorIndex = title.charCodeAt(0) % colorClasses.length;
  const colors = colorClasses[colorIndex];

  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <motion.div
      className={`cursor-pointer bg-slate-900/80 backdrop-blur-sm p-6 rounded-xl border ${colors.border} transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary/20 flex flex-col items-center justify-center min-h-[180px] hover:-translate-y-2`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onClick={toggleExpand}
      {...(!isTouch && {
        onMouseEnter: () => setExpanded(true),
        onMouseLeave: () => setExpanded(false),
      })}
    >
      <div
        className={`w-16 h-16 flex items-center justify-center rounded-full ${colors.bg} transition-all duration-300 mb-${
          expanded ? '4' : '0'
        } transform ${expanded ? 'scale-110' : 'scale-100'} hover:rotate-3 animate-pulse-glow`}
      >
        {icon}
      </div>

      {/* Expandable section */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={expanded ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden text-center"
      >
        <h3 className="text-xl font-poppins font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">{title}</h3>
        <p className="text-slate-300/90 text-sm leading-relaxed">{description}</p>
      </motion.div>
    </motion.div>
  );
}