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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold font-poppins mb-4">
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-pink-500 mx-auto"></div>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            My professional journey so far
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="max-w-4xl mx-auto space-y-10">
          {EXPERIENCE.map((job, index) => (
            <motion.div 
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <TiltCard className={`p-6 bg-slate-900/80 backdrop-blur-sm border border-${job.colorClass}/20 rounded-xl shadow-lg`}>
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Job Icon */}
                  <div className={`w-12 h-12 rounded-lg bg-${job.colorClass}/10 flex items-center justify-center shrink-0`}>
                    <Briefcase className={`text-${job.colorClass}`} />
                  </div>

                  {/* Job Details */}
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="text-xl font-bold font-poppins">{job.title}</h3>
                      <span className={`text-sm text-${job.colorClass} font-medium`}>{job.period}</span>
                    </div>
                    
                    <p className="text-base text-slate-300 mb-4">{job.company}</p>
                    <p className="text-base text-slate-400 mb-4">{job.description}</p>
                    
                    {/* Skills List */}
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, skillIndex) => (
                        <Badge 
                          key={skillIndex} 
                          variant="outline" 
                          className={`bg-${job.colorClass}/10 border-${job.colorClass}/30 text-slate-300`}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* Timeline Connector (except for last item) */}
              {index < EXPERIENCE.length - 1 && (
                <div className="absolute left-6 top-[4.5rem] bottom-[-2.5rem] w-0.5 bg-gradient-to-b from-primary/50 to-transparent"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}