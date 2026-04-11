'use client';

import { motion } from 'framer-motion';
import { Cpu, Terminal, Database, Cloud, Layers, Command, Activity, Zap } from 'lucide-react';

// Tech categories
const techCategories = [
  {
    label: 'NEURAL_LOGIC',
    icons: ['tensorflow', 'pytorch', 'scikitlearn'],
    icon: <Cpu size={16} />,
    id: 'MOD_NN_42',
    load: 85
  },
  {
    label: 'KERNEL_LANGS',
    icons: ['python', 'rust', 'cplusplus', 'c', 'java', 'csharp'],
    icon: <Command size={16} />,
    id: 'MOD_KL_10',
    load: 42
  },
  {
    label: 'INTERFACE_FABRIC',
    icons: ['typescript', 'react', 'nextdotjs', 'tailwind-css', 'framer-motion'],
    icon: <Layers size={16} />,
    id: 'MOD_UI_07',
    load: 91
  },
  {
    label: 'DATA_CLUSTERS',
    icons: ['postgresql', 'mongodb', 'redis', 'sqlite'],
    icon: <Database size={16} />,
    id: 'MOD_DB_19',
    load: 12
  },
  {
    label: 'INFRA_MESH',
    icons: ['docker', 'kubernetes', 'aws', 'vercel', 'git'],
    icon: <Cloud size={16} />,
    id: 'MOD_OS_66',
    load: 68
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
    <section id="techstack" className="py-32 relative overflow-hidden bg-[#060608]">
      {/* Background Matrix Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,157,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,157,0,0.2) 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
      />

      <div className="container mx-auto px-6 md:px-20 relative z-10">
        
        {/* Header - Industrial Display */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 border-b border-white/10 pb-12 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Terminal size={14} className="text-primary" />
              <span className="text-[10px] font-mono text-primary uppercase tracking-[0.5em] font-bold animate-flicker">Core_Payload_Modules</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black font-heading tracking-tighter text-white uppercase italic leading-none">
              SYSTEM_<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/40">INTEGRITY</span>
            </h2>
          </div>
          
          <div className="flex gap-12 text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
            <div className="flex flex-col gap-2">
              <span>MODULES_ONLINE: 0{techCategories.length}</span>
              <div className="h-1 w-24 bg-white/5 overflow-hidden">
                <motion.div className="h-full bg-primary" animate={{ width: ["0%", "100%", "0%"] }} transition={{ duration: 4, repeat: Infinity }} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span>SYNC_STATUS: ACTIVE</span>
              <span className="text-primary font-bold">STABLE_EXEC</span>
            </div>
          </div>
        </div>

        {/* Modular Hardware Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-px bg-white/5 border border-white/5 shadow-2xl">
          {techCategories.map((cat, i) => (
            <motion.div
              key={i}
              className={`lg:col-span-${i === 0 ? '7' : i === 1 ? '5' : '4'} bg-[#0a0a0c] p-10 relative overflow-hidden group hover:bg-[#0d0d0f] transition-all duration-500`}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Module Header Hook */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 overflow-hidden">
                <motion.div 
                  className="h-full bg-primary/40"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                />
              </div>

              {/* ID Stamp */}
              <div className="absolute top-6 right-6 text-[8px] font-mono text-white/10 group-hover:text-primary/20 transition-colors">
                {cat.id} // SEC_AUTH_TRUE
              </div>

              <div className="flex items-center gap-4 mb-12">
                <div className="p-3 bg-white/5 border border-white/10 chamfer-tr group-hover:border-primary/40 transition-all">
                  <span className="text-primary/60 group-hover:text-primary transition-colors">{cat.icon}</span>
                </div>
                <div>
                  <h3 className="text-sm font-black font-mono tracking-[0.3em] text-white uppercase italic">{cat.label}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Activity size={10} className="text-primary/40" />
                    <span className="text-[8px] font-mono text-white/30 uppercase">Resource_Engagement</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mb-16">
                {cat.icons.map((icon, idx) => (
                  <motion.div 
                    key={idx} 
                    className="flex flex-col items-center gap-3 relative"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-12 h-12 p-3 bg-[#060608] border border-white/10 group-hover:border-primary/20 transition-all relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
                      <img
                        src={getIconUrl(icon)}
                        alt={icon}
                        className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <span className="text-[8px] font-mono text-white/20 uppercase tracking-tighter group-hover:text-primary/60 transition-colors">{icon}</span>
                  </motion.div>
                ))}
              </div>

              {/* Logic Metrics Pin */}
              <div className="mt-auto flex justify-between items-end border-t border-white/5 pt-8">
                <div className="flex flex-col gap-2">
                  <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Efficiency_Index</span>
                  <div className="flex gap-1.5 h-1">
                    {Array.from({ length: 12 }).map((_, j) => (
                      <div key={j} className={`w-1 h-full ${j < (cat.load / 8.3) ? 'bg-primary shadow-[0_0_5px_var(--primary)]' : 'bg-white/5'}`} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary/60">
                  <Zap size={10} className="animate-flicker" />
                  <span className="text-[9px] font-mono font-bold tracking-tighter">{cat.load}.00_VAL</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Hardware Footer */}
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-8 px-8 py-6 bg-primary/[0.02] border border-primary/10 chamfer-tr">
          <div className="flex items-center gap-10">
            <div className="flex flex-col gap-1">
              <span className="text-[8px] font-mono text-white/20 uppercase">Core_Hardware</span>
              <span className="text-[10px] font-mono text-white/60 tracking-widest">NVIDIA_CUDA_CORES // ACTIVE</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[8px] font-mono text-white/20 uppercase">Network_Protocol</span>
              <span className="text-[10px] font-mono text-white/60 tracking-widest">TCP_STACK_LEGACY // VERIFIED</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-3 h-3 bg-primary"
              animate={{ opacity: [1, 0.4, 1], scale: [1, 0.9, 1] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            />
            <span className="text-[11px] font-mono font-black text-primary tracking-[0.4em] uppercase">SYSTEMS_OPTIMAL_STABLE</span>
          </div>
        </div>

      </div>
    </section>
  );
}