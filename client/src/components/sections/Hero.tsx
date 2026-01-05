'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, ChevronDown } from 'lucide-react';

// Detect if device is mobile
const isMobile = typeof window !== 'undefined' &&
  (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768);

function ProfileImage() {
  return (
    <img
      src="/profile.png"
      alt="Piyush Kaushik Bhattacharyya"
      className="w-full h-full object-cover"
      width={400}
      height={400}
      loading="eager"
    />
  );
}

export default function Hero() {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Detect if device is mobile for component-level optimizations
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    // Set mobile state after component mounts to avoid hydration issues
    setIsMobileDevice(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768
    );

    const element = scrollIndicatorRef.current;
    if (!element) return;

    // Optimize animation for mobile
    const bounce = element.animate(
      [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-16px)' },
        { transform: 'translateY(0)' },
      ],
      {
        duration: isMobileDevice ? 2500 : 2000, // Slightly slower on mobile for better performance
        iterations: Infinity,
        easing: 'ease-in-out',
        composite: 'replace',
        fill: 'both'
      }
    );

    // Reduce animation workload when tab is not visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        bounce.playbackRate = 0.1; // Slow down when not visible
      } else {
        bounce.playbackRate = 1; // Normal speed when visible
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      bounce.cancel();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isMobileDevice]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-purple-500/30 blur-3xl rounded-full animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-6 md:px-20 py-20 flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-20 relative z-10">

        {/* Text Section */}
        <motion.div
          className="w-full md:w-3/5 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <span className="text-sm font-medium text-primary-foreground/80">
              Passionate about Innovation
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-heading mb-6 leading-tight tracking-tight">
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-300 to-pink-300 animate-gradient-shift filter drop-shadow-lg">
              Piyush Kaushik Bhattacharyya
            </span>
          </h1>

          <h2 className="text-2xl sm:text-3xl font-light font-sans text-slate-300 mb-8 flex flex-col md:block gap-2">
            <span className="font-semibold text-white">ML Engineer</span>
            <span className="hidden md:inline mx-3 text-slate-500">•</span>
            <span className="text-slate-400">Full Stack Developer</span>
          </h2>

          <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed font-sans">
            Crafting intelligent AI solutions and immersive digital experiences that push the boundaries of what's possible on the web.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <motion.a
              href="#projects"
              className="px-8 py-4 rounded-full bg-primary text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:bg-primary/90 transition-all flex items-center group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>

            <motion.a
              href="#contact"
              className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 backdrop-blur-md transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </div>

          <div className="flex justify-center md:justify-start gap-6 mt-12">
            <SocialIcon
              href="https://github.com/PiyushKBhattacharyya"
              label="GitHub"
              icon={<Github size={24} />}
            />
            <SocialIcon
              href="https://www.linkedin.com/in/piyush-bhattacharyya-0b8a03131/"
              label="LinkedIn"
              icon={<Linkedin size={24} />}
            />
            <SocialIcon
              href="mailto:piyushbhattacharyya@gmail.com"
              label="Email"
              icon={<Mail size={24} />}
            />
          </div>
        </motion.div>

        {/* Profile Image Area */}
        <motion.div
          className="w-full md:w-2/5 flex justify-center perspective-1000"
          initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative w-72 h-72 md:w-[400px] md:h-[400px] group preserve-3d">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-500 rounded-full blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

            <div className="relative w-full h-full rounded-full border-2 border-white/10 bg-black/50 backdrop-blur-sm p-4 animate-float-slow">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <ProfileImage />
              </div>
            </div>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-10 -right-10 p-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl z-20"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-2xl">🚀</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-5 -left-5 p-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl z-20"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <span className="text-2xl">⚡</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="w-[30px] h-[50px] rounded-full border-2 border-slate-500 flex justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-slate-300 rounded-full"
            animate={{ y: [0, 24, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

// Reusable Social Icon component
function SocialIcon({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  // Detect if device is mobile
  const isMobile = typeof window !== 'undefined' &&
    (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 text-xl hover:text-primary transition-all duration-300 hover:shadow-md hover:shadow-primary/20 rounded-full"
      aria-label={label}
      whileHover={{ y: isMobile ? -2 : -4 }} // Reduced animation on mobile
      transition={{
        type: "spring",
        stiffness: isMobile ? 400 : 300, // Stiffer springs on mobile for faster animations
        damping: isMobile ? 25 : 20 // More damping on mobile for less oscillation
      }}
      style={{
        willChange: "transform", // Hint for hardware acceleration
        transform: "translateZ(0)" // Force hardware acceleration
      }}
    >
      {icon}
    </motion.a>
  );
}
