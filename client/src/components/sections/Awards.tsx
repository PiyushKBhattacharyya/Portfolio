import { motion } from 'framer-motion';
import { Award, FileSignature, Calendar, ScanEye } from 'lucide-react';
import { AWARDS } from '@/lib/constants';

export default function Awards() {
  return (
    <section id="awards" className="pt-16 pb-32 relative overflow-hidden bg-[#060608]">
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pt-16">
          <div className="flex flex-col gap-2 relative">
            <div className="absolute -left-6 top-1/2 w-4 h-px bg-primary/40 -translate-y-1/2" />
            <div className="flex items-center gap-2">
              <Award size={14} className="text-primary" />
              <span className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] font-bold">Merit_Registry_Sys</span>
            </div>
            <h2 className="text-2xl sm:text-7xl lg:text-8xl xl:text-9xl font-black font-heading tracking-tight text-white uppercase italic leading-tight py-4">
              VERIFIED_<span className="text-transparent border-b-2 md:border-b-8 border-primary px-2">HONORS</span>
            </h2>
          </div>
          <div className="flex gap-8 border-l-2 border-white/10 pl-6 h-fit bg-[#0a0a0c] p-4">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">Registry_Count</span>
              <span className="text-primary font-black font-mono text-lg leading-none">{AWARDS.length.toString().padStart(2, '0')}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">Validation_State</span>
              <span className="text-white font-black font-mono text-lg leading-none flex items-center gap-2">SECURE <div className="w-1.5 h-1.5 bg-primary animate-pulse" /></span>
            </div>
          </div>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 gap-12 border-t-2 border-primary/20 pt-12">
          {AWARDS.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-[#0a0a0c] border border-white/5 border-l-2 border-l-primary hover:border-primary/40 transition-all p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                
                {/* Visual / Certificate Slot */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                   <div className="w-full aspect-[4/3] bg-black/40 border border-white/10 relative overflow-hidden group-hover:border-primary/30 transition-colors flex items-center justify-center">
                     <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,157,0,0.02)_50%,transparent_75%)] bg-[length:10px_10px]" />
                     <ScanEye size={48} className="text-primary/20 group-hover:text-primary transition-colors duration-700" />
                     {award.image && (
                       <img src={award.image} alt={award.title} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-opacity mix-blend-screen" />
                     )}
                     <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/80 border border-primary/30 text-[9px] font-mono text-primary flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary animate-pulse" />
                        CERT_SCAN_ACTIVE
                     </div>
                   </div>
                </div>

                {/* Metadata */}
                <div className="lg:col-span-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-[10px] font-mono text-white/40 uppercase mb-4 tracking-widest border-b border-white/5 pb-4">
                     <span className="flex items-center gap-2 text-primary font-bold"><Calendar size={12}/> {award.year}</span>
                     <span>//</span>
                     <span>Record_ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold font-heading uppercase text-white mb-6 group-hover:text-primary transition-colors">
                    {award.title}
                  </h3>
                  
                  <div className="flex gap-4">
                    <div className="w-1 max-h-full bg-primary/20" />
                    <p className="text-sm font-mono text-slate-400 leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                  
                  <div className="mt-8 flex gap-4 border-t border-white/5 pt-6">
                     <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-[10px] font-mono text-primary flex items-center gap-2">
                       <FileSignature size={12} /> VERIFIED_ORIGIN
                     </span>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}