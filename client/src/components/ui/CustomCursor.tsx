'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(true);
    const [targetPos, setTargetPos] = useState({ x: 0, y: 0, width: 0, height: 0 });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics-based movement
    const stalkerX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const stalkerY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    useEffect(() => {
        const checkMobile = () => {
          setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768);
        };
        checkMobile();

        if (isMobile) return;

        const updateMousePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest('a') || target.closest('button') || window.getComputedStyle(target).cursor === 'pointer';
            
            if (interactive) {
                setIsHovering(true);
                const rect = (target.closest('a') || target.closest('button') || target).getBoundingClientRect();
                setTargetPos({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [isMobile, mouseX, mouseY]);

    if (isMobile) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
            {/* Global Coordination Lines */}
            <motion.div 
                className="absolute h-[1px] bg-primary/10"
                style={{ top: mouseY, left: 0, right: 0 }}
            />
            <motion.div 
                className="absolute w-[1px] bg-primary/10"
                style={{ left: mouseX, top: 0, bottom: 0 }}
            />

            {/* Magnetic Stalker Reticle */}
            <motion.div 
                className="absolute flex items-center justify-center pointer-events-none"
                style={{ 
                    x: stalkerX, 
                    y: stalkerY,
                    translateX: "-50%",
                    translateY: "-50%" 
                }}
            >
                {/* Outer Rotating Frame */}
                <motion.div
                    className="absolute border border-primary/20 rounded-sm"
                    animate={{ 
                        width: isHovering ? 50 : 30,
                        height: isHovering ? 50 : 30,
                        rotate: isHovering ? 90 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />

                {/* Corner Marks TL */}
                <motion.div
                    className="absolute w-2 h-2 border-t border-l border-primary shadow-[0_0_5px_var(--primary)]"
                    animate={{ 
                        x: isHovering ? -25 : -15, 
                        y: isHovering ? -25 : -15,
                        opacity: isHovering ? 1 : 0.6
                    }}
                />
                
                {/* Corner Marks BR */}
                <motion.div
                    className="absolute w-2 h-2 border-b border-r border-primary shadow-[0_0_5px_var(--primary)]"
                    animate={{ 
                        x: isHovering ? 25 : 15, 
                        y: isHovering ? 25 : 15,
                        opacity: isHovering ? 1 : 0.6
                    }}
                />

                {/* Central Data Readout (Hover Only) */}
                {isHovering && (
                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 40 }}
                    className="absolute whitespace-nowrap text-[8px] font-mono text-primary bg-black/80 px-1 border border-primary/20"
                  >
                    LOCK_ON: ACTV
                  </motion.div>
                )}

                {/* Inner Core Pointer */}
                <motion.div
                    className={`w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_var(--primary)] ${isHovering ? 'animate-pulse' : ''}`}
                    animate={{ scale: isHovering ? 2 : 1 }}
                />
            </motion.div>
        </div>
    );
}
