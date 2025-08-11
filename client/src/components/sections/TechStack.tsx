'use client';

import { motion } from 'framer-motion';
import TiltCard from '@/components/ui/tilt-card';
import { useEffect, useState } from 'react';

// Detect if device is mobile
const isMobile = typeof window !== 'undefined' &&
  (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
  window.innerWidth < 768);

// Tech categories
const techCategories = [
  {
    label: 'Frontend',
    icons: ['typescript', 'javascript', 'react', 'nextdotjs', 'html5']
  },
  {
    label: 'Backend',
    icons: ['nodedotjs', 'express', 'aspdotnet', 'dotnet']
  },
  {
    label: 'Mobile',
    icons: ['flutter', 'android', 'androidstudio', 'dart']
  },
  {
    label: 'Machine Learning',
    icons: ['tensorflow', 'pytorch', 'scikitlearn']
  },
  {
    label: 'Programming Languages',
    icons: ['python', 'java', 'csharp', 'cplusplus', 'c']
  },
  {
    label: 'Databases',
    icons: ['mysql', 'postgresql', 'sqlite']
  },
  {
    label: 'DevOps & Tools',
    icons: ['git', 'github', 'vercel', 'docker', 'kubernetes']
  }
];

// Icon URL resolver
const getIconUrl = (slug: string) => {
  switch (slug) {
    case 'java':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg';
    case 'tensorflow':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg';
    case 'pytorch':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg';
    case 'scikitlearn':
      return 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg';
    case 'aspdotnet':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg';
    case 'dotnet':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg';
    case 'efcore':
      return 'https://seeklogo.com/images/E/entity-framework-core-logo-02F1775E5B-seeklogo.com.png';
    case 'c':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg';
    case 'cplusplus':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg';
    case 'csharp':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg';
    default:
      return `https://cdn.simpleicons.org/${slug}`;
  }
};

// Tailwind-safe dynamic column class
const getGridColsClass = (count: number) => {
  const cols = Math.min(count, 5);
  return {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5'
  }[cols];
};

// TechStack Component
export default function TechStack() {
  // Component-level mobile detection for SSR compatibility
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  
  useEffect(() => {
    // Set mobile state after component mounts to avoid hydration issues
    setIsMobileDevice(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768
    );
  }, []);
  
  return (
    <section id="techstack" className="min-h-screen py-20">
      <div className="container mx-auto px-5 md:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-20 cursor-default select-none"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: isMobile ? 0.1 : 0.3 }} // Reduced threshold on mobile
          transition={{
            duration: isMobile ? 0.4 : 0.5, // Faster animation on mobile
            ease: "easeOut"
          }}
          style={{
            willChange: "opacity, transform", // Hint for hardware acceleration
            transform: "translateZ(0)", // Force hardware acceleration
            backfaceVisibility: "hidden" // Prevent flickering
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4 tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 animate-gradient-shift">Tech Stack</span>
          </h2>
          <div className={`w-32 h-1 bg-gradient-to-r from-primary to-pink-500 mx-auto rounded-full ${isMobile ? '' : 'animate-pulse-glow'}`} />
          <p className="mt-6 text-lg text-slate-300/90 max-w-2xl mx-auto leading-relaxed">
            Technologies I've mastered throughout my development journey
          </p>
        </motion.div>

        {/* Tech Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-auto max-w-5xl cursor-default select-none  text-center">
          {techCategories.map(({ label, icons }, categoryIndex) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: isMobile ? 0.1 : 0.2 }} // Reduced threshold on mobile
              transition={{
                duration: isMobile ? 0.5 : 0.6, // Faster animation on mobile
                delay: isMobile ? categoryIndex * 0.05 : categoryIndex * 0.1, // Reduced staggering on mobile
                ease: "easeOut"
              }}
              style={{
                willChange: "opacity, transform", // Hint for hardware acceleration
                transform: "translateZ(0)", // Force hardware acceleration
                backfaceVisibility: "hidden" // Prevent flickering
              }}
            >
              <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">{label}</h3>
              <TiltCard className="bg-slate-900/80 backdrop-blur-sm border border-slate-800/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20">
                <div className={`grid ${getGridColsClass(icons.length)} gap-6 p-6 mx-auto`}>
                  {icons.map((icon, iconIndex) => (
                    <motion.div
                      key={icon}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        duration: isMobile ? 0.2 : 0.3, // Faster animation on mobile
                        delay: isMobile ? 0.05 + iconIndex * 0.02 : 0.1 + iconIndex * 0.05, // Reduced delays on mobile
                        ease: "easeOut"
                      }}
                      whileHover={{
                        scale: isMobile ? 1.1 : 1.2, // Reduced scale on mobile
                        rotate: isMobile ? 3 : 5, // Reduced rotation on mobile
                        transition: {
                          type: "spring",
                          stiffness: isMobile ? 400 : 300, // Stiffer springs on mobile for faster animations
                          damping: isMobile ? 25 : 20 // More damping on mobile for less oscillation
                        }
                      }}
                      className="flex flex-col items-center justify-center gap-2"
                      style={{
                        willChange: "transform, opacity", // Hint for hardware acceleration
                        transform: "translateZ(0)", // Force hardware acceleration
                        backfaceVisibility: "hidden" // Prevent flickering
                      }}
                    >
                      <img
                        src={getIconUrl(icon)}
                        alt={icon}
                        className="h-12 w-12 object-contain mx-auto filter drop-shadow-lg"
                        loading={isMobile ? "lazy" : "eager"} // Lazy load on mobile
                        decoding="async"
                      />
                      <span className="text-xs text-slate-400 capitalize">{icon}</span>
                    </motion.div>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}