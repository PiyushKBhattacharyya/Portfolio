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
        duration: isMobileDevice ? 2500 : 2000,
        iterations: Infinity,
        easing: 'ease-in-out',
        composite: 'replace',
        fill: 'both'
      }
    );

    const handleVisibilityChange = () => {
      if (document.hidden) {
        bounce.playbackRate = 0.1;
      } else {
        bounce.playbackRate = 1;
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
      {/* Quantum Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[128px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-6 md:px-20 py-2 flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-20 relative z-10">

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
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-primary/20 backdrop-blur-md shadow-[0_0_15px_-5px_rgba(139,92,246,0.3)]"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-sm font-mono text-primary-foreground/90 tracking-wide">
              SYSTEM_ONLINE
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-heading mb-6 leading-tight tracking-tight">
            Hi, I'm <br />
            <span className="text-gradient-quantum filter drop-shadow-lg">
              Piyush Kaushik Bhattacharyya
            </span>
          </h1>

          <h2 className="text-2xl sm:text-3xl font-light font-mono text-slate-300 mb-8 flex flex-col md:block gap-2">
            <span className="text-glow-cyan text-secondary font-semibold">&lt;ML_Engineer / &gt;</span>
            <span className="hidden md:inline mx-3 text-slate-600">|</span>
            <span className="text-slate-400">Full_Stack_Dev</span>
          </h2>

          <p className="text-lg text-slate-400 mb-6 max-w-xl mx-auto md:mx-0 leading-relaxed font-sans">
            Architecting intelligent AI solutions and immersive digital experiences.
            Bridging the gap between <span className="text-white font-medium">complex algorithms</span> and <span className="text-white font-medium">fluid interfaces</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <motion.a
              href="#projects"
              className="px-8 py-4 rounded-xl bg-primary text-white font-mono font-bold tracking-wide shadow-[0_0_20px_-5px_var(--primary)] hover:shadow-[0_0_30px_-5px_var(--primary)] hover:bg-primary/90 transition-all flex items-center group relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="z-10 relative flex items-center">
                VIEW_PROJECTS
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </motion.a>

            <motion.a
              href="#contact"
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-mono font-medium hover:bg-white/10 hover:border-primary/50 backdrop-blur-md transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              CONTACT_ME
            </motion.a>
          </div>

          <div className="flex justify-center md:justify-start gap-6 mt-6">
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

        {/* Profile Image Area - Quantum Frame */}
        <motion.div
          className="w-full md:w-2/5 flex justify-center perspective-1000"
          initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative w-72 h-72 md:w-[400px] md:h-[400px] group preserve-3d">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary via-purple-500 to-secondary rounded-[2rem] blur-[60px] opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

            <div className="relative w-full h-full rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-sm p-3 animate-float-slow">

              {/* Corner Accents */}
              <div className="absolute -top-[1px] -left-[1px] w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-2xl" />
              <div className="absolute -bottom-[1px] -right-[1px] w-8 h-8 border-b-2 border-r-2 border-secondary rounded-br-2xl" />

              <div className="w-full h-full rounded-[1.5rem] overflow-hidden border border-white/5 shadow-2xl relative bg-black/50">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
                <ProfileImage />
              </div>
            </div>

            {/* Floating Tech Elements */}
            <motion.div
              className="absolute -top-6 -right-6 p-4 bg-black/80 backdrop-blur-xl border border-primary/30 rounded-xl shadow-[0_0_15px_-5px_rgba(128,0,255,0.4)] z-20 flex items-center gap-2"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-primary-foreground">AI_Ready</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-6 p-4 bg-black/80 backdrop-blur-xl border border-secondary/30 rounded-xl shadow-[0_0_15px_-5px_rgba(0,221,255,0.4)] z-20"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <span className="text-xl">⚡</span>
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
        <div className="w-[20px] h-[36px] rounded-full border-2 border-white/20 flex justify-center p-1.5 backdrop-blur-sm">
          <motion.div
            className="w-1 h-1 bg-secondary rounded-full shadow-[0_0_10px_var(--secondary)]"
            animate={{ y: [0, 16, 0] }}
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
