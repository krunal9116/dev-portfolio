import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useAnimations';

const techItems = [
  { name: 'React', color: '#61DAFB', icon: '⚛️', category: 'Frontend' },
  { name: 'Node.js', color: '#68A063', icon: '🟢', category: 'Backend' },
  { name: 'TypeScript', color: '#3178C6', icon: '🔷', category: 'Language' },
  { name: 'MongoDB', color: '#4DB33D', icon: '🍃', category: 'Database' },
  { name: 'Next.js', color: '#FFFFFF', icon: '▲', category: 'Framework' },
  { name: 'Express', color: '#FFFFFF', icon: '⚡', category: 'Backend' },
  { name: 'PostgreSQL', color: '#336791', icon: '🐘', category: 'Database' },
  { name: 'Docker', color: '#2496ED', icon: '🐳', category: 'DevOps' },
  { name: 'AWS', color: '#FF9900', icon: '☁️', category: 'Cloud' },
  { name: 'Redis', color: '#DC382D', icon: '🔴', category: 'Cache' },
  { name: 'GraphQL', color: '#E535AB', icon: '◈', category: 'API' },
  { name: 'Tailwind', color: '#38BDF8', icon: '🌊', category: 'CSS' },
  { name: 'Three.js', color: '#FFFFFF', icon: '🎮', category: '3D' },
  { name: 'Git', color: '#F05032', icon: '🔀', category: 'Tools' },
  { name: 'Linux', color: '#FCC624', icon: '🐧', category: 'OS' },
  { name: 'Nginx', color: '#009639', icon: '🌐', category: 'Server' },
];

// Constellation connections (pairs of indices)
const connections = [
  [0, 1], [0, 4], [1, 2], [1, 5], [2, 4], [2, 3],
  [3, 6], [3, 9], [5, 7], [7, 8], [8, 10], [10, 11],
  [4, 12], [6, 13], [11, 14], [12, 15],
];

// Positions on a 600x400 grid
const positions = [
  [300, 80], [150, 120], [450, 100], [80, 200], [420, 180],
  [220, 200], [160, 300], [500, 220], [560, 140], [60, 340],
  [480, 320], [340, 280], [300, 200], [250, 340], [540, 360],
  [100, 380],
];

export default function TechStack() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="techstack" ref={ref} className="section" style={{ background: 'linear-gradient(180deg, #050816 0%, #080520 100%)' }}>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase mb-3 block">Ecosystem</span>
          <h2 className="font-clash text-4xl md:text-6xl font-bold mb-4">
            Tech <span className="gradient-text">Universe</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-base">
            The constellation of technologies I navigate to build world-class Interactive & Creative products.
          </p>
        </motion.div>

        {/* SVG Constellation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-3xl mx-auto"
        >
          <svg
            viewBox="0 60 600 360"
            className="w-full hidden md:block"
            style={{ height: '420px' }}
          >
            {/* Connection lines */}
            {connections.map(([a, b], i) => (
              <g key={i}>
                <motion.line
                  x1={positions[a][0]} y1={positions[a][1]}
                  x2={positions[b][0]} y2={positions[b][1]}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.3 + i * 0.04 }}
                />
                <motion.line
                  x1={positions[a][0]} y1={positions[a][1]}
                  x2={positions[b][0]} y2={positions[b][1]}
                  stroke={techItems[a].color}
                  strokeWidth="1.5"
                  strokeDasharray="4 12"
                  initial={{ strokeDashoffset: 100, opacity: 0 }}
                  animate={inView ? { strokeDashoffset: 0, opacity: [0, 0.4, 0] } : {}}
                  transition={{ 
                    strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 3 + (i % 2), repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }
                  }}
                />
              </g>
            ))}

            {/* Tech nodes */}
            {techItems.map((tech, i) => (
              <motion.g
                key={tech.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.05, type: 'spring', stiffness: 200 }}
                style={{ cursor: 'pointer' }}
              >
                {/* Glow circle */}
                <motion.circle
                  cx={positions[i][0]}
                  cy={positions[i][1]}
                  r="24"
                  fill={tech.color}
                  initial={{ opacity: 0.06, scale: 1 }}
                  animate={{ opacity: [0.06, 0.15, 0.06], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2 + (i % 2), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                />
                {/* Main circle */}
                <circle
                  cx={positions[i][0]}
                  cy={positions[i][1]}
                  r="16"
                  fill="rgba(5,8,22,0.9)"
                  stroke={tech.color}
                  strokeWidth="1.5"
                  opacity="0.7"
                />
                {/* Label */}
                <text
                  x={positions[i][0]}
                  y={positions[i][1] + 30}
                  textAnchor="middle"
                  fill={tech.color}
                  fontSize="9"
                  fontFamily="JetBrains Mono"
                  opacity="0.8"
                >
                  {tech.name}
                </text>
              </motion.g>
            ))}
          </svg>

          {/* Mobile grid fallback */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:hidden">
            {techItems.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.04 }}
                className="glass rounded-xl p-3 flex flex-col items-center gap-2 hover:border-white/10 transition-all group"
              >
                <span className="text-xl">{tech.icon}</span>
                <span className="font-mono text-xs text-center" style={{ color: tech.color }}>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category legend */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mt-12"
        >
          {techItems.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.03 }}
              className="flex items-center gap-2 px-3 py-2 glass rounded-xl hover:border-white/10 transition-all group animate-float"
              style={{ animationDelay: `${i * 0.3}s`, animationDuration: `${4 + (i % 3)}s` }}
            >
              <span className="text-base">{tech.icon}</span>
              <span className="text-xs font-mono" style={{ color: tech.color }}>{tech.name}</span>
              <span className="text-xs text-muted/40 font-mono hidden group-hover:inline">{tech.category}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
