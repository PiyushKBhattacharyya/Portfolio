import { motion } from 'framer-motion';
import { Code, Cpu, Brain, SmartphoneIcon, Server } from 'lucide-react';
import TiltCard from '@/components/ui/tilt-card';
import SkillCard from '@/components/ui/skill-card';

const skills = [
  {
    icon: <Code size={28} />,
    title: "Full Stack Development",
    description: "Building responsive and performant web applications using modern frameworks and technologies."
  },
  {
    icon: <Brain size={28} />,
    title: "AI & Machine Learning",
    description: "Developing intelligent solutions with TensorFlow, PyTorch and natural language processing."
  },
  {
    icon: <SmartphoneIcon size={28} />,
    title: "Responsive Design",
    description: "Crafting interfaces that work seamlessly across all devices and screen sizes."
  },
  {
    icon: <Server size={28} />,
    title: "Backend Systems",
    description: "Developing robust and scalable server-side applications and APIs."
  }
];

export default function About() {
  return (
    <section id="about" className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold font-poppins mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-pink-500 mx-auto"></div>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 to-pink-500/20 blur-lg"></div>
              <TiltCard className="relative bg-slate-900/80 backdrop-blur-sm p-8 rounded-xl shadow-xl">
                <h3 className="text-2xl font-poppins font-bold mb-4">Who I Am</h3>
                <p className="text-slate-300 mb-6">
                  I'm a pre-final year ML Engineer and Full Stack Developer
                  with a passion for AI, machine learning, and modern web technologies. 
                  With a solid foundation in computer science, I love building intelligent solutions that solve real-world problems.
                </p>
                <p className="text-slate-300 mb-6">
                  My tech journey started in college when I got hooked on AI and machine learning.
                  Since then, I've been diving deep into AI/ML and full-stack development,
                  creating systems that blend cutting-edge technology with practical impact.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div>
                    <h4 className="font-poppins font-medium text-primary mb-2">Education</h4>
                    <p className="text-slate-300">B.Tech in Computer Science</p>
                  </div>
                  <div>
                    <h4 className="font-poppins font-medium text-primary mb-2">Experience</h4>
                    <p className="text-slate-300">1 Year</p>
                  </div>
                  <div>
                    <h4 className="font-poppins font-medium text-primary mb-2">Location</h4>
                    <p className="text-slate-300">Guwahati, India</p>
                  </div>
                  <div>
                    <h4 className="font-poppins font-medium text-primary mb-2">Languages</h4>
                    <p className="text-slate-300">English, Hindi, Assamese</p>
                  </div>
                </div>
              </TiltCard>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <SkillCard 
                  key={index}
                  icon={skill.icon}
                  title={skill.title}
                  description={skill.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
