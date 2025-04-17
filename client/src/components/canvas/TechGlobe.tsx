import React, { useEffect, useState, useRef } from "react";
import { IconCloud } from "../magicui/icon-cloud";

// List of tech stack items used in the project
const techStackSlugs = [
  "typescript", "javascript", "dart", "java", "react", "flutter", "android", "html5", "css3", "nextdotjs",
  "nodedotjs", "express", "postgresql", "vercel", "docker", "git", "github", "visualstudiocode", "androidstudio", "figma",
  "pytorch", "tensorflow", "scikitlearn"
];

// Generate image URLs for each tech stack item
const techStackImages = techStackSlugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);

// Function to calculate positions for the cloud items arranged in a spherical pattern
const generateSphericalPositions = (itemCount, radius) => {
  let positions = [];
  
  // Loop to calculate each position based on spherical coordinates
  for (let i = 0; i < itemCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / itemCount);
    const theta = Math.sqrt(itemCount * Math.PI) * phi;

    // Push the calculated position to the array
    positions.push({
      x: radius * Math.cos(theta) * Math.sin(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(phi),
    });
  }
  return positions;
};

// Main component for displaying the interactive tech cloud
export default function TechCloud() {
  const cloudRef = useRef(null);  // Reference to the cloud container
  const [cloudRotation, setCloudRotation] = useState({ x: 0, y: 0 });  // Rotation state for the cloud

  useEffect(() => {
    // Handle mouse movement to update cloud rotation based on cursor position
    const handleMouseMove = (e) => {
      const xRotation = (e.clientX / window.innerWidth - 0.5) * 2;
      const yRotation = (e.clientY / window.innerHeight - 0.5) * -2;
      setCloudRotation({ x: yRotation * 15, y: xRotation * 15 });
    };

    // Handle touch movement to update cloud rotation based on touch position
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const xRotation = (touch.clientX / window.innerWidth - 0.5) * 5;
        const yRotation = (touch.clientY / window.innerHeight - 0.5) * -5;
        setCloudRotation({ x: yRotation * 15, y: xRotation * 15 });
      }
    };

    // Add event listeners for mouse and touch movements
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",                // Full viewport width
        height: "100vh",               // Full viewport height
        display: "flex",               // Use flexbox for centering content
        alignItems: "center",         // Vertically center content
        justifyContent: "center",     // Horizontally center content
        perspective: "1000px",        // Add perspective to create a 3D effect
        background: "inherit",        // Inherit background styling
        overflow: "hidden",           // Prevent overflow of cloud items
      }}
    >
      <IconCloud images={techStackImages} />
    </div>
  );
}
