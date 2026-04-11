'use client';

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
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm shadow-[inset_0_0_100px_rgba(255,157,0,0.1)]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-[#060608] border border-primary/30 shadow-[0_0_50px_-12px_rgba(255,157,0,0.3)] overflow-hidden chamfer-tr"
          >
            {/* Scanline Overlay */}
            <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-[0.03]" />

            {/* Header */}
            <div className="bg-primary/10 border-b border-primary/20 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Terminal size={18} className="text-primary animate-pulse" />
                <h2 className="text-xl font-black font-heading tracking-tighter text-white uppercase italic">
                  PROJECT_<span className="text-primary">DECODE</span>
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-primary/20 text-primary transition-colors border border-primary/20"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 md:p-12 overflow-y-auto max-h-[80vh]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Left side: Main Content */}
                <div className="lg:col-span-8 space-y-10">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono text-primary uppercase tracking-[0.3em]">Module_Title</span>
                      <div className="h-px flex-grow bg-white/5" />
                    </div>
                    <h3 className="text-4xl font-black text-white tracking-tighter uppercase italic mb-4">
                      {project.title}
                    </h3>
                    <p className="text-sm font-mono text-slate-400 leading-relaxed italic border-l-2 border-primary/40 pl-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Technical Matrix */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border border-white/5 bg-white/[0.01]">
                      <div className="flex items-center gap-2 mb-4 text-primary/60">
                        <Cpu size={14} />
                        <span className="text-[10px] font-mono uppercase font-bold tracking-widest">System_Arch</span>
                      </div>
                      <p className="text-xs font-mono text-white/60 leading-relaxed">
                        Hierarchical integration of stochastic neural agents with deterministic system layers for high-performance inference.
                      </p>
                    </div>
                    <div className="p-6 border border-white/5 bg-white/[0.01]">
                      <div className="flex items-center gap-2 mb-4 text-amber-500/60">
                        <Activity size={14} />
                        <span className="text-[10px] font-mono uppercase font-bold tracking-widest">Metric_Results</span>
                      </div>
                      <p className="text-xs font-mono text-white/60 leading-relaxed">
                        Achieved ~98.3% accuracy in non-stationary task distributions with 40% reduction in scheduling entropy.
                      </p>
                    </div>
                  </div>

                  {/* Link Actions */}
                  <div className="flex flex-wrap gap-4 pt-4">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all chamfer-tr">
                        <Github size={16} /> REPOSITORY_ACCESS
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-3 bg-primary text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-all chamfer-tr">
                        <Globe size={16} /> LIVE_DEPLOYMENT
                      </a>
                    )}
                  </div>
                </div>

                {/* Right side: Metadata Matrix */}
                <div className="lg:col-span-4 space-y-8">
                  <div className="border border-white/5 p-6 bg-white/[0.02]">
                    <h4 className="text-[10px] font-mono text-primary font-bold tracking-[0.3em] uppercase mb-6">DEPENDENCY_GRAPH</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <div key={i} className="flex items-center gap-2 px-2 py-1 bg-black border border-white/10">
                          <Database size={10} className="text-white/20" />
                          <span className="text-[9px] font-mono text-white/50 uppercase">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-white/5 p-6 bg-white/[0.02]">
                    <h4 className="text-[10px] font-mono text-primary font-bold tracking-[0.3em] uppercase mb-4">REGISTRY_INFO</h4>
                    <div className="space-y-4">
                      <div>
                        <span className="text-[8px] font-mono text-white/20 block uppercase mb-1">Status</span>
                        <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">STABLE_DEPLOY</span>
                      </div>
                      <div>
                        <span className="text-[8px] font-mono text-white/20 block uppercase mb-1">Author_Ref</span>
                        <span className="text-xs font-bold text-white uppercase tracking-widest">PIYUSH_KB</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="bg-black border-t border-white/10 px-8 py-3 flex justify-end">
              <span className="text-[8px] font-mono text-white/10 tracking-[0.5em] uppercase">SYSTEM_ARCHIVE_SECURED_0x46</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
