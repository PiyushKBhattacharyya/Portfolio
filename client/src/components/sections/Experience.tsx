import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { EXPERIENCE } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import TiltCard from '@/components/ui/tilt-card';

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen py-24 relative overflow-hidden">
      {/* Grid Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-20 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-20"
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
            CAREER_LOG
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 tracking-tight text-white">
            Professional <span className="text-gradient-quantum">Experience</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Navigating the intersection of engineering and innovation.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto space-y-12">
          {EXPERIENCE.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              <TiltCard className="group relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-primary/40 transition-all duration-300 shadow-2xl">
                {/* Tech Corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-primary/60 transition-colors" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-primary/60 transition-colors" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-primary/60 transition-colors" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-primary/60 transition-colors" />

                <div className="flex flex-col md:flex-row gap-8">
                  {/* Icon & Connector */}
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-${job.colorClass}/50 group-hover:shadow-[0_0_15px_-5px_rgba(255,255,255,0.2)] transition-all duration-300`}>
                      <Briefcase className={`w-8 h-8 text-${job.colorClass} group-hover:scale-110 transition-transform`} />
                    </div>
                    {index < EXPERIENCE.length - 1 && (
                      <div className="w-px h-full bg-gradient-to-b from-white/10 via-white/5 to-transparent my-4" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-grow pt-2">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
                        <div className="text-lg text-primary font-mono">{job.company}</div>
                      </div>
                      <span className="inline-flex px-4 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm font-mono text-slate-300 whitespace-nowrap">
                        {job.period}
                      </span>
                    </div>

                    {job.description && (
                      <p className="text-slate-300 leading-relaxed mb-6 text-lg font-light">
                        {job.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {job.skills?.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 text-xs font-mono rounded-md bg-white/5 text-slate-300 border border-white/10 hover:border-primary/30 hover:bg-primary/10 transition-colors cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}