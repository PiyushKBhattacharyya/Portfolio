import React, { useEffect, useState, useRef } from "react";
import { SiReact, SiNodedotjs, SiJavascript, SiPython, SiTensorflow, SiPytorch, SiMongodb, SiDocker, SiGit } from "react-icons/si";

const techIcons = [
  { id: "React", icon: SiReact, color: "#61DAFB" },
  { id: "Node.js", icon: SiNodedotjs, color: "#539E43" },
  { id: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { id: "Python", icon: SiPython, color: "#3776AB" },
  { id: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
  { id: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
  { id: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { id: "Docker", icon: SiDocker, color: "#2496ED" },
  { id: "Git", icon: SiGit, color: "#F05032" },
];

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

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const positions = generateSpherePositions(techIcons.length, 100);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1000px",
        background: "inherit", // Keeps your original background
        overflow: "hidden",
      }}
    >
      <div
        ref={cloudRef}
        style={{
          width: "200px",
          height: "200px",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          animation: "spin 50s infinite linear",
        }}
      >
        {techIcons.map((tech, index) => {
          const pos = positions[index];
          return (
            <div
              key={tech.id}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transformOrigin: "center",
                transform: `translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px)`,
                color: tech.color,
                fontSize: "2rem",
                transition: "transform 0.1s",
                opacity: 0.9,
              }}
            >
              <tech.icon size={40} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
