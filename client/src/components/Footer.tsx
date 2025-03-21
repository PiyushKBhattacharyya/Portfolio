import { ArrowUp } from 'lucide-react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-12 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold font-poppins text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">
              Piyush Kaushik Bhattacharyya
            </h2>
          </div>
          
          <div className="flex space-x-6 mb-6 md:mb-0">
            <motion.a 
              href="https://github.com/PiyushKBhattacharyya"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xl text-slate-300 hover:text-primary transition-colors" 
              aria-label="GitHub"
              whileHover={{ y: -5, color: '#6366F1' }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/piyush-bhattacharyya-0b8a03131/"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xl text-slate-300 hover:text-primary transition-colors" 
              aria-label="LinkedIn"
              whileHover={{ y: -5, color: '#6366F1' }}
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a 
              href="mailto:piyushbhattacharyya@gmail.com"
              className="text-xl text-slate-300 hover:text-primary transition-colors" 
              aria-label="Email"
              whileHover={{ y: -5, color: '#6366F1' }}
            >
              <Mail size={20} />
            </motion.a>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button 
              onClick={scrollToTop}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/40 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="text-primary" size={18} />
            </button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
