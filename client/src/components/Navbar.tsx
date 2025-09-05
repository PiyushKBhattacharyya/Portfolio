'use client';

import { useEffect, useRef, useState } from 'react';
import { Home, User, Folder, Download, Sun, Moon, Award, ChartSpline } from 'lucide-react';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import ParticleBackground from './ui/ParticleBackground';

const navItems = [
  { href: '#home', label: 'Home', icon: <Home className="w-5 h-5 sm:w-6 sm:h-6" /> },
  { href: '#about', label: 'About', icon: <User className="w-5 h-5 sm:w-6 sm:h-6" /> },
  { href: '#projects', label: 'Projects', icon: <Folder className="w-5 h-5 sm:w-6 sm:h-6" /> },
  {
    href: '#awards',
    label: 'Awards',
    icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" />
    
  },
  {
    href: '#experience',
    label: 'Experience',
    icon: <ChartSpline className="w-5 h-5 sm:w-6 sm:h-6" />
  },
  {
    href: 'https://drive.google.com/file/d/1w06FkQFZ8aBVYeyXH9ENKNYPBGO4WOPo/view?usp=sharing',
    label: 'Resume',
    icon: <Download className="w-5 h-5 sm:w-6 sm:h-6" />,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
];

export default function Navbar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [theme, setTheme] = useState<'night' | 'sunset'>('night');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -20% 0px',
      }
    );

    navItems.forEach((item) => {
      if (!item.href.startsWith('#')) return;
      const id = item.href.slice(1);
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'night' ? 'sunset' : 'night'));
  };

  return (
    <>
      <TooltipProvider>
        <nav
          ref={containerRef}
          className={cn(
            'fixed top-4 left-1/2 -translate-x-1/2 z-50',
            'flex gap-2 sm:gap-4 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full',
            'backdrop-blur-md bg-black/40 hover:bg-black/60',
            'shadow-lg shadow-primary/10 border border-white/10 transition-all duration-300'
          )}
        >
          {navItems.map(({ href, label, icon, target, rel }) => {
            const isActive = activeSection === href.slice(1);

            return (
              <div key={label} className="flex items-center">
                {label === 'Resume' && (
                  <div className="w-px h-6 bg-white/40 mx-2 sm:mx-3" />
                )}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.a
                      href={href}
                      target={target}
                      rel={rel}
                      initial={false}
                      animate={{
                        scale: isActive ? 1.3 : 0.7,
                        opacity: isActive ? 1 : 0.7,
                        y: isActive ? -8 : 0,
                      }}
                      whileHover={{
                        scale: 1.3,
                        y: -10,
                        transition: {
                          type: 'spring',
                          stiffness: 500,
                          damping: 40,
                        },
                      }}
                      whileTap={{
                        scale: 1.3,
                        y: -10,
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 40,
                        },
                      }}
                      className={cn(
                        'group relative flex flex-col items-center justify-center p-2 rounded-md',
                        'transition-all duration-300 ease-in-out text-white',
                        isActive ? 'text-pink-400 font-bold' : 'text-white/80'
                      )}
                    >
                      {icon}
                      <span
                        className={cn(
                          'absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px]',
                          'bg-gradient-to-r from-primary to-pink-500 rounded-full transition-all duration-300 ease-in-out',
                          isActive ? 'w-full shadow-glow' : 'w-0 group-hover:w-3/4'
                        )}
                        style={{
                          boxShadow: isActive ? '0 0 8px rgba(236, 72, 153, 0.7)' : 'none'
                        }}
                      />
                    </motion.a>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    sideOffset={6}
                    className="text-sm rounded-md bg-black/80 backdrop-blur-sm px-3 py-1.5 text-white shadow-lg border border-white/10"
                  >
                    {label}
                  </TooltipContent>
                </Tooltip>
              </div>
            );
          })}

          {/* Theme Toggle Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                onClick={toggleTheme}
                whileHover={{
                  scale: 1.3,
                  rotate: 15,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                whileTap={{
                  scale: 1.3,
                  rotate: 15,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className={cn(
                  'group relative flex flex-col items-center justify-center p-2 rounded-md',
                  'transition-all duration-300 ease-in-out hover:shadow-lg text-white'
                )}
              >
                {theme === 'night' ? (
                  <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" />
                ) : (
                  <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
                )}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              sideOffset={6}
              className="text-sm rounded-md bg-black/80 backdrop-blur-sm px-3 py-1.5 text-white shadow-lg border border-white/10"
            >
              Toggle Theme
            </TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>

      {/* Particle background */}
      <ParticleBackground theme={theme} interaction />
    </>
  );
}