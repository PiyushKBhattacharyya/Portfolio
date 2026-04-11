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
  Target,
  Compass
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
    { href: '#home', label: 'DRAFT_BOARD', sector: 'SEC_01', icon: <Home className="w-4 h-4" /> },
    { href: '#about', label: 'SPEC_SHEET', sector: 'SEC_02', icon: <User className="w-4 h-4" /> },
    { href: '#projects', label: 'ASSEMBLY', sector: 'SEC_03', icon: <Folder className="w-4 h-4" /> },
    { href: '#publications', label: 'ledger', sector: 'SEC_04', icon: <BookOpen className="w-4 h-4" /> },
    { href: '#experience', label: 'AUDIT', sector: 'SEC_05', icon: <ChartSpline className="w-4 h-4" /> },
    { href: '#techstack', label: 'MAINFRAME', sector: 'SEC_06', icon: <Cpu className="w-4 h-4" /> }
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
      {/* Top Banner - Industrial Telemetry */}
      <div className="w-full bg-[#060608]/90 border-b-2 border-primary/20 backdrop-blur-md px-10 py-2 flex justify-between items-center text-[10px] font-mono pointer-events-auto overflow-hidden relative">
        <motion.div 
          className="absolute inset-0 bg-primary/5"
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="flex gap-12 relative z-10 items-center">
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(i => (
                <motion.div 
                  key={i}
                  className="w-1 h-4 bg-primary"
                  animate={{ height: [4, 16, 4], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </div>
            <span className="text-primary font-black tracking-[0.2em] italic uppercase">Operational_State: STABLE</span>
          </div>
          <div className="hidden md:flex gap-8 border-l border-white/10 pl-8 text-white/40">
            <span className="flex items-center gap-2">FREQ: <span className="text-primary tracking-tighter tabular-nums">142.08GHZ</span></span>
            <span className="flex items-center gap-2">LOAD: <motion.span className="text-primary tabular-nums" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>72%</motion.span></span>
          </div>
        </div>

        <div className="flex gap-12 relative z-10 items-center">
          <div className="hidden lg:flex items-center gap-3">
             <div className="w-2 h-2 bg-primary animate-pulse shadow-[0_0_8px_var(--primary)]" />
             <span className="text-primary font-bold tracking-widest">SAT_SYNC: [ LOCKED ]</span>
          </div>
          <div className="flex items-center gap-4 border-l border-white/10 pl-8">
            <div className="flex flex-col items-end">
               <span className="text-[8px] text-white/20 uppercase">Core_Uptime</span>
               <span className="text-primary tabular-nums tracking-widest font-bold">{Math.floor(performance.now() / 1000)}ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="container mx-auto px-6 mt-6">
        <div className="flex justify-between items-center pointer-events-auto">
          {/* Logo / Engineering ID */}
          <div className="bg-black/90 border-2 border-primary/20 p-5 flex items-center gap-5 group hover:border-primary transition-all pointer-events-auto relative shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 p-1 opacity-20">
               <Cpu size={14} className="text-primary" />
            </div>
            <div className="relative">
              <Compass size={24} className="text-primary group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter text-white leading-none italic uppercase">PIYUSH_KB</span>
              <span className="text-[10px] font-mono text-primary font-bold mt-1 uppercase tracking-[0.3em]">ENGINEERING_v5.0</span>
            </div>
          </div>

          {/* Desktop Nav - Sector Grid */}
          <nav className="hidden md:flex gap-px bg-white/5 border border-white/10 p-1">
            {navItems.map(({ href, label, sector, icon }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <a
                  key={label}
                  href={href}
                  className={cn(
                    "relative px-6 py-4 flex flex-col items-start gap-1 font-mono transition-all",
                    isActive 
                      ? "bg-primary text-black" 
                      : "bg-[#0a0a0c] text-slate-500 hover:text-primary hover:bg-[#121215]"
                  )}
                >
                  <span className={cn("text-[7px] font-black tracking-widest uppercase mb-1", isActive ? "text-black/60" : "text-primary/40")}>
                    {sector}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className={isActive ? "text-black" : "text-primary/60"}>{icon}</span>
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase">{label}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-black"
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
