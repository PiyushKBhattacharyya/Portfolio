import { motion } from 'framer-motion';
import ProjectCard from '@/components/ui/project-card';
import { Terminal, Database } from 'lucide-react';
import { PROJECTS } from '@/lib/constants';

export default function Projects() {
  return (
    <section id="projects" className="pt-16 pb-32 relative overflow-hidden bg-[#060608]">
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Database size={14} className="text-primary animate-pulse" />
              <span className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] font-bold">Module_Registry_v2.0</span>
            </div>
            <h2 className="text-2xl sm:text-7xl lg:text-8xl xl:text-9xl font-black font-heading tracking-tight text-white uppercase italic leading-tight py-4">
              ENGINEERED_<span className="text-transparent border-b-2 md:border-b-4 border-primary px-2">SYSTEMS</span>
            </h2>
          </div>

        </div>

        {/* Dense Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          {PROJECTS.map((project, index) => (
            <div key={index} className="bg-[#060608]">
              <ProjectCard
                project={project}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Footer Stats / CTA */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/10 pt-8">
          <div className="flex gap-12 font-mono text-[10px] text-white/30 uppercase">
            <div className="flex flex-col gap-1">
              <span>Status:</span>
              <span className="text-primary font-bold">Active_Deployment</span>
            </div>
            <div className="flex flex-col gap-1">
              <span>Sync_Rate:</span>
              <span className="text-white">99.98%</span>
            </div>
          </div>

          <motion.a
            href="https://github.com/PiyushKBhattacharyya"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-6 py-3 border border-primary/40 hover:bg-primary transition-all flex items-center gap-4 bg-primary/5"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-xs font-mono font-bold text-primary group-hover:text-black">DUMP_REPOSITORIES</span>
            <Terminal size={14} className="text-primary group-hover:text-black" />
          </motion.a>
        </div>

      </div>
    </section>
  );
}