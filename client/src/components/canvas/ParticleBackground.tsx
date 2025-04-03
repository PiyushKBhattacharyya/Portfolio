import { useEffect, useRef } from "react";
import { noise } from "@chriscourses/perlin-noise";

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

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Particle[] = [];

    const createParticles = () => {
      const particleCount = Math.min(window.innerWidth / 10, 150);
      for (let i = 0; i < particleCount; i++) {
        const depth = Math.random() * 3 + 1;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
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
          color: `rgba(255, 255, 255, ${depth / 4})`, // White particles for contrast
          exploded: false,
          life: 1,
        });
      }
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
    let hue = 220;
    let noiseTime = 0;
    let colorShift = 0;

    const animate = () => {
      colorShift += 0.5;
      const dynamicHue = (hue + Math.sin(colorShift * 0.01) * 30) % 360;
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `hsl(${dynamicHue}, 60%, 15%)`);
      gradient.addColorStop(0.5, `hsl(${(dynamicHue + 30) % 360}, 50%, 10%)`);
      gradient.addColorStop(1, `hsl(${(dynamicHue + 60) % 360}, 55%, 12%)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);


      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.exploded) {
          p.size *= 0.95;
          p.life -= 0.02;
          if (p.life <= 0) {
            p.exploded = false;
            p.size = Math.random() * 2 + 0.5;
            p.life = 1;
            p.x = Math.random() * canvas.width;
            p.y = Math.random() * canvas.height;
          }
        } else {
          const noiseX = noise(p.noiseOffsetX, noiseTime) - 0.5;
          const noiseY = noise(p.noiseOffsetY, noiseTime) - 0.5;

          p.x += noiseX * 1.5 * (p.depth / 3);
          p.y += noiseY * 1.5 * (p.depth / 3);

          p.angle += p.angleSpeed;
          p.x += p.speedX + Math.cos(p.angle) * 0.3 + p.driftX;
          p.y += p.speedY + Math.sin(p.angle) * 0.3 + p.driftY;

          p.speedX *= 0.98;
          p.speedY *= 0.98;

          if (p.x > canvas.width) p.x = 0;
          if (p.x < 0) p.x = canvas.width;
          if (p.y > canvas.height) p.y = 0;
          if (p.y < 0) p.y = canvas.height;

          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (isMouseMoving && distance < 100) {
            const force = Math.min(3 / distance, 0.05);
            p.speedX -= Math.cos(Math.atan2(dy, dx)) * force;
            p.speedY -= Math.sin(Math.atan2(dy, dx)) * force;
          } else if (!isMouseMoving && distance < 200) {
            const force = (distance / 200) * 0.001;
            p.speedX += dx * force;
            p.speedY += dy * force;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 20) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 - distance / 100})`; // Subtle white lines
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            if (Math.random() < 0.01) {
              p.exploded = true;
              p.speedX = (Math.random() - 0.5) * 2;
              p.speedY = (Math.random() - 0.5) * 2;
            }
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
} 