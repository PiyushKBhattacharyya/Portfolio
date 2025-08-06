'use client';

import { useEffect, useRef, useState } from 'react';
import { Home, User, Folder, Download, Sun, Moon } from 'lucide-react';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import ParticleBackground from './canvas/ParticleBackground';

const navItems = [
  { href: '#home', label: 'Home', icon: <Home className="w-5 h-5 sm:w-6 sm:h-6" /> },
  { href: '#about', label: 'About', icon: <User className="w-5 h-5 sm:w-6 sm:h-6" /> },
  { href: '#projects', label: 'Projects', icon: <Folder className="w-5 h-5 sm:w-6 sm:h-6" /> },
  {
    href: '#awards',
    label: 'Awards',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 8c1.657 0 3-1.567 3-3.5S13.657 1 12 1 9 2.567 9 4.5 10.343 8 12 8zm0 0v13M8 17h8" />
      </svg>
    ),
  },
  {
    href: '#experience',
    label: 'Experience',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4 7V4a1 1 0 011-1h2a1 1 0 011 1v3m10 0V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v3M4 7h16v13H4V7z" />
      </svg>
    ),
  },
  {
    href: 'https://drive.google.com/file/d/1HSY9JYVuxtI9feDlR5HmImbEOaXoCkB6/view?usp=sharing',
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
            'backdrop-blur-md bg-black/30 hover:bg-black/50',
            'shadow-lg border border-white/10 transition-all duration-300'
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
                        scale: isActive ? 1.2 : 0.6,
                        opacity: isActive ? 1 : 0.8,
                        y: isActive ? -6 : 0,
                      }}
                      whileHover={{
                        scale: 1.25,
                        y: -8,
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        },
                      }}
                      whileTap={{
                        scale: 1.25,
                        y: -8,
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        },
                      }}
                      className={cn(
                        'group relative flex flex-col items-center justify-center p-2 rounded-md',
                        'transition-all duration-300 ease-in-out text-white',
                        isActive && 'text-pink-400'
                      )}
                    >
                      {icon}
                      <span
                        className={cn(
                          'absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px]',
                          'bg-pink-500 transition-all duration-300 ease-in-out',
                          isActive ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                        )}
                      />
                    </motion.a>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    sideOffset={6}
                    className="text-sm rounded-md bg-black px-2 py-1 text-white shadow"
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
                  scale: 1.25,
                  rotate: 10,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                whileTap={{
                  scale: 1.25,
                  rotate: 10,
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
              className="text-sm rounded-md bg-black px-2 py-1 text-white shadow"
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