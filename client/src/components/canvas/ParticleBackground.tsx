import { useEffect, useRef } from "react";
import { noise } from "@chriscourses/perlin-noise";

// Define the Particle type
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

    // Type particles as an array of Particle objects
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
          color: `rgba(99, 102, 241, ${depth / 4})`,
        });
      }
    };

    createParticles();

    let mouseX = 0, mouseY = 0, isMouseMoving = false;

    // Add type to the event parameter
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
    let noiseTime = 0;

    const getDayProgress = () => {
      const now = new Date();
      const hours = now.getHours();
      return (hours + now.getMinutes() / 60) / 24; // Value between 0 (midnight) and 1 (next midnight)
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dayProgress = getDayProgress();

      const nightColor = "#0f172a";
      const dayColor = "#87CEFA";

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, nightColor);
      gradient.addColorStop(1, dayColor);

      // Smooth transition based on time
      const bgOpacity = Math.sin(dayProgress * Math.PI * 2) * 0.5 + 0.5;
      ctx.fillStyle = `rgba(15, 23, 42, ${1 - bgOpacity})`;
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

        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (isMouseMoving && distance < 120) {
          const force = Math.min(3 / distance, 0.05);
          p.speedX -= Math.cos(Math.atan2(dy, dx)) * force;
          p.speedY -= Math.sin(Math.atan2(dy, dx)) * force;
        } else if (!isMouseMoving && distance < 200) {
          const force = (distance / 200) * 0.001;
          p.speedX += dx * force;
          p.speedY += dy * force;
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

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 - distance / 500})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
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

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 w-full h-full" style={{ pointerEvents: "none" }} />;
}
