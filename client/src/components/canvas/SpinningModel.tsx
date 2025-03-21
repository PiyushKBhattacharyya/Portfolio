import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function SpinningModel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions dynamically
    const size = Math.min(300, window.innerWidth * 0.8);
    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;
    let rotation = 0;
    let pulsate = 0;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      rotation += 0.02;
      pulsate += 0.05;
      const baseRadius = size * 0.35;
      const radius = baseRadius * (1 + Math.sin(pulsate) * 0.07);

      // Radial gradient for a glowing effect
      const gradient = ctx.createRadialGradient(
        centerX + 20, centerY - 20, 0,
        centerX, centerY, radius
      );
      gradient.addColorStop(0, "#9A8CFF");
      gradient.addColorStop(0.5, "#7C3AED");
      gradient.addColorStop(1, "#4C1D95");

      // Draw main sphere
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.shadowColor = "rgba(140, 80, 255, 0.5)";
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Add highlight for depth
      ctx.beginPath();
      ctx.arc(centerX - radius * 0.3, centerY - radius * 0.3, radius * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      ctx.fill();

      // Rotating "orbiting" elements
      for (let i = 0; i < 8; i++) {
        const angle = rotation + (i * Math.PI / 4);
        const x = centerX + Math.cos(angle) * radius * 0.85;
        const y = centerY + Math.sin(angle) * radius * 0.85;
        const size = radius * 0.12 * (0.85 + Math.sin(pulsate + i) * 0.2);

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fill();
      }

      // Animated rings
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius * 1.3, radius * 0.4, rotation, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(147, 51, 234, 0.3)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius * 1.15, radius * 0.6, rotation + Math.PI / 3, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(59, 130, 246, 0.2)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <motion.div 
      className="relative" 
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <canvas ref={canvasRef} className="rounded-full shadow-lg shadow-purple-500/30" />
    </motion.div>
  );
}
