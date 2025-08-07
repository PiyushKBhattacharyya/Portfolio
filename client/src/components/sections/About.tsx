'use client';

import { motion } from 'framer-motion';
import { Code, Cpu, Brain, SmartphoneIcon, Server } from 'lucide-react';
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
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 cursor-default select-none"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">Me</span>
          </h2>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-primary to-pink-500 rounded-full"></div>
        </motion.div>

        {/* Grid Layout */}
        <div className="flex flex-col lg:flex-row items-start lg:items-stretch gap-8 px-5 py-5 lg:px-20 lg:py-20 cursor-default select-none">
          {/* Left Column: Info Card */}
          <motion.div
            className="lg:w-1/2 cursor-default select-none"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/30 to-pink-500/20 blur-lg"></div>
              <TiltCard className="relative bg-slate-900/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-slate-800">
                <h3 className="text-2xl font-semibold mb-4 text-white">Who I Am</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  I'm a final year Computer Science student passionate about <span className="text-primary font-medium">machine learning</span> and <span className="text-primary font-medium">full stack development</span>. I enjoy building intelligent, user-centric software that solves real-world problems.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  I started my tech journey in college and have been deeply exploring AI/ML and scalable systems ever since. My projects combine innovation, design, and practical utility.
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                  {[
                    { label: "Education", value: "B.Tech in Computer Science" },
                    { label: "Experience", value: "1 Year" },
                    { label: "Location", value: "Guwahati, India" },
                    { label: "Languages", value: "English, Hindi, Assamese" }
                  ].map((item, idx) => (
                    <div key={idx}>
                      <h4 className="text-sm font-medium text-primary mb-1">{item.label}</h4>
                      <p className="text-slate-300 text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </div>
          </motion.div>

          {/* Right Column: Skills */}
          <motion.div
            className="lg:w-1/2 cursor-default select-none"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 cursor-default select-none">
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