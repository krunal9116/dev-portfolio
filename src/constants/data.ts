// ─── Personal Info ────────────────────────────────────────────────────────────
export const personalInfo = {
  name: 'Krunal Vaghamshi',
  handle: '@krunal9116',
  email: 'krunalvaghamshi8@gmail.com',
  github: 'https://github.com/krunal9116',
  linkedin: 'https://www.linkedin.com/in/krunal-vaghamshi-2257ba352/',
  certificationsRepo: 'https://github.com/krunal9116/Certifications-Krunal-Vaghamshi',
  titles: [
    'Full Stack Developer',
    'Creative Front-End Dev',
    'Software Engineer',
    'Web Developer',
    'AI Prompt Master',
  ],
  bio: 'I am a passionate Full Stack & Creative Front-End Developer pursuing B.Tech in IT with a Diploma in Computer Engineering. With 6+ months of internship experience, I specialize in crafting interactive, high-performance web experiences and harnessing AI prompt engineering.',
};

// ─── Projects ───────────────────────────────────────────────────────────────
export const projects = [
  {
    id: 1,
    title: 'Campus Find',
    tagline: 'Lost & Found Management System',
    description:
      'A comprehensive web platform for campus communities that helps students and faculty report lost items and publish found items so rightful owners can easily retrieve them and help each other.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/krunal9116/Campus-L-F',
    icon: 'search',
    live: 'https://clfms.infinityfreeapp.com',
    color: '#00F5FF',
    featured: true,
    category: 'Full Stack Web App',
  },
  {
    id: 2,
    title: 'OnShop — SaaS E-Commerce',
    tagline: 'Multi-Tenant Vendor Platform',
    description:
      'A secure, multi-tenant SaaS e-commerce platform allowing multiple vendors to host independent storefronts. Features a full Role-Based Access Control (RBAC) system with three roles: Super Admin, Vendor, and Customer. Built with JWT auth, Cloudinary image uploads, rate limiting, and a real-time analytics dashboard.',
    tech: ['React', 'Vite', 'Redux', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Cloudinary'],
    github: 'https://github.com/krunal9116/Zaalima--projects',
    icon: 'shop',
    live: '',
    color: '#6E00FF',
    featured: true,
    category: 'Full Stack SaaS',
  },
];

// ─── Skills ──────────────────────────────────────────────────────────────────
export const skillCategories = [
  {
    name: 'Frontend',
    color: '#00F5FF',
    skills: [
      { name: 'HTML5 / CSS3', level: 95, icon: 'SiHtml5' },
      { name: 'JavaScript (ES6+)', level: 90, icon: 'SiJavascript' },
      { name: 'React', level: 88, icon: 'SiReact' },
      { name: 'TypeScript', level: 82, icon: 'SiTypescript' },
      { name: 'Tailwind CSS', level: 90, icon: 'SiTailwindcss' },
      { name: 'Three.js / GSAP', level: 80, icon: 'SiThreedotjs' },
    ],
  },
  {
    name: 'Backend & DB',
    color: '#6E00FF',
    skills: [
      { name: 'Node.js', level: 85, icon: 'SiNodedotjs' },
      { name: 'Express.js', level: 85, icon: 'SiExpress' },
      { name: 'MySQL', level: 88, icon: 'SiMysql' },
      { name: 'MongoDB', level: 85, icon: 'SiMongodb' },
      { name: 'REST APIs', level: 90, icon: 'SiOpenapi' },
    ],
  },
  {
    name: 'AI & Engineering',
    color: '#FF00AA',
    skills: [
      { name: 'AI Prompt Engineering', level: 95, icon: 'SiOpenai' },
      { name: 'Git / GitHub', level: 92, icon: 'SiGithub' },
      { name: 'Web Performance', level: 85, icon: 'SiLighthouse' },
      { name: 'UI / UX Design', level: 88, icon: 'SiFigma' },
    ],
  },
];

// ─── Tech Stack (for constellation section) ───────────────────────────────────
export const techStack = [
  { name: 'HTML5', color: '#E34F26', x: 0, y: 0 },
  { name: 'CSS3', color: '#1572B6', x: 1, y: 0 },
  { name: 'JavaScript', color: '#F7DF1E', x: 2, y: 1 },
  { name: 'React', color: '#61DAFB', x: -1, y: 1 },
  { name: 'Node.js', color: '#68A063', x: 1, y: 2 },
  { name: 'Express', color: '#FFFFFF', x: 0, y: 2 },
  { name: 'MySQL', color: '#4479A1', x: -1, y: -1 },
  { name: 'MongoDB', color: '#4DB33D', x: 2, y: -1 },
  { name: 'Tailwind', color: '#38BDF8', x: -2, y: 0 },
  { name: 'Git/GitHub', color: '#F05032', x: -2, y: 2 },
  { name: 'AI Prompting', color: '#FF00AA', x: 3, y: 0 },
  { name: 'Three.js', color: '#FFFFFF', x: 0, y: -2 },
];

// ─── Experience & Education ──────────────────────────────────────────────────
export const experiences = [
  {
    id: 3,
    role: 'Diploma in Computer Engineering (CE)',
    company: 'Darshan University, Rajkot',
    period: 'Completed',
    location: 'India',
    description:
      'Completed Diploma in Computer Engineering. Developed foundational expertise in computer science core subjects, database management, and web programming.',
    tech: ['Computer Engineering', 'Programming', 'Web Design', 'Databases'],
    color: '#FF00AA',
    type: 'education',
  },
  {
    id: 2,
    role: 'B.Tech in Information Technology (IT)',
    company: 'CSPIT-CHARUSAT',
    period: 'Currently Pursuing',
    location: 'India',
    description:
      'Pursuing Bachelor of Technology in Information Technology. Focusing on advanced software engineering, data structures, cloud architectures, and modern web frameworks.',
    tech: ['IT', 'Software Engineering', 'Web Development', 'DBMS'],
    color: '#6E00FF',
    type: 'education',
  },
  {
    id: 1,
    role: 'Software Developer Intern',
    company: 'Web & Software Internship',
    period: '6 Months Experience',
    location: 'India',
    description:
      'Gained hands-on professional experience building creative, interactive frontend web interfaces, integrating backend REST APIs, and optimizing modern WebGL UX.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MySQL'],
    color: '#00F5FF',
    type: 'work',
  },
];

// ─── Default Backup Certificates ─────────────────────────────────────────────
export const defaultCertificates = [
  {
    id: 1,
    title: 'Certifications Repository',
    issuer: 'GitHub / Krunal Vaghamshi',
    date: 'Live Sync',
    credentialId: 'Certifications-Krunal-Vaghamshi',
    color: '#00F5FF',
    description: 'Official verified certifications uploaded directly to Krunal Vaghamshi GitHub repository.',
    url: 'https://github.com/krunal9116/Certifications-Krunal-Vaghamshi',
  },
];

// ─── Social Links ─────────────────────────────────────────────────────────────
export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/krunal9116', icon: 'FiGithub' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/krunal-vaghamshi-2257ba352/', icon: 'FiLinkedin' },
];

// ─── Navigation ──────────────────────────────────────────────────────────────
export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];
