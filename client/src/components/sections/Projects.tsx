import { motion } from 'framer-motion';
import ProjectCard from '@/components/ui/project-card';
import { ExternalLink } from 'lucide-react';
import { PROJECTS } from '@/lib/constants';

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold font-poppins mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-pink-500 mx-auto"></div>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Explore some of my recent works.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a 
            href="#" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-white hover:bg-primary/20 font-bold transition-all"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="https://github.com/PiyushKBhattacharyya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <span>View All Projects</span>
              <ExternalLink size={16} />
            </a>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
