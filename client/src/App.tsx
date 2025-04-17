import { Suspense, lazy, useEffect, useState } from "react";
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
// import { SpeedInsights } from '@vercel/speed-insights/next';
// import { Analytics } from "@vercel/analytics/react"

// Lazy load the particle background to improve initial load time
const ParticleBackground = lazy(() => import("@/components/canvas/ParticleBackground"));

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set a small delay to ensure smooth transitions after initial load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Suspense fallback={<div className="bg-[#0F172A] w-full h-full" />}>
          <ParticleBackground />
        </Suspense>
      </div>
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Awards />
        <Experience />
        <TechStack />
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <>
      {/* <SpeedInsights />
      <Analytics /> */}
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
