'use client';

import { motion } from 'framer-motion';
import { Cpu, Terminal, Database, Cloud, Layers, Command, Activity, Zap, HardDrive, Cpu as CpuIcon } from 'lucide-react';

const techCategories = [
  {
    label: 'NEURAL_LOGIC',
    icons: ['tensorflow', 'pytorch', 'scikitlearn'],
    icon: <CpuIcon size={16} />,
    id: 'MODULE_ALPHA_01',
    load: 85,
    specs: 'L5_INFERENCE_CORES'
  },
  {
    label: 'KERNEL_LANGS',
    icons: ['python', 'rust', 'cplusplus', 'c', 'java'],
    icon: <Command size={16} />,
    id: 'MODULE_BETA_08',
    load: 92,
    specs: 'LOW_LEVEL_KERNELS'
  },
  {
    label: 'INTERFACE_FABRIC',
    icons: ['typescript', 'react', 'next.js'],
    icon: <Layers size={16} />,
    id: 'MODULE_GAMMA_12',
    load: 74,
    specs: 'HIGH_FIDELITY_DOM'
  },
  {
    label: 'DATA_CLUSTERS',
    icons: ['postgresql', 'mongodb', 'redis', 'sqlite'],
    icon: <Database size={16} />,
    id: 'MODULE_DELTA_04',
    load: 42,
    specs: 'SECURE_DUMP_NODES'
  },
  {
    label: 'INFRA_MESH',
    icons: ['docker', 'kubernetes', 'vercel', 'git'],
    icon: <Cloud size={16} />,
    id: 'MODULE_EPSILON_09',
    load: 66,
    specs: 'DISTRIBUTED_EDGE'
  }
];

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
    <section id="techstack" className="pt-16 pb-32 relative overflow-hidden bg-[#060608]">
      <div className="container mx-auto px-6 md:px-20 relative z-10">

        {/* Engineering Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 border-b-2 border-primary/20 pb-12 gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-5">
            <HardDrive size={120} className="text-primary" />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <Terminal size={14} className="text-primary" />
              <span className="text-[10px] font-mono text-primary uppercase tracking-widest md:tracking-[0.5em] font-bold animate-flicker block truncate w-full md:w-auto">Asset_Dependency_Map</span>
            </div>
            <h2 className="text-2xl sm:text-7xl lg:text-8xl xl:text-9xl font-black font-heading tracking-tight text-white uppercase italic leading-tight py-4">
              DRAFT_<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/40">ENGINEERING</span>
            </h2>
          </div>

          <div className="flex gap-8 md:gap-16 text-[10px] font-mono text-white/30 uppercase tracking-widest md:tracking-[0.2em] flex-wrap sm:flex-nowrap">
            <div className="flex flex-col gap-2">
              <span>UNITS_MOUNTED: 05</span>
              <div className="h-0.5 w-32 bg-white/5 overflow-hidden">
                <motion.div className="h-full bg-primary" animate={{ width: ["0%", "100%", "0%"] }} transition={{ duration: 4, repeat: Infinity }} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary font-bold">STATUS: STABLE</span>
              <span>CALIBRATION: OK</span>
            </div>
          </div>
        </div>

        {/* Industrial Control Rack */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-px bg-white/5 border border-white/5">
          {techCategories.map((cat, i) => (
            <motion.div
              key={i}
              className={`lg:col-span-${i === 0 ? '7' : i === 1 ? '5' : '4'} bg-[#0a0a0c] p-12 relative overflow-hidden group hover:bg-[#0d0d0f] transition-all duration-500`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Exposed Wiring Decoration */}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.05] group-hover:opacity-[0.15] transition-opacity">
                <motion.path
                  d={`M 0 ${20 + i * 10} Q ${100 + i * 50} ${50 + i * 20} ${window.innerWidth} ${80 + i * 10}`}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: i * 0.2 }}
                />
              </svg>

              {/* Bolt Accents */}
              <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-white/10 rounded-full" />
              <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-white/10 rounded-full" />
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-white/10 rounded-full" />
              <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-white/10 rounded-full" />

              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 border border-primary/20 group-hover:border-primary/60 transition-colors">
                    <span className="text-primary">{cat.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-[10px] md:text-sm font-black font-mono tracking-widest md:tracking-[0.2em] text-white uppercase italic break-words">{cat.label}</h3>
                    <span className="text-[7px] md:text-[8px] font-mono text-white/20 uppercase tracking-widest break-words">{cat.specs}</span>
                  </div>
                </div>
                <div className="text-[8px] font-mono text-white/5 px-2 py-0.5 border border-white/5">
                  {cat.id}
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mb-16 relative z-10">
                {cat.icons.map((icon, idx) => (
                  <motion.div
                    key={idx}
                    className="flex flex-col items-center gap-3"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                  >
                    <div className="w-14 h-14 p-4 bg-[#060608] border border-white/10 group-hover:border-primary/20 transition-all relative">
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/40" />
                      <img
                        src={getIconUrl(icon)}
                        alt={icon}
                        className="w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                      />
                    </div>
                    <span className="text-[7px] font-mono text-white/30 uppercase tracking-tighter group-hover:text-primary transition-colors">{icon}</span>
                  </motion.div>
                ))}
              </div>

              {/* Hardware Indicators */}
              <div className="mt-auto flex flex-col gap-6 pt-8 border-t border-white/5">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-2">
                    <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest md:tracking-[0.2em] truncate max-w-[120px] md:max-w-none">Compute_Cycle_Utilization</span>
                    <div className="flex gap-1 h-1.5">
                      {Array.from({ length: 15 }).map((_, j) => (
                        <motion.div
                          key={j}
                          className={`w-1.5 h-full ${j < (cat.load / 6.6) ? 'bg-primary' : 'bg-white/5'}`}
                          animate={j < (cat.load / 6.6) ? { opacity: [1, 0.4, 1] } : {}}
                          transition={{ duration: 1, repeat: Infinity, delay: j * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <Zap size={10} className="animate-flicker" />
                    <span className="text-[10px] font-mono font-black italic">{cat.load}.0%</span>
                  </div>
                </div>

                <div className="flex justify-between text-[7px] font-mono text-white/10 uppercase italic">
                  <span>Input_Freq: 240ghz</span>
                  <span>Revision: S7_DRAFT</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modular Footnote */}
        <div className="mt-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-10 px-6 md:px-10 py-6 md:py-8 bg-primary/5 border border-primary/20 relative">
          <div className="absolute top-0 left-6 md:left-10 w-10 h-1 bg-primary" />
          <div className="flex items-center gap-6 md:gap-12 text-[8px] md:text-[10px] font-mono text-white/40 uppercase">
            <div className="flex flex-col">
              <span className="text-primary/60 font-bold mb-1">Architecture_Spec</span>
              <span>N_TIER_MICRO_KRNL</span>
            </div>
            <div className="flex flex-col">
              <span className="text-primary/60 font-bold mb-1">Execution_State</span>
              <span>PRODUCTION_READY</span>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t border-white/5 md:border-t-0 pt-4 md:pt-0">
            <span className="text-[9px] md:text-[11px] font-mono font-black text-primary tracking-widest md:tracking-[0.5em] uppercase">Engineering_Integrity_Verified</span>
            <Activity size={18} className="text-primary animate-pulse shrink-0" />
          </div>
        </div>

      </div>
    </section>
  );
}