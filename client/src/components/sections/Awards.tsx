import { motion } from 'framer-motion';
import TimelineItem from '@/components/ui/timeline-item';
import { AWARDS } from '@/lib/constants';

export default function Awards() {
  return (
    <section id="awards" className="min-h-screen py-24 relative">
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
            Honors
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6 tracking-tight">
            Awards & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">Achievements</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Recognition of my technical expertise and competitive programming achievements.
          </p>
        </motion.div>

        {/* Timeline Section */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">

            {/* Timeline Line */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-primary via-purple-500 to-transparent"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            ></motion.div>

            {/* Awards List */}
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