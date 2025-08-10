'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Link } from 'lucide-react';
import TiltCard from './tilt-card';

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
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
        tag: 'bg-primary/20 text-primary',
        link: 'text-primary hover:text-pink-500',
        github: 'hover:text-primary',
      },
      {
        tag: 'bg-purple-500/20 text-purple-500',
        link: 'text-purple-500 hover:text-pink-500',
        github: 'hover:text-purple-500',
      },
      {
        tag: 'bg-pink-500/20 text-pink-500',
        link: 'text-pink-500 hover:text-primary',
        github: 'hover:text-pink-500',
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
      <TiltCard className="group rounded-2xl overflow-hidden backdrop-blur-md bg-slate-900/60 transition-all duration-300 shadow-xl hover:shadow-[0_10px_40px_0_rgba(124,58,237,0.4)] hover:border hover:border-primary/30 border border-transparent transform-gpu animate-pulse-glow">
        <motion.div
          className="p-6 transition-all duration-300 ease-in-out"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-xl font-bold font-poppins mb-3 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 tracking-wide">
            {project.title}
          </h3>

          {/* Animated content section */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={expanded ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden text-slate-300/90 space-y-3"
          >
            <p className="text-sm mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`text-xs px-3 py-1 rounded-full ${colorScheme.tag} transition-all duration-300 hover:scale-105 hover:shadow-md`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-slate-300 ${colorScheme.github} transition-all duration-300 hover:scale-125`}
              >
                <Github size={20} />
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-slate-300 ${colorScheme.link} flex items-center gap-2 transition-all duration-300 hover:scale-110 text-sm font-medium`}
                >
                  <Link size={14} />
                  Live Preview
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}