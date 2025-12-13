'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Users, BookOpen } from 'lucide-react';
import { publications } from '@/lib/constants';

// Detect if device is mobile
const isMobile = typeof window !== 'undefined' &&
  (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768);


export default function Publications() {
  const [selectedPublication, setSelectedPublication] = useState<number | null>(null);

  return (
    <section id="publications" className="py-24 relative bg-black/20">
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
            className="inline-block mb-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
          >
            Research
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">Publications</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            My research contributions to Machine Learning and Artificial Intelligence conferences.
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
              <div
                className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-primary/40 transition-all duration-300 hover:bg-white/10"
                onClick={() => setSelectedPublication(selectedPublication === index ? null : index)}
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
                        {pub.title}
                      </h3>
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 p-2 rounded-full bg-white/5 text-slate-400 hover:bg-primary hover:text-white transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-6">
                      <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/20">
                        <Users size={14} className="text-primary" />
                        {pub.authors.join(', ')}
                      </span>
                      <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/20">
                        <BookOpen size={14} className="text-pink-500" />
                        {pub.conference}
                      </span>
                      <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/20">
                        <Calendar size={14} className="text-purple-500" />
                        {pub.year}
                      </span>
                    </div>

                    <p className="text-slate-300 leading-relaxed">
                      {pub.abstract}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}