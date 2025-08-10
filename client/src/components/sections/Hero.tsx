'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, ChevronDown } from 'lucide-react';

function ProfileImage() {
  return (
    <img
      src="/profile.png"
      alt="Piyush Kaushik Bhattacharyya"
      className="rounded-full border-4 border-primary/30 shadow-2xl shadow-primary/30"
      width={300}
      height={300}
    />
  );
}

export default function Hero() {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scrollIndicatorRef.current;
    if (!element) return;

    const bounce = element.animate(
      [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-16px)' },
        { transform: 'translateY(0)' },
      ],
      {
        duration: 2000,
        iterations: Infinity,
        easing: 'ease-in-out',
      }
    );

    return () => bounce.cancel();
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 relative"
    >
      <div className="container mx-auto px-20 py-20 flex flex-col-reverse md:flex-row items-center gap-12 cursor-default select-none">
        {/* Text Section */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left cursor-default select-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-poppins mb-4 leading-tight">
            Hi, I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-500 animate-gradient-shift relative">
              Piyush Kaushik Bhattacharyya
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-pink-500 rounded-full transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 mb-8">
            ML Engineer & Full Stack Developer
          </h2>
          <p className="text-base sm:text-lg text-slate-300/90 mb-8 max-w-xl mx-auto md:mx-0">
            Crafting innovative AI solutions and immersive digital experiences
            with cutting-edge web technologies.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <motion.a
              href="#projects"
              className="px-6 sm:px-8 py-3 rounded-full border-2 border-primary text-white hover:bg-primary/20 font-semibold tracking-wide transition-all backdrop-blur-md cursor-default select-none shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/30"
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center">
                <span className="mr-2">View Projects</span>
                <span className="relative top-px">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 transform translate-x-0 group-hover:translate-x-1">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </span>
            </motion.a>
          </div>

          <div className="flex justify-center md:justify-start space-x-5 mt-8">
            {/* Social Icons */}
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

        {/* Profile Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-pink-500/30 blur-2xl animate-pulse" />
            <div className="relative z-10">
              <ProfileImage />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-slate-300/50"
      >
        
      </div>
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
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 text-xl hover:text-primary transition-all duration-300 hover:shadow-md hover:shadow-primary/20 rounded-full"
      aria-label={label}
      whileHover={{ y: -4 }}
    >
      {icon}
    </motion.a>
  );
}
