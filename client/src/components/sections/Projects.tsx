import { motion } from 'framer-motion';
import ProjectCard from '@/components/ui/project-card';
import { ExternalLink } from 'lucide-react';
import { PROJECTS } from '@/lib/constants';

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-20">
      <div className="container mx-auto px-10 ">
        
        {/* Header Section: Title and Description */}
        <motion.div
          className="text-center mb-20 cursor-default select-none"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4 tracking-tight cursor-default select-none">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 animate-gradient-shift">Projects</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-primary to-pink-500 mx-auto rounded-full animate-pulse-glow"></div>
          <p className="mt-6 text-lg text-slate-300/90 max-w-2xl mx-auto leading-relaxed">
            Explore some of my recent works.
          </p>
        </motion.div>

        {/* Project Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 cursor-default select-none text-center lg:text-left">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* "View All Projects" Button Section */}
        <motion.div
          className="mt-16 text-center cursor-default select-none"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a
            href="https://github.com/PiyushKBhattacharyya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-primary text-white hover:bg-primary/20 font-bold transition-all duration-300 cursor-default select-none shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/30 backdrop-blur-sm"
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ boxShadow: "0 4px 6px -1px rgba(124, 58, 237, 0.1)" }}
            animate={{ boxShadow: "0 4px 12px -1px rgba(124, 58, 237, 0.2)" }}
            transition={{
              boxShadow: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2
              }
            }}
          >
            <span>View All Projects</span>
            <ExternalLink size={18} className="animate-float" />
          </motion.a>
        </motion.div>
        
      </div>
    </section>
  );
}