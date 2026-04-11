'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LOG_TYPES = [
  "STRESS_TEST",
  "CORE_FREQ",
  "STRUCT_INT",
  "LOAD_BAL",
  "SPEC_SYNC",
  "THERM_READ",
  "MECH_CYCLE"
];

export default function EngineeringFeed() {
  const [columns, setColumns] = useState<number[]>([]);

  useEffect(() => {
    const count = Math.floor(window.innerWidth / 200);
    setColumns(Array.from({ length: count }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none opacity-[0.04] flex justify-between px-12 overflow-hidden z-0">
      {columns.map((i) => (
        <div key={i} className="flex flex-col gap-6 font-mono text-[7px] text-primary tracking-tighter">
          {Array.from({ length: 15 }).map((_, j) => (
            <motion.div
              key={j}
              initial={{ opacity: 0.1 }}
              animate={{ 
                opacity: [0.1, 1, 0.1],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 4 + Math.random() * 6, 
                repeat: Infinity, 
                delay: Math.random() * 8 
              }}
              className="flex flex-col border-l border-primary/20 pl-2"
            >
              <span className="text-white/40 font-bold">{LOG_TYPES[Math.floor(Math.random() * LOG_TYPES.length)]}</span>
              <span className="tabular-nums">VAL: {(Math.random() * 1000).toFixed(2)}_hz</span>
              <div className="h-0.5 w-8 bg-primary/20 mt-1">
                 <motion.div 
                    className="h-full bg-primary"
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                 />
              </div>
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}
