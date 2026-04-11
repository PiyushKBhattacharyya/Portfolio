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
        className="group relative bg-[#060608] border border-white/5 overflow-hidden"
      >
        {/* Prestige Tracing Border */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-30" preserveAspectRatio="none">
          <motion.rect
            x="0" y="0" width="100%" height="100%"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: index * 0.2, ease: "easeInOut" }}
          />
        </svg>

        {/* Module Header */}
        <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex justify-between items-center relative z-20">
          <div className="flex items-center gap-2">
            <Terminal size={12} className="text-primary animate-pulse" />
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.3em]">Module_0{index + 1}</span>
          </div>
          <div className="flex gap-2">
            <div className={`w-1 h-3 ${hovered ? 'bg-primary shadow-[0_0_8px_var(--primary)]' : 'bg-white/10'} transition-all duration-300`} />
            <div className="w-1 h-3 bg-white/5" />
          </div>
        </div>

        <div className="p-8 relative z-20">
          {/* Title & Badge */}
          <div className="mb-8">
            <h3 className="text-2xl font-black text-white tracking-tighter group-hover:text-primary transition-colors italic uppercase leading-none mb-2">
              {project.title}
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-mono text-primary/40 uppercase tracking-widest">[ID: {project.title.substring(0, 3).toUpperCase()}-46]</span>
              {project.badge && (
                <div className="flex items-center gap-2">
                  <Package size={10} className="text-primary/60" />
                  <span className="text-[9px] font-mono text-primary/60 italic uppercase tracking-tighter">
                    {project.badge}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8 relative p-4 bg-white/[0.02] border border-white/5">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Cpu size={24} className="text-primary" />
            </div>
            <p className="text-[11px] font-mono text-slate-400 leading-relaxed line-clamp-3">
              <span className="text-primary/40 mr-2">&gt;&gt;</span>
              {project.description}
            </p>
          </div>

          {/* Tags Matrix */}
          <div className="grid grid-cols-2 gap-3 mb-10">
            {project.tags.slice(0, 4).map((tag, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-black border border-white/10 px-3 py-1.5 group-hover:border-primary/20 transition-colors">
                <div className="w-1 h-1 bg-primary/40 rounded-full" />
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">{tag}</span>
              </div>
            ))}
          </div>

          {/* Actions Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
            <div className="flex gap-5">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-primary transition-all hover:scale-125">
                  <Github size={18} />
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-primary transition-all hover:scale-125">
                  <Link size={18} />
                </a>
              )}
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-transparent border border-primary/20 text-[9px] font-mono text-primary/80 hover:text-black hover:bg-primary transition-all font-bold tracking-[0.2em] flex items-center gap-3 active:scale-95 shadow-inner"
            >
              INITIALIZE
              <motion.span 
                animate={hovered ? { x: [0, 4, 0] } : {}}
                transition={{ repeat: Infinity, duration: 0.6 }}
              >
                &gt;&gt;
              </motion.span>
            </button>
          </div>
        </div>

        {/* Decorative Overlay FX */}
        <AnimatePresence>
          {hovered && (
            <>
              <motion.div 
                className="absolute inset-0 bg-primary/[0.02] z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div 
                className="absolute top-0 left-0 w-full h-[1px] bg-primary/40 z-30 blur-[1px]"
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </>
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