import { motion } from 'framer-motion';
import ProjectCard from '@/components/ui/project-card';
import { ExternalLink, Code2 } from 'lucide-react';
import { PROJECTS } from '@/lib/constants';

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-24 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-20 relative z-10">

        {/* Header Section */}
        <motion.div
          className="text-center mb-20 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="inline-block mb-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono tracking-wider"
          >
            PROJECT_ARCHIVE
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 tracking-tight text-white">
            Featured <span className="text-gradient-quantum">Projects</span>
          </h2>
          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            A curated selection of initiated systems and deployed applications.
          </p>
        </motion.div>

        {/* Project Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ProjectCard
                project={project}
                index={index}
              />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.a
            href="https://github.com/PiyushKBhattacharyya"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary/60 text-primary font-mono font-bold tracking-wide transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_-5px_rgba(var(--primary),0.3)] hover:shadow-[0_0_25px_-5px_rgba(var(--primary),0.5)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="">VIEW_ALL_REPOS</span>
            <Code2 size={18} className="group-hover:rotate-12 transition-transform" />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}