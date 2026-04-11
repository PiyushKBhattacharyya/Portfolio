'use client';

import { motion } from 'framer-motion';
import { Target, Cpu, HardDrive, Network, Layers, Activity } from 'lucide-react';

const statsData = [
  { label: "COGNITION_PATH", value: "Neural_Architectures" },
  { label: "SYSTEM_RUNTIME", value: "12500+ Hours" },
  { label: "AUTH_TOKEN", value: "SEC_ALPHA_9" },
  { label: "DATA_ORIGIN", value: "Guwahati_IN" }
];

export default function About() {
  return (
    <section id="about" className="pt-16 pb-32 relative overflow-hidden bg-[#0a0a0c]">
      {/* Structural Data Overlay */}
      <div className="absolute top-10 right-10 p-4 text-[10px] font-mono text-white/5 flex flex-col items-end border-r-2 border-white/5 pr-6">
        <span>DRAWING_NO: A-704</span>
        <span>REV_LVL: S7_PROD</span>
        <span>AUTH: SE_PIYUSH</span>
      </div>

      <div className="container mx-auto px-6 md:px-20 relative z-10">

        {/* Section Header - Blueprint ID */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8 border-b-2 border-primary/20 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-primary/40" />
              <span className="text-[10px] font-mono text-primary uppercase tracking-widest md:tracking-[0.5em] font-bold truncate block w-full md:w-auto">Structural_Dossier_Verified</span>
            </div>
            <h2 className="text-2xl sm:text-7xl lg:text-8xl xl:text-9xl font-black font-heading tracking-tight text-white uppercase italic leading-tight py-4">
              DRAFT_<span className="text-transparent border-b-2 md:border-b-4 border-primary/20 px-2 italic">SPECIFICATIONS</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:w-1/3 p-6 bg-white/[0.02] border border-white/5">
            {statsData.map((stat, i) => (
              <div key={i} className="flex flex-col min-w-0">
                <span className="text-[7px] md:text-[8px] font-mono text-primary/40 uppercase font-bold tracking-widest truncate">{stat.label}</span>
                <span className="text-[9px] md:text-[11px] font-black text-white tracking-widest uppercase italic break-all md:break-words">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Matrix - Modular Assembly */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/5">

          {/* Main Engineering Records */}
          <div className="lg:col-span-8 bg-[#060608] p-6 md:p-16 border border-white/5 relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="text-2xl md:text-[40px] font-black font-mono text-primary italic">PKB-S7</span>
            </div>

            <div className="flex items-center gap-4 mb-12 md:mb-16">
              <div className="p-2 md:p-3 bg-primary/10 border border-primary/20">
                <Target size={16} className="text-primary animate-pulse md:w-5 md:h-5" />
              </div>
              <h3 className="text-sm md:text-2xl font-black font-mono tracking-tighter text-white uppercase italic">
                CORE_ENGINEERING_PROTOCOLS
              </h3>
            </div>

            <div className="space-y-12 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
                {/* Protocol 01 - Intelligence */}
                <div className="relative group p-6 md:p-8 bg-[#060608] hover:bg-[#0d0d0f] transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[8px] md:text-[9px] font-mono text-primary font-bold bg-primary/10 px-2 py-0.5 italic">01 // DOMAIN</span>
                  </div>
                  <h4 className="text-[12px] md:text-md font-black text-white mb-4 uppercase tracking-tighter italic break-words">Industrial_Cognition</h4>
                  <p className="text-[11px] md:text-[13px] font-mono text-slate-400 leading-relaxed font-bold break-words">
                    Developing deterministic inference layers for industrial-scale intelligence, prioritizing low-latency execution and structural auditability.
                  </p>
                </div>

                {/* Protocol 02 - Processing */}
                <div className="relative group p-6 md:p-8 bg-[#060608] hover:bg-[#0d0d0f] transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[8px] md:text-[9px] font-mono text-primary font-bold bg-primary/10 px-2 py-0.5 italic">02 // ENGINE</span>
                  </div>
                  <h4 className="text-[12px] md:text-md font-black text-white mb-4 uppercase tracking-tighter italic break-words">Production_Kernel</h4>
                  <p className="text-[11px] md:text-[13px] font-mono text-slate-400 leading-relaxed font-bold break-words">
                    High-throughput processing pipelines optimized for real-time telemetry ingestion and high-fidelity signal analysis in technical environments.
                  </p>
                </div>

                {/* Protocol 03 - Resource Management */}
                <div className="relative group p-6 md:p-8 bg-[#060608] hover:bg-[#0d0d0f] transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[8px] md:text-[9px] font-mono text-primary font-bold bg-primary/10 px-2 py-0.5 italic">03 // CONTROL</span>
                  </div>
                  <h4 className="text-[12px] md:text-md font-black text-white mb-4 uppercase tracking-tighter italic break-words">Resource_Arbitration</h4>
                  <p className="text-[11px] md:text-[13px] font-mono text-slate-400 leading-relaxed font-bold break-words">
                    Fine-grained resource orchestration, leveraging reinforced scheduling heuristics for maximum computational efficiency across distributed clusters.
                  </p>
                </div>

                {/* Protocol 04 - Infrastructure */}
                <div className="relative group p-6 md:p-8 bg-[#060608] hover:bg-[#0d0d0f] transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[8px] md:text-[9px] font-mono text-primary font-bold bg-primary/10 px-2 py-0.5 italic">04 // FABRIC</span>
                  </div>
                  <h4 className="text-[12px] md:text-md font-black text-white mb-4 uppercase tracking-tighter italic break-words">Scalable_Architecture</h4>
                  <p className="text-[11px] md:text-[13px] font-mono text-slate-400 leading-relaxed font-bold break-words">
                    Drafting of robust, self-healing modular ecosystems with zero-trust security profiles and automated maintenance telemetry.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Metadata Matrix */}
          <div className="lg:col-span-4 bg-[#0a0a0c] p-10 md:p-12 flex flex-col gap-10 text-white border border-white/5 relative">
            <h4 className="text-[10px] font-mono text-primary font-bold tracking-[0.5em] uppercase mb-4 italic">Functional_Capacity</h4>

            {[
              { label: "Neural_Synthesis", val: 88, Icon: Cpu, color: "bg-primary" },
              { label: "Kernel_Engineering", val: 72, Icon: HardDrive, color: "bg-primary/60" },
              { label: "Cloud_Fabric", val: 94, Icon: Network, color: "bg-primary/40" },
              { label: "Stack_Architecture", val: 91, Icon: Layers, color: "bg-white/10" }
            ].map((skill, i) => (
              <div key={i} className="space-y-4">
                <div className="flex justify-between items-end gap-2 min-w-0">
                  <div className="flex items-center gap-2 md:gap-4 min-w-0">
                    <span className="text-primary/40 shrink-0"><skill.Icon size={18} /></span>
                    <span className="text-[9px] md:text-[10px] font-black tracking-widest uppercase italic truncate">{skill.label}</span>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-[12px] font-mono font-black text-primary">{skill.val}.0</span>
                    <span className="text-[7px] font-mono text-white/20">UNIT_LOAD %</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-white/5 overflow-hidden p-0.5 border border-white/5">
                  <motion.div
                    className={`h-full ${skill.color} shadow-[0_0_10px_rgba(255,157,0,0.2)]`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.val}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-auto pt-10 border-t border-white/5 space-y-4">
              <div className="flex justify-between text-[10px] font-mono text-white/40 italic uppercase">
                <span>Unit_Stability</span>
                <span className="text-primary font-bold">OPTIMAL</span>
              </div>
              <div className="p-5 bg-primary text-black flex items-center justify-between group cursor-default">
                <span className="text-[11px] font-black font-mono tracking-widest uppercase text-black">ENG_READY_S7</span>
                <Activity size={16} className="text-black animate-pulse" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}