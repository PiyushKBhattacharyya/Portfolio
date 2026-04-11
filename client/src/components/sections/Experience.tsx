'use client';

import { motion } from 'framer-motion';
import { EXPERIENCE } from '@/lib/constants';
import { GitBranch, GitCommit, ShieldCheck } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#060608]">
      <div className="container mx-auto px-6 md:px-20 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 mb-20">
          <div className="flex items-center gap-2">
            <GitBranch size={14} className="text-primary animate-pulse" />
            <span className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] font-bold">Trace_Chronology_v01</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-heading tracking-tighter text-white uppercase italic">
            AUDIT_<span className="text-transparent border-b-4 border-primary px-2">TRAIL</span>
          </h2>
        </div>

        <div className="max-w-4xl relative">
          {/* Vertical Trace Line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-white/10" />

          <div className="space-y-16">
            {EXPERIENCE.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-12 md:pl-24"
              >
                {/* Node */}
                <div className="absolute left-[13px] md:left-[29px] top-2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)] z-10" />
                
                <div className="group border border-white/5 bg-white/[0.02] p-8 chamfer-tr hover:border-primary/40 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <GitCommit size={12} className="text-primary/60" />
                        <span className="text-[10px] font-mono text-primary/60 uppercase">Revision_State_{index + 1}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">
                        {exp.title.toUpperCase()}
                      </h3>
                      <p className="text-sm font-mono text-white/40">{exp.company}</p>
                    </div>
                    <div className="bg-primary/5 border border-primary/20 px-3 py-1 chamfer-tr h-fit">
                      <span className="text-[10px] font-mono text-primary font-bold">{exp.period}</span>
                    </div>
                  </div>

                  <p className="text-sm font-mono text-slate-400 mb-8 leading-relaxed border-l border-white/10 pl-4 italic">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 px-2 py-1 bg-black border border-white/5">
                        <ShieldCheck size={10} className="text-white/20" />
                        <span className="text-[9px] font-mono text-white/40 uppercase">{skill}</span>
                      </div>
                    ))}
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
                    <span className="text-[8px] font-mono text-primary">000x0{index + 1}</span>
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