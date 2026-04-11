import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Linkedin, Github, Mail, Target, Shield, Activity, Zap } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';

function TypeWriter({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          // Random ASCII glitch character occasionally
          const char = Math.random() > 0.9 ? String.fromCharCode(33 + Math.floor(Math.random() * 94)) : text[i];
          setDisplayText((prev) => prev.slice(0, -1) + (char === ' ' ? ' ' : char) + (text[i+1] || ''));
          i++;
        } else {
          setDisplayText(text);
          setIsDone(true);
          clearInterval(interval);
        }
      }, 40);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <span className={className}>
      {displayText}
      {!isDone && <span className="animate-flicker">_</span>}
    </span>
  );
}

function ProfileFrame() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX - innerWidth / 2) / 20);
      mouseY.set((e.clientY - innerHeight / 2) / 20);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-full aspect-square bg-black/40 border border-white/10 group overflow-hidden chamfer-tr">
      {/* Precision Reticle Overlay */}
      <motion.div 
        className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
        style={{ x: springX, y: springY }}
      >
        <div className="relative w-3/4 h-3/4">
          <motion.div 
            className="absolute inset-0 border border-primary/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-[10%] border border-dashed border-primary/30 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute top-1/2 left-0 w-full h-px bg-primary/10" />
          <div className="absolute top-0 left-1/2 w-px h-full bg-primary/10" />
        </div>
      </motion.div>

      {/* Image Layer */}
      <img
        src="/profile.png"
        alt="Piyush Kaushik Bhattacharyya"
        className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 transition-all duration-700 blur-[0.5px] hover:blur-0"
      />
      
      {/* Subject ID Overlay */}
      <div className="absolute top-6 left-6 z-30 flex flex-col gap-1">
        <div className="bg-primary text-black text-[10px] font-mono px-2 py-0.5 font-bold animate-flicker">
          SUBJ_ID: 046-PKB
        </div>
        <div className="text-[8px] font-mono text-primary/60 uppercase tracking-widest pl-1">Status: DEPLOYED</div>
      </div>

      <div className="absolute bottom-6 right-6 z-30 flex flex-col items-end gap-2">
        <div className="text-[8px] font-mono text-white/40 uppercase bg-black/80 px-2 py-1">COORD_LOCK: {Math.floor(Math.random() * 1000)}/AX</div>
        <div className="w-24 h-1 bg-white/10">
          <motion.div 
            className="h-full bg-primary" 
            animate={{ width: ["0%", "100%", "0%"] }} 
            transition={{ duration: 5, repeat: Infinity }} 
          />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-24 relative overflow-hidden bg-[#060608]">
      {/* Background Precision Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,157,0,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container mx-auto px-6 md:px-20 relative z-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-stretch">
          
          {/* Left Column: Subject Data */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  className="h-[1px] bg-primary"
                />
                <span className="text-[10px] font-mono text-primary tracking-[0.4em] font-bold uppercase animate-flicker">Sequence_Alpha_Engaged</span>
              </div>

              <h1 className="text-6xl md:text-9xl font-black font-heading tracking-tighter mb-10 leading-[0.8] text-white uppercase italic">
                <TypeWriter text="PIYUSH" />
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/40 animate-aberration">
                  <TypeWriter text="KAUSHIK_B." delay={1000} />
                </span>
              </h1>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-12 border-l border-primary/20 pl-10 relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/40 blur-[2px]" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">Core_Focus</span>
                  <span className="text-sm font-bold text-white uppercase tracking-tighter">Applied_Intelligence</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">Deploy_Stat</span>
                  <span className="text-sm font-bold text-white uppercase tracking-tighter">Active_Deployment</span>
                </div>
                <div className="flex flex-col gap-1 col-span-2 lg:col-span-1">
                  <span className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">Auth_Level</span>
                  <span className="text-sm font-bold text-white uppercase flex items-center gap-3">
                    L5_GRANT <Shield size={16} className="text-primary animate-pulse" />
                  </span>
                </div>
              </div>

              <div className="max-w-xl mb-12 relative group">
                <div className="absolute -inset-2 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                <p className="relative text-lg text-slate-400 leading-relaxed font-mono text-[14px] border border-white/10 p-8 bg-black/40 backdrop-blur-md chamfer-tr">
                  <span className="text-primary mr-3 animate-pulse">&gt;</span>
                  Architecting high-fidelity AI systems and experimental infrastructure. 
                  Bridging the transition from <span className="text-white font-bold italic">stochastic neural agents</span> to <span className="text-primary">deterministic kernel layers</span>.
                </p>
              </div>

              <div className="flex flex-wrap gap-6 items-center">
                <motion.a
                  href="#projects"
                  className="px-10 py-5 bg-primary text-black font-mono font-bold text-xs tracking-[0.2em] chamfer-tr flex items-center gap-4 hover:bg-white transition-all shadow-[0_0_20px_rgba(255,157,0,0.3)]"
                  whileHover={{ scale: 1.05, shadow: "0_0_30px_rgba(255,157,0,0.5)" }}
                >
                  <Target size={18} />
                  INITIALIZE_MODULES
                </motion.a>
                
                <div className="h-px w-12 bg-white/10 hidden md:block" />
                
                <div className="flex items-center gap-6 px-8 py-3 bg-white/[0.02] border border-white/10">
                  <SocialIcon href={SOCIAL_LINKS.GITHUB} icon={<Github size={20} />} />
                  <SocialIcon href={SOCIAL_LINKS.LINKEDIN} icon={<Linkedin size={20} />} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Bio Matrix / Data Visuals */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div
              className="h-full flex flex-col justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="p-1 border border-primary/20 bg-primary/5 chamfer-tr">
                <ProfileFrame />
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-6 flex flex-col gap-3 group hover:border-primary/40 transition-colors">
                  <Activity size={20} className="text-primary group-hover:animate-pulse" />
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Neural_Inference</span>
                  <span className="text-sm font-black text-white tracking-widest">98.34%_ACC</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 flex flex-col gap-3 group hover:border-primary/40 transition-colors">
                  <Zap size={20} className="text-amber-500 group-hover:animate-flicker" />
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Proc_Entropy</span>
                  <span className="text-sm font-black text-white tracking-widest">0.024/mHz</span>
                </div>
              </div>
            </motion.div>
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
      className="p-2 text-white/40 hover:text-primary transition-all hover:scale-125 hover:rotate-6"
    >
      {icon}
    </a>
  );
}

