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
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768
    );
  }, []);

  return (
    <section id="techstack" className="min-h-screen py-24 relative">
      <div className="container mx-auto px-6 md:px-20 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="inline-block mb-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
          >
            Expertise
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6 tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">Tech Stack</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            A comprehensive list of technologies I've mastered and use daily to build robust applications.
          </p>
        </motion.div>

        {/* Tech Categories */}
        <div className="flex flex-col gap-12 max-w-6xl mx-auto">
          {techCategories.map(({ label, icons }, categoryIndex) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Category Label */}
                <div className="w-full md:w-48 flex-shrink-0 text-center md:text-right">
                  <h3 className="text-xl font-bold text-white mb-1">{label}</h3>
                  <div className="h-1 w-12 bg-primary/30 rounded-full mx-auto md:ml-auto md:mr-0" />
                </div>

                {/* Icons Grid */}
                <div className="flex-grow">
                  <div className="glass-panel rounded-2xl p-6 md:p-8 hover:border-primary/20 transition-all duration-300">
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
                      {icons.map((icon, iconIndex) => (
                        <motion.div
                          key={icon}
                          whileHover={{
                            scale: 1.15,
                            rotate: 5,
                            filter: "brightness(1.2)"
                          }}
                          className="group relative flex flex-col items-center justify-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                            <img
                              src={getIconUrl(icon)}
                              alt={icon}
                              className="w-full h-full object-contain filter drop-shadow-lg transition-transform"
                              loading="lazy"
                            />
                          </div>
                          <span className="text-xs font-medium text-slate-400 group-hover:text-primary transition-colors capitalize opacity-0 group-hover:opacity-100 absolute -bottom-2 translate-y-full whitespace-nowrap bg-black/80 px-2 py-1 rounded">
                            {icon}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}