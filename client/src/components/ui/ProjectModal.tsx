'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Globe, Github, Terminal, Database, Activity } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
    badge?: string;
  } | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!project || !mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center p-4 md:p-8 pt-32 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-md shadow-[inset_0_0_100px_rgba(255,157,0,0.15)]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl bg-[#060608] border border-primary/40 shadow-[0_0_80px_-15px_rgba(255,157,0,0.4)] overflow-hidden chamfer-tr"
          >
            {/* Scanline Overlay */}
            <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-[0.05]" />

            {/* Header */}
            <div className="bg-primary/20 border-b-2 border-primary/30 px-8 py-5 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Terminal size={20} className="text-primary animate-pulse" />
                <h2 className="text-2xl font-black font-heading tracking-tight text-white uppercase italic">
                  PROJECT_<span className="text-primary">DECODE</span>
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-primary/20 text-primary transition-all border-2 border-primary/20 hover:border-primary active:scale-90"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-10 md:p-16 overflow-y-auto max-h-[85vh]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                
                {/* Left side: Main Content */}
                <div className="lg:col-span-8 space-y-12">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[10px] font-mono text-primary font-black uppercase tracking-[0.5em] italic">Module_Title</span>
                      <div className="h-px flex-grow bg-white/10" />
                    </div>
                    <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic mb-8 leading-none">
                      {project.title}
                    </h3>
                    <div className="relative p-10 bg-white/[0.02] border-l-8 border-primary/40 shadow-inner">
                       <p className="text-[15px] font-mono text-slate-400 leading-relaxed italic font-bold">
                         <span className="text-primary/40 mr-4">// MANIFEST_READOUT:</span>
                         {project.description}
                       </p>
                    </div>
                  </div>

                  {/* Technical Matrix */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 border-2 border-white/5 bg-white/[0.01] hover:border-primary/20 transition-colors group">
                      <div className="flex items-center gap-3 mb-6 text-primary/60">
                        <Cpu size={18} className="group-hover:rotate-90 transition-transform duration-700" />
                        <span className="text-[11px] font-mono uppercase font-black tracking-[0.3em]">System_Arch</span>
                      </div>
                      <p className="text-[13px] font-mono text-white/50 leading-relaxed font-bold">
                        Hierarchical integration of stochastic neural agents with deterministic system layers for high-performance inference.
                      </p>
                    </div>
                    <div className="p-8 border-2 border-white/5 bg-white/[0.01] hover:border-primary/20 transition-colors group">
                      <div className="flex items-center gap-3 mb-6 text-primary/60">
                        <Activity size={18} className="animate-pulse" />
                        <span className="text-[11px] font-mono uppercase font-black tracking-[0.3em]">Metric_Results</span>
                      </div>
                      <p className="text-[13px] font-mono text-white/50 leading-relaxed font-bold">
                        Achieved ~98.3% accuracy in non-stationary task distributions with 40% reduction in scheduling entropy.
                      </p>
                    </div>
                  </div>

                  {/* Link Actions */}
                  <div className="flex flex-wrap gap-6 pt-8">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 px-10 py-5 bg-white/5 border-2 border-white/10 text-white font-mono text-xs font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-xl">
                        <Github size={18} /> REPOSITORY_ACCESS
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 px-10 py-5 bg-primary text-black font-mono text-xs font-black uppercase tracking-[0.3em] hover:bg-white transition-all shadow-[0_0_30px_rgba(255,157,0,0.3)]">
                        <Globe size={18} /> LIVE_DEPLOYMENT
                      </a>
                    )}
                  </div>
                </div>

                {/* Right side: Metadata Matrix */}
                <div className="lg:col-span-4 space-y-10">
                  <div className="border-2 border-white/5 p-8 bg-white/[0.02] shadow-inner">
                    <h4 className="text-[11px] font-mono text-primary font-black tracking-[0.4em] uppercase mb-8 border-b border-primary/20 pb-4 italic">DEPENDENCY_GRAPH</h4>
                    <div className="flex flex-col gap-3">
                      {project.tags.map((tag, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-black border border-white/5 group/tag hover:border-primary/30 transition-all">
                          <div className="flex items-center gap-4">
                             <Database size={12} className="text-primary/40 group-hover/tag:text-primary" />
                             <span className="text-[11px] font-mono text-white/60 uppercase font-black">{tag}</span>
                          </div>
                          <span className="text-[8px] font-mono text-white/10 italic">VERIFIED</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-2 border-white/5 p-8 bg-white/[0.02] shadow-inner">
                    <h4 className="text-[11px] font-mono text-primary font-black tracking-[0.4em] uppercase mb-8 border-b border-primary/20 pb-4 italic">REGISTRY_INFO</h4>
                    <div className="space-y-8">
                      <div>
                        <span className="text-[9px] font-mono text-white/30 block uppercase mb-2 font-black">Status</span>
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                           <span className="text-sm font-black text-emerald-500 uppercase tracking-widest italic">STABLE_DEPLOY</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-white/30 block uppercase mb-2 font-black">Author_Ref</span>
                        <span className="text-sm font-black text-white uppercase tracking-tighter underline decoration-primary/40 underline-offset-4">PIYUSH_KB // S7</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="bg-black border-t-2 border-white/10 px-10 py-4 flex justify-between items-center">
              <span className="text-[9px] font-mono text-white/10 tracking-[0.6em] uppercase italic">VERIFIED_HARDWARE_SPEC_0x46</span>
              <span className="text-[9px] font-mono text-primary/40 font-black tracking-widest underline underline-offset-4 cursor-help">REVISION: A-202</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
