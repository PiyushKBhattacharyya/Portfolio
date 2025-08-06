import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-50 bg-primary/10 backdrop-blur-md border-t border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center space-y-6 text-center">
        
        {/* Name with your preferred gradient */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold font-poppins text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 tracking-tight">
          Piyush Kaushik Bhattacharyya
        </h2>

        {/* Social Icons with motion and color preference */}
        <div className="flex space-x-6">
          {[{
            href: "https://github.com/PiyushKBhattacharyya",
            label: "GitHub",
            icon: <Github size={20} />,
          }, {
            href: "https://www.linkedin.com/in/piyush-bhattacharyya-0b8a03131/",
            label: "LinkedIn",
            icon: <Linkedin size={20} />,
          }, {
            href: "mailto:piyushbhattacharyya@gmail.com",
            label: "Email",
            icon: <Mail size={20} />,
          }].map(({ href, label, icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-slate-300 hover:text-primary transition-colors"
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {icon}
            </motion.a>
          ))}
        </div>

        {/* Scroll to Top Button with glassmorphic feel */}
        <motion.button
          onClick={handleScrollToTop}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
          className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-colors p-2"
        >
          <ArrowUp className="text-primary" size={18} />
        </motion.button>

        {/* Optional footer text */}
        <p className="text-xs text-slate-400 font-light tracking-tight">
          © {new Date().getFullYear()} Piyush K. Bhattacharyya — All rights reserved.
        </p>
      </div>
    </footer>
  );
}