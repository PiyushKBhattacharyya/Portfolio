'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Home,
  User,
  Folder,
  Download,
  Sun,
  Moon,
  Award,
  ChartSpline,
  BookOpen,
  Cpu,
  Menu,
  X,
} from 'lucide-react';

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import ParticleBackground from './ui/ParticleBackground';

export default function Navbar() {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('');
  const [theme, setTheme] = useState<'night' | 'sunset'>('night');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home', icon: <Home className="w-6 h-6" /> },
    { href: '#about', label: 'About', icon: <User className="w-6 h-6" /> },
    { href: '#projects', label: 'Projects', icon: <Folder className="w-6 h-6" /> },
    { href: '#publications', label: 'Publications', icon: <BookOpen className="w-6 h-6" /> },
    { href: '#awards', label: 'Awards', icon: <Award className="w-6 h-6" /> },
    { href: '#experience', label: 'Experience', icon: <ChartSpline className="w-6 h-6" /> },
    { href: '#techstack', label: 'Tech Stack', icon: <Cpu className="w-6 h-6" /> },
    {
      href: 'https://drive.google.com/file/d/1G9Y_Er-YEh_IRjWI0DCwruWF5k8WY2cJ/view?usp=sharing',
      label: 'Resume',
      icon: <Download className="w-6 h-6" />,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -20% 0px',
      }
    );

    navItems.forEach(item => {
      if (!item.href.startsWith('#')) return;
      const id = item.href.slice(1);
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () =>
    setTheme(prev => (prev === 'night' ? 'sunset' : 'night'));

  return (
    <>
      {/* Desktop Navbar */}
      {!isMobile && (
        <TooltipProvider>
          <motion.nav
            ref={containerRef}
            initial={{ y: -100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn(
              "fixed top-6 left-1/2 z-50",
              "flex gap-2 px-6 py-3 rounded-2xl",
              "bg-black/40 backdrop-blur-xl border border-white/10",
              "shadow-[0_0_20px_rgba(0,0,0,0.2)]",
              "transition-all duration-300"
            )}
          >
            {navItems.map(({ href, label, icon, target, rel }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <Tooltip key={label}>
                  <TooltipTrigger asChild>
                    <motion.a
                      href={href}
                      target={target}
                      rel={rel}
                      className={cn(
                        "relative p-3 rounded-xl transition-all duration-300",
                        "hover:bg-white/5",
                        isActive ? "text-primary" : "text-slate-400 hover:text-white"
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {icon}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-white/5 rounded-xl border border-primary/20"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.a>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    sideOffset={10}
                    className="animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2"
                  >
                    <div className="bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg border border-white/10 shadow-xl backdrop-blur-md">
                      {label}
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}

            <div className="w-[1px] h-8 bg-white/10 mx-2 self-center" />

            <motion.button
              onClick={toggleTheme}
              className="p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </motion.button>
          </motion.nav>
        </TooltipProvider>
      )}

      {/* Mobile Bottom Nav - Glassmorphism */}
      {isMobile && (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-t border-white/10 px-6 py-4 flex justify-between items-center"
        >
          <span className="text-sm font-medium text-white/50">Menu</span>
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-3 rounded-full bg-primary/20 text-primary border border-primary/20 hover:bg-primary/30 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </motion.nav>
      )}

      {/* Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-black/90 border-l border-white/10 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold text-white">Navigation</span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {navItems.map(({ href, label, icon, target }) => (
                  <a
                    key={label}
                    href={href}
                    target={target}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 hover:border-white/10 border border-transparent transition-all"
                  >
                    <span className="p-2 rounded-lg bg-white/5 text-primary">
                      {icon}
                    </span>
                    <span className="text-lg font-medium">{label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ParticleBackground theme={theme} interaction />
    </>
  );
}
