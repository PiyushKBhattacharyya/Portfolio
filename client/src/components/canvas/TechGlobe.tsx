import React, { useRef, useEffect, useState } from 'react';
import { TECH_STACK } from '@/lib/constants';
import { SiReact, SiNodedotjs, SiJavascript, SiPython, SiTensorflow, SiPytorch, SiMongodb, SiDocker, SiGit } from 'react-icons/si';
import { renderToString } from 'react-dom/server';
import { motion } from 'framer-motion';

interface TechIconPosition {
  id: string;
  orbit: number; // Orbit distance
  angle: number; // Current angle
  speed: number; // Rotation speed
  size: number;  // Icon size
  icon: React.ReactNode;
  orbitTilt: number; // Tilt of the orbit
  orbitRotation: number; // Rotation of the orbit
}

export default function TechGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number>(0);
  const iconsLoadedRef = useRef<boolean>(false);
  
  // Map of tech names to icon components with colors (smaller sizes)
  const techIcons: Record<string, React.ReactNode> = {
    "React": <SiReact color="#61DAFB" size={24} />,
    "Node.js": <SiNodedotjs color="#539E43" size={24} />,
    "JavaScript": <SiJavascript color="#F7DF1E" size={24} />,
    "Python": <SiPython color="#3776AB" size={24} />,
    "TensorFlow": <SiTensorflow color="#FF6F00" size={24} />,
    "PyTorch": <SiPytorch color="#EE4C2C" size={24} />,
    "MongoDB": <SiMongodb color="#47A248" size={24} />,
    "Docker": <SiDocker color="#2496ED" size={24} />,
    "Git": <SiGit color="#F05032" size={24} />
  };

  // Create initial positions for the icons in different orbits
  const createIconPositions = (width: number, height: number): TechIconPosition[] => {
    const minOrbit = Math.min(width, height) * 0.2;
    const maxOrbit = Math.min(width, height) * 0.4;
    
    // Distribute icons across different orbits
    return TECH_STACK.map((tech, index) => {
      // Distribute icons in 3 distinct orbits
      const orbitIndex = index % 3;
      const orbitRadius = minOrbit + (orbitIndex * ((maxOrbit - minOrbit) / 2));
      
      // Initial angle based on position in orbit
      const orbitPositions = TECH_STACK.filter((_, i) => i % 3 === orbitIndex).length;
      const positionInOrbit = TECH_STACK.filter((_, i) => i % 3 === orbitIndex).indexOf(tech);
      const initialAngle = (positionInOrbit / orbitPositions) * Math.PI * 2;
      
      // Each orbit has different speed and tilt
      const speed = 0.003 + (orbitIndex * 0.001); // Slower rotation
      const orbitTilt = Math.PI / 6 + (orbitIndex * Math.PI / 12); // Different tilts
      const orbitRotation = (orbitIndex * Math.PI / 4); // Different rotations
      
      // Size varies slightly by orbit
      const size = 18 + (orbitIndex * 2);
      
      return {
        id: tech.name,
        orbit: orbitRadius,
        angle: initialAngle,
        speed,
        size,
        icon: techIcons[tech.name],
        orbitTilt,
        orbitRotation
      };
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const { width, height } = canvasRef.current.parentElement.getBoundingClientRect();
        setDimensions({ width, height });
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const globeRadius = Math.min(dimensions.width, dimensions.height) * 0.15;
    
    // Create icon positions
    const iconPositions = createIconPositions(dimensions.width, dimensions.height);
    
    // Convert SVG icons to images for drawing
    const iconImages = new Map<string, HTMLCanvasElement>();
    let loadedIcons = 0;
    
    iconPositions.forEach(({ id, icon, size }) => {
      // Convert React SVG to string
      const svgString = renderToString(icon as React.ReactElement);
      
      // Create image from SVG
      const img = new Image();
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
      
      // Create offscreen canvas for this icon
      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = size * 2;
      offscreenCanvas.height = size * 2;
      
      img.onload = () => {
        const offCtx = offscreenCanvas.getContext('2d');
        if (offCtx) {
          offCtx.drawImage(img, 0, 0, size * 2, size * 2);
          loadedIcons++;
          
          // Start animation when all icons are loaded
          if (loadedIcons === iconPositions.length) {
            iconsLoadedRef.current = true;
          }
        }
      };
      
      iconImages.set(id, offscreenCanvas);
    });

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw the globe
      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, globeRadius
      );
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
      gradient.addColorStop(1, 'rgba(99, 102, 241, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw the globe grid
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
      ctx.lineWidth = 1;
      
      // Draw longitude lines
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI;
        ctx.beginPath();
        ctx.ellipse(
          centerX, centerY,
          globeRadius, globeRadius * Math.abs(Math.cos(time * 0.1)),
          angle, 0, Math.PI * 2
        );
        ctx.stroke();
      }
      
      // Draw latitude lines
      for (let i = 1; i < 5; i++) {
        const radius = globeRadius * (i / 5);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Only draw icons if all images are loaded
      if (iconsLoadedRef.current) {
        // First, update all icon positions
        iconPositions.forEach(icon => {
          icon.angle += icon.speed;
        });
        
        // Draw orbits first so they appear behind the icons
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.6)';
        ctx.lineWidth = 1.5;
        
        // Draw each orbit
        iconPositions.forEach((icon, index) => {
          if (index % 3 === 0) { // Draw once per orbit
            const orbitIndex = Math.floor(index / 3);
            const orbit = icon.orbit;
            
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(icon.orbitRotation);
            ctx.beginPath();
            ctx.scale(1, Math.sin(icon.orbitTilt)); // Apply tilt
            ctx.arc(0, 0, orbit, 0, Math.PI * 2);
            ctx.restore();
            ctx.stroke();
          }
        });
        
        // Then draw all icons on their orbits
        iconPositions.forEach(icon => {
          const x = centerX + Math.cos(icon.angle) * icon.orbit * Math.cos(icon.orbitRotation) - 
                    Math.sin(icon.angle) * icon.orbit * Math.sin(icon.orbitTilt) * Math.sin(icon.orbitRotation);
          
          const y = centerY + Math.cos(icon.angle) * icon.orbit * Math.sin(icon.orbitRotation) * Math.cos(icon.orbitTilt) + 
                    Math.sin(icon.angle) * icon.orbit * Math.sin(icon.orbitTilt) * Math.cos(icon.orbitRotation);
            
          // Get icon image
          const iconImg = iconImages.get(icon.id);
          if (iconImg) {
            ctx.save();
            ctx.translate(x, y);
            
            // Draw the icon
            ctx.drawImage(iconImg, -icon.size, -icon.size, icon.size * 2, icon.size * 2);
            ctx.restore();
          }
        });
      }
      
      time += 0.01;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions]);

  return (
    <motion.div 
      className="w-full h-[500px] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full" 
      />
    </motion.div>
  );
}