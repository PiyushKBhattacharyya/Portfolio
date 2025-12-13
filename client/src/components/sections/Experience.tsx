import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { EXPERIENCE } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import TiltCard from '@/components/ui/tilt-card';

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen py-24 relative">
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
            className="inline-block mb-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
          >
            Career
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6 tracking-tight">
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">Experience</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            My professional journey and contributions to the tech industry.
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
              <TiltCard className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-primary/30 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-8">

                  {/* Icon & Connector */}
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-2xl bg-${job.colorClass}/10 flex items-center justify-center shrink-0 border border-${job.colorClass}/20 group-hover:scale-110 transition-transform duration-300`}>
                      <Briefcase className={`w-8 h-8 text-${job.colorClass}`} />
                    </div>
                    {index < EXPERIENCE.length - 1 && (
                      <div className="w-px h-full bg-gradient-to-b from-white/10 to-transparent my-4" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-grow pt-2">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
                        <div className="text-lg text-primary font-medium">{job.company}</div>
                      </div>
                      <span className="inline-flex px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-300 whitespace-nowrap">
                        {job.period}
                      </span>
                    </div>

                    {job.description && (
                      <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                        {job.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {job.skills?.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={`px-3 py-1 text-sm rounded-lg bg-${job.colorClass}/5 text-${job.colorClass} border border-${job.colorClass}/20`}
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