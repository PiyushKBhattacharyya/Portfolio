import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';

// Component for displaying the profile image
function ProfileImage() {
  return (
    <img
      src="/images/profile.png"
      alt="Piyush Kaushik Bhattacharyya"
      className="rounded-full border-4 border-primary/30 shadow-xl shadow-primary/20"
      width={300}
      height={300}
    />
  );
}

export default function Hero() {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Effect to add a bouncing animation to the scroll indicator
  useEffect(() => {
    const element = scrollIndicatorRef.current;
    if (!element) return;

    const bounceKeyframes = [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-20px)' },
      { transform: 'translateY(0)' },
    ];

    const bounceOptions: KeyframeAnimationOptions = {
      duration: 2000,
      iterations: Infinity,
      easing: 'ease-in-out',
    };

    const bounceAnimation = element.animate(bounceKeyframes, bounceOptions);

    return () => {
      bounceAnimation.cancel();
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative">
      <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
        {/* Text and description section */}
        <motion.div
          className="md:w-1/2 text-center md:text-left mb-10 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4">
            Hi, I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">
              Piyush Kaushik Bhattacharyya
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 animate-gradient-shift">
            ML Engineer & Full Stack Developer
          </h2>
          <p className="text-lg md:text-xl text-slate-300/90 mb-8 max-w-lg">
            Crafting innovative AI solutions and immersive digital experiences
            with cutting-edge web technologies.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <motion.a
              href="#projects"
              className="px-8 py-3 rounded-full border-2 border-primary text-white hover:bg-primary/20 font-bold transition-all"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
          </div>
          <div className="flex justify-center md:justify-start space-x-4 mt-8">
            {/* Social media icons */}
            <motion.a
              href="https://github.com/PiyushKBhattacharyya"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-2xl hover:text-primary transition-colors"
              aria-label="GitHub"
              whileHover={{ y: -5, color: '#6366F1' }}
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/piyush-bhattacharyya-0b8a03131/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-2xl hover:text-primary transition-colors"
              aria-label="LinkedIn"
              whileHover={{ y: -5, color: '#6366F1' }}
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href="mailto:piyushbhattacharyya@gmail.com"
              className="p-2 text-2xl hover:text-primary transition-colors"
              aria-label="Email"
              whileHover={{ y: -5, color: '#6366F1' }}
            >
              <Mail size={24} />
            </motion.a>
          </div>
        </motion.div>

        {/* Profile image section */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-pink-500/30 blur-3xl"></div>
            <div className="relative z-10">
              <ProfileImage />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-slate-300/50"
      >
        <ChevronDown size={24} />
      </div>
    </section>
  );
}