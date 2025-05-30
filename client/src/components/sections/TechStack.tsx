import { motion } from 'framer-motion';
import TechGlobe from '@/components/canvas/TechGlobe';
import { TECH_STACK } from '@/lib/constants';

export default function TechStack() {
  // List of technologies to be displayed as icons
  const techStack = [
    "typescript", "javascript", "dart", "java", "react", "flutter", "android", "html5", "css3", "nextdotjs",
    "nodedotjs", "express", "postgresql", "vercel", "docker", "git", "github", "visualstudiocode", "androidstudio", "figma",
  ];

  // Mapping technology slugs to their respective icons
  const technologyIcons = techStack.reduce((iconMap, techSlug) => {
    const lowerCaseSlug = techSlug.toLowerCase();
    iconMap[lowerCaseSlug] = (
      <img
        src={`https://cdn.simpleicons.org/${techSlug}/${techSlug}`}
        alt={techSlug}
        className="h-6 w-6"
      />
    );
    return iconMap;
  }, {} as Record<string, React.ReactNode>);

  return (
    <section id="techstack" className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Section Header with Animation */}
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
          className="flex justify-center items-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
        >
          <TechGlobe />
        </motion.div>
        
      </div>
    </section>
  );
}