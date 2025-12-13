'use client';

import { motion } from 'framer-motion';
import { Code, Brain, SmartphoneIcon, Server } from 'lucide-react';
import TiltCard from '@/components/ui/tilt-card';
import SkillCard from '@/components/ui/skill-card';

// Skill data
const skillsData = [
  {
    icon: <Code size={26} />,
    title: "Full Stack Development",
    description: "Building responsive and performant web applications using modern frameworks and technologies."
  },
  {
    icon: <Brain size={26} />,
    title: "AI & Machine Learning",
    description: "Developing intelligent solutions with TensorFlow, PyTorch, and natural language processing."
  },
  {
    icon: <SmartphoneIcon size={26} />,
    title: "Responsive Design",
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
            className="inline-block mb-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
          >
            About Me
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4 tracking-tight">
            Getting to Know <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">Me</span>
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
            <TiltCard className="h-full bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 hover:border-primary/30 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-6 text-white">Who I Am</h3>
              <div className="space-y-6 text-slate-300 leading-relaxed">
                <p>
                  I'm a final year Computer Science student passionate about <span className="text-primary font-medium">machine learning</span> and <span className="text-primary font-medium">full stack development</span>. I enjoy building intelligent, user-centric software that solves real-world problems.
                </p>
                <p>
                  I started my tech journey in college and have been deeply exploring AI/ML and scalable systems ever since. My projects combine innovation, design, and practical utility.
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 pt-10 border-t border-white/10">
                {[
                  { label: "Education", value: "B.Tech in Computer Science" },
                  { label: "Experience", value: "1 Year" },
                  { label: "Location", value: "Guwahati, India" },
                  { label: "Languages", value: "English, Hindi, Assamese" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-black/20 p-4 rounded-xl border border-white/5">
                    <h4 className="text-sm font-medium text-primary mb-1">{item.label}</h4>
                    <p className="text-slate-200 font-medium">{item.value}</p>
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