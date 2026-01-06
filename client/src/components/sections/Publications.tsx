'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Users, BookOpen } from 'lucide-react';
import { publications } from '@/lib/constants';
import TiltCard from '@/components/ui/tilt-card';

// Detect if device is mobile
const isMobile = typeof window !== 'undefined' &&
  (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768);


export default function Publications() {
  const [selectedPublication, setSelectedPublication] = useState<number | null>(null);

  return (
    <section id="publications" className="py-24 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-20 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="inline-block mb-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono tracking-wider"
          >
            RESEARCH_LOGS
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
            Recent <span className="text-gradient-quantum">Publications</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
            Contributions to academic research in Machine Learning and AI.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.doi}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TiltCard
                className="group relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-primary/40 transition-all duration-300 shadow-xl overflow-hidden"
                onClick={() => setSelectedPublication(selectedPublication === index ? null : index)}
              >
                {/* Tech Corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-primary/60 transition-colors" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-primary/60 transition-colors" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-primary/60 transition-colors" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-primary/60 transition-colors" />

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                <div className="flex flex-col lg:flex-row gap-8 relative z-10 text-center md:text-left">
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 mb-4">
                      <h3 className="text-xl md:text-2xl font-bold font-heading text-white group-hover:text-glow-cyan transition-all duration-300 leading-tight">
                        {pub.title}
                      </h3>
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all hidden md:block"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={20} />
                      </a>
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all md:hidden mx-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-400 mb-6 font-mono">
                      <span className="flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10">
                        <Users size={14} className="text-primary" />
                        {pub.authors.join(', ')}
                      </span>
                      <span className="flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10">
                        <BookOpen size={14} className="text-pink-500" />
                        {pub.conference}
                      </span>
                      <span className="flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10">
                        <Calendar size={14} className="text-secondary" />
                        {pub.year}
                      </span>
                    </div>

                    <p className="text-slate-300 font-light leading-relaxed border-l-0 md:border-l-2 border-white/10 pl-0 md:pl-4">
                      {pub.abstract}
                    </p>
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