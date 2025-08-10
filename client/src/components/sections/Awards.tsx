import { motion } from 'framer-motion';
import TimelineItem from '@/components/ui/timeline-item';
import { AWARDS } from '@/lib/constants';

export default function Awards() {
  return (
    <section id="awards" className="min-h-screen py-20">
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
            Awards & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 animate-gradient-shift">Achievements</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-primary to-pink-500 mx-auto rounded-full animate-pulse-glow"></div>
          <p className="mt-6 text-lg text-slate-300/90 max-w-2xl mx-auto leading-relaxed">
            Recognition and accolades received throughout my professional journey.
          </p>
        </motion.div>
        
        {/* Timeline Section */}
        <div className="max-w-4xl mx-auto cursor-default select-none">
          <div className="relative">
            
            {/* Timeline Line Animation */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-1.5 bg-gradient-to-b from-primary via-purple-500 to-pink-500 cursor-default select-none rounded-full"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              style={{ boxShadow: '0 0 15px rgba(124, 58, 237, 0.5)' }}
            ></motion.div>
            
            {/* Mapping over awards to create timeline items */}
            {AWARDS.map((award, index) => (
              <TimelineItem
                key={index}
                award={award}
                index={index}
                position={index % 2 === 0 ? 'left' : 'right'}  // Alternating position for timeline items
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}