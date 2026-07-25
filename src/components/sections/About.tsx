import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from '../../hooks/useAnimations';
import { personalInfo } from '../../constants/data';

gsap.registerPlugin(ScrollTrigger);

const journey = [
  { year: 'Phase 1', title: 'The Spark', desc: 'Discovered my passion for web development, diving deep into UI/UX and crafting my first static sites.', color: '#00F5FF' },
  { year: 'Phase 2', title: 'Full Stack Evolution', desc: 'Mastered modern backend technologies and database architectures to build robust, scalable platforms.', color: '#6E00FF' },
  { year: 'Phase 3', title: 'Creative Engineering', desc: 'Started blending code and art. Explored Three.js and advanced animations for immersive experiences.', color: '#FF00AA' },
  { year: 'Phase 4', title: 'AI Integration', desc: 'Embraced AI prompt engineering to accelerate development workflows and create intelligent solutions.', color: '#00FF66' },
  { year: 'Future', title: 'Continuous Growth', desc: 'Always learning, adapting, and pushing the boundaries of what is possible on the web.', color: '#00F5FF' },
];

const stats = [
  { value: '6+ Mo', label: 'Internship Exp' },
  { value: 'IT & CE', label: 'B.Tech & Diploma' },
  { value: '100%', label: 'Creative Design' },
  { value: 'AI Prompt', label: 'Mastery' },
];

export default function About() {
  const { ref: sectionRef, inView } = useInView(0.1);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current || !lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1, x: 0,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            duration: 0.7,
            ease: 'power3.out',
          }
        );
      });
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section grid-bg noise" style={{ background: '#050816' }}>
      <div className="section-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase mb-3 block">About Me</span>
          <h2 className="font-clash text-4xl md:text-6xl font-bold mb-4">
            The <span className="gradient-text">Journey</span> Behind the Developer
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-base leading-relaxed">
            Passionate Full Stack Developer &amp; AI Prompt Specialist focused on creating highly interactive, beautiful digital experiences.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-6 text-center hover:border-primary/20 transition-all duration-300 group">
              <div className="font-clash text-3xl md:text-4xl font-bold gradient-text mb-1 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-muted text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: About text + floating card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="glass rounded-3xl p-8 md:p-10 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-clash text-2xl font-bold mb-4 text-white">
                  Hello, I'm <span className="text-primary">{personalInfo.name}</span> 👋
                </h3>
                <p className="text-muted leading-relaxed mb-4">
                  I am a Full Stack Developer &amp; Creative Front-End Engineer currently pursuing my B.Tech in Information Technology, having previously completed my Diploma in Computer Engineering.
                </p>
                <p className="text-muted leading-relaxed mb-6">
                  With 6+ months of intensive software internship experience, I specialize in crafting interactive, high-performance web applications using React, HTML/CSS, Node.js, MySQL, and MongoDB. I also pride myself as an AI Prompt Master, leveraging AI tools to supercharge engineering productivity.
                </p>
              </div>
            </div>

            {/* Floating decorative emoji bubbles */}
            <div className="relative mt-6 flex flex-wrap items-center gap-3">
              {[
                { emoji: '⚡', label: 'High Speed', color: '#00F5FF', anim: 'animate-float' },
                { emoji: '🤖', label: 'AI Prompt Master', color: '#6E00FF', anim: 'animate-float-slow' },
                { emoji: '💡', label: 'Problem Solver', color: '#FF00AA', anim: 'animate-float-fast' },
                { emoji: '🚀', label: 'Full Stack Apps', color: '#00FF66', anim: 'animate-float' },
                { emoji: '💻', label: 'Clean Code', color: '#FFB800', anim: 'animate-float-slow' },
                { emoji: '🎓', label: 'Computer Engineering', color: '#00F5FF', anim: 'animate-float-fast' },
                { emoji: '🎨', label: 'Creative UI/UX', color: '#9D00FF', anim: 'animate-float' },
              ].map((badge, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.15, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`glass px-3.5 py-2 rounded-2xl flex items-center gap-2 cursor-pointer backdrop-blur-md ${badge.anim}`}
                  style={{ boxShadow: `0 4px 20px ${badge.color}20`, border: `1px solid ${badge.color}40` }}
                >
                  <span className="text-xl">{badge.emoji}</span>
                  <span className="font-mono text-xs font-semibold text-white/90">{badge.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/5">
              <div ref={lineRef} className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-accent origin-top" />
            </div>

            <div className="space-y-8 pl-12">
              {journey.map((item, i) => (
                <div key={i} className="timeline-item relative">
                  {/* Node */}
                  <div
                    className="absolute -left-[2.65rem] top-1.5 w-3 h-3 rounded-full border-2 border-current"
                    style={{ color: item.color, boxShadow: `0 0 12px ${item.color}60` }}
                  />

                  <div className="glass rounded-2xl p-5 hover:border-white/10 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs font-bold" style={{ color: item.color }}>
                        {item.year}
                      </span>
                      <div className="flex-1 h-px bg-white/5" />
                    </div>
                    <h4 className="font-clash text-lg font-semibold text-white mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
