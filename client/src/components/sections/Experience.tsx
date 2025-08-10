import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { EXPERIENCE } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import TiltCard from '@/components/ui/tilt-card';

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20 cursor-default select-none"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4 tracking-tight">
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 animate-gradient-shift">Experience</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-primary to-pink-500 mx-auto rounded-full animate-pulse-glow"></div>
          <p className="mt-6 text-lg text-slate-300/90 max-w-2xl mx-auto leading-relaxed">
            My professional journey so far
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="px-6 py-10 max-w-4xl mx-auto space-y-12 cursor-default select-none">
          {EXPERIENCE.map((job, index) => (
            <motion.div 
              key={index}
              className="relative cursor-default select-none"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <TiltCard className={`p-8 bg-slate-900/80 backdrop-blur-sm border border-${job.colorClass}/30 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-${job.colorClass}/20 transition-all duration-300 hover:-translate-y-1`}>
                <div className="flex flex-col md:flex-row gap-4">
                  
                  {/* Icon + Connector */}
                  <div className="relative flex flex-col items-center">
                    {/* Job Icon */}
                    <div className={`w-14 h-14 rounded-lg bg-${job.colorClass}/10 flex items-center justify-center shrink-0 z-10 shadow-inner animate-pulse-glow`}>
                      <Briefcase className={`text-${job.colorClass}`} />
                    </div>

                    {/* Timeline Connector (except for last item) */}
                    {index < EXPERIENCE.length - 1 && (
                      <div className="w-1 bg-gradient-to-b from-primary/70 to-transparent absolute top-14 bottom-[-3rem] rounded-full" style={{ boxShadow: '0 0 8px rgba(124, 58, 237, 0.4)' }}></div>
                    )}
                  </div>

                  {/* Job Details */}
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold font-poppins text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">{job.title}</h3>
                      <span className={`text-sm text-${job.colorClass} font-medium px-3 py-1 rounded-full bg-${job.colorClass}/10 inline-block mt-2 md:mt-0`}>{job.period}</span>
                    </div>
                    
                    <p className="text-base text-slate-300 font-medium mb-4">{job.company}</p>
                    {job.description && (
                      <p className="text-base text-slate-400 mb-5 leading-relaxed">{job.description}</p>
                    )}

                    {/* Skills */}
                    {job.skills?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="outline"
                            className={`bg-${job.colorClass}/10 border-${job.colorClass}/30 text-slate-300 px-3 py-1 text-sm hover:bg-${job.colorClass}/20 transition-colors duration-300 hover:-translate-y-1 transform`}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
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