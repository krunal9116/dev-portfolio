import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiArrowDown, FiMail } from 'react-icons/fi';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { gsap } from 'gsap';
import { scrollTo } from '../../hooks/useLenis';
import HeroScene from '../canvas/HeroScene';
import { personalInfo } from '../../constants/data';

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    const chars = headingRef.current.querySelectorAll('.char');
    gsap.fromTo(chars,
      { y: 80, opacity: 0, rotateX: -40 },
      { y: 0, opacity: 1, rotateX: 0, stagger: 0.03, duration: 0.9, ease: 'power4.out', delay: 0.6 }
    );
  }, []);

  const nameChars = personalInfo.name.split('');

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden" style={{ background: '#080a15' }}>
      {/* 3D Canvas */}
      <HeroScene />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080a15] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080a15]/70 via-transparent to-transparent pointer-events-none" />

      {/* ── Robotic Circuit Overlay Decorations ── */}
      {/* Top-right corner circuit lines */}
      <svg className="absolute top-0 right-0 w-72 h-72 opacity-10 pointer-events-none" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="300" y1="0" x2="200" y2="0" stroke="#00F5FF" strokeWidth="1"/>
        <line x1="200" y1="0" x2="200" y2="60" stroke="#00F5FF" strokeWidth="1"/>
        <line x1="200" y1="60" x2="240" y2="60" stroke="#00F5FF" strokeWidth="1"/>
        <line x1="240" y1="60" x2="240" y2="120" stroke="#6E00FF" strokeWidth="1"/>
        <line x1="240" y1="120" x2="300" y2="120" stroke="#6E00FF" strokeWidth="1"/>
        <circle cx="200" cy="60" r="3" fill="#00F5FF"/>
        <circle cx="240" cy="120" r="3" fill="#6E00FF"/>
        <circle cx="240" cy="60" r="2" fill="#FF00AA"/>
        <line x1="260" y1="0" x2="260" y2="40" stroke="#FF00AA" strokeWidth="0.5" opacity="0.6"/>
        <line x1="280" y1="0" x2="280" y2="80" stroke="#00F5FF" strokeWidth="0.5" opacity="0.4"/>
      </svg>

      {/* Bottom-left circuit lines */}
      <svg className="absolute bottom-0 left-0 w-64 h-64 opacity-10 pointer-events-none" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="280" x2="80" y2="280" stroke="#00F5FF" strokeWidth="1"/>
        <line x1="80" y1="280" x2="80" y2="220" stroke="#00F5FF" strokeWidth="1"/>
        <line x1="80" y1="220" x2="140" y2="220" stroke="#6E00FF" strokeWidth="1"/>
        <line x1="140" y1="220" x2="140" y2="160" stroke="#6E00FF" strokeWidth="1"/>
        <line x1="0" y1="240" x2="50" y2="240" stroke="#FF00AA" strokeWidth="0.5" opacity="0.6"/>
        <circle cx="80" cy="220" r="3" fill="#00F5FF"/>
        <circle cx="140" cy="160" r="3" fill="#6E00FF"/>
        <rect x="76" y="276" width="8" height="8" fill="none" stroke="#00F5FF" strokeWidth="1"/>
      </svg>

      {/* Floating hex grid dots top-left */}
      <div className="absolute top-16 left-8 opacity-[0.07] pointer-events-none">
        {[...Array(6)].map((_, row) => (
          <div key={row} className="flex gap-6 mb-4" style={{ marginLeft: row % 2 === 1 ? '18px' : '0' }}>
            {[...Array(8)].map((_, col) => (
              <div key={col} className="w-1.5 h-1.5 rounded-full bg-primary" />
            ))}
          </div>
        ))}
      </div>

      {/* Scanning line animation */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, #00F5FF40, transparent)',
          animation: 'scanline 6s linear infinite',
          top: '30%'
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        {/* Heading */}
        <h1
          ref={headingRef}
          className="font-clash text-4xl md:text-6xl lg:text-7xl font-bold leading-none mb-4 overflow-hidden"
          style={{ perspective: '500px' }}
        >
          {nameChars.map((char, i) => (
            <span
              key={i}
              className="char inline-block"
              style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="text-xl md:text-2xl text-muted font-light">I am a </span>
          <span className="text-xl md:text-2xl font-semibold gradient-text">
            <TypeAnimation
              sequence={personalInfo.titles.flatMap(w => [w, 2200])}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="text-muted text-base md:text-lg max-w-xl leading-relaxed mb-10"
        >
          {personalInfo.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-wrap gap-4 mb-12"
        >
          <button
            onClick={() => scrollTo('#projects')}
            className="group relative px-8 py-3.5 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_40px_rgba(0,245,255,0.6)]"
            style={{ background: 'linear-gradient(135deg, #00F5FF, #6E00FF)' }}
          >
            <span className="relative z-10 text-white">View Projects</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>


      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('#about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-primary transition-colors"
        aria-label="Scroll down"
      >
        <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        <FiArrowDown className="scroll-indicator" />
      </motion.button>
    </section>
  );
}
