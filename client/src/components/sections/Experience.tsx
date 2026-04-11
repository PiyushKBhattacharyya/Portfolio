'use client';

import { motion } from 'framer-motion';
import { EXPERIENCE } from '@/lib/constants';
import { GitBranch, GitCommit, ShieldCheck, Terminal } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="pt-16 pb-32 relative overflow-hidden bg-[#060608]">
      <div className="container mx-auto px-6 md:px-20 relative z-10">
        
        {/* Engineering Header */}
        <div className="flex flex-col gap-4 mb-16 md:mb-24 border-l-4 md:border-l-8 border-primary pl-6 md:pl-12 relative overflow-hidden group">
          <div className="flex items-center gap-4">
            <GitBranch size={16} className="text-primary" />
            <span className="text-[8px] md:text-[10px] font-mono text-primary uppercase tracking-widest md:tracking-[0.5em] font-bold">Trace_Chronology_S7_DRAFT</span>
          </div>
          <h2 className="text-2xl sm:text-7xl lg:text-8xl xl:text-9xl font-black font-heading tracking-tight text-white uppercase italic leading-tight py-4">
            REVISION_<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/40">LOGS</span>
          </h2>
        </div>

        <div className="max-w-5xl relative">
          {/* Structural Trace Beam */}
          <div className="absolute left-6 md:left-12 top-0 bottom-0 w-1 bg-white/5 overflow-hidden hidden md:block">
            <motion.div 
              className="w-full h-40 bg-primary/40"
              animate={{ top: ["-20%", "120%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="space-y-24">
            {EXPERIENCE.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-0 md:pl-36"
              >
                {/* Hardware Connection Node */}
                <div className="absolute left-[44px] top-6 z-10 hidden md:flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary rotate-45 transition-colors" />
                  <div className="absolute inset-[-10px] border border-primary/10 rounded-full animate-ping" />
                </div>
                
                <div className="group relative bg-[#0a0a0c] border border-white/5 p-6 md:p-12 hover:border-primary/20 transition-all duration-500 overflow-hidden">
                  {/* Decorative Industrial Border */}
                  <div className="absolute top-0 right-0 w-8 md:w-16 h-8 md:h-16 border-t-2 border-r-2 border-primary/20" />
                  <div className="absolute bottom-0 left-0 w-8 md:w-16 h-8 md:h-16 border-b-2 border-l-2 border-primary/20" />

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-10 mb-8 md:mb-10 relative z-20">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <Terminal size={12} className="text-primary/40" />
                        <span className="text-[8px] md:text-[9px] font-mono text-primary font-bold uppercase tracking-widest md:tracking-[0.3em]">SEC_LOG_0{index + 1}</span>
                      </div>
                      <h3 className="text-xl md:text-3xl font-black text-white tracking-tighter italic uppercase leading-none mb-2">
                        {exp.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                         <span className="text-[10px] md:text-[11px] font-mono text-white/40 font-bold uppercase tracking-widest">{exp.company}</span>
                         <span className="hidden sm:inline text-white/10">|</span>
                         <span className="text-[7px] md:text-[8px] font-mono text-primary/40 font-black uppercase tracking-tighter underline">STATE: COMMITTED</span>
                      </div>
                    </div>
                    <div className="bg-primary/5 border border-primary/20 px-4 md:px-6 py-2 md:py-3 h-fit w-fit">
                      <span className="text-[10px] md:text-[12px] font-mono text-primary font-black tracking-widest">{exp.period}</span>
                    </div>
                  </div>

                  <div className="relative mb-12 p-8 bg-white/[0.01] border-l-4 border-primary/40">
                    <div className="absolute top-0 right-0 p-4 opacity-[0.05]">
                      <GitCommit size={48} className="text-primary" />
                    </div>
                    <p className="text-[11px] md:text-[14px] font-mono text-slate-400 leading-relaxed max-w-3xl font-bold italic break-words">
                      <span className="text-primary/40 mr-2 md:mr-4 block md:inline mb-2 md:mb-0">// AUDIT_MANIFEST:</span>
                      {exp.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 md:gap-4">
                    {exp.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 bg-black border border-white/10 group-hover:border-primary/10 transition-colors">
                        <ShieldCheck size={10} className="text-primary/40" />
                        <span className="text-[8px] md:text-[10px] font-mono text-white/50 uppercase tracking-widest font-bold">{skill}</span>
                      </div>
                    ))}
                  </div>

                  {/* High-Resolution Component ID */}
                  <div className="absolute bottom-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <span className="text-[40px] font-black font-mono text-white italic">0x0{index + 1}</span>
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