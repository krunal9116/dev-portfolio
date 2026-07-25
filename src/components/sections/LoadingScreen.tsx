import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightfall from '../ui/Lightfall';
import GlareHover from '../ui/GlareHover';
import { personalInfo } from '../../constants/data';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [phase, setPhase] = useState<'loading' | 'ready' | 'done'>('loading');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  // Lock body scroll on landing screen
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Particle system on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; tx: number; ty: number; vx: number; vy: number; alpha: number; size: number; color: string }[] = [];
    const colors = ['#00F5FF', '#6E00FF', '#FF00AA'];
    const count = 180;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 80 + Math.random() * 60;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        tx: canvas.width / 2 + Math.cos(angle) * radius,
        ty: canvas.height / 2 + Math.sin(angle) * radius,
        vx: 0, vy: 0, alpha: 0,
        size: Math.random() * 2.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.012;
      particles.forEach((p) => {
        p.x += (p.tx - p.x) * 0.04;
        p.y += (p.ty - p.y) * 0.04;
        p.alpha = Math.min(p.alpha + 0.015, 0.9);
        const dx = p.x - canvas.width / 2;
        const dy = p.y - canvas.height / 2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        p.tx = canvas.width / 2 + Math.cos(Math.atan2(dy, dx) + 0.003) * dist;
        p.ty = canvas.height / 2 + Math.sin(Math.atan2(dy, dx) + 0.003) * dist;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      const grad = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, 100);
      grad.addColorStop(0, 'rgba(0,245,255,0.15)');
      grad.addColorStop(0.5, 'rgba(110,0,255,0.08)');
      grad.addColorStop(1, 'transparent');
      ctx.globalAlpha = 1;
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
      ctx.fill();

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // Progress simulation
  useEffect(() => {
    let val = 0;
    const interval = setInterval(() => {
      val += Math.random() * 12 + 6;
      if (val >= 100) {
        val = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setIsReady(true);
          setPhase('ready');
        }, 300);
      } else {
        setProgress(Math.floor(val));
      }
    }, 70);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    setPhase('done');
    onComplete();
  };

  return (
    <motion.div
      id="loading-screen"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#17002e' }}
      onWheel={(e) => e.stopPropagation()}
    >
      {/* Lightfall background on Landing / Intro Screen */}
      <div className="absolute inset-0 z-0 opacity-90">
        {/* @ts-ignore */}
        <Lightfall
          colors={['#00F5FF', '#5227FF', '#FF00AA']}
          backgroundColor="#17002e"
          speed={1}
          streakCount={4}
          streakWidth={1.5}
          streakLength={1.5}
          glow={2}
          density={0.5}
          twinkle={1.5}
          zoom={2}
          backgroundGlow={1}
          opacity={1}
          mouseInteraction={true}
          mouseStrength={1.5}
          mouseRadius={0.6}
        />
      </div>

      {/* Particle canvas overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-1" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        {/* Logo / Text */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-4"
        >
          {/* Glowing sphere */}
          <div className="relative w-24 h-24 mb-2">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-blue-600/30 blur-xl animate-pulse" />
            <div className="absolute inset-2 rounded-full border border-primary/40 animate-spin-slow" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/10 to-blue-500/10 backdrop-blur-sm border border-primary/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-outfit font-black text-white text-4xl drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]">K</span>
            </div>
          </div>
          <h1 className="font-outfit text-5xl md:text-7xl font-black text-white tracking-tight drop-shadow-[0_0_15px_rgba(0,245,255,0.6)] text-glow-primary">
            {personalInfo.name}
          </h1>
          <p className="font-mono text-xs text-primary/90 font-bold tracking-widest uppercase mt-2 drop-shadow-[0_0_5px_rgba(0,245,255,0.5)]">
            Full Stack &amp; Creative Developer · AI Prompt Master
          </p>
        </motion.div>

        {/* Progress / Get Started Button */}
        {!isReady ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-64 flex flex-col items-center gap-3"
          >
            <div className="w-full h-[3px] bg-blue-900/40 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full glow-primary"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <span className="font-mono text-xs font-bold text-primary">Initializing 3D World</span>
              <span className="font-mono text-xs font-bold text-primary">{progress}%</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-3"
          >
            <div onClick={handleStart} data-cursor="pointer">
              <GlareHover
                width="240px"
                height="64px"
                background="rgba(0, 51, 255, 0.2)"
                borderRadius="16px"
                borderColor="rgba(0, 245, 255, 0.5)"
                glareColor="#00F5FF"
                glareOpacity={0.8}
                glareSize={250}
                className="shadow-[0_0_30px_rgba(0,245,255,0.3)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,245,255,0.6)] active:scale-95"
              >
                <span className="font-outfit text-xl font-bold text-primary tracking-wide uppercase text-glow-primary">
                  Get Started
                </span>
              </GlareHover>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
