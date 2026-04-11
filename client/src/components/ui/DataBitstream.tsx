'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function DataBitstream() {
  const [columns, setColumns] = useState<number[]>([]);

  useEffect(() => {
    // Generate constant number of columns based on screen width
    const count = Math.floor(window.innerWidth / 150);
    setColumns(Array.from({ length: count }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none opacity-[0.03] flex justify-around overflow-hidden">
      {columns.map((i) => (
        <div key={i} className="flex flex-col gap-4 font-mono text-[8px] text-primary">
          {Array.from({ length: 20 }).map((_, j) => (
            <motion.span
              key={j}
              initial={{ opacity: 0.1 }}
              animate={{ 
                opacity: [0.1, 1, 0.1],
                color: ["#FF9D00", "#FFFFFF", "#FF9D00"]
              }}
              transition={{ 
                duration: 3 + Math.random() * 5, 
                repeat: Infinity, 
                delay: Math.random() * 10 
              }}
            >
              {Math.random().toString(16).substring(2, 8).toUpperCase()}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
}
