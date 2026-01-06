'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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
    <section id="techstack" className="min-h-screen py-24 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

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
            className="inline-block mb-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono tracking-wider"
          >
            SKILL_MATRIX
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 tracking-tight text-white">
            My <span className="text-gradient-quantum">Tech Stack</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto font-light">
            Comprehensive arsenal of mastered technologies and tools.
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
                  <h3 className="text-xl font-bold text-white mb-1 font-heading">{label}</h3>
                  <div className="h-0.5 w-12 bg-primary/30 rounded-full mx-auto md:ml-auto md:mr-0 group-hover:bg-primary transition-colors" />
                </div>

                {/* Icons Grid */}
                <div className="flex-grow w-full">
                  <div className="glass-panel bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 md:p-8 hover:border-primary/20 transition-all duration-300 relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />

                    <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-8 relative z-10">
                      {icons.map((icon, iconIndex) => (
                        <motion.div
                          key={icon}
                          whileHover={{
                            scale: 1.15,
                            rotate: 5,
                            filter: "brightness(1.2)"
                          }}
                          className="group/icon relative flex flex-col items-center justify-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
                            <img
                              src={getIconUrl(icon)}
                              alt={icon}
                              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] transition-transform"
                              loading="lazy"
                            />
                          </div>
                          <span className="text-[10px] font-mono font-medium text-slate-400 group-hover/icon:text-primary transition-colors capitalize opacity-0 group-hover/icon:opacity-100 absolute -bottom-2 translate-y-full whitespace-nowrap bg-black/90 border border-white/10 px-2 py-1 rounded shadow-xl">
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