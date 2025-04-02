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
      canvas.height = window.innerHeight * 3; // Extend canvas height
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

    let noiseTime = 0;

    const animate = () => {
      const scrollPosition = window.scrollY || 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const darknessFactor = Math.min(scrollPosition / maxScroll, 1);

      // Gradient that gets progressively darker as you scroll
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgb(20, 20, 20)"); // Lighter black at the top
      gradient.addColorStop(darknessFactor, `rgb(${10 - darknessFactor * 10}, ${10 - darknessFactor * 10}, ${10 - darknessFactor * 10})`); // Darker as you scroll
      gradient.addColorStop(1, "rgb(0, 0, 0)"); // Full black at the bottom

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      noiseTime += 0.01;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

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

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
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
  