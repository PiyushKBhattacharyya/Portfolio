import { motion } from 'framer-motion';
import TechGlobe from '@/components/canvas/TechGlobe';
import { TECH_STACK } from '@/lib/constants';
import { SiReact, SiNodedotjs, SiJavascript, SiPython, SiTensorflow, SiPytorch, SiMongodb, SiDocker, SiGit } from 'react-icons/si';

export default function TechStack() {
  // Map of tech names to icon components (for legend)
  const techIcons: Record<string, React.ReactNode> = {
    "React": <SiReact className="text-[#61DAFB] h-6 w-6" />,
    "Node.js": <SiNodedotjs className="text-[#539E43] h-6 w-6" />,
    "JavaScript": <SiJavascript className="text-[#F7DF1E] h-6 w-6" />,
    "Python": <SiPython className="text-[#3776AB] h-6 w-6" />,
    "TensorFlow": <SiTensorflow className="text-[#FF6F00] h-6 w-6" />,
    "PyTorch": <SiPytorch className="text-[#EE4C2C] h-6 w-6" />,
    "MongoDB": <SiMongodb className="text-[#47A248] h-6 w-6" />,
    "Docker": <SiDocker className="text-[#2496ED] h-6 w-6" />,
    "Git": <SiGit className="text-[#F05032] h-6 w-6" />
  };
  
  return (
    <section id="techstack" className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold font-poppins mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">Tech Stack</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-pink-500 mx-auto"></div>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Technologies I've mastered throughout my development journey
          </p>
        </motion.div>
        
        {/* 3D Globe with Orbiting Tech Icons */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <TechGlobe />
        </motion.div>
        
        {/* Tech Stack Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6"
        >
          <h3 className="text-xl font-semibold mb-4 text-center">Technologies I Work With</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {TECH_STACK.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0">
                  {techIcons[tech.name]}
                </div>
                <span className="text-sm md:text-base text-slate-200">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}