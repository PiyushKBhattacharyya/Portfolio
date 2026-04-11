'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const checkMobile = () => {
          setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768);
        };
        checkMobile();

        if (isMobile) return;

        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                window.getComputedStyle(target).cursor === 'pointer'
            ) {
                setIsHovering(true);
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
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            {/* Horizontal Line */}
            <motion.div 
                className="absolute h-[1px] bg-primary/20"
                animate={{ 
                    top: mousePosition.y,
                    left: 0,
                    right: 0
                }}
                transition={{ type: "tween", ease: "linear", duration: 0 }}
            />
            {/* Vertical Line */}
            <motion.div 
                className="absolute w-[1px] bg-primary/20"
                animate={{ 
                    left: mousePosition.x,
                    top: 0,
                    bottom: 0
                }}
                transition={{ type: "tween", ease: "linear", duration: 0 }}
            />

            {/* Corner Bracket TL */}
            <motion.div
                className="absolute w-4 h-4 border-t border-l border-primary shadow-[0_0_8px_var(--primary)]"
                animate={{
                    x: mousePosition.x - (isHovering ? 20 : 15),
                    y: mousePosition.y - (isHovering ? 20 : 15),
                    scale: isHovering ? 1.2 : 1
                }}
            />
            {/* Corner Bracket BR */}
            <motion.div
                className="absolute w-4 h-4 border-b border-r border-primary shadow-[0_0_8px_var(--primary)]"
                animate={{
                    x: mousePosition.x + (isHovering ? 4 : 0),
                    y: mousePosition.y + (isHovering ? 4 : 0),
                    scale: isHovering ? 1.2 : 1
                }}
            />

            {/* Center Pointer */}
            <motion.div
                className="absolute w-1 h-1 bg-primary"
                animate={{
                    x: mousePosition.x - 2,
                    y: mousePosition.y - 2,
                    scale: isHovering ? 0 : 1
                }}
            />
        </div>
    );
}
