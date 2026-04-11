import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Experience from "@/components/sections/Experience";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import { Analytics } from "@vercel/analytics/react";
import Publications from "@/components/sections/Publications";
import DataBitstream from "@/components/ui/DataBitstream";

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} bg-[#060608] relative overflow-x-hidden`}>
      
      {/* Global Prestige Overlays */}
      <div className="vignette" />
      <div className="grain-bg" />
      <div className="fixed inset-0 scanline-overlay pointer-events-none z-[9998] opacity-[0.05] animate-scan" />
      <DataBitstream />
      
      <CustomCursor />
      
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Publications />
        <Experience />
        <TechStack />
      </main>

      <Footer />
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
