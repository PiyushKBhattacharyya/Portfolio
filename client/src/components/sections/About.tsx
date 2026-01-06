'use client';

import { motion } from 'framer-motion';
import { Code, Brain, SmartphoneIcon, Server } from 'lucide-react';
import TiltCard from '@/components/ui/tilt-card';
import SkillCard from '@/components/ui/skill-card';

// Skill data
const skillsData = [
  {
    icon: <Code size={26} />,
    title: "Full Stack Dev",
    description: "Building responsive and performant web applications using modern frameworks."
  },
  {
    icon: <Brain size={26} />,
    title: "AI & ML",
    description: "Developing intelligent solutions with TensorFlow, PyTorch, and NLP."
  },
  {
    icon: <SmartphoneIcon size={26} />,
    title: "Responsive UX",
    description: "Crafting interfaces that work seamlessly across all devices and screen sizes."
  },
  {
    icon: <Server size={26} />,
    title: "Backend Systems",
    description: "Creating robust and scalable server-side applications and APIs."
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-20 relative z-10">

        {/* Section Header */}
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
            BIO_DATA
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 tracking-tight text-white">
            About <span className="text-gradient-quantum">Me</span>
          </h2>
        </motion.div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left Column: Info Card */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <TiltCard className="h-full bg-black/40 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-300 relative group">
              {/* Tech Corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/10 group-hover:border-primary/50 transition-colors" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/10 group-hover:border-primary/50 transition-colors" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/10 group-hover:border-primary/50 transition-colors" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/10 group-hover:border-primary/50 transition-colors" />

              <h3 className="text-2xl font-bold font-heading mb-6 text-white flex items-center gap-3">
                <span className="text-primary font-mono text-sm">&gt;</span> WHO_AM_I?
              </h3>
              <div className="space-y-6 text-slate-300 font-light leading-relaxed">
                <p>
                  I'm a final-year Computer Science student passionate about <span className="text-primary font-medium">Machine Learning</span> and <span className="text-secondary font-medium">Full Stack Development</span>. I enjoy building intelligent, user-centric software.
                </p>
                <p>
                  My journey involves deep exploration of scalable systems and AI-driven solutions. I combine innovation with practical utility in every project.
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 pt-10 border-t border-white/10">
                {[
                  { label: "EDUCATION", value: "B.Tech CSE" },
                  { label: "EXPERIENCE", value: "1+ Year" },
                  { label: "LOCATION", value: "Guwahati, IN" },
                  { label: "LANGUAGES", value: "En, Hi, As" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/[0.03] p-4 rounded-lg border border-white/5 hover:border-primary/20 transition-colors group/item">
                    <h4 className="text-[10px] font-mono font-bold text-primary/70 mb-1 group-hover/item:text-primary transition-colors">{item.label}</h4>
                    <p className="text-slate-200 font-medium tracking-wide">{item.value}</p>
                  </div>
                ))}
              </div>
            </TiltCard>
          </motion.div>

          {/* Right Column: Skills */}
          <motion.div
            className="lg:w-1/2 flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skillsData.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <SkillCard
                    icon={skill.icon}
                    title={skill.title}
                    description={skill.description}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}