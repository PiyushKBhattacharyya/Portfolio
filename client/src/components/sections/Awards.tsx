import { motion } from 'framer-motion';
import TimelineItem from '@/components/ui/timeline-item';
import { AWARDS } from '@/lib/constants';

export default function Awards() {
  return (
    <section id="awards" className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold font-poppins mb-4">
            Awards & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-pink-500 mx-auto"></div>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Recognition and accolades received throughout my professional journey.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-purple-500 to-pink-500"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            ></motion.div>
            
            {AWARDS.map((award, index) => (
              <TimelineItem
                key={index}
                award={award}
                index={index}
                position={index % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}