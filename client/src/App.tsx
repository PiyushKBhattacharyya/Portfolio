import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { Analytics } from "@vercel/analytics/react";
import React from "react";

// Lazy-loaded sections for performance
const About = React.lazy(() => import("@/components/sections/About"));
const Projects = React.lazy(() => import("@/components/sections/Projects"));
const Awards = React.lazy(() => import("@/components/sections/Awards"));
const Experience = React.lazy(() => import("@/components/sections/Experience"));
const TechStack = React.lazy(() => import("@/components/sections/TechStack"));

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(window.innerWidth < 768);
    const timer = setTimeout(() => setIsLoaded(true), isMobileDevice ? 50 : 100);
    return () => clearTimeout(timer);
  }, [isMobileDevice]);

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: isMobileDevice ? 0.5 : 0.7 } }
  };

  return (
    <div className={`min-h-screen transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <ParticleBackground 
          interaction={!isMobileDevice}
        />
      </div>

      <Navbar />

      <main>
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn}
          style={{ willChange: "opacity" }}
        >
          <Hero />
        </motion.div>

        {/* Lazy-loaded sections */}
        <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
          {[About, Projects, Awards, Experience, TechStack].map((Section, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
              style={{ willChange: "opacity" }}
            >
              <Section />
            </motion.div>
          ))}
        </Suspense>
      </main>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <Footer />
      </motion.div>
    </div>
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
