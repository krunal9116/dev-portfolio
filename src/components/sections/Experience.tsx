import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences } from '../../constants/data';
import { useInView } from '../../hooks/useAnimations';
import { FiBriefcase, FiBook } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const { ref: sectionRef, inView } = useInView(0.05);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;
    const ctx = gsap.context(() => {
      // Animate the central line growing
      gsap.fromTo('.exp-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        }
      );

      // Animate each card
      gsap.utils.toArray<HTMLElement>('.exp-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, x: i % 2 === 0 ? -80 : 80, scale: 0.95 },
          {
            opacity: 1, x: 0, scale: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
              toggleActions: 'play reverse play reverse',
            },
            duration: 0.8,
            ease: 'power3.out',
          }
        );
      });

      // Animate nodes
      gsap.utils.toArray<HTMLElement>('.exp-node').forEach((node) => {
        gsap.fromTo(node,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1,
            scrollTrigger: {
              trigger: node,
              start: 'top 95%',
              toggleActions: 'play reverse play reverse',
            },
            duration: 0.5,
            ease: 'back.out(2)',
          }
        );
      });
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section"
      style={{ background: 'linear-gradient(180deg, #08051a 0%, #050816 100%)' }}
    >
      <div className="section-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase mb-3 block">Career Path</span>
          <h2 className="font-clash text-4xl md:text-6xl font-bold mb-4">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-base">
            From writing my first line of code to leading engineering teams — the milestones that shaped me.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Central line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/5">
            <div className="exp-line absolute inset-0 bg-gradient-to-b from-primary via-secondary to-accent" style={{ transformOrigin: 'top' }} />
          </div>

          <div className="space-y-16">
            {experiences.map((exp, i) => (
              <div key={exp.id} className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Card */}
                <div className={`exp-card w-full md:w-[calc(50%-2.5rem)] ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div
                    className="glass rounded-2xl p-6 hover:border-white/10 transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Glow accent */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle at ${i % 2 === 0 ? '100% 0%' : '0% 0%'}, ${exp.color}08, transparent 60%)` }}
                    />

                    <div className={`relative z-10 flex items-center gap-3 mb-3 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <div className="p-2 rounded-lg" style={{ background: `${exp.color}15`, color: exp.color }}>
                        {exp.type === 'education' ? <FiBook size={16} /> : <FiBriefcase size={16} />}
                      </div>
                      <span className="font-mono text-xs font-bold" style={{ color: exp.color }}>{exp.period}</span>
                    </div>

                    <h3 className="font-clash text-lg font-bold text-white mb-0.5">{exp.role}</h3>
                    <p className="text-sm font-medium mb-3" style={{ color: exp.color }}>{exp.company}</p>
                    <p className="text-muted text-sm leading-relaxed mb-4">{exp.description}</p>

                    <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      {exp.tech.slice(0, 4).map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md font-mono text-xs border border-white/5 text-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Central node */}
                <div className="exp-node absolute left-1/2 top-6 -translate-x-1/2 flex items-center justify-center z-10">
                  <div
                    className="w-4 h-4 rounded-full border-2"
                    style={{ borderColor: exp.color, background: '#050816', boxShadow: `0 0 16px ${exp.color}80` }}
                  />
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block w-[calc(50%-2.5rem)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
