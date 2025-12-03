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
    <section id="publications" className="py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="cursor-default select-none text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
            Publications
          </h2>
          <p className="cursor-default select-none text-lg text-slate-300/90 max-w-2xl mx-auto">
            Research papers published in various Conferences, focusing on machine learning and AI.
          </p>
        </motion.div>

        <div className="space-y-8">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.doi}
              className="cursor-default select-none group relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedPublication(selectedPublication === index ? null : index)}
              style={{
                willChange: "opacity, transform",
                transform: "translateZ(0)"
              }}
            >
              <div className="cursor-default select-none flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <h3 className="cursor-default select-nonetext-xl md:text-2xl font-semibold mb-3 text-white group-hover:text-primary transition-colors">
                    {pub.title}
                  </h3> 
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{pub.authors.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{pub.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{pub.conference}</span>
                    </div>
                  </div>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    {pub.abstract}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg text-primary font-medium transition-colors"
                      aria-label={`Read ${pub.title} on IEEE Xplore`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      IEEE Xplore
                    </a>
                    <span className="px-3 py-2 bg-slate-800/50 rounded-lg text-sm text-slate-400">
                      DOI: {pub.doi}
                    </span>
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