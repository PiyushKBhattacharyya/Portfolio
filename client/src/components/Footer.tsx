import { Terminal, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#060608] pt-16 pb-12 overflow-hidden">
      {/* Background ID String */}
      <div className="absolute top-0 right-10 text-[60px] font-black text-white/[0.02] pointer-events-none select-none">
        046-PKB-SYS
      </div>

      <div className="container mx-auto px-6 md:px-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Core Ident */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6 text-primary">
              <Terminal size={18} />
              <span className="text-sm font-bold font-mono tracking-widest uppercase italic">Piyush_KB // Terminal</span>
            </div>
            <p className="text-sm font-mono text-slate-400 mb-8 max-w-sm leading-relaxed">
              Precision System v2.0.46 // Built on the intersection of stochastic intelligence and rigid logic.
            </p>
            <div className="flex items-center gap-4">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">System_Functional_Optimal</span>
            </div>
          </div>

          {/* Column 2: Comms / Links */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] font-bold">Comms_Protocol</span>
            <div className="flex flex-col gap-3 font-mono text-xs">
              <a href={SOCIAL_LINKS.GITHUB} target="_blank" rel="noreferrer" className="text-white/40 hover:text-primary transition-colors flex items-center gap-2">
                <Github size={14} /> GITHUB_REPO
              </a>
              <a href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noreferrer" className="text-white/40 hover:text-primary transition-colors flex items-center gap-2">
                <Linkedin size={14} /> LINKEDIN_AUTH
              </a>
            </div>
          </div>

          {/* Column 3: Navigation */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] font-bold">Direct_Jump</span>
            <div className="flex flex-col gap-3 font-mono text-xs text-white/40">
              <a href="#about" className="hover:text-primary transition-colors">/ BIOS</a>
              <a href="#projects" className="hover:text-primary transition-colors">/ MODULES</a>
              <a href="#publications" className="hover:text-primary transition-colors">/ LOGS</a>
              <a href="#experience" className="hover:text-primary transition-colors">/ AUDIT</a>
            </div>
          </div>

        </div>

        {/* Global Footer Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
              © {currentYear} PIYUSH_KAUSHIK_BHATTACHARYYA. NO_RIGHTS_RESERVED.
            </span>
            <span className="text-[8px] font-mono text-white/10 uppercase">
              Engineered_Static_Environment // Host: Local_Vite
            </span>
          </div>

          <motion.a
            href="#home"
            whileHover={{ y: -5 }}
            className="p-4 bg-white/[0.03] border border-white/10 text-primary hover:border-primary/50 transition-all chamfer-tr"
          >
            <ArrowUp size={20} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}