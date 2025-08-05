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

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

export default function TimelineItem({ award, index, position }: TimelineItemProps) {
  const getColorClasses = (colorName: string) => {
    switch (colorName) {
      case 'primary':
        return {
          border: 'border-blue-500/30',
          bg: 'bg-blue-500/10',
          text: 'text-blue-500',
          dot: 'border-blue-500'
        };
      case 'secondary':
        return {
          border: 'border-purple-500/30',
          bg: 'bg-purple-500/10',
          text: 'text-purple-500',
          dot: 'border-purple-500'
        };
      case 'accent':
        return {
          border: 'border-pink-500/30',
          bg: 'bg-pink-500/10',
          text: 'text-pink-500',
          dot: 'border-pink-500'
        };
      default:
        return {
          border: 'border-slate-500/30',
          bg: 'bg-slate-500/10',
          text: 'text-slate-500',
          dot: 'border-slate-500'
        };
    }
  };

  const colorClasses = getColorClasses(award.colorClass);

  const renderCard = () => (
    <motion.div
      custom={index}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="p-6 max-w-sm"
    >
      <TiltCard className={`relative bg-slate-900/60 backdrop-blur-lg border ${colorClasses.border} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500`}>
        <div className="absolute -top-2 -left-2 w-10 h-10 bg-white/10 backdrop-blur-lg rounded-full blur-xl" />
        <span className={`text-xs ${colorClasses.text} font-semibold ${colorClasses.bg} px-3 py-1 rounded-full`}>
          {award.year}
        </span>
        <h3 className="text-2xl font-bold font-poppins mt-3 mb-2 text-white drop-shadow">{award.title}</h3>
        <p className="text-slate-300/90 text-sm leading-relaxed mb-3">
          {award.description}
        </p>
        {award.image && (
          <motion.img
            src={award.image}
            alt={award.title}
            className="rounded-md w-full shadow-lg hover:scale-[1.03] transition-transform duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
        )}
      </TiltCard>
    </motion.div>
  );

  return (
    <motion.div
      className="relative z-10 mb-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start relative">
        {/* Left Side */}
        <div className={`order-1 md:order-1 md:w-1/2 ${position === 'left' ? 'pr-8 md:text-right' : 'pr-8'} mb-8 md:mb-0`}>
          {position === 'left' && renderCard()}
        </div>

        {/* Center Dot + Shimmer Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <motion.div
            className={`w-8 h-8 bg-slate-900 border-2 ${colorClasses.dot} rounded-full relative z-20`}
            animate={{ boxShadow: ['0 0 0 rgba(0,0,0,0)', `0 0 12px ${colorClasses.dot.split('-')[1]}`] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          />
          <div className="w-1 h-20 bg-gradient-to-b from-transparent via-slate-500/20 to-transparent" />
        </div>

        {/* Right Side */}
        <div className={`order-2 md:order-2 md:w-1/2 ${position === 'right' ? 'pl-8 md:text-left' : 'pl-8'} mb-8 md:mb-0`}>
          {position === 'right' && renderCard()}
        </div>
      </div>
    </motion.div>
  );
}