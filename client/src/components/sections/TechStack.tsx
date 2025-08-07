'use client';

import { motion } from 'framer-motion';
import TiltCard from '@/components/ui/tilt-card';

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
  return (
    <section id="techstack" className="min-h-screen py-20">
      <div className="container mx-auto px-5 md:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-12 cursor-default select-none"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold font-poppins mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">Tech Stack</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-pink-500 mx-auto" />
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Technologies I've mastered throughout my development journey
          </p>
        </motion.div>

        {/* Tech Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto w-fit cursor-default select-none">
          {techCategories.map(({ label, icons }) => (
            <div key={label}>
              <h3 className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">{label}</h3>
              <TiltCard>
                <div className={`grid ${getGridColsClass(icons.length)} gap-4 p-4  mx-auto`}>
                  {icons.map((icon) => (
                    <img
                      key={icon}
                      src={getIconUrl(icon)}
                      alt={icon}
                      className="h-10 w-10 object-contain  mx-auto"
                      loading="lazy"
                    />
                  ))}
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}