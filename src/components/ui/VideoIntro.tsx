import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFastForward, FiArrowRight, FiVolume2, FiVolumeX, FiRotateCcw } from 'react-icons/fi';

interface VideoIntroProps {
  onComplete: () => void;
}

export default function VideoIntro({ onComplete }: VideoIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasEnded, setHasEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const baseUrl = import.meta.env.BASE_URL || './';
  const videoSrcs = [
    `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}portfolio-video.mp4`,
    './portfolio-video.mp4',
    '/portfolio-video.mp4',
    'portfolio-video.mp4'
  ];

  useEffect(() => {
    // Lock body scrolling while video is playing
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (videoRef.current) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Autoplay deferred by browser:', err);
        });
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const handleEnded = () => {
    setHasEnded(true);
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setHasEnded(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden"
      onWheel={(e) => e.stopPropagation()}
    >
      {/* Video element with multiple fallback sources */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleEnded}
        className="w-full h-full object-contain md:object-cover"
      >
        {videoSrcs.map((src, idx) => (
          <source key={idx} src={src} type="video/mp4" />
        ))}
        Your browser does not support HTML5 video.
      </video>

      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

      {/* Top right: Skip button + Sound toggle */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={toggleMute}
          className="glass p-3 rounded-2xl text-white hover:bg-white/10 transition-all backdrop-blur-md flex items-center justify-center"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
        </button>

        <button
          onClick={onComplete}
          className="glass px-5 py-2.5 rounded-2xl text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/15 transition-all flex items-center gap-2 border border-white/20 shadow-[0_0_20px_rgba(0,245,255,0.2)] backdrop-blur-md hover:scale-105 active:scale-95"
        >
          Skip <FiFastForward size={14} className="text-primary" />
        </button>
      </div>

      {/* Center/Bottom: "Replay" + "Go to Home Page" buttons when video ends */}
      <AnimatePresence>
        {hasEnded && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
            className="absolute bottom-12 z-50 flex flex-col sm:flex-row items-center gap-4 px-4"
          >
            <button
              onClick={handleReplay}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-mono text-sm font-semibold transition-all backdrop-blur-md border border-white/20 flex items-center gap-2.5 hover:scale-105 active:scale-95"
            >
              <FiRotateCcw size={16} /> Replay Intro
            </button>

            <button
              onClick={onComplete}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#00F5FF] to-[#6E00FF] text-white font-mono text-sm font-bold transition-all shadow-[0_0_30px_rgba(0,245,255,0.4)] flex items-center gap-2.5 hover:scale-105 active:scale-95"
            >
              Explore Portfolio <FiArrowRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
