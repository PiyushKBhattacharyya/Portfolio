import { useEffect, useRef } from "react";
import { noise } from "@chriscourses/perlin-noise";

// Define the Particle type with all necessary properties
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

    // Resizes the canvas to match the window dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Array to store all the particles
    const particles: Particle[] = [];

    // Create particles and add them to the array
    const createParticles = () => {
      const maxParticles = Math.min(window.innerWidth / 10, 150);
      for (let i = 0; i < maxParticles; i++) {
        const depth = Math.random() * 3 + 1;
        particles.push(createParticle(depth));
      }
    };

    // Helper function to generate a particle
    const createParticle = (depth: number): Particle => ({
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
      color: `rgba(255, 255, 255, ${depth / 4})`,
      exploded: false,
      life: 1,
    });

    createParticles();

    let mouseX = 0, mouseY = 0, isMouseMoving = false;

    // Handle mouse movement and set timeout to detect movement
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

    // Main animation loop to update canvas and particles
    const animateParticles = () => {
      colorShift += 0.5;
      const dynamicHue = (hue + Math.sin(colorShift * 0.01) * 30) % 360;
      const gradient = createBackgroundGradient(dynamicHue);

      // Set background gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw each particle
      particles.forEach((particle, i) => {
        if (particle.exploded) {
          handleParticleExplosion(particle);
        } else {
          updateParticleMovement(particle);
        }

        drawParticle(particle);
        drawParticleConnections(particle, i);
      });

      // Request next animation frame
      animationId = requestAnimationFrame(animateParticles);
    };

    // Creates a background gradient based on the dynamic hue
    const createBackgroundGradient = (dynamicHue: number) => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `hsl(${dynamicHue}, 60%, 15%)`);
      gradient.addColorStop(0.5, `hsl(${(dynamicHue + 30) % 360}, 50%, 10%)`);
      gradient.addColorStop(1, `hsl(${(dynamicHue + 60) % 360}, 55%, 12%)`);
      return gradient;
    };

    // Handles the particle explosion effect
    const handleParticleExplosion = (particle: Particle) => {
      particle.size *= 0.95;
      particle.life -= 0.02;
      if (particle.life <= 0) {
        resetParticle(particle);
      }
    };

    // Resets the particle to its initial state
    const resetParticle = (particle: Particle) => {
      particle.exploded = false;
      particle.size = Math.random() * 2 + 0.5;
      particle.life = 1;
      particle.x = Math.random() * canvas.width;
      particle.y = Math.random() * canvas.height;
    };

    // Updates the particle's position and movement based on noise and other factors
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

      // Wrap particles around the canvas edges
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.y > canvas.height) particle.y = 0;
      if (particle.y < 0) particle.y = canvas.height;

      // Apply mouse attraction or repulsion
      applyMouseEffects(particle);
    };

    // Applies mouse effects based on proximity
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

    // Draws a single particle on the canvas
    const drawParticle = (particle: Particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    };

    // Draws connections between particles that are close to each other
    const drawParticleConnections = (particle: Particle, index: number) => {
      for (let j = index + 1; j < particles.length; j++) {
        const otherParticle = particles[j];
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 20) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 - distance / 100})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();

          // Randomly trigger particle explosions on close proximity
          if (Math.random() < 0.01) {
            particle.exploded = true;
            particle.speedX = (Math.random() - 0.5) * 2;
            particle.speedY = (Math.random() - 0.5) * 2;
          }
        }
      }
    };

    // Start the particle animation loop
    animateParticles();

    // Cleanup on component unmount
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