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

              <div className="bg-[#060608] border border-white/10 p-8 chamfer-tr group-hover:border-primary/40 transition-all">
                <div className="flex flex-col lg:flex-row gap-12">
                  
                  {/* Title & Link */}
                  <div className="lg:w-2/3">
                    <h3 className="text-2xl font-bold text-white tracking-tight mb-4 group-hover:text-primary transition-colors">
                      {pub.title.toUpperCase()}
                    </h3>
                    
                    <div className="flex flex-wrap gap-6 mb-8 text-[10px] font-mono">
                      <div className="flex items-center gap-2 text-primary/60">
                        <Users size={12} />
                        <span className="uppercase tracking-widest">{pub.authors.join(' | ')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/40">
                        <Calendar size={12} />
                        <span>{pub.year}</span>
                      </div>
                    </div>

                    <p className="text-sm font-mono text-slate-400 leading-relaxed max-w-2xl italic border-l-2 border-primary/20 pl-6 py-2">
                      {pub.abstract}
                    </p>
                  </div>

                  {/* Metadata Matrix */}
                  <div className="lg:w-1/3 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="p-4 bg-white/[0.02] border border-white/5">
                        <span className="text-[8px] font-mono text-white/30 uppercase block mb-1">CONFERENCE / JOURNAL</span>
                        <span className="text-[11px] font-bold text-white uppercase tracking-wider">{pub.conference}</span>
                      </div>
                      <div className="p-4 bg-white/[0.02] border border-white/5">
                        <span className="text-[8px] font-mono text-white/30 uppercase block mb-1">DOI_IDENTIFIER</span>
                        <span className="text-[11px] font-bold text-primary uppercase tracking-tighter">{pub.doi}</span>
                      </div>
                    </div>

                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 flex items-center justify-center gap-3 px-6 py-4 bg-primary text-black font-mono font-bold text-[10px] tracking-[0.2em] chamfer-bl hover:bg-white transition-colors"
                    >
                      INITIALIZE_REDIRECTION
                      <ExternalLink size={14} />
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