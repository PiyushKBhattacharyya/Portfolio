'use client';

import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, Target, Shield, Activity, Zap } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';

function ProfileFrame() {
  return (
    <div className="relative w-full aspect-square bg-black/40 border border-white/10 group overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <img
        src="/profile.png"
        alt="Piyush Kaushik Bhattacharyya"
        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
      />
      {/* Subject ID Overlay */}
      <div className="absolute top-4 left-4 bg-primary text-black text-[10px] font-mono px-2 py-0.5 font-bold">
        SUBJ_ID: 046-PKB
      </div>
      <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1">
        <div className="w-12 h-1 bg-white/10 overflow-hidden">
          <motion.div 
            className="h-full bg-primary" 
            animate={{ width: ["0%", "80%", "40%", "90%"] }} 
            transition={{ duration: 4, repeat: Infinity }} 
          />
        </div>
        <span className="text-[8px] font-mono text-white/40 uppercase">Sync_Stream_Active</span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden bg-[#060608]">
      {/* Background Precision Grid */}
      <div className="absolute inset-0 scanline-overlay opacity-[0.03]" />
      <motion.div 
        className="absolute top-0 left-0 w-full h-[1px] bg-primary/20 z-0"
        animate={{ translateY: ["0vh", "100vh"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-6 md:px-20 relative z-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: Subject Data */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-primary/40" />
                <span className="text-[10px] font-mono text-primary tracking-[0.3em] font-bold uppercase">System_Initialisation_Complete</span>
              </div>

              <h1 className="text-5xl md:text-8xl font-black font-heading tracking-tighter mb-8 leading-[0.9] text-white">
                PIYUSH<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">KAUSHIK_B.</span>
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12 border-l border-white/10 pl-8">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">[CORE_FOCUS]</span>
                  <span className="text-sm font-bold text-white uppercase">ML_Engineering</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">[DEPLOY_STAT]</span>
                  <span className="text-sm font-bold text-white uppercase">Active_Field</span>
                </div>
                <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
                  <span className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">[AUTH_LEVEL]</span>
                  <span className="text-sm font-bold text-white uppercase flex items-center gap-2">
                    Level_4_Grant <Shield size={14} className="text-primary" />
                  </span>
                </div>
              </div>

              <p className="text-lg text-slate-400 mb-10 max-w-xl leading-relaxed font-mono text-[13px] border border-white/5 p-6 bg-white/[0.02]">
                <span className="text-primary mr-2">&gt;</span>
                Architecting high-fidelity AI systems and experimental infrastructure. 
                Bridging the transition from <span className="text-white">stochastic models</span> to <span className="text-white">deterministic kernels</span>.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#projects"
                  className="px-8 py-4 bg-primary text-black font-mono font-bold text-xs tracking-widest chamfer-tr flex items-center gap-3 hover:bg-white transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <Target size={16} />
                  ENGAGE_MODULES
                </motion.a>
                
                <div className="flex items-center gap-4 px-6 border border-white/10 bg-white/[0.02]">
                  <SocialIcon href={SOCIAL_LINKS.GITHUB} icon={<Github size={18} />} />
                  <SocialIcon href={SOCIAL_LINKS.LINKEDIN} icon={<Linkedin size={18} />} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Bio Matrix / Data Visuals */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div
              className="h-full flex flex-col"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="border border-white/10 p-2 bg-white/[0.01] chamfer-bl h-full">
                <ProfileFrame />
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="bg-white/[0.03] border border-white/5 p-4 flex flex-col gap-2">
                    <Activity size={16} className="text-primary" />
                    <span className="text-[8px] font-mono text-white/30 uppercase">Neural_Throughput</span>
                    <span className="text-xs font-bold text-white tracking-widest">94.8%_SAT</span>
                  </div>
                  <div className="bg-white/[0.03] border border-white/5 p-4 flex flex-col gap-2">
                    <Zap size={16} className="text-amber-500" />
                    <span className="text-[8px] font-mono text-white/30 uppercase">Optimization_Cycle</span>
                    <span className="text-xs font-bold text-white tracking-widest">REALTIME_OFF</span>
                  </div>
                </div>

                <div className="mt-4 p-4 border border-primary/20 bg-primary/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono text-primary font-bold tracking-widest uppercase">System_Logs</span>
                    <span className="text-[8px] font-mono text-primary/50 underline">View_All</span>
                  </div>
                  <div className="space-y-1">
                    {[
                      "Initialize: Meta_Policy_v4",
                      "Success: 22-D Control Matrix",
                      "Sync: Apex_OS Kernel Load",
                      "Ready: Krishi_Net_V2"
                    ].map((log, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] font-mono text-white/60">
                        <span className="w-1 h-1 bg-primary/40" />
                        {log}
                      </div>
                    ))}
                  </div>
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
      className="p-2 text-white/40 hover:text-primary transition-all hover:scale-110"
    >
      {icon}
    </a>
  );
}

