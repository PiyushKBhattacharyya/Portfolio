import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TechIconProps {
  name: string;
  icon: ReactNode;
  proficiency: number;
  index: number;
}

export default function TechIcon({ name, icon, proficiency, index }: TechIconProps) {
  return (
    <motion.div 
      className="group flex flex-col items-center p-6 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-primary/10 hover:border-primary/30"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, rotateY: 10 }}
    >
      <div className="w-16 h-16 flex items-center justify-center mb-4 relative">
        <div className="absolute inset-0 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-all"></div>
        <div className="text-primary/80 group-hover:text-primary transition-colors">
          {icon}
        </div>
      </div>
      <h3 className="text-center text-lg font-poppins font-medium">{name}</h3>
      <div className="mt-2 w-full bg-slate-800/50 rounded-full h-1.5">
        <div 
          className="bg-gradient-to-r from-primary to-purple-500 h-1.5 rounded-full"
          style={{ width: `${proficiency}%` }}
        ></div>
      </div>
    </motion.div>
  );
}
