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
  const [theme, setTheme] = useState('night');
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
      href: 'https://drive.google.com/file/d/1kSmi8De4tkFkRDrg-S_gzT1xqR6UyvMO/view?usp=sharing',
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
          <nav
            ref={containerRef}
            className={cn(
              'fixed top-4 left-1/2 -translate-x-1/2 z-50',
              'flex gap-4 px-6 py-2 rounded-full',
              'backdrop-blur-md bg-black/40 hover:bg-black/60',
              'shadow-lg border border-white/10 transition-all duration-300 cursor-default select-none'
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
                        'p-2 rounded-md text-white flex flex-col items-center cursor-default select-none',
                        isActive ? 'text-pink-400' : 'text-white/70'
                      )}
                    >
                      {icon}
                      {isActive && (
                        <span className="w-full h-[3px] bg-gradient-to-r from-primary to-pink-500 mt-1 rounded-full cursor-default select-none" />
                      )}
                    </motion.a>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="text-sm bg-black/80 text-white px-3 py-1 rounded-md"
                  >
                    {label}
                  </TooltipContent>
                </Tooltip>
              );
            })}

            {/* Theme Toggle */}
            <motion.button onClick={toggleTheme} className="p-2 rounded-md text-white">
              {theme === 'night' ? (
                <Moon className="w-6 h-6 text-purple-300" />
              ) : (
                <Sun className="w-6 h-6 text-yellow-300" />
              )}
            </motion.button>
          </nav>
        </TooltipProvider>
      )}

      {/* Mobile Bottom Nav */}
      {isMobile && (
        <nav className="cursor-default select-none fixed bottom-0 left-0 w-full z-50 bg-black/60 backdrop-blur-xl border-t border-white/10 flex justify-center py-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="text-white p-2 rounded-xl hover:bg-white/10 transition"
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </nav>
      )}

      {/* Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" cursor-default select-none fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex"
            onClick={() => setDrawerOpen(false)}
          >
            <motion.div
              key="drawer-content"
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: 'spring', damping: 22, stiffness: 180 }}
              className="w-64 bg-black/80 border-r border-white/10 p-6 flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="cursor-default select-none text-white mb-4 self-end p-2 rounded-lg hover:bg-white/10"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-7 h-7" />
              </button>

              {navItems.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setDrawerOpen(false)}
                  className="cursor-default select-none flex items-center gap-3 text-white text-lg p-2 rounded-xl hover:bg-white/10 transition"
                >
                  {icon}
                  {label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particle Background */}
      <ParticleBackground theme={theme} interaction />
    </>
  );
}
