import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
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

// Helper to format dates for mobile (e.g., "May 2025" -> "05/2025")
const formatMobileDate = (dateString: string) => {
  const months: { [key: string]: string } = {
    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
    'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12',
    'January': '01', 'February': '02', 'March': '03', 'April': '04', 'June': '06',
    'July': '07', 'August': '08', 'September': '09', 'October': '10', 'November': '11', 'December': '12'
  };

  // Replace all month names with numbers
  return dateString.replace(/\b([a-zA-Z]+)\b/g, (match) => {
    // Check if it's a month name (case insensitive matching if needed, but simple map covers standard cases)
    const monthNum = months[match] || months[match.substring(0, 3)];
    return monthNum ? monthNum + '/' : match;
  }).replace(/ \/ /g, '/').replace(/ (\d{4})/g, '$1'); // clean up spaces if "Month YYYY" -> "MM/ YYYY" -> "MM/YYYY"
};

// More robust formatter specifically for "Month YYYY - Month YYYY" patterns
const getDisplayDate = (originalDate: string, isMobile: boolean) => {
  if (!isMobile) return originalDate;

  // Try to parse "Month YYYY" pattern
  // Example: "May 2025 - Jun 2025"

  const monthMap: { [key: string]: string } = {
    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
    'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
  };

  // Split by " - " or "-"
  const parts = originalDate.split(/\s*-\s*/);

  const formattedParts = parts.map(part => {
    const trimmed = part.trim();
    // Match "Month YYYY" or "Mon YYYY"
    const match = trimmed.match(/^([a-zA-Z]+)\s+(\d{4})$/);
    if (match) {
      const monthStr = match[1].substring(0, 3); // Take first 3 chars
      const year = match[2];
      const monthNum = monthMap[monthStr];
      if (monthNum) {
        return `${monthNum}/${year}`;
      }
    }
    // Return original if no match (e.g. "Present")
    return trimmed;
  });

  return formattedParts.join(' - ');
};


export default function TimelineItem({ award, index, position }: TimelineItemProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getColorClasses = (colorName: string) => {
    switch (colorName) {
      case 'primary':
        return {
          border: 'border-primary/30',
          bg: 'bg-primary/5',
          text: 'text-primary',
          dot: 'border-primary',
          hoverBorder: 'group-hover:border-primary/60'
        };
      case 'secondary':
        return {
          border: 'border-secondary/30',
          bg: 'bg-secondary/5',
          text: 'text-secondary',
          dot: 'border-secondary',
          hoverBorder: 'group-hover:border-secondary/60'
        };
      case 'accent':
        return {
          border: 'border-pink-500/30',
          bg: 'bg-pink-500/5',
          text: 'text-pink-500',
          dot: 'border-pink-500',
          hoverBorder: 'group-hover:border-pink-500/60'
        };
      default:
        return {
          border: 'border-slate-500/30',
          bg: 'bg-slate-500/5',
          text: 'text-slate-500',
          dot: 'border-slate-500',
          hoverBorder: 'group-hover:border-slate-500/60'
        };
    }
  };

  const colorClasses = getColorClasses(award.colorClass);
  const displayDate = getDisplayDate(award.year, isMobile);

  const renderCard = () => (
    <motion.div
      custom={index}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="p-6 max-w-md w-full"
    >
      <TiltCard className={`relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl group transition-all duration-500`}>
        {/* Tech Corners */}
        <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 ${colorClasses.hoverBorder} transition-colors duration-300`} />
        <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 ${colorClasses.hoverBorder} transition-colors duration-300`} />
        <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 ${colorClasses.hoverBorder} transition-colors duration-300`} />
        <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 ${colorClasses.hoverBorder} transition-colors duration-300`} />

        {/* Header Tag */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center justify-center text-xs font-mono font-bold ${colorClasses.text} ${colorClasses.bg} px-4 py-1.5 rounded-full border ${colorClasses.border} min-w-[120px]`}>
            {displayDate}
          </span>
          <div className={`h-px flex-grow mx-4 bg-gradient-to-r from-transparent via-white/10 to-transparent`} />
        </div>

        <h3 className="text-2xl font-bold font-heading mb-2 text-white group-hover:text-glow transition-all duration-300">{award.title}</h3>
        <p className="text-slate-300/80 text-sm font-light leading-relaxed mb-4">
          {award.description}
        </p>

        {award.image && (
          <div className="relative overflow-hidden rounded-md border border-white/10 group-hover:border-white/20 transition-colors">
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <motion.img
              src={award.image}
              alt={award.title}
              className="w-full h-40 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              initial={{ opacity: 0, scale: 1 }}
              whileInView={{ opacity: 1 }}
            />
          </div>
        )}
      </TiltCard>
    </motion.div>
  );

  return (
    <motion.div
      className="relative z-10 mb-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start relative w-full">
        {/* Left Side */}
        <div
          className={`
            order-1 md:order-1 md:w-1/2 w-full
            flex justify-center md:justify-${position === 'left' ? 'end' : 'start'}
            px-0 md:px-12 mb-8 md:mb-0
            text-center md:text-${position === 'left' ? 'right' : 'left'}
          `}
        >
          {position === 'left' && renderCard()}
        </div>

        {/* Center Dot + Shimmer Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center h-full">
          <motion.div
            className={`w-6 h-6 bg-black border-2 ${colorClasses.dot} rounded-full relative z-20 shadow-[0_0_15px_rgba(var(--primary),0.5)]`}
            animate={{ boxShadow: ['0 0 0 rgba(0,0,0,0)', `0 0 20px ${colorClasses.dot.includes('primary') ? '#8000FF' : '#00DDFF'}`] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <div className="absolute inset-0 m-auto w-2 h-2 bg-white rounded-full animate-pulse" />
          </motion.div>
        </div>

        {/* Right Side */}
        <div
          className={`
            order-2 md:order-2 md:w-1/2 w-full
            flex justify-center md:justify-${position === 'right' ? 'start' : 'end'}
            px-0 md:px-12 mb-8 md:mb-0
            text-center md:text-${position === 'right' ? 'left' : 'right'}
          `}
        >
          {position === 'right' && renderCard()}
        </div>
      </div>
    </motion.div>
  );
}