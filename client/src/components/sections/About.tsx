'use client';

import { motion } from 'framer-motion';
import { Target, Cpu, HardDrive, Network, Layers, ShieldCheck } from 'lucide-react';
import { EXECUTIVE_SUMMARY } from '@/lib/constants';

const statsData = [
  { label: "COGNITION_PATH", value: "Neural_Architectures" },
  { label: "SYSTEM_RUNTIME", value: "12500+ Hours" },
  { label: "AUTH_TOKEN", value: "SEC_ALPHA_9" },
  { label: "DATA_ORIGIN", value: "Guwahati_IN" }
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#0a0a0c]">
      {/* Background Coordinate System */}
      <div className="absolute top-0 right-0 p-4 text-[10px] font-mono text-white/5 flex flex-col items-end">
        <span>LAT: 26.1158</span>
        <span>LONG: 91.7086</span>
        <span>REF: DOSSIER_PKB</span>
      </div>

      <div className="container mx-auto px-6 md:px-20 relative z-10">
        
        {/* Section Header - Industrial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-primary" />
              <span className="text-[10px] font-mono text-primary uppercase tracking-[0.4em]">Sub_Profile_A7</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black font-heading tracking-tighter text-white uppercase italic">
              SUBJECT_<span className="text-transparent border-b-4 border-primary px-2">OVERVIEW</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 md:w-1/3">
            {statsData.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[8px] font-mono text-white/30 uppercase">{stat.label}</span>
                <span className="text-xs font-bold text-white tracking-widest">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Summary Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-8 border border-primary/20 bg-primary/[0.02] relative"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldCheck size={40} className="text-primary" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">[EXECUTIVE_SUMMARY]</span>
            <div className="h-px flex-grow bg-primary/10" />
          </div>
          <p className="text-xl md:text-2xl font-bold text-white leading-tight tracking-tight italic">
            {EXECUTIVE_SUMMARY}
          </p>
        </motion.div>

        {/* Content Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 px-1 bg-white/5">
          
          {/* Main Dossier Content */}
          <div className="lg:col-span-8 bg-[#060608] p-8 md:p-12">
            <div className="flex items-center gap-3 mb-10">
              <Target size={20} className="text-primary" />
              <h3 className="text-xl font-bold font-mono tracking-widest text-white uppercase underline decoration-primary underline-offset-8">
                Execution_Protocols
              </h3>
            </div>
            
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Protocol 01 - Domain */}
                <div className="relative group p-6 border border-white/5 bg-white/[0.01] hover:border-primary/30 transition-all">
                  <div className="absolute -top-3 left-4 bg-[#060608] px-2 text-[10px] font-mono text-primary font-bold">PROTOCOL_01</div>
                  <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-tighter">Applied_Intelligence</h4>
                  <p className="text-xs font-mono text-slate-400 leading-relaxed">
                    Specialized in synthesizing stochastic neural agents with rigid kernel-level execution layers for optimized distributed inference.
                  </p>
                </div>

                {/* Protocol 02 - Engine */}
                <div className="relative group p-6 border border-white/5 bg-white/[0.01] hover:border-primary/30 transition-all">
                  <div className="absolute -top-3 left-4 bg-[#060608] px-2 text-[10px] font-mono text-primary font-bold">PROTOCOL_02</div>
                  <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-tighter">Skynet_Engine</h4>
                  <p className="text-xs font-mono text-slate-400 leading-relaxed">
                    Hierarchical meta-learning framework bridging PPO optimization with transformer modularity for continuous architectural adaptation.
                  </p>
                </div>

                {/* Protocol 03 - Core System */}
                <div className="relative group p-6 border border-white/5 bg-white/[0.01] hover:border-primary/30 transition-all">
                  <div className="absolute -top-3 left-4 bg-[#060608] px-2 text-[10px] font-mono text-primary font-bold">PROTOCOL_03</div>
                  <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-tighter">Apex_Kernel</h4>
                  <p className="text-xs font-mono text-slate-400 leading-relaxed">
                    Experimental Rust kernel implementation utilizing reinforcement learning for dynamic CPU scheduling and resource arbitration.
                  </p>
                </div>

                {/* Protocol 04 - Stack */}
                <div className="relative group p-6 border border-white/5 bg-white/[0.01] hover:border-primary/30 transition-all">
                  <div className="absolute -top-3 left-4 bg-[#060608] px-2 text-[10px] font-mono text-primary font-bold">PROTOCOL_04</div>
                  <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-tighter">Infrastructure_Mesh</h4>
                  <p className="text-xs font-mono text-slate-400 leading-relaxed">
                    Deployment of scalable, containerized micro-architectures with automated health-check telemetry and protocol verification.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Side Matrix - Technical Stats */}
          <div className="lg:col-span-4 bg-[#0a0a0c] p-8 flex flex-col gap-8 text-white">
            <h4 className="text-[10px] font-mono text-primary font-bold tracking-[0.3em] uppercase mb-4">Functional_Sectors</h4>
            
            {[
              { label: "Neural_Synthesis", val: 88, Icon: Cpu, color: "bg-primary" },
              { label: "Kernel_Engineering", val: 72, Icon: HardDrive, color: "bg-amber-600" },
              { label: "Cloud_Fabric", val: 94, Icon: Network, color: "bg-blue-600" },
              { label: "Stack_Architecture", val: 91, Icon: Layers, color: "bg-emerald-600" }
            ].map((skill, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-white/40"><skill.Icon size={16} /></span>
                    <span className="text-[10px] font-bold tracking-widest uppercase">{skill.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-primary">{skill.val}%</span>
                </div>
                <div className="h-1 w-full bg-white/5 overflow-hidden">
                  <motion.div 
                    className={`h-full ${skill.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.val}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-auto pt-8 border-t border-white/5">
              <div className="p-4 bg-primary text-black chamfer-bl">
                <span className="text-[10px] font-bold font-mono tracking-tighter uppercase text-black">Subject_Readiness: OPTIMAL</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}