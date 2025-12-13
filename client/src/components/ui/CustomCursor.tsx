'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHere, setIsHere] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Check if device is mobile - if so, don't render custom cursor
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
        if (isMobile) return;

        setIsHere(true);

        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if target is clickable/interactive
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer') ||
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
    }, []);

    if (!isHere) return null;

    return (
        <>
            {/* Main Cursor Dot */}
            <motion.div
                className="fixed top-0 left-0 z-[9999] w-4 h-4 rounded-full bg-primary mix-blend-difference pointer-events-none"
                animate={{
                    x: mousePosition.x - 8,
                    y: mousePosition.y - 8,
                    scale: isHovering ? 0.5 : 1
                }}
                transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 300,
                    mass: 0.5
                }}
                style={{
                    boxShadow: "0 0 10px rgba(124, 58, 237, 0.5)"
                }}
            />

            {/* Trailing Ring */}
            <motion.div
                className="fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full border border-primary/50 pointer-events-none"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovering ? 2.5 : 1,
                    borderColor: isHovering ? "rgba(124, 58, 237, 0.2)" : "rgba(124, 58, 237, 0.5)",
                    backgroundColor: isHovering ? "rgba(124, 58, 237, 0.1)" : "transparent"
                }}
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 150,
                    mass: 0.8
                }}
            />
        </>
    );
}
