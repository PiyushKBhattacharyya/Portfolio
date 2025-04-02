import React, { useEffect, useState, useRef } from "react";
import { IconCloud } from "../magicui/icon-cloud";

const slugs = [
  "typescript", "javascript", "dart", "java", "react", "flutter", "android", "html5", "css3", "nextdotjs",
  "nodedotjs", "express", "postgresql", "vercel",  "docker", "git",  "github", "visualstudiocode", "androidstudio", "figma",
];

const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);

const generateSpherePositions = (count, radius) => {
  let positions = [];
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;

    positions.push({
      x: radius * Math.cos(theta) * Math.sin(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(phi),
    });
  }
  return positions;
};

export default function InsaneTechCloud() {
  const cloudRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * -2;
      setRotation({ x: y * 15, y: x * 15 });
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth - 0.5) * 2;
        const y = (touch.clientY / window.innerHeight - 0.5) * -2;
        setRotation({ x: y * 15, y: x * 15 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1000px",
        background: "inherit",
        overflow: "hidden",
      }}
    >
      <IconCloud images={images} />
    </div>
  );
}
