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
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative bg-[#060608] border border-white/10 overflow-hidden"
      >
        {/* Module Header */}
        <div className="bg-white/5 border-b border-white/10 px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal size={12} className="text-primary" />
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Module_0{index + 1}</span>
          </div>
          <div className="flex gap-1">
            <div className={`w-1 h-1 rounded-full ${hovered ? 'bg-primary' : 'bg-white/20'} transition-colors`} />
            <div className="w-1 h-1 rounded-full bg-white/20" />
          </div>
        </div>

        <div className="p-6">
          {/* Title & Badge */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white tracking-tighter group-hover:text-primary transition-colors">
              {project.title.toUpperCase()}
            </h3>
            {project.badge && (
              <div className="flex items-center gap-2 mt-1">
                <Package size={10} className="text-primary/60" />
                <span className="text-[9px] font-mono text-primary/60 italic uppercase tracking-tighter">
                  {project.badge}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8 relative">
            <div className="absolute -left-3 top-0 bottom-0 w-[1px] bg-primary/20" />
            <p className="text-xs font-mono text-slate-400 leading-relaxed pl-4 line-clamp-3">
              <span className="text-white/20 mr-2">[DESC]</span>
              {project.description}
            </p>
          </div>

          {/* Tags Matrix */}
          <div className="grid grid-cols-2 gap-2 mb-8">
            {project.tags.slice(0, 4).map((tag, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white/[0.02] border border-white/5 px-2 py-1">
                <Cpu size={10} className="text-white/20" />
                <span className="text-[9px] font-mono text-white/40 uppercase">{tag}</span>
              </div>
            ))}
          </div>

          {/* Actions Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
            <div className="flex gap-4">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors">
                  <Github size={16} />
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors">
                  <Link size={16} />
                </a>
              )}
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-[9px] font-mono text-primary/60 hover:text-primary font-bold tracking-widest flex items-center gap-2 group/btn"
            >
              INITIALIZE_DATA
              <motion.span 
                animate={hovered ? { x: [0, 4, 0] } : {}}
                transition={{ repeat: Infinity, duration: 0.6 }}
              >
                &gt;&gt;
              </motion.span>
            </button>
          </div>
        </div>

        {/* Decorative Scan Line */}
        <AnimatePresence>
          {hovered && (
            <motion.div 
              className="absolute top-0 left-0 w-full h-[1px] bg-primary/20 z-20"
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
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