import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Linkedin, Github, Mail, Shield, Wrench, Settings, Layers, Compass } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';

function TypeWriter({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.substring(0, i + 1));
          i++;
        } else {
          setIsDone(true);
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return <span className={className}>{displayText}{!isDone && <span className="animate-pulse">|</span>}</span>;
}

function DimensionLine({ label, orientation = 'horizontal', className }: { label: string, orientation?: 'horizontal' | 'vertical', className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${orientation === 'vertical' ? 'flex-col' : 'flex-row'} ${className}`}>
      <div className={`${orientation === 'vertical' ? 'w-px h-full' : 'w-full h-px'} bg-primary/20 relative`}>
        <div className={`absolute ${orientation === 'vertical' ? 'w-2 h-px left-[-4px] top-0' : 'w-px h-2 top-[-4px] left-0'} bg-primary/40`} />
        <div className={`absolute ${orientation === 'vertical' ? 'w-2 h-px left-[-4px] bottom-0' : 'w-px h-2 top-[-4px] right-0'} bg-primary/40`} />
      </div>
      <span className="text-[7px] font-mono text-primary/40 uppercase whitespace-nowrap tracking-widest">{label}</span>
    </div>
  );
}

function ProfileSchematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative w-full aspect-square bg-[#0c0c0e] border border-white/5 group overflow-hidden p-8">
      {/* Structural Girders */}
      <div className="absolute inset-0 border-[10px] border-white/[0.02] pointer-events-none" />

      {/* 3D Blueprint Frame */}
      <div className="absolute inset-4 border border-primary/10 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          }}
        />

        <img
          src="/profile.png"
          alt="Piyush Kaushik Bhattacharyya"
          className="w-full h-full object-cover grayscale contrast-125 opacity-70 group-hover:opacity-100 transition-all duration-700 mix-blend-luminosity"
        />

        {/* Dimension Callouts */}
        <div className="absolute -top-6 left-0 w-full flex justify-between px-2">
          <span className="text-[6px] font-mono text-primary/40">REF_ID: 046-PKB-S7</span>
          <span className="text-[6px] font-mono text-primary/40">Z_AXIS: 0.00mm</span>
        </div>
      </div>

      {/* Assembly Indicators */}
      <div className="absolute bottom-8 right-8 z-30 flex flex-col items-end gap-1">
        <div className="text-[8px] font-mono text-primary bg-black/80 px-2 py-0.5 border border-primary/20 font-bold uppercase tracking-widest italic animate-flicker">
          Operational_State: 100%
        </div>
        <div className="flex gap-1 h-1 w-32 bg-white/5">
          <motion.div className="h-full bg-primary" animate={{ width: ["0%", "100%", "0%"] }} transition={{ duration: 5, repeat: Infinity }} />
        </div>
      </div>

      {/* Crosshair Follower */}
      <motion.div
        className="absolute w-12 h-12 border border-primary/20 pointer-events-none z-20"
        style={{ x: mouseX, y: mouseY, translateX: -24, translateY: -24 }}
      >
        <div className="absolute top-1/2 left-0 w-full h-px bg-primary/10" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-primary/10" />
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-[200px] lg:pt-[220px] pb-20 relative overflow-hidden bg-[#060608]">
      <div className="container mx-auto px-6 md:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">

          {/* Left Column: Technical Specifications */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-center items-center md:items-start text-center md:text-left order-2 lg:order-2 xl:order-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >


              <h1 className="text-3xl sm:text-7xl lg:text-8xl xl:text-9xl font-black font-heading tracking-tight mb-6 md:mb-12 leading-[0.8] text-white uppercase italic">
                <TypeWriter text="PIYUSH" />
                <br />
                <span className="text-transparent border-b-[4px] md:border-b-[8px] border-primary/40 pb-2">
                  <TypeWriter text="KAUSHIK_B." delay={1000} />
                </span>
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-12 md:mb-16 border-l-0 md:border-l-4 border-b-2 md:border-b-0 border-primary/40 pl-0 md:pl-12 pb-8 md:pb-0 relative group">
                <div className="absolute left-[-4px] top-0 bottom-0 w-1 bg-primary blur-[4px] opacity-40 group-hover:opacity-100 transition-opacity hidden md:block" />

                <div className="space-y-6 flex flex-col items-center md:items-start">
                  <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
                    <span className="text-[8px] md:text-[10px] font-mono text-primary/40 uppercase tracking-widest border-b border-white/5 pb-1">Core_Composition</span>
                    <span className="text-xs md:text-sm font-bold text-white uppercase tracking-tighter">Applied_Intelligence_Systems</span>
                  </div>
                  <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
                    <span className="text-[8px] md:text-[10px] font-mono text-primary/40 uppercase tracking-widest border-b border-white/5 pb-1">Operational_Exp</span>
                    <span className="text-xs md:text-sm font-bold text-white uppercase tracking-tighter">5.2_Standard_Cycles</span>
                  </div>
                </div>

                <div className="space-y-6 flex flex-col items-center md:items-start">
                  <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
                    <span className="text-[8px] md:text-[10px] font-mono text-primary/40 uppercase tracking-widest border-b border-white/5 pb-1">Structural_Integrity</span>
                    <span className="text-xs md:text-sm font-black text-white uppercase flex items-center justify-center md:justify-start gap-3">
                      VERIFIED_OPTIMAL 
                      <Shield size={14} className="text-primary shadow-[0_0_10px_rgba(255,157,0,0.5)] shrink-0" />
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
                    <span className="text-[8px] md:text-[10px] font-mono text-primary/40 uppercase tracking-widest border-b border-white/5 pb-1">Auth_Privileges</span>
                    <span className="text-xs md:text-sm font-bold text-white uppercase">S7_OVERRIDE_GRANT</span>
                  </div>
                </div>
              </div>

              <div className="max-w-2xl mb-16 relative">
                <DimensionLine label="CORE_DESCRIPTION_WIDTH // 640mm" className="mb-4" />
                <p className="text-sm md:text-lg text-slate-400 leading-relaxed font-mono bg-white/[0.01] border border-white/5 p-6 md:p-10 hover:border-primary/20 transition-all">
                  <span className="text-primary font-bold mr-3 md:block lg:inline">&gt;&gt;</span>
                  Architecting high-fidelity <span className="text-white font-bold italic underline decoration-primary/40 underline-offset-4">Industrial Intelligence Frameworks</span>.
                  <span className="md:block lg:inline"> Synchronizing complex hardware-level heuristics with robust cloud-native execution kernels.</span>
                  <span className="md:block lg:inline"> Committed to <span className="text-primary italic">Deterministic Engineering Principles</span>.</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 lg:gap-8 items-center sm:items-start md:items-center">
                <motion.a
                  href="#projects"
                  className="px-6 py-4 md:px-12 md:py-6 bg-primary text-black font-mono font-bold text-[10px] md:text-xs tracking-widest md:tracking-[0.3em] uppercase flex items-center gap-4 hover:bg-white transition-all shadow-[0_0_25px_rgba(255,157,0,0.2)] active:scale-95 text-center justify-center w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                >
                  <Settings size={20} className="animate-spin-slow shrink-0" />
                  <span>INITIALIZE_ MODULE</span>
                </motion.a>

                <div className="flex items-center justify-center gap-8 px-6 py-4 md:px-10 md:py-4 bg-white/[0.02] border border-white/10 group hover:border-primary/20 transition-all w-full sm:w-auto">
                  <SocialIcon href={SOCIAL_LINKS.GITHUB} icon={<Github size={20} />} />
                  <SocialIcon href={SOCIAL_LINKS.LINKEDIN} icon={<Linkedin size={20} />} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Schematic Readouts */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-center">
            <div className="relative p-1 border border-primary/20 bg-primary/5">
              <ProfileSchematic />

              {/* Lateral Scale */}
              <DimensionLine label="SUBJ_UNIT_HEIGHT // 420mm" orientation="vertical" className="absolute left-[-40px] top-0 h-full hidden xl:flex" />
            </div>

            <div className="mt-10 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0a0a0c] border border-white/5 p-4 md:p-6 flex flex-col items-center md:items-start text-center md:text-left gap-2 group hover:border-primary/20 transition-all">
                  <Layers size={18} className="text-primary/40 group-hover:text-primary transition-colors" />
                  <span className="text-[7px] md:text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">Compute_Density</span>
                  <span className="text-xs md:text-sm font-black text-white tracking-widest italic truncate w-full">42.8_TFLOP/S</span>
                </div>
                <div className="bg-[#0a0a0c] border border-white/5 p-4 md:p-6 flex flex-col items-center md:items-start text-center md:text-left gap-2 group hover:border-primary/20 transition-all">
                  <Wrench size={18} className="text-primary/40 group-hover:text-primary transition-colors" />
                  <span className="text-[7px] md:text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">Struct_Entropy</span>
                  <span className="text-xs md:text-sm font-black text-white tracking-widest italic truncate w-full">0.002_DEV</span>
                </div>
              </div>

              {/* Initialization Terminal */}
              <div className="bg-black border border-primary/10 p-4 font-mono text-[8px] text-primary/60 max-h-32 overflow-hidden shadow-inner">
                <div className="flex justify-between border-b border-primary/10 pb-2 mb-2">
                  <span className="font-bold">SYSTEM_VERIFICATION_LOG_S7</span>
                  <span className="animate-pulse">RUNNING...</span>
                </div>
                <div className="space-y-1">
                  <p>&gt; Checking Material_Kernel... OK</p>
                  <p>&gt; Loading Profile_Specs... OK</p>
                  <p>&gt; Calibrating Structural_Amber... OK</p>
                  <p>&gt; Deploying Mainframe... INITIALIZED</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  const isMail = href.startsWith('mailto:');
  return (
    <a
      href={href}
      target={isMail ? "_self" : "_blank"}
      rel={isMail ? undefined : "noopener noreferrer"}
      className="p-2 text-white/30 hover:text-primary transition-all hover:scale-125 group"
    >
      {icon}
    </a>
  );
}

