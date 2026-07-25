import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { socialLinks, personalInfo } from '../../constants/data';
import { scrollTo } from '../../hooks/useLenis';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUp } from 'react-icons/fi';

const iconMap: Record<string, React.ReactNode> = {
  FiGithub: <FiGithub size={18} />,
  FiLinkedin: <FiLinkedin size={18} />,
  FiTwitter: <FiTwitter size={18} />,
  FiMail: <FiMail size={18} />,
};

function GalaxyStars() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(1800 * 3);
    for (let i = 0; i < 1800; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 10 + Math.random() * 30;
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
      ref.current.rotation.z += delta * 0.005;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial size={0.07} color="#ffffff" transparent opacity={0.65} sizeAttenuation />
    </Points>
  );
}

function ColoredOrbs() {
  const ref = useRef<THREE.Points>(null!);
  const { positions, colors } = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#00F5FF'),
      new THREE.Color('#6E00FF'),
      new THREE.Color('#FF00AA'),
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
      const c = palette[Math.floor(Math.random() * 3)];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial size={0.12} vertexColors transparent opacity={0.5} sizeAttenuation />
    </Points>
  );
}

function FooterCanvas() {
  return (
    <Canvas camera={{ position: [0, 2, 12], fov: 60 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true }}>
      <ambientLight intensity={0.1} />
      <GalaxyStars />
      <ColoredOrbs />
    </Canvas>
  );
}

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: '#030610' }}>
      {/* Galaxy canvas */}
      <div className="absolute inset-0 pointer-events-none" style={{ height: '100%' }}>
        <FooterCanvas />
      </div>

      {/* Top fade from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050816] to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-10">
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-clash text-4xl md:text-5xl font-bold mb-4">
            Let's Build Something{' '}
            <span className="gradient-text">Extraordinary</span>
          </h2>
          <motion.button
            onClick={() => scrollTo('#contact')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 rounded-2xl font-semibold text-white transition-all duration-300 relative overflow-hidden group shadow-[0_0_30px_rgba(0,245,255,0.4)]"
            style={{ background: 'linear-gradient(135deg, #00F5FF, #6E00FF)' }}
          >
            <span className="relative z-10">Start a Conversation →</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

        {/* Footer grid */}
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="font-clash text-2xl font-bold gradient-text mb-3">&lt;Krunal Vaghamshi /&gt;</div>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Full Stack &amp; Creative Front-End Developer. Pursuing B.Tech in IT with a Diploma in Computer Engineering.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-mono text-xs text-muted uppercase tracking-wider mb-4">Navigation</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-muted hover:text-primary transition-colors animated-underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="font-mono text-xs text-muted uppercase tracking-wider mb-4">Connect</p>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-3 text-muted hover:text-primary transition-colors group"
                >
                  <span className="p-1.5 rounded-lg glass group-hover:border-primary/20 transition-colors">
                    {iconMap[link.icon]}
                  </span>
                  <span className="text-sm">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} {personalInfo.name} · Built with ❤️ &amp; Three.js
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-muted">React 19 · TypeScript · GSAP · R3F</span>
            <motion.button
              onClick={() => scrollTo(0)}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 glass rounded-xl text-muted hover:text-primary hover:border-primary/20 transition-all"
              aria-label="Back to top"
            >
              <FiArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
