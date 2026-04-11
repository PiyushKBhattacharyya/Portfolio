'use client';

import { motion } from 'framer-motion';
import { Cpu, Terminal, Database, Cloud, Layers, Command } from 'lucide-react';

// Tech categories
const techCategories = [
  {
    label: 'NEURAL_LOGIC',
    icons: ['tensorflow', 'pytorch', 'scikitlearn'],
    icon: <Cpu size={16} />
  },
  {
    label: 'KERNEL_LANGS',
    icons: ['python', 'rust', 'cplusplus', 'c', 'java', 'csharp'],
    icon: <Command size={16} />
  },
  {
    label: 'INTERFACE_FABRIC',
    icons: ['typescript', 'react', 'nextdotjs', 'tailwind-css', 'framer-motion'],
    icon: <Layers size={16} />
  },
  {
    label: 'DATA_CLUSTERS',
    icons: ['postgresql', 'mongodb', 'redis', 'sqlite'],
    icon: <Database size={16} />
  },
  {
    label: 'INFRA_MESH',
    icons: ['docker', 'kubernetes', 'aws', 'vercel', 'git'],
    icon: <Cloud size={16} />
  }
];

// Icon URL resolver with system aesthetics
const getIconUrl = (slug: string) => {
  switch (slug) {
    case 'java':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg';
    case 'tensorflow':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg';
    case 'pytorch':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg';
    case 'cplusplus':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg';
    default:
      return `https://cdn.simpleicons.org/${slug}/white`;
  }
};

export default function TechStack() {
  return (
    <section id="techstack" className="py-24 relative overflow-hidden bg-[#060608]">
      <div className="container mx-auto px-6 md:px-20 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 mb-20 border-l-4 border-primary pl-8">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-primary animate-pulse" />
            <span className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] font-bold">System_Dependency_Mapper</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-heading tracking-tighter text-white uppercase italic">
            CORE_<span className="text-transparent border-b-4 border-primary px-2">MAINFRAME</span>
          </h2>
        </div>

        {/* Dense Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/5 border border-white/5">
          {techCategories.map((cat, i) => (
            <motion.div
              key={i}
              className={`lg:col-span-${i === 0 ? '7' : i === 1 ? '5' : '4'} bg-[#0a0a0c] p-8 border border-white/5 hover:border-primary/20 transition-all group`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="text-primary/40 group-hover:text-primary transition-colors">{cat.icon}</span>
                <h3 className="text-xs font-bold font-mono tracking-[0.2em] text-white uppercase">{cat.label}</h3>
              </div>

              <div className="flex flex-wrap gap-4">
                {cat.icons.map((icon, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                    <div className="w-10 h-10 p-2 bg-white/[0.03] border border-white/5 chamfer-tr group-hover:border-primary/20">
                      <img
                        src={getIconUrl(icon)}
                        alt={icon}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-[8px] font-mono text-white/40 uppercase group-hover:text-primary transition-colors">{icon}</span>
                  </div>
                ))}
              </div>

              {/* Functional Metrics (Visual Decoration) */}
              <div className="mt-12 flex justify-between items-end">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(j => (
                    <div key={j} className={`w-1 h-4 ${j <= (5 - i) ? 'bg-primary/20' : 'bg-white/5'}`} />
                  ))}
                </div>
                <span className="text-[8px] font-mono text-white/20 uppercase tracking-tighter">Sector_Load_Stable</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Footer Stats */}
        <div className="mt-12 p-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8 text-[10px] font-mono text-white/30 uppercase">
            <span>Integrated_Modules: 5</span>
            <span>Uptime: Persistent</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-mono text-primary font-bold">SYSTEMS_SYNCHRONIZED</span>
          </div>
        </div>

      </div>
    </section>
  );
}