import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMaximize2, FiMinimize2, FiFileText, FiDownload } from 'react-icons/fi';
import { personalInfo } from '../../constants/data';
import LiquidEther from './LiquidEther';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imgError, setImgError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const baseUrl = import.meta.env.BASE_URL || './';
  const RESUME_PATHS = [
    `${baseUrl}resume.jpg`,
    `${baseUrl}resume.jpeg`,
    `${baseUrl}resume.png`,
    `${baseUrl}resume.pdf`,
    './resume.jpg',
    'resume.jpg'
  ];
  const [pathIdx, setPathIdx] = useState(0);

  // Lock background scroll when open & handle ESC key
  useEffect(() => {
    if (!isOpen) {
      setIsZoomed(false);
      setImgError(false);
      setPathIdx(0);
      document.body.style.overflow = 'auto';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleImageError = () => {
    if (pathIdx < RESUME_PATHS.length - 1) {
      setPathIdx((prev) => prev + 1);
    } else {
      setImgError(true);
    }
  };

  const currentResumePath = RESUME_PATHS[pathIdx];

  const handleDownload = async () => {
    const fileName = `${personalInfo.name.replace(/\s+/g, '_')}_Resume.jpg`;

    // Detect In-App Browsers (LinkedIn, Instagram, Facebook, Twitter, Line, WeChat, etc.)
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera || '';
    const isInAppBrowser = /LinkedInApp|FBAN|FBAV|Instagram|Twitter|MicroMessenger|Snapchat/i.test(ua);

    try {
      // 1. Fetch asset and convert to Blob
      const response = await fetch(currentResumePath);
      const blob = await response.blob();

      // In iOS Safari or LinkedIn in-app browser, blob a[download] is often blocked or ignored.
      // FileReader dataURL works more reliably across restricted WebViews.
      if (isInAppBrowser) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result as string;
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = fileName;
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
        reader.readAsDataURL(blob);
        return;
      }

      // Standard Browsers (Chrome, Edge, Firefox, desktop/mobile Safari)
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(url), 2000);
    } catch (err) {
      console.error('Failed to download resume via Blob:', err);
      // Fallback 1: Direct link trigger
      const link = document.createElement('a');
      link.href = currentResumePath;
      link.download = fileName;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Fallback 2 for aggressive WebViews: Open directly in window
      if (isInAppBrowser) {
        window.open(currentResumePath, '_blank');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 md:p-6 overflow-hidden">
          {/* Backdrop Blur with low opacity */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-0"
            style={{ background: 'rgba(5, 8, 22, 0.75)', backdropFilter: 'blur(14px)' }}
            onClick={onClose}
          />

          {/* ── LiquidEther WebGL Background Fluid Simulation ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0.6] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, times: [0, 0.3, 0.7, 1] }}
            className="fixed inset-0 z-10 pointer-events-none opacity-80"
          >
            <LiquidEther
              colors={['#00F5FF', '#FF00AA', '#6E00FF', '#00FF66']}
              mouseForce={30}
              cursorSize={150}
              isViscous={false}
              autoDemo={true}
              autoSpeed={1.2}
              autoIntensity={3.5}
            />
          </motion.div>

          {/* ── 4-Side Vibrant Color Curtain Sweep Animations (Slow & Clearly Visible) ── */}

          {/* 1. TOP Curtain - Neon Cyan */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: ['-100%', '0%', '0%', '-100%'] }}
            transition={{ duration: 1.4, times: [0, 0.35, 0.65, 1], ease: [0.25, 1, 0.5, 1] }}
            className="fixed top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#00F5FF]/85 via-[#00F5FF]/40 to-transparent pointer-events-none z-30 border-b-4 border-[#00F5FF] shadow-[0_0_80px_#00F5FF]"
          />

          {/* 2. BOTTOM Curtain - Electric Purple */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: ['100%', '0%', '0%', '100%'] }}
            transition={{ duration: 1.4, times: [0, 0.35, 0.65, 1], ease: [0.25, 1, 0.5, 1] }}
            className="fixed bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#6E00FF]/85 via-[#6E00FF]/40 to-transparent pointer-events-none z-30 border-t-4 border-[#6E00FF] shadow-[0_0_80px_#6E00FF]"
          />

          {/* 3. LEFT Curtain - Neon Green */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: ['-100%', '0%', '0%', '-100%'] }}
            transition={{ duration: 1.4, times: [0, 0.35, 0.65, 1], ease: [0.25, 1, 0.5, 1] }}
            className="fixed top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#00FF66]/85 via-[#00FF66]/40 to-transparent pointer-events-none z-30 border-r-4 border-[#00FF66] shadow-[0_0_80px_#00FF66]"
          />

          {/* 4. RIGHT Curtain - Magenta */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: ['100%', '0%', '0%', '100%'] }}
            transition={{ duration: 1.4, times: [0, 0.35, 0.65, 1], ease: [0.25, 1, 0.5, 1] }}
            className="fixed top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-[#FF00AA]/85 via-[#FF00AA]/40 to-transparent pointer-events-none z-30 border-l-4 border-[#FF00AA] shadow-[0_0_80px_#FF00AA]"
          />

          {/* ── Scrollable Resume Image Modal (Enlarged Size) ── */}
          <motion.div
            initial={{ scale: 0.65, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="relative z-20 max-w-5xl w-full rounded-3xl overflow-hidden shadow-[0_0_70px_rgba(0,245,255,0.3)] flex flex-col my-auto border border-white/20"
            style={{ background: '#050816' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar Buttons */}
            <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
              <button
                onClick={handleDownload}
                title="Download Resume"
                className="px-3.5 py-2 rounded-xl text-white bg-[#00F5FF]/20 hover:bg-[#00F5FF]/30 hover:border-[#00F5FF]/60 transition-all text-xs font-mono flex items-center gap-2 backdrop-blur-md border border-[#00F5FF]/30 shadow-[0_0_15px_rgba(0,245,255,0.2)]"
              >
                <FiDownload size={15} /> Download
              </button>
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="px-3.5 py-2 rounded-xl text-white hover:bg-white/10 transition-colors bg-black/60 text-xs font-mono flex items-center gap-2 backdrop-blur-md border border-white/10"
              >
                {isZoomed ? <><FiMinimize2 /> Zoom Out</> : <><FiMaximize2 /> Zoom In</>}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-white hover:bg-white/10 transition-colors bg-black/60 backdrop-blur-md border border-white/10"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Resume Image Container (Scrollable) */}
            <div
              ref={scrollRef}
              className="w-full p-4 md:p-6 overflow-y-auto overflow-x-hidden custom-scrollbar"
              style={{ maxHeight: isZoomed ? '88vh' : '78vh' }}
              onWheel={(e) => e.stopPropagation()}
            >
              {!imgError ? (
                <img
                  src={currentResumePath}
                  alt={`${personalInfo.name}'s Resume`}
                  onError={handleImageError}
                  className={`${isZoomed ? 'w-[180%] max-w-none' : 'w-full'} h-auto rounded-xl drop-shadow-2xl block transition-all duration-300 origin-top-left`}
                />
              ) : (
                <div className="w-full h-[50vh] flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-[#00F5FF]/10 text-[#00F5FF] flex items-center justify-center border border-[#00F5FF]/30">
                    <FiFileText size={32} />
                  </div>
                  <h4 className="font-clash text-2xl font-bold text-white">Upload Resume File</h4>
                  <p className="text-muted text-xs max-w-md font-mono">
                    Please place your resume image file named <span className="text-[#00F5FF]">resume.jpg</span> into your <span className="text-[#00F5FF]">f:\dev portfolio\public\</span> folder.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Bar Header Info */}
            <div className="p-5 border-t border-white/10 flex items-center justify-between shrink-0 bg-[#050816]">
              <div>
                <h3 className="font-clash text-xl font-bold text-white mb-0.5">{personalInfo.name}'s Resume</h3>
                <p className="text-muted text-xs font-mono">Full Stack Developer · AI Specialist</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
