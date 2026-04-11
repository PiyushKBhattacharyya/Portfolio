'use client';

import { useEffect, useState } from 'react';
import {
  Home,
  User,
  Folder,
  Award,
  ChartSpline,
  BookOpen,
  Cpu,
  Menu,
  X,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navItems = [
    { href: '#home', label: 'HOME', icon: <Home className="w-4 h-4" /> },
    { href: '#about', label: 'BIOS', icon: <User className="w-4 h-4" /> },
    { href: '#projects', label: 'MODULES', icon: <Folder className="w-4 h-4" /> },
    { href: '#publications', label: 'LOGS', icon: <BookOpen className="w-4 h-4" /> },
    { href: '#experience', label: 'AUDIT', icon: <ChartSpline className="w-4 h-4" /> },
    { href: '#techstack', label: 'SYSTEM', icon: <Cpu className="w-4 h-4" /> }
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
      { threshold: 0.2, rootMargin: '0px 0px -20% 0px' }
    );

    navItems.forEach(item => {
      const id = item.href.slice(1);
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      {/* Top Banner - System Stats */}
      <div className="w-full bg-[#060608]/80 border-b border-primary/20 backdrop-blur-md px-6 py-2 flex justify-between items-center text-[10px] font-mono pointer-events-auto overflow-hidden relative">
        {/* Dynamic Pulse Background */}
        <motion.div 
          className="absolute inset-0 bg-primary/5"
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="flex gap-8 relative z-10">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3].map(i => (
                <motion.div 
                  key={i}
                  className="w-1 h-3 bg-primary"
                  animate={{ height: [4, 12, 4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
            <span className="text-primary font-bold">SYS_OPERATIONAL</span>
          </div>
          <span className="hidden md:inline text-white/40 tracking-tighter">COORD: 26.14°N / 91.73°E</span>
          <span className="hidden lg:inline text-primary/60">COMMS: READY</span>
        </div>

        <div className="flex gap-8 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-white/20">X:</span>
            <span className="text-primary tabular-nums">{coords.x}</span>
            <span className="text-white/20">Y:</span>
            <span className="text-primary tabular-nums">{coords.y}</span>
          </div>
          <div className="flex items-center gap-2 border-l border-white/10 pl-6">
            <span className="text-white/20">UPTIME:</span>
            <span className="text-primary tabular-nums tracking-widest">{Math.floor(performance.now() / 1000)}s</span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="container mx-auto px-6 mt-4">
        <div className="flex justify-between items-center pointer-events-auto">
          {/* Logo / Title Area */}
          <div className="bg-black/80 border border-white/10 px-4 py-2 chamfer-tr flex items-center gap-3">
            <Target size={18} className="text-primary animate-pulse-cyan" />
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-tighter text-white">PIYUSH_KB</span>
              <span className="text-[10px] font-mono text-primary/60 mt-[-2px]">V_2.0.46</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-1 bg-black/40 backdrop-blur-xl border border-white/5 p-1">
            {navItems.map(({ href, label, icon }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <a
                  key={label}
                  href={href}
                  className={cn(
                    "relative px-4 py-2 flex items-center gap-2 text-[11px] font-mono transition-all",
                    isActive 
                      ? "bg-primary text-black" 
                      : "text-slate-400 hover:text-primary hover:bg-primary/5"
                  )}
                >
                  {icon}
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-[1px] left-0 w-full h-[1px] bg-black"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden p-2 bg-black/80 border border-primary/20 text-primary chamfer-bl"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md pointer-events-auto"
          >
            <div className="p-8 h-full flex flex-col">
              <div className="flex justify-between items-center mb-12">
                <span className="font-mono text-primary tracking-widest text-sm">SYSTEM_OVERRIDE</span>
                <button onClick={() => setDrawerOpen(false)} className="text-primary p-2 border border-primary/20">
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {navItems.map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-6 p-6 border border-white/5 hover:border-primary/50 text-2xl font-bold transition-all group"
                  >
                    <span className="text-primary group-hover:scale-110 transition-transform">{icon}</span>
                    <span className="group-hover:translate-x-2 transition-transform">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
