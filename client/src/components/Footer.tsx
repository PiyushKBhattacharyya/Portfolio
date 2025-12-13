import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center space-y-8">

        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Let's <span className="text-gradient-primary">Connect</span>
          </h2>
          <p className="text-slate-400 text-center max-w-md">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
        </div>

        <div className="flex gap-6">
          {[
            {
              href: "https://github.com/PiyushKBhattacharyya",
              label: "GitHub",
              icon: <Github size={22} />,
            },
            {
              href: "https://www.linkedin.com/in/piyush-bhattacharyya-0b8a03131/",
              label: "LinkedIn",
              icon: <Linkedin size={22} />,
            },
            {
              href: "mailto:piyushbhattacharyya@gmail.com",
              label: "Email",
              icon: <Mail size={22} />,
            }
          ].map(({ href, label, icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {icon}
            </motion.a>
          ))}
        </div>

        <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col items-center gap-6">
          <motion.a
            href="#home"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all animate-bounce"
          >
            <ArrowUp size={20} />
          </motion.a>

          <p className="text-sm text-slate-500 font-medium">
            © {new Date().getFullYear()} Piyush K. Bhattacharyya. Crafted with <span className="text-red-500">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
}