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

    // Use '2d' with alpha for better performance
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    // Detect if device is mobile - define once and use throughout
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

    // Optimize canvas rendering - reduce quality on mobile
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = isMobile ? 'medium' : 'high';

    const resizeCanvas = () => {
      const zoomLevel = window.outerWidth / window.innerWidth;
      const effectivePixelRatio = Math.min(window.devicePixelRatio, 2);

      // Reset transform before scaling to prevent cumulative scale effects
      ctx.resetTransform();

      canvas.width = window.innerWidth * effectivePixelRatio;
      canvas.height = window.innerHeight * effectivePixelRatio;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.scale(effectivePixelRatio, effectivePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Particle[] = [];

    const createParticle = (depth: number, width: number, height: number): Particle => {
      // Helper to generate HSLA color string
      const randomRange = (min: number, max: number) => min + Math.random() * (max - min);

      let hue: number;
      if (theme === "night") {
        // Quantum Fluid Theme: Cyan (180-200) and Neon Purple (260-290)
        hue = Math.random() > 0.6
          ? randomRange(180, 200)  // Cyan
          : randomRange(260, 290); // Neon Violet
      } else {
        hue = Math.random() > 0.5
          ? randomRange(20, 60)
          : randomRange(320, 360);
      }
      const saturation = randomRange(80, 100);
      const lightness = randomRange(60, 90);
      const alpha = depth / 3;

      const particleColor = `hsla(${hue.toFixed(1)}, ${saturation.toFixed(1)}%, ${lightness.toFixed(1)}%, ${alpha.toFixed(2)})`;

      // Cache some random values to avoid repeated calls
      const baseSize = randomRange(0.5, 3.0);
      const baseSpeedX = (Math.random() - 0.5) * 0.5;
      const baseSpeedY = (Math.random() - 0.5) * 0.5;
      const baseAngle = Math.random() * Math.PI * 2;
      const baseAngleSpeed = (Math.random() - 0.5) * 0.02;
      const baseDriftX = (Math.random() - 0.5) * 0.1;
      const baseDriftY = (Math.random() - 0.5) * 0.1;
      const noiseOffsetX = Math.random() * 1000;
      const noiseOffsetY = Math.random() * 1000;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: baseSize * (depth / 3),
        speedX: baseSpeedX / depth,
        speedY: baseSpeedY / depth,
        angle: baseAngle,
        angleSpeed: baseAngleSpeed,
        driftX: baseDriftX,
        driftY: baseDriftY,
        noiseOffsetX,
        noiseOffsetY,
        depth,
        color: particleColor,
        exploded: false,
        life: 1,
      };
    };

    const createParticles = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const screenArea = width * height;

      const particleDensity = isMobile ? 1 / 10000 : 1 / 5000;

      const minParticles = isMobile ? 30 : 50;
      const maxParticlesAllowed = isMobile ? 100 : 200;

      const calculatedCount = Math.floor(screenArea * particleDensity);
      const maxParticles = Math.min(Math.max(calculatedCount, minParticles), maxParticlesAllowed);

      // Pre-allocate array size for potential slight perf gain
      particles.length = 0;

      for (let i = 0; i < maxParticles; i++) {
        const depth = Math.random() * 3 + 1;
        particles.push(createParticle(depth, width, height));
      }
    };

    createParticles();

    let mouseX = 0,
      mouseY = 0,
      isMouseMoving = false;
    // Initialize mouse position

    // Handle both mouse and touch events for interaction
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      // For touch events, use the first touch point
      if ('touches' in e) {
        if (e.touches.length > 0) {
          mouseX = e.touches[0].clientX;
          mouseY = e.touches[0].clientY;
        }
      } else {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }

      isMouseMoving = true;
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 300);
    };

    let mouseMoveTimeout: ReturnType<typeof setTimeout>;
    window.addEventListener("mousemove", handlePointerMove as EventListener);
    window.addEventListener("touchmove", handlePointerMove as EventListener, { passive: true });

    let animationId: ReturnType<typeof requestAnimationFrame>;
    let hue = 220;
    let noiseTime = 0;
    let colorShift = 0;

    // Track frame timing for mobile optimization
    let lastFrameTime = 0;
    let dynamicFPS = isMobile ? 45 : 60;
    let frameInterval = 1000 / dynamicFPS;

    const animateParticles = (timestamp: number) => {
      gradientCache.clear();

      const elapsed = timestamp - lastFrameTime;
      if (elapsed < frameInterval) {
        animationId = requestAnimationFrame(animateParticles);
        return;
      }
      lastFrameTime = timestamp;

      // Dynamically adjust FPS smoothly
      if (elapsed > frameInterval * 1.3 && dynamicFPS > 30) {
        dynamicFPS -= 5;
        frameInterval = 1000 / dynamicFPS;
      } else if (elapsed < frameInterval * 0.8 && dynamicFPS < 60) {
        dynamicFPS += 5;
        frameInterval = 1000 / dynamicFPS;
      }

      // Cache window size and isMobile locally
      const width = window.innerWidth;
      const height = window.innerHeight;
      const mobile = isMobile;

      // Clear background with gradient in one go
      ctx.clearRect(0, 0, width, height);

      const dynamicHue = (hue + Math.sin(colorShift * 0.01) * 30) % 360;
      const gradient = createBackgroundGradient(theme, dynamicHue);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      colorShift += 0.5;

      const len = particles.length;
      for (let i = 0; i < len; i++) {
        const particle = particles[i];

        // Cull out-of-bounds particles quickly
        if (
          particle.x < -20 ||
          particle.x > width + 20 ||
          particle.y < -20 ||
          particle.y > height + 20
        ) continue;

        if (particle.exploded) {
          handleParticleExplosion(particle);
        } else {
          updateParticleMovement(particle);
        }

        drawParticle(particle);

        if (!mobile || i % (mobile ? 8 : 6) === 0) {
          drawParticleConnections(particle, i);
        }
      }

      noiseTime += mobile ? 0.003 : 0.005;

      animationId = requestAnimationFrame(animateParticles);
    };

    const createBackgroundGradient = (theme: string, hue: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const outerWidth = window.outerWidth;

      const zoomLevel = outerWidth / width;

      // Create a cache key based on theme, hue (rounded), zoom level (rounded)
      const cacheKey = `${theme}_${Math.round(hue)}_${zoomLevel.toFixed(2)}_${width}x${height}`;

      // Return cached gradient if exists
      if (gradientCache.has(cacheKey)) {
        return gradientCache.get(cacheKey)!;
      }

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.max(width, height) * 0.8;

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);

      const saturationAdjust = Math.min(100, Math.max(70, 85 - (zoomLevel - 1) * 30));
      const lightnessAdjust = Math.min(5, Math.max(-5, (zoomLevel - 1) * 10));

      if (theme === "sunset") {
        const sunsetHue = (hue + 20) % 360;
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

      gradientCache.set(cacheKey, gradient);

      return gradient;
    };

    let globalPulseTime = 0; // updated once per frame outside this function
    let activeExplosions = 3;
    const handleParticleExplosion = (particle: Particle) => {
      if (particle.life <= 0) {
        activeExplosions = Math.max(0, activeExplosions - 1);
        resetParticle(particle);
        return;
      }

      particle.size *= 0.92;
      particle.life -= 0.04;

      // Use a smooth pulse effect based on globalPulseTime instead of performance.now()
      const pulse = 1 + 0.05 * Math.sin(globalPulseTime * 10); // pulsates between ~0.95 to 1.05
      particle.size *= pulse;
    };


    const resetParticle = (particle: Particle) => {
      particle.exploded = false;
      particle.size = Math.random() * 2 + 0.5;
      particle.life = 1;
      particle.x = Math.random() * window.innerWidth;
      particle.y = Math.random() * window.innerHeight;
    };

    const updateParticleMovement = (particle: Particle) => {
      // Get the current zoom level to adjust movement speed
      const zoomLevel = window.outerWidth / window.innerWidth;
      // Calculate a movement scale factor that compensates for zoom
      const movementScale = Math.max(0.5, Math.min(1.5, zoomLevel));

      const noiseX = noise(particle.noiseOffsetX, noiseTime) - 0.5;
      const noiseY = noise(particle.noiseOffsetY, noiseTime) - 0.5;

      // Scale movement based on zoom level for consistent visual speed
      particle.x += noiseX * 1.5 * (particle.depth / 3) * movementScale;
      particle.y += noiseY * 1.5 * (particle.depth / 3) * movementScale;

      particle.angle += particle.angleSpeed * movementScale;
      particle.x += (particle.speedX + Math.cos(particle.angle) * 0.3 + particle.driftX) * movementScale;
      particle.y += (particle.speedY + Math.sin(particle.angle) * 0.3 + particle.driftY) * movementScale;

      // Consistent friction regardless of zoom
      particle.speedX *= 0.98;
      particle.speedY *= 0.98;

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
      ctx.save(); // Save context state

      if (!isMobile) {
        ctx.shadowColor = particle.exploded
          ? "white"
          : theme === "night"
            ? "rgba(120, 120, 255, 0.5)"
            : "rgba(255, 180, 120, 0.5)";
        ctx.shadowBlur = particle.exploded ? 15 : particle.size * 2;
      } else if (particle.exploded) {
        ctx.shadowColor = "white";
        ctx.shadowBlur = 5;
      } else {
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
      }

      const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size);
      const baseColor = particle.color.replace(/[^,]+(?=\))/, "1");
      gradient.addColorStop(0, baseColor);
      gradient.addColorStop(0.6, particle.color);
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.restore(); // Restore context state
    };

    const gradientCache = new Map<string, CanvasGradient>();
    const drawParticleConnections = (particle: Particle, index: number) => {
      if (index % (isMobile ? 5 : 3) !== 0) return;

      const connectionDistance = isMobile ? 80 : 100;
      const maxConnections = isMobile ? 2 : 3;
      let connections = 0;
      const checkStep = isMobile ? 2 : 1;

      for (let j = index + checkStep; j < particles.length && connections < maxConnections; j += checkStep) {
        const other = particles[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          connections++;

          const opacity = 0.2 * (1 - dist / connectionDistance);

          if (isMobile) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(150, 150, 255, ${opacity})`;
            ctx.lineWidth = 0.6 * Math.min(particle.depth, other.depth) / 3;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          } else {
            // Use a stable key based on particle indices (smaller index first)
            const key = index < j ? `${index}-${j}-${opacity.toFixed(3)}` : `${j}-${index}-${opacity.toFixed(3)}`;

            let gradient = gradientCache.get(key);
            if (!gradient) {
              gradient = ctx.createLinearGradient(particle.x, particle.y, other.x, other.y);
              const color1 = particle.color.replace(/[^,]+(?=\))/, String(opacity));
              const color2 = other.color.replace(/[^,]+(?=\))/, String(opacity));
              gradient.addColorStop(0, color1);
              gradient.addColorStop(1, color2);

              gradientCache.set(key, gradient);
            }

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8 * Math.min(particle.depth, other.depth) / 3;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }

          if (dist < 30 && Math.random() < (isMobile ? 0.002 : 0.005)) {
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
      window.removeEventListener("mousemove", handlePointerMove as EventListener);
      window.removeEventListener("touchmove", handlePointerMove as EventListener);
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