import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../constants/data';
import { useInView, useTilt } from '../../hooks/useAnimations';
import { FiGithub, FiExternalLink, FiX, FiSearch, FiShoppingBag } from 'react-icons/fi';

function ProjectCard({ project, onClick, index }: { project: typeof projects[0]; onClick: () => void; index: number }) {
  const tiltRef = useTilt(10);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <div
        ref={tiltRef}
        onClick={onClick}
        className="group cursor-pointer glass rounded-3xl overflow-hidden transition-all duration-500 hover:border-white/10 h-full flex flex-col"
        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.4s ease, box-shadow 0.4s ease' }}
      >
        {/* Card header glow band */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}40)` }} />

        {/* Mock screenshot area */}
        <div
          className="relative h-44 overflow-hidden"
          style={{ background: `radial-gradient(circle at 30% 50%, ${project.color}12, transparent 70%), linear-gradient(135deg, #080c20, #050816)` }}
        >
          {/* Unique project icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            {(project as any).icon === 'search' && <FiSearch size={80} color={project.color} />}
            {(project as any).icon === 'shop'   && <FiShoppingBag size={80} color={project.color} />}
          </div>
          {/* Glowing orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full blur-3xl" style={{ background: project.color, opacity: 0.12 }} />
          <div className="absolute top-4 right-4">
            <span className="glass px-2 py-1 rounded-lg font-mono text-xs" style={{ color: project.color }}>
              {project.category}
            </span>
          </div>
          {/* Tech chips floating */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            {project.tech.slice(0, 3).map((t) => (
              <span key={t} className="glass px-2 py-0.5 rounded-md text-xs text-muted font-mono">{t}</span>
            ))}
            {project.tech.length > 3 && (
              <span className="glass px-2 py-0.5 rounded-md text-xs text-muted font-mono">+{project.tech.length - 3}</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-clash text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-xs text-muted font-mono mt-0.5">{project.tagline}</p>
            </div>
            {project.featured && (
              <span className="flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-mono border" style={{ color: project.color, borderColor: `${project.color}40`, background: `${project.color}10` }}>
                Featured
              </span>
            )}
          </div>
          <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-4 flex-1">{project.description}</p>

          <div className="flex items-center gap-3 mt-auto">
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-muted hover:text-white text-sm transition-colors">
              <FiGithub size={15} /> Code
            </a>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-sm transition-colors hover:text-primary"
                style={{ color: project.color }}>
                <FiExternalLink size={15} /> Live
              </a>
            )}
            <div className="flex-1" />
            <span className="text-xs text-muted font-mono">View details →</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(5,8,22,0.92)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="glass rounded-3xl max-w-2xl w-full overflow-hidden"
        style={{ border: `1px solid ${project.color}25`, boxShadow: `0 0 60px ${project.color}15` }}
      >
        {/* Modal header bar */}
        <div className="h-1" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}40)` }} />

        {/* Hero area */}
        <div className="relative h-48" style={{ background: `radial-gradient(circle at 30% 50%, ${project.color}15, transparent 70%), #080c20` }}>
          <div className="absolute inset-0 flex items-center justify-center opacity-8">
            {(project as any).icon === 'search' && <FiSearch size={100} color={project.color} />}
            {(project as any).icon === 'shop'   && <FiShoppingBag size={100} color={project.color} />}
          </div>
          <div className="absolute top-4 right-4">
            <button onClick={onClose} className="glass p-2 rounded-xl text-muted hover:text-white transition-colors">
              <FiX size={18} />
            </button>
          </div>
          <div className="absolute bottom-4 left-6">
            {project.featured && (
              <span className="px-3 py-1 rounded-full text-xs font-mono border" style={{ color: project.color, borderColor: `${project.color}40`, background: `${project.color}15` }}>
                ★ Featured Project
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="mb-4">
            <h3 className="font-clash text-2xl font-bold text-white mb-1">{project.title}</h3>
            <p className="text-sm font-mono" style={{ color: project.color }}>{project.tagline}</p>
          </div>
          <p className="text-muted leading-relaxed mb-6">{project.description}</p>

          {/* Tech stack */}
          <div className="mb-6">
            <p className="font-mono text-xs text-muted uppercase tracking-wider mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1 rounded-lg font-mono text-xs border" style={{ color: project.color, borderColor: `${project.color}30`, background: `${project.color}08` }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all text-sm font-medium">
              <FiGithub /> GitHub
            </a>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${project.color}60, ${project.color}30)`, border: `1px solid ${project.color}40` }}>
                <FiExternalLink /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { ref, inView } = useInView(0.05);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" ref={ref} className="section" style={{ background: '#050816' }}>
      <div className="section-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase mb-3 block">Work</span>
          <h2 className="font-clash text-4xl md:text-6xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-base">
            Click any card to explore the full project details, tech stack, and live demo.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
