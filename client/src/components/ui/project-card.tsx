import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Link } from 'lucide-react';
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
  const [isHovered, setIsHovered] = useState(false);
  
  // Get color scheme based on index
  const getColorScheme = (idx: number) => {
    const schemes = [
      { tag: 'bg-primary/20 text-primary', link: 'text-primary hover:text-pink-500', github: 'hover:text-primary' },
      { tag: 'bg-purple-500/20 text-purple-500', link: 'text-purple-500 hover:text-pink-500', github: 'hover:text-purple-500' },
      { tag: 'bg-pink-500/20 text-pink-500', link: 'text-pink-500 hover:text-primary', github: 'hover:text-pink-500' }
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TiltCard className="rounded-xl overflow-hidden shadow-lg bg-slate-900/80 backdrop-blur-sm">
        <div className="p-6">
          <h3 className="text-xl font-bold font-poppins mb-2">{project.title}</h3>
          <p className="text-slate-300/80 text-sm mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className={`text-xs px-2 py-1 rounded-full ${colorScheme.tag}`}
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
              className={`text-slate-300 ${colorScheme.github} transition-colors`}
            >
              <Github size={20} />
            </a>
            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-slate-300 ${colorScheme.link} transition-colors`}
              >
                <Link size={14} />
                Live Preview
              </a>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
