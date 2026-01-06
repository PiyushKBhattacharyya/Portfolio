import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Link } from 'lucide-react';
import TiltCard from './tilt-card';

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectCardProps {
  project: ProjectProps;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouchDevice();
  }, []);

  const getColorScheme = (idx: number) => {
    const schemes = [
      {
        tag: 'bg-primary/5 text-primary border-primary/20',
        hoverTag: 'group-hover/tag:bg-primary/20 group-hover/tag:border-primary/50',
        link: 'text-primary hover:text-white',
        github: 'hover:text-primary',
        glow: 'group-hover:shadow-[0_0_20px_-5px_var(--primary)]',
      },
      {
        tag: 'bg-secondary/5 text-secondary border-secondary/20',
        hoverTag: 'group-hover/tag:bg-secondary/20 group-hover/tag:border-secondary/50',
        link: 'text-secondary hover:text-white',
        github: 'hover:text-secondary',
        glow: 'group-hover:shadow-[0_0_20px_-5px_var(--secondary)]',
      },
      {
        tag: 'bg-pink-500/5 text-pink-500 border-pink-500/20',
        hoverTag: 'group-hover/tag:bg-pink-500/20 group-hover/tag:border-pink-500/50',
        link: 'text-pink-500 hover:text-white',
        github: 'hover:text-pink-500',
        glow: 'group-hover:shadow-[0_0_20px_-5px_#ec4899]',
      },
    ];
    return schemes[idx % schemes.length];
  };

  const colorScheme = getColorScheme(index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      {...(!isTouch && {
        onMouseEnter: () => setExpanded(true),
        onMouseLeave: () => setExpanded(false),
      })}
      onClick={() => setExpanded((prev) => !prev)}
    >
      <TiltCard className={`group rounded-xl overflow-hidden backdrop-blur-xl bg-black/40 border border-white/10 transition-all duration-500 shadow-xl ${colorScheme.glow} hover:border-white/20 relative`}>
        {/* Tech Corners */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-white/40 transition-colors" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-white/40 transition-colors" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-white/40 transition-colors" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-white/40 transition-colors" />

        <motion.div
          className="p-8 transition-all duration-300 ease-in-out relative z-10"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="inline-flex px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              System_0{index + 1}
            </div>
          </div>

          <h3 className="text-2xl font-bold font-heading mb-4 text-white group-hover:text-glow transition-all duration-300">
            {project.title}
          </h3>

          {/* Animated content section */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={expanded ? { opacity: 1, height: 'auto' } : { opacity: 1, height: 'auto' }} // Always visible for cleaner UX on desktop too, or toggle
            className="text-slate-300 font-light leading-relaxed space-y-6"
          >
            <p className="text-sm border-l-2 border-white/10 pl-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`text-xs px-3 py-1 font-mono rounded-md border ${colorScheme.tag} ${colorScheme.hoverTag} transition-colors cursor-default group/tag`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/5">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-slate-400 ${colorScheme.github} transition-all duration-300 hover:scale-110`}
                >
                  <Github size={20} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${colorScheme.link} flex items-center gap-2 transition-all duration-300 hover:translate-x-1 text-sm font-mono tracking-wide`}
                >
                  <Link size={14} />
                  LIVE_DEMO
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}