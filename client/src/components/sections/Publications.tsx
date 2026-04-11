'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Users, BookMarked, Terminal } from 'lucide-react';
import { publications } from '@/lib/constants';

export default function Publications() {
  return (
    <section id="publications" className="py-24 relative overflow-hidden bg-[#0a0a0c]">
      <div className="container mx-auto px-6 md:px-20 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookMarked size={16} className="text-primary" />
              <span className="text-[10px] font-mono text-primary uppercase tracking-[0.4em]">Sub_Module_Logs</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black font-heading tracking-tighter text-white uppercase italic">
              RESEARCH_<span className="text-transparent border-b-4 border-primary px-2">LEDGER</span>
            </h2>
          </div>
          <p className="text-[10px] font-mono text-white/30 uppercase leading-relaxed max-w-[300px] md:text-right">
            Systematic archival of academic contributions and structural investigations.
          </p>
        </div>

        <div className="space-y-12">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.doi}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Ledger Row Header */}
              <div className="flex items-center gap-4 mb-2">
                <div className="h-[1px] w-8 bg-white/10" />
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Index_Ref: 0x0{index + 1}</span>
                <div className="flex-grow h-[1px] bg-white/5" />
              </div>

              <div className="bg-[#060608] border border-white/5 p-10 relative overflow-hidden group-hover:border-primary/30 transition-all duration-500">
                {/* Prestige Tracing Border */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-30" preserveAspectRatio="none">
                  <motion.rect
                    x="0" y="0" width="100%" height="100%"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.2 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                  />
                </svg>

                <div className="flex flex-col lg:flex-row gap-16 relative z-20">

                  {/* Title & Link */}
                  <div className="lg:w-2/3">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[10px] font-mono text-primary font-bold tracking-widest bg-primary/10 px-2 py-1 italic shadow-[0_0_10px_rgba(255,157,0,0.1)]">
                        LOG_ENTRY_{index + 1}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl font-black text-white tracking-tighter mb-6 group-hover:text-primary transition-colors italic leading-none uppercase">
                      {pub.title}
                    </h3>

                    <div className="flex flex-wrap gap-10 mb-10 text-[10px] font-mono">
                      <div className="flex items-center gap-3 text-white/60">
                        <Users size={14} className="text-primary/40" />
                        <span className="uppercase tracking-[0.2em]">{pub.authors.join(' | ')}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/60">
                        <Calendar size={14} className="text-primary/40" />
                        <span className="tracking-widest">{pub.year}</span>
                      </div>
                    </div>

                    <div className="relative p-6 bg-white/[0.01] border-l-2 border-primary/40">
                      <div className="absolute top-0 right-0 p-3 opacity-5">
                        <Terminal size={32} className="text-primary" />
                      </div>
                      <p className="text-[13px] font-mono text-slate-400 leading-relaxed max-w-2xl">
                        <span className="text-primary/40 mr-3">// ABSTRACT:</span>
                        {pub.abstract}
                      </p>
                    </div>
                  </div>

                  {/* Metadata Matrix */}
                  <div className="lg:w-1/3 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="p-6 bg-white/[0.03] border border-white/10 group-hover:border-primary/20 transition-colors">
                        <span className="text-[8px] font-mono text-white/20 uppercase block mb-3 font-bold tracking-[0.3em]">Module_Destination</span>
                        <span className="text-xs font-black text-white uppercase tracking-widest">{pub.conference}</span>
                      </div>
                      <div className="p-6 bg-white/[0.03] border border-white/10 group-hover:border-primary/20 transition-colors">
                        <span className="text-[8px] font-mono text-white/20 uppercase block mb-3 font-bold tracking-[0.3em]">Object_DOI</span>
                        <span className="text-xs font-black text-primary uppercase tracking-tighter animate-flicker">{pub.doi}</span>
                      </div>
                    </div>

                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-12 flex items-center justify-center gap-4 px-8 py-5 bg-transparent border border-primary/30 text-primary font-mono font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-primary hover:text-black transition-all shadow-[0_0_15px_rgba(255,157,0,0.1)] active:scale-95"
                    >
                      ENGAGE_PROTOCOL
                      <ExternalLink size={16} />
                    </a>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Stats Bar */}
        <div className="mt-20 flex justify-center">
          <div className="flex items-center gap-8 px-8 py-2 bg-white/5 border border-white/10 rounded-full">
            <div className="flex items-center gap-2">
              <Terminal size={12} className="text-primary" />
              <span className="text-[10px] font-mono text-white/60">Total_Entries: {publications.length}</span>
            </div>
            <div className="w-[1px] h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-white/60">Status: Verified_Source</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}