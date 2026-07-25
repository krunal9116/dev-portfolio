import { useState, useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories } from '../../constants/data';
import { useInView } from '../../hooks/useAnimations';
import * as SiIcons from 'react-icons/si';

const SkillsScene = lazy(() => import('../canvas/SkillsScene'));

interface SkillOrb { name: string; color: string; position: [number, number, number]; level: number; icon?: string; }

function generateOrbPositions(categories: typeof skillCategories): SkillOrb[] {
  const orbs: SkillOrb[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  let idx = 0;
  for (const cat of categories) {
    for (const skill of cat.skills) {
      const phi = Math.acos(1 - 2 * (idx + 0.5) / (categories.length * cat.skills.length));
      const theta = goldenAngle * idx;
      const r = 3.5 + Math.random() * 1.2;
      orbs.push({
          name: skill.name,
          color: cat.color,
          position: [r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)],
          level: skill.level,
          icon: (skill as any).icon,
        });
      idx++;
    }
  }
  return orbs;
}

export default function Skills() {
  const { ref, inView } = useInView(0.1);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<SkillOrb | null>(null);
  const allOrbs = useMemo(() => generateOrbPositions(skillCategories), []);

  const category = skillCategories[activeCategory];

  return (
    <section id="skills" ref={ref} className="section" style={{ background: 'linear-gradient(180deg, #050816 0%, #08051a 100%)' }}>
      <div className="section-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase mb-3 block">Technical Arsenal</span>
          <h2 className="font-clash text-4xl md:text-6xl font-bold mb-4">
            Skills &amp; <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-base">
            Hover over the orbiting spheres to explore my tech stack. Each orb represents a skill I've mastered.
          </p>
        </motion.div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 h-[420px] md:h-[520px] rounded-3xl overflow-hidden glass border border-white/5 relative"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              </div>
            }>
              <SkillsScene skills={allOrbs} onHover={setHoveredSkill} hoveredSkill={hoveredSkill} />
            </Suspense>
            {/* Hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-muted/60 pointer-events-none">
              drag to rotate · hover to inspect
            </div>
          </motion.div>

          {/* Right: Category tabs + skill list */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:w-1/2 flex flex-col gap-6"
          >
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {skillCategories.map((cat, i) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(i)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeCategory === i
                      ? 'text-white'
                      : 'glass text-muted hover:text-white'
                  }`}
                  style={activeCategory === i ? { background: `linear-gradient(135deg, ${cat.color}30, ${cat.color}10)`, border: `1px solid ${cat.color}40`, color: cat.color } : {}}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Skills grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 gap-3"
              >
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06 }}
                    className="glass rounded-2xl p-4 group hover:border-white/10 transition-all duration-300"
                    style={{ '--skill-color': category.color } as React.CSSProperties}
                  >
                    <div className="flex items-center space-x-2">
                      {(() => {
                        const Icon = SiIcons[skill.icon as keyof typeof SiIcons];
                        return Icon ? <Icon className="text-xl" /> : null;
                      })()}
                      <span className="font-medium text-white text-sm">{skill.name}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Hovered skill info */}
            <AnimatePresence>
              {hoveredSkill && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="glass rounded-xl p-4 border"
                  style={{ borderColor: `${hoveredSkill.color}30` }}
                >
                  <span className="font-mono text-xs" style={{ color: hoveredSkill.color }}>Inspecting →</span>
                    <div className="flex items-center space-x-2 mt-1">
                      {(() => {
                        const Icon = SiIcons[(hoveredSkill as any).icon as keyof typeof SiIcons];
                        return Icon ? <Icon className="text-xl" /> : null;
                      })()}
                      <span className="text-white font-semibold">{hoveredSkill.name}</span>
                    </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
