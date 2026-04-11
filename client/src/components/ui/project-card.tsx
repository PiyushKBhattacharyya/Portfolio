import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Link, Terminal, Package, Cpu } from 'lucide-react';
import ProjectModal from './ProjectModal';

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  badge?: string;
}

interface ProjectCardProps {
  project: ProjectProps;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative bg-[#060608] border border-white/10 overflow-hidden"
      >
        {/* Structural Dimension Markers */}
        <div className="absolute top-0 left-0 w-8 h-px bg-primary/20" />
        <div className="absolute top-0 left-0 w-px h-8 bg-primary/20" />
        <div className="absolute top-0 right-0 w-8 h-px bg-primary/20" />
        <div className="absolute top-0 right-0 w-px h-8 bg-primary/20" />
        <div className="absolute bottom-0 left-0 w-8 h-px bg-primary/20" />
        <div className="absolute bottom-0 left-0 w-px h-8 bg-primary/20" />
        <div className="absolute bottom-0 right-0 w-8 h-px bg-primary/20" />
        <div className="absolute bottom-0 right-0 w-px h-8 bg-primary/20" />

        <div className="absolute top-2 left-2 text-[6px] font-mono text-primary/20 tracking-widest uppercase">
          Draft_ID: 0x{index.toString(16).toUpperCase()} // S7
        </div>

        {/* Blueprint Overlay Flow */}
        <AnimatePresence>
          {hovered && (
            <motion.div 
              className="absolute inset-0 z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)',
                backgroundSize: '10px 10px'
              }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Module Header */}
        <div className="bg-white/5 border-b-2 border-primary/20 px-6 py-4 flex justify-between items-center relative z-20">
          <div className="flex items-center gap-3">
            <Terminal size={14} className="text-primary group-hover:animate-pulse" />
            <span className="text-[10px] font-mono text-white/60 uppercase tracking-[0.4em] font-bold italic">ASSEMBLY_NODE_0{index + 1}</span>
          </div>
          <div className="flex gap-2">
            <div className={`w-1.5 h-1.5 ${hovered ? 'bg-primary' : 'bg-white/20'} transition-all duration-300`} />
            <div className={`w-1.5 h-1.5 bg-white/5`} />
          </div>
        </div>

        <div className="p-10 relative z-20">
          {/* Title & Technical Badge */}
          <div className="mb-10 flex flex-col gap-2">
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter group-hover:text-primary transition-colors italic uppercase leading-none break-words">
              {project.title}
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-[8px] font-mono text-primary/40 uppercase tracking-[0.3em] font-bold border-l-2 border-primary/40 pl-3">
                [ SPECIFICATION_VERIFIED ]
              </span>
              {project.badge && (
                <div className="flex items-center gap-2">
                  <Package size={10} className="text-primary/60" />
                  <span className="text-[8px] font-mono text-primary/60 italic uppercase tracking-tighter">
                    {project.badge}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Description - Manifest Look */}
          <div className="mb-10 relative p-6 bg-white/[0.01] border-l-2 border-primary/40">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <Cpu size={48} className="text-primary" />
            </div>
            <p className="text-[10px] md:text-[12px] font-mono text-slate-400 leading-relaxed font-bold break-words">
              <span className="text-primary/40 mr-2 md:mr-3">// MANIFEST:</span>
              {project.description}
            </p>
          </div>

          {/* BOM (Bill of Materials) List */}
          <div className="mb-12">
            <div className="text-[8px] font-mono text-white/20 uppercase mb-4 tracking-[0.5em] flex items-center gap-4">
               <span>Bill_of_Materials</span>
               <div className="flex-grow h-px bg-white/10" />
            </div>
            <div className="grid grid-cols-1 gap-1">
              {project.tags.map((tag, idx) => (
                <div key={idx} className="flex items-center justify-between py-1.5 border-b border-white/5 group/row hover:bg-primary/5 transition-colors px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-primary/40 rounded-full" />
                    <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest">{tag}</span>
                  </div>
                  <span className="text-[7px] font-mono text-white/10 uppercase italic">v1.2.0</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions Footer - Industrial Button */}
          <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-auto">
            <div className="flex gap-8">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-primary transition-all hover:scale-125 group-hover:rotate-12">
                  <Github size={20} />
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-primary transition-all hover:scale-125 group-hover:rotate-12">
                  <Link size={20} />
                </a>
              )}
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 md:px-8 py-3 bg-transparent border border-primary/30 text-[10px] font-mono text-primary font-black tracking-widest md:tracking-[0.3em] uppercase hover:bg-primary hover:text-black transition-all shadow-[inset_0_0_10px_rgba(255,157,0,0.1)] active:scale-95 flex items-center gap-2 md:gap-4 shrink-0"
            >
              ENGAGE_UNIT
              <motion.span 
                animate={hovered ? { x: [0, 4, 0] } : {}}
                transition={{ repeat: Infinity, duration: 0.6 }}
              >
                &gt;&gt;
              </motion.span>
            </button>
          </div>
        </div>

        {/* Scanline Sweep */}
        <AnimatePresence>
          {hovered && (
            <motion.div 
              className="absolute top-0 left-0 w-full h-[1px] bg-primary/40 z-30 blur-[1px]"
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        project={project} 
      />
    </>
  );
}