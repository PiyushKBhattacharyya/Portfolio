import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SkillCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export default function SkillCard({ icon, title, description, delay = 0 }: SkillCardProps) {
  // Define a list of border and icon background colors to cycle through
  const colorClasses = [
    { border: "border-primary/20 hover:border-primary/60", bg: "bg-primary/10" },
    { border: "border-purple-500/20 hover:border-purple-500/60", bg: "bg-purple-500/10" },
    { border: "border-pink-500/20 hover:border-pink-500/60", bg: "bg-pink-500/10" },
    { border: "border-blue-400/20 hover:border-blue-400/60", bg: "bg-blue-400/10" }
  ];
  
  // Pick a color based on the title (stable selection)
  const colorIndex = title.charCodeAt(0) % colorClasses.length;
  const colors = colorClasses[colorIndex];
  
  return (
    <motion.div
      className={`bg-slate-900/80 backdrop-blur-sm p-6 rounded-xl border ${colors.border} transition-all shadow-lg flex flex-col items-center`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className={`w-16 h-16 flex items-center justify-center rounded-full ${colors.bg} mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-poppins font-semibold mb-2">{title}</h3>
      <p className="text-slate-300/80 text-center text-sm">
        {description}
      </p>
    </motion.div>
  );
}
