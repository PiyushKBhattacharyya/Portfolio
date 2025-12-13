import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Awards from "@/components/sections/Awards";
import TechStack from "@/components/sections/TechStack";
import Experience from "@/components/sections/Experience";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import Spotlight from "@/components/ui/Spotlight";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { Analytics } from "@vercel/analytics/react";
import Publications from "@/components/sections/Publications";

// Detect if device is mobile
const isMobile = typeof window !== 'undefined' &&
  (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768);

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768
    );

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, isMobileDevice ? 50 : 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <ParticleBackground interaction />
      </div>

      {/* Global Visual overlays */}
      <GrainOverlay />
      <CustomCursor />
      <Spotlight />

      <Navbar />

      <main>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: isMobile ? 0.6 : 0.8 // Faster animation on mobile
          }}
          style={{
            willChange: "opacity", // Hint for hardware acceleration
            transform: "translateZ(0)" // Force hardware acceleration
          }}
        >
          <Hero />
        </motion.div>

        {/* Section animations with mobile optimizations */}
        {[
          { Component: About, id: "about" },
          { Component: Projects, id: "projects" },
          { Component: Publications, id: "publications" },
          { Component: Awards, id: "awards" },
          { Component: Experience, id: "experience" },
          { Component: TechStack, id: "techstack" },
        ].map(({ Component, id }, index) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: isMobile ? 30 : 50 }} // Smaller movement on mobile
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: isMobile ? 0.1 : 0.2, // Lower threshold on mobile for earlier triggering
              margin: isMobile ? "-50px" : "-100px" // Smaller margin on mobile
            }}
            transition={{
              duration: isMobile ? 0.6 : 0.8, // Faster animation on mobile
              delay: isMobile ? index * 0.05 : index * 0.1 // Reduced staggering on mobile
            }}
            style={{
              willChange: "opacity, transform", // Hint for hardware acceleration
              transform: "translateZ(0)", // Force hardware acceleration
              backfaceVisibility: "hidden" // Prevent flickering
            }}
          >
            <Component />
          </motion.div>
        ))}
      </main>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{
          once: true,
          amount: isMobile ? 0.2 : 0.3 // Lower threshold on mobile
        }}
        transition={{
          duration: isMobile ? 0.6 : 0.8 // Faster animation on mobile
        }}
        style={{
          willChange: "opacity", // Hint for hardware acceleration
          transform: "translateZ(0)" // Force hardware acceleration
        }}
      >
        <Footer />
      </motion.div>
    </div >
  );
}

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
      <Analytics />
    </>
  );
}

export default App;
