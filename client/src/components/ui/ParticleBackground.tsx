import { useEffect, useRef } from "react";
import { noise } from "@chriscourses/perlin-noise";

// Define Particle structure
type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  angle: number;
  angleSpeed: number;
  driftX: number;
  driftY: number;
  noiseOffsetX: number;
  noiseOffsetY: number;
  depth: number;
  color: string;
  exploded: boolean;
  life: number;
};

// Props to control theme
type Props = {
  theme?: "night" | "sunset";
  interaction?: boolean;
};

export default function ParticleBackground({ theme = "night", interaction = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use '2d' with optimized options for better performance
    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
      willReadFrequently: false
    });
    if (!ctx) return;
    
    // Optimize canvas rendering - use medium quality for better performance
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'medium';

    const resizeCanvas = () => {
      // Get the current zoom level (1 is normal, 0.25 is 25% zoom)
      const zoomLevel = window.outerWidth / window.innerWidth;
      
      // Use a more stable approach for pixel ratio that accounts for zoom
      const effectivePixelRatio = Math.min(window.devicePixelRatio, 2);
      
      // Set canvas dimensions with consideration for zoom
      canvas.width = window.innerWidth * effectivePixelRatio;
      canvas.height = window.innerHeight * effectivePixelRatio;
      
      // Set the display size (css pixels)
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      // Scale the drawing context
      ctx.scale(effectivePixelRatio, effectivePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Particle[] = [];
    const createParticles = () => {
      // Adjust particle count based on screen size with a minimum threshold
      // This ensures consistent particle density at different zoom levels
      const screenArea = window.innerWidth * window.innerHeight;
      // Slightly reduce particle density for better performance
      const particleDensity = 1 / 6000; // One particle per 6000 square pixels
      const maxParticles = Math.min(
        Math.max(Math.floor(screenArea * particleDensity), 50), // Minimum of 50 particles
        250 // Maximum of 250 particles for better performance
      );
      
      for (let i = 0; i < maxParticles; i++) {
        const depth = Math.random() * 3 + 1;
        particles.push(createParticle(depth));
      }
    };

    const createParticle = (depth: number): Particle => {
      // Create a more varied color palette based on theme
      let particleColor: string;
      
      if (theme === "night") {
        // For night theme: blues, purples, and cyans
        const hue = Math.random() > 0.7
          ? 180 + Math.random() * 60  // cyan/blue tones
          : 240 + Math.random() * 60; // purple/violet tones
        const saturation = 70 + Math.random() * 30;
        const lightness = 70 + Math.random() * 30;
        particleColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${depth / 4})`;
      } else {
        // For sunset theme: oranges, pinks, and yellows
        const hue = Math.random() > 0.5
          ? 20 + Math.random() * 40   // orange/yellow tones
          : 320 + Math.random() * 40; // pink/magenta tones
        const saturation = 70 + Math.random() * 30;
        const lightness = 70 + Math.random() * 30;
        particleColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${depth / 4})`;
      }
      
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: (Math.random() * 2.5 + 0.5) * (depth / 3),
        speedX: ((Math.random() - 0.5) * 0.5) / depth,
        speedY: ((Math.random() - 0.5) * 0.5) / depth,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.02,
        driftX: (Math.random() - 0.5) * 0.1,
        driftY: (Math.random() - 0.5) * 0.1,
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000,
        depth,
        color: particleColor,
        exploded: false,
        life: 1,
      };
    };

    createParticles();

    let mouseX = 0,
      mouseY = 0,
      isMouseMoving = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 300);
    };

    let mouseMoveTimeout: ReturnType<typeof setTimeout>;
    window.addEventListener("mousemove", handleMouseMove);

    let animationId: ReturnType<typeof requestAnimationFrame>;
    let lastFrameTime = 0;
    let hue = 220;
    let noiseTime = 0;
    let colorShift = 0;

    const animateParticles = (timestamp: number) => {
      // Calculate delta time for smooth animation regardless of frame rate
      if (!lastFrameTime) lastFrameTime = timestamp;
      const deltaTime = timestamp - lastFrameTime;
      lastFrameTime = timestamp;
      
      colorShift += 0.5 * (deltaTime / 16.67); // Normalize to 60fps
      const dynamicHue = (hue + Math.sin(colorShift * 0.01) * 30) % 360;
      const gradient = createBackgroundGradient(theme, dynamicHue);

      // Clear the canvas with a solid color first to prevent artifacts
      ctx.fillStyle = theme === "night" ? "#0a0a1a" : "#1a0a0a";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Then apply the gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Process particles in batches for better performance
      const batchSize = 30;
      for (let i = 0; i < particles.length; i += batchSize) {
        const end = Math.min(i + batchSize, particles.length);
        
        for (let j = i; j < end; j++) {
          const particle = particles[j];
          
          if (particle.exploded) {
            handleParticleExplosion(particle);
          } else {
            updateParticleMovement(particle, deltaTime);
          }

          drawParticle(particle);
          
          // Only draw connections for a subset of particles
          if (j % 4 === 0) {
            drawParticleConnections(particle, j);
          }
        }
      }

      noiseTime += 0.005 * (deltaTime / 16.67); // Normalize to 60fps
      
      animationId = requestAnimationFrame(animateParticles);
    };

    const createBackgroundGradient = (theme: string, hue: number) => {
      // Get the current zoom level to adjust gradient positioning
      const zoomLevel = window.outerWidth / window.innerWidth;
      
      // Calculate center points in actual canvas coordinates
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate radius based on the viewport dimensions
      // Use the larger dimension to ensure full coverage
      const radius = Math.max(window.innerWidth, window.innerHeight) * 0.8;
      
      // Create gradient with zoom-adjusted positioning
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius
      );

      // Adjust color saturation and lightness based on zoom level
      // This helps maintain color consistency at different zoom levels
      const saturationAdjust = Math.min(100, Math.max(70, 85 - (zoomLevel - 1) * 30));
      const lightnessAdjust = Math.min(5, Math.max(-5, (zoomLevel - 1) * 10));

      if (theme === "sunset") {
        const sunsetHue = (hue + 20) % 360; // Offset to a warmer tone
        gradient.addColorStop(0, `hsl(${sunsetHue}, ${saturationAdjust}%, ${30 + lightnessAdjust}%)`);
        gradient.addColorStop(0.3, `hsl(${(sunsetHue + 15) % 360}, ${saturationAdjust - 10}%, ${25 + lightnessAdjust}%)`);
        gradient.addColorStop(0.6, `hsl(${(sunsetHue + 30) % 360}, ${saturationAdjust - 15}%, ${20 + lightnessAdjust}%)`);
        gradient.addColorStop(1, `hsl(${(sunsetHue + 45) % 360}, ${saturationAdjust - 20}%, ${12 + lightnessAdjust}%)`);
      } else {
        gradient.addColorStop(0, `hsl(${hue}, ${saturationAdjust}%, ${18 + lightnessAdjust}%)`);
        gradient.addColorStop(0.3, `hsl(${(hue + 15) % 360}, ${saturationAdjust - 5}%, ${15 + lightnessAdjust}%)`);
        gradient.addColorStop(0.6, `hsl(${(hue + 30) % 360}, ${saturationAdjust - 10}%, ${12 + lightnessAdjust}%)`);
        gradient.addColorStop(1, `hsl(${(hue + 45) % 360}, ${saturationAdjust - 15}%, ${8 + lightnessAdjust}%)`);
      }

      return gradient;
    };
    const handleParticleExplosion = (particle: Particle) => {
      particle.size *= 0.94;
      particle.life -= 0.03;
      
      // Add a pulsing effect during explosion
      const pulseRate = Math.sin(Date.now() * 0.01) * 0.1 + 0.9;
      particle.size *= pulseRate;
      
      if (particle.life <= 0) {
        resetParticle(particle);
      }
    };

    const resetParticle = (particle: Particle) => {
      particle.exploded = false;
      particle.size = Math.random() * 2 + 0.5;
      particle.life = 1;
      particle.x = Math.random() * window.innerWidth;
      particle.y = Math.random() * window.innerHeight;
    };

    const updateParticleMovement = (particle: Particle, deltaTime: number) => {
      // Get the current zoom level to adjust movement speed
      const zoomLevel = window.outerWidth / window.innerWidth;
      // Calculate a movement scale factor that compensates for zoom
      const movementScale = Math.max(0.5, Math.min(1.5, zoomLevel));
      
      // Normalize movement to 60fps regardless of actual frame rate
      const timeScale = deltaTime / 16.67;
      
      const noiseX = noise(particle.noiseOffsetX, noiseTime) - 0.5;
      const noiseY = noise(particle.noiseOffsetY, noiseTime) - 0.5;

      // Scale movement based on zoom level and frame rate for consistent visual speed
      particle.x += noiseX * 1.5 * (particle.depth / 3) * movementScale * timeScale;
      particle.y += noiseY * 1.5 * (particle.depth / 3) * movementScale * timeScale;

      particle.angle += particle.angleSpeed * movementScale * timeScale;
      particle.x += (particle.speedX + Math.cos(particle.angle) * 0.3 + particle.driftX) * movementScale * timeScale;
      particle.y += (particle.speedY + Math.sin(particle.angle) * 0.3 + particle.driftY) * movementScale * timeScale;

      // Consistent friction regardless of zoom and frame rate
      particle.speedX *= Math.pow(0.98, timeScale);
      particle.speedY *= Math.pow(0.98, timeScale);

      // Add a small buffer to prevent edge artifacts when zooming
      const buffer = 5;
      
      // Handle boundary wrapping with buffer
      if (particle.x > window.innerWidth + buffer) particle.x = -buffer;
      if (particle.x < -buffer) particle.x = window.innerWidth + buffer;
      if (particle.y > window.innerHeight + buffer) particle.y = -buffer;
      if (particle.y < -buffer) particle.y = window.innerHeight + buffer;

      applyMouseEffects(particle);
    };

    const applyMouseEffects = (particle: Particle) => {
      if (!interaction) return;
      
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const interactionRadius = 150;

      if (isMouseMoving && distance < interactionRadius) {
        // Repel particles when mouse is moving
        const force = Math.min(5 / distance, 0.08);
        particle.speedX -= Math.cos(Math.atan2(dy, dx)) * force;
        particle.speedY -= Math.sin(Math.atan2(dy, dx)) * force;
        
        // Chance to trigger explosion based on proximity
        if (distance < 50 && Math.random() < 0.05) {
          particle.exploded = true;
          particle.speedX = (Math.random() - 0.5) * 3;
          particle.speedY = (Math.random() - 0.5) * 3;
        }
      } else if (!isMouseMoving && distance < interactionRadius * 1.5) {
        // Gently attract particles when mouse is stationary
        const force = (distance / (interactionRadius * 1.5)) * 0.002;
        particle.speedX += dx * force;
        particle.speedY += dy * force;
      }
    };

    const drawParticle = (particle: Particle) => {
      // Add glow effect based on particle state
      ctx.shadowColor = particle.exploded ? "white" : theme === "night" ? "rgba(120, 120, 255, 0.5)" : "rgba(255, 180, 120, 0.5)";
      ctx.shadowBlur = particle.exploded ? 15 : particle.size * 2;
      
      // Draw the particle with a gradient for more depth
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size
      );
      
      // Extract base color from the particle's color
      const baseColor = particle.color.replace(/[^,]+(?=\))/, '1');
      
      gradient.addColorStop(0, baseColor);
      gradient.addColorStop(0.6, particle.color);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Reset shadow for performance
      ctx.shadowBlur = 0;
    };

    const drawParticleConnections = (particle: Particle, index: number) => {
      // Only check connections for every 4th particle to improve performance
      if (index % 4 !== 0) return;
      
      const connectionDistance = 90; // Slightly reduced for performance
      const maxConnections = 2; // Reduced for better performance
      let connections = 0;
      
      for (let j = index + 1; j < particles.length && connections < maxConnections; j++) {
        const other = particles[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          connections++;
          
          // Calculate opacity based on distance
          const opacity = 0.2 * (1 - dist / connectionDistance);
          
          // Create gradient line for more visual appeal
          const gradient = ctx.createLinearGradient(
            particle.x, particle.y, other.x, other.y
          );
          
          // Extract colors from particles for the connection
          const color1 = particle.color.replace(/[^,]+(?=\))/, String(opacity));
          const color2 = other.color.replace(/[^,]+(?=\))/, String(opacity));
          
          gradient.addColorStop(0, color1);
          gradient.addColorStop(1, color2);
          
          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 0.8 * Math.min(particle.depth, other.depth) / 3;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();

          // Chance for particles to explode when they connect
          if (dist < 30 && Math.random() < 0.005) {
            particle.exploded = true;
            particle.speedX = (Math.random() - 0.5) * 2;
            particle.speedY = (Math.random() - 0.5) * 2;
          }
        }
      }
    };

    // Start animation with timestamp
    animationId = requestAnimationFrame(animateParticles);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [theme, interaction]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full"
      style={{
        pointerEvents: "none",
        willChange: "transform", // Optimize for animations
        backfaceVisibility: "hidden", // Prevent flickering
        transform: "translateZ(0)" // Force hardware acceleration
      }}
    />
  );
}