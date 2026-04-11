'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Users, BookOpen, Terminal, Cpu, FileText, ShieldCheck } from 'lucide-react';
import { publications } from '@/lib/constants';

export default function Publications() {
  return (
    <section id="publications" className="pt-16 pb-32 relative overflow-hidden bg-[#0a0a0c]">
      <div className="container mx-auto px-6 md:px-20 relative z-10">
        
        {/* Ledger Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 border-b-2 border-primary/20 pb-12 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <BookOpen size={16} className="text-primary" />
              <span className="text-[10px] font-mono text-primary uppercase tracking-[0.5em] font-bold italic">Document_Archive_S7_FINAL</span>
            </div>
            <h2 className="text-2xl sm:text-7xl lg:text-8xl xl:text-9xl font-black font-heading tracking-tight text-white uppercase italic leading-tight py-4">
              ENGINEERING_<span className="text-transparent border-b-2 md:border-b-4 border-primary/20 px-2 italic">LEDGER</span>
            </h2>
          </div>
          
          <div className="flex flex-col text-right gap-3 bg-white/5 p-6 border border-white/10 chamfer-tr">
             <div className="flex items-center gap-4 justify-end">
                <span className="text-[10px] font-mono text-white/40 uppercase">Total_Entries: {publications.length}</span>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
             </div>
             <span className="text-[10px] font-mono text-primary font-black uppercase tracking-widest italic border-t border-white/10 pt-2">STATUS: ARCHIVED_SECURE</span>
          </div>
        </div>

        <div className="space-y-8">
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-[#060608] border border-white/10 hover:border-primary/30 transition-all duration-500 overflow-hidden"
            >
              {/* Record Entry Row */}
              <div className="flex flex-col lg:flex-row lg:items-stretch min-h-[320px]">
                 {/* Metadata Sidebar */}
                 <div className="lg:w-64 bg-white/[0.03] p-6 lg:p-10 flex lg:flex-col justify-between items-center lg:items-start gap-4 lg:gap-8 border-b lg:border-b-0 lg:border-r border-white/5 group-hover:bg-primary/5 transition-colors">
                    <div className="flex flex-col gap-1">
                       <span className="text-[8px] font-mono text-primary/40 uppercase font-black tracking-widest">PUB_DATE</span>
                       <div className="flex items-center gap-3">
                          <Calendar size={12} className="text-white/40" />
                          <span className="text-lg font-black font-mono text-white italic">{pub.year}</span>
                       </div>
                    </div>
                    <div className="flex flex-col gap-1 lg:mt-auto">
                       <span className="text-[8px] font-mono text-primary/40 uppercase font-black tracking-widest">RECORD_ID</span>
                       <div className="flex items-center gap-3">
                          <FileText size={12} className="text-primary/40" />
                          <span className="text-sm font-black font-mono text-primary italic">S7-0{index + 1}</span>
                       </div>
                    </div>
                    <div className="hidden lg:block lg:mt-8 pt-8 border-t border-white/5 w-full">
                       <span className="text-[7px] font-mono text-white/10 uppercase break-all">ISO_STND: PKB_DOC_20A</span>
                    </div>
                 </div>

                 {/* Main Content Area */}
                 <div className="flex-grow p-10 md:p-14 relative flex flex-col">
                    <div className="absolute top-10 right-10 p-4 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity group-hover:rotate-12 duration-700">
                       <Cpu size={80} className="text-primary md:w-30 md:h-30" />
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                       <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20">
                          <ShieldCheck size={12} className="text-primary" />
                          <span className="text-[9px] font-mono text-primary font-black uppercase tracking-widest italic">Peer_Verified</span>
                       </div>
                       <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em] font-bold">Research_Module // Logic_Verification</span>
                    </div>

                    <h3 className="text-lg md:text-4xl font-black text-white tracking-tighter uppercase italic group-hover:text-primary transition-colors mb-4 md:mb-8 leading-[1.1] max-w-4xl break-words">
                      {pub.title}
                    </h3>

                    <div className="mb-6 md:mb-10 p-5 md:p-8 bg-white/[0.01] border-l-2 md:border-l-4 border-primary/40 relative">
                        <p className="text-[10px] md:text-[14px] font-mono text-slate-400 leading-relaxed font-bold italic max-w-3xl break-words">
                           <span className="text-primary/40 mr-2 md:mr-4 block md:inline mb-1 md:mb-0">// ABSTRACT_MANIFEST:</span>
                          {pub.abstract}
                       </p>
                    </div>

                    <div className="flex flex-wrap gap-12 items-end mt-auto pt-10 border-t border-white/5">
                        <div className="flex flex-col gap-2 min-w-0">
                           <span className="text-[8px] font-mono text-white/20 uppercase font-bold tracking-[0.2em]">Publisher_Entity</span>
                           <span className="text-[9px] md:text-[11px] font-mono text-white font-black tracking-widest uppercase italic break-words">{pub.conference}</span>
                        </div>
                        <div className="flex flex-col gap-2 min-w-0">
                           <span className="text-[8px] font-mono text-white/20 uppercase font-bold tracking-[0.2em]">Object_DOI</span>
                           <span className="text-[9px] md:text-[11px] font-mono text-primary font-black tracking-tighter uppercase animate-flicker break-all">{pub.doi}</span>
                        </div>
                       
                       <a 
                         href={pub.link} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="flex items-center gap-4 px-10 py-4 bg-transparent border-2 border-primary/30 text-[11px] font-mono text-primary font-black tracking-[0.3em] hover:bg-primary hover:text-black transition-all shadow-[inset_0_0_15px_rgba(255,157,0,0.1)] uppercase ml-auto group/btn"
                       >
                         ENGAGE_PROTOCOL
                         <ExternalLink size={16} className="group-hover/btn:rotate-45 transition-transform" />
                       </a>
                    </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modular Footnote */}
        <div className="mt-24 py-10 border-t-2 border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="flex gap-12 text-[10px] font-mono text-white/30 uppercase tracking-widest">
              <span className="flex items-center gap-3"><Terminal size={14} className="text-primary/40" /> Archive_Integrity: 100%</span>
              <span className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-green-500/40 rounded-full" /> Access_Status: OPEN</span>
           </div>
           <span className="text-[10px] font-mono text-white/10 uppercase italic">END_OF_RECORD // PIYUSH_KB_S7</span>
        </div>
      </div>
    </section>
  );
}