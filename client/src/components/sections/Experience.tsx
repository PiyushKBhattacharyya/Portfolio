'use client';

import { motion } from 'framer-motion';
import { EXPERIENCE } from '@/lib/constants';
import { GitBranch, GitCommit, ShieldCheck, Terminal } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-32 relative overflow-hidden bg-[#060608]">
      <div className="container mx-auto px-6 md:px-20 relative z-10">
        
        {/* Header - Industrial Display */}
        <div className="flex flex-col gap-3 mb-24 border-l-4 border-primary pl-10 relative">
          <div className="absolute left-[-4px] top-0 bottom-0 w-1 bg-primary blur-[4px] opacity-40" />
          <div className="flex items-center gap-3">
            <GitBranch size={16} className="text-primary animate-pulse" />
            <span className="text-[10px] font-mono text-primary uppercase tracking-[0.5em] font-bold animate-flicker">Audit_Chronology_Verified</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black font-heading tracking-tighter text-white uppercase italic leading-none">
            REVISION_<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/40 animate-aberration">HISTORY</span>
          </h2>
        </div>

        <div className="max-w-5xl relative">
          {/* Vertical Trace Line (Physics Pulse) */}
          <div className="absolute left-4 md:left-10 top-0 bottom-0 w-px bg-white/5 overflow-hidden">
            <motion.div 
              className="w-full h-32 bg-primary/40 blur-[1px]"
              animate={{ top: ["-10%", "110%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="space-y-24">
            {EXPERIENCE.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative pl-16 md:pl-28"
              >
                {/* Hardware Node */}
                <div className="absolute left-[11px] md:left-[35px] top-4 z-10 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-primary shadow-[0_0_15px_var(--primary)] rotate-45" />
                  <motion.div 
                    className="absolute inset-[-8px] border border-primary/20 rounded-full"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
                
                <div className="group relative border border-white/5 bg-white/[0.01] p-10 chamfer-tr hover:border-primary/30 transition-all duration-500 overflow-hidden">
                  {/* Prestige Tracing Border */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-30" preserveAspectRatio="none">
                    <motion.rect
                      x="0" y="0" width="100%" height="100%"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="1"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.3 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                    />
                  </svg>

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8 relative z-20">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Terminal size={12} className="text-primary/40" />
                        <span className="text-[10px] font-mono text-primary/40 uppercase tracking-[0.2em]">Kernel_Level_0{index + 1}</span>
                      </div>
                      <h3 className="text-3xl font-black text-white tracking-tighter group-hover:text-primary transition-colors italic uppercase leading-none">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[11px] font-mono text-white/40 tracking-widest">{exp.company}</span>
                        <div className="w-1 h-1 bg-white/10 rounded-full" />
                        <span className="text-[9px] font-mono text-primary/60 font-bold uppercase tracking-tighter">Status: Committed</span>
                      </div>
                    </div>
                    <div className="bg-primary/5 border border-primary/20 px-4 py-2 chamfer-tr h-fit shadow-[0_0_15px_rgba(255,157,0,0.05)]">
                      <span className="text-[11px] font-mono text-primary font-black tracking-widest">{exp.period}</span>
                    </div>
                  </div>

                  <div className="relative mb-10 p-6 bg-white/[0.01] border-l-2 border-white/5 group-hover:border-primary/20 transition-colors">
                    <div className="absolute top-0 right-0 p-3 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                      <GitCommit size={48} className="text-primary" />
                    </div>
                    <p className="text-[13px] font-mono text-slate-400 leading-relaxed max-w-3xl">
                      <span className="text-white/20 mr-4">// AUDIT_LOG:</span>
                      {exp.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {exp.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-3 px-3 py-1.5 bg-black border border-white/10 group-hover:border-primary/10 transition-colors">
                        <ShieldCheck size={12} className="text-primary/30" />
                        <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">{skill}</span>
                      </div>
                    ))}
                  </div>

                  {/* Corner Visual ID */}
                  <div className="absolute bottom-6 right-6 opacity-5 group-hover:opacity-20 transition-opacity">
                    <span className="text-[30px] font-black font-mono text-primary italic">0x{index + 1}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}