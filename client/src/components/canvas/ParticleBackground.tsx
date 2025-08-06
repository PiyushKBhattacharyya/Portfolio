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

export default function ParticleBackground({ theme = "night" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Particle[] = [];
    const createParticles = () => {
      const maxParticles = Math.min(window.innerWidth / 10, 400);
      for (let i = 0; i < maxParticles; i++) {
        const depth = Math.random() * 3 + 1;
        particles.push(createParticle(depth));
      }
    };

    const createParticle = (depth: number): Particle => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: (Math.random() * 2 + 0.5) * (depth / 3),
      speedX: ((Math.random() - 0.5) * 0.5) / depth,
      speedY: ((Math.random() - 0.5) * 0.5) / depth,
      angle: Math.random() * Math.PI * 2,
      angleSpeed: (Math.random() - 0.5) * 0.02,
      driftX: (Math.random() - 0.5) * 0.1,
      driftY: (Math.random() - 0.5) * 0.1,
      noiseOffsetX: Math.random() * 1000,
      noiseOffsetY: Math.random() * 1000,
      depth,
      color: `rgba(255, 255, 255, ${depth / 4})`,
      exploded: false,
      life: 1,
    });

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
    let hue = 220;
    let noiseTime = 0;
    let colorShift = 0;

    const animateParticles = () => {
      colorShift += 0.5;
      const dynamicHue = (hue + Math.sin(colorShift * 0.01) * 30) % 360;
      const gradient = createBackgroundGradient(theme, dynamicHue);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        if (particle.exploded) {
          handleParticleExplosion(particle);
        } else {
          updateParticleMovement(particle);
        }

        drawParticle(particle);
        drawParticleConnections(particle, i);
      });

      noiseTime += 0.005;
      animationId = requestAnimationFrame(animateParticles);
    };

    const createBackgroundGradient = (theme: string, hue: number) => {
      const gradient = ctx.createLinearGradient(0, 0, window.innerWidth, window.innerHeight);

      if (theme === "sunset") {
        const sunsetHue = (hue + 20) % 360; // Offset to a warmer tone
        gradient.addColorStop(0, `hsl(${sunsetHue}, 70%, 25%)`);
        gradient.addColorStop(0.5, `hsl(${(sunsetHue + 20) % 360}, 65%, 20%)`);
        gradient.addColorStop(1, `hsl(${(sunsetHue + 40) % 360}, 60%, 15%)`);
      } else {
        gradient.addColorStop(0, `hsl(${hue}, 60%, 15%)`);
        gradient.addColorStop(0.5, `hsl(${(hue + 30) % 360}, 50%, 10%)`);
        gradient.addColorStop(1, `hsl(${(hue + 60) % 360}, 55%, 12%)`);
      }

      return gradient;
    };
    const handleParticleExplosion = (particle: Particle) => {
      particle.size *= 0.95;
      particle.life -= 0.02;
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

    const updateParticleMovement = (particle: Particle) => {
      const noiseX = noise(particle.noiseOffsetX, noiseTime) - 0.5;
      const noiseY = noise(particle.noiseOffsetY, noiseTime) - 0.5;

      particle.x += noiseX * 1.5 * (particle.depth / 3);
      particle.y += noiseY * 1.5 * (particle.depth / 3);

      particle.angle += particle.angleSpeed;
      particle.x += particle.speedX + Math.cos(particle.angle) * 0.3 + particle.driftX;
      particle.y += particle.speedY + Math.sin(particle.angle) * 0.3 + particle.driftY;

      particle.speedX *= 0.98;
      particle.speedY *= 0.98;

      if (particle.x > window.innerWidth) particle.x = 0;
      if (particle.x < 0) particle.x = window.innerWidth;
      if (particle.y > window.innerHeight) particle.y = 0;
      if (particle.y < 0) particle.y = window.innerHeight;

      applyMouseEffects(particle);
    };

    const applyMouseEffects = (particle: Particle) => {
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (isMouseMoving && distance < 100) {
        const force = Math.min(3 / distance, 0.05);
        particle.speedX -= Math.cos(Math.atan2(dy, dx)) * force;
        particle.speedY -= Math.sin(Math.atan2(dy, dx)) * force;
      } else if (!isMouseMoving && distance < 200) {
        const force = (distance / 200) * 0.001;
        particle.speedX += dx * force;
        particle.speedY += dy * force;
      }
    };

    const drawParticle = (particle: Particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.shadowColor = particle.exploded ? "white" : "transparent";
      ctx.shadowBlur = particle.exploded ? 10 : 0;
      ctx.fill();
    };

    const drawParticleConnections = (particle: Particle, index: number) => {
      for (let j = index + 1; j < particles.length; j++) {
        const other = particles[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 20) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 - dist / 100})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();

          if (Math.random() < 0.01) {
            particle.exploded = true;
            particle.speedX = (Math.random() - 0.5) * 2;
            particle.speedY = (Math.random() - 0.5) * 2;
          }
        }
      }
    };

    animateParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}