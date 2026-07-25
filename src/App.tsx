import { useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLenis } from './hooks/useLenis';
import LoadingScreen from './components/sections/LoadingScreen';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Certificates from './components/sections/Certificates';
import TechStack from './components/sections/TechStack';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import Navbar from './components/layout/Navbar';
import CustomCursor from './components/layout/CustomCursor';
import SplashCursor from './components/ui/SplashCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import VideoIntro from './components/ui/VideoIntro';

function App() {
  const [step, setStep] = useState<'loading' | 'video' | 'home'>('loading');
  useLenis();

  return (
    <>
      <SplashCursor
        SIM_RESOLUTION={128}
        DYE_RESOLUTION={1440}
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        RAINBOW_MODE={true}
      />
      <CustomCursor />
      <ScrollProgress />

      <AnimatePresence mode="wait">
        {step === 'loading' && (
          <LoadingScreen key="loading" onComplete={() => setStep('video')} />
        )}
        {step === 'video' && (
          <VideoIntro key="video" onComplete={() => setStep('home')} />
        )}
      </AnimatePresence>

      {step === 'home' && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Certificates />
            <TechStack />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
