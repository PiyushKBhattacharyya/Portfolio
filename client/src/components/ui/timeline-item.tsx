import { motion } from 'framer-motion';
import TiltCard from './tilt-card';

interface AwardProps {
  year: string;
  title: string;
  description: string;
  image?: string;
  colorClass: string; // primary, secondary, accent
}

interface TimelineItemProps {
  award: AwardProps;
  index: number;
  position: 'left' | 'right';
}

export default function TimelineItem({ award, index, position }: TimelineItemProps) {
  // Map color class to actual tailwind classes
  const getColorClasses = (colorName: string) => {
    switch (colorName) {
      case 'primary':
        return {
          border: 'border-primary/20',
          bg: 'bg-primary/10',
          text: 'text-primary',
          dot: 'border-primary'
        };
      case 'secondary':
        return {
          border: 'border-purple-500/20',
          bg: 'bg-purple-500/10',
          text: 'text-purple-500',
          dot: 'border-purple-500'
        };
      case 'accent':
        return {
          border: 'border-pink-500/20',
          bg: 'bg-pink-500/10',
          text: 'text-pink-500',
          dot: 'border-pink-500'
        };
      default:
        return {
          border: 'border-primary/20',
          bg: 'bg-primary/10',
          text: 'text-primary',
          dot: 'border-primary'
        };
    }
  };

  const colorClasses = getColorClasses(award.colorClass);

  return (
    <motion.div
      className="relative z-10 mb-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start">
        {/* Content Left Side */}
        <div className={`order-1 md:order-1 md:w-1/2 ${position === 'left' ? 'pr-8 md:text-right' : 'pr-8'} mb-8 md:mb-0`}>
          {position === 'left' && (
            <div className="md:ml-auto p-6 max-w-sm">
              <TiltCard className={`bg-slate-900/80 backdrop-blur-sm border ${colorClasses.border} rounded-xl shadow-lg`}>
                <span className={`text-xs ${colorClasses.text} font-medium ${colorClasses.bg} px-2 py-1 rounded-full`}>
                  {award.year}
                </span>
                <h3 className="text-xl font-bold font-poppins mt-2 mb-2">{award.title}</h3>
                <p className="text-slate-300/80 text-sm mb-3">
                  {award.description}
                </p>
                {award.image && (
                  <div className="mt-3">
                    <img 
                      src={award.image} 
                      alt={award.title} 
                      className="rounded-md w-full shadow-lg hover:scale-105 transition-transform"
                    />
                  </div>
                )}
              </TiltCard>
            </div>
          )}
        </div>
        
        {/* Center dot */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <div className={`w-8 h-8 bg-slate-900 border-2 ${colorClasses.dot} rounded-full`}></div>
        </div>
        
        {/* Content Right Side */}
        <div className={`order-2 md:order-2 md:w-1/2 ${position === 'right' ? 'pl-8 md:text-left' : 'pl-8'} mb-8 md:mb-0`}>
          {position === 'right' && (
            <div className="md:mr-auto p-6 max-w-sm">
              <TiltCard className={`bg-slate-900/80 backdrop-blur-sm border ${colorClasses.border} rounded-xl shadow-lg`}>
                <span className={`text-xs ${colorClasses.text} font-medium ${colorClasses.bg} px-2 py-1 rounded-full`}>
                  {award.year}
                </span>
                <h3 className="text-xl font-bold font-poppins mt-2 mb-2">{award.title}</h3>
                <p className="text-slate-300/80 text-sm mb-3">
                  {award.description}
                </p>
                {award.image && (
                  <div className="mt-3">
                    <img 
                      src={award.image} 
                      alt={award.title} 
                      className="rounded-md w-full shadow-lg hover:scale-105 transition-transform"
                    />
                  </div>
                )}
              </TiltCard>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
