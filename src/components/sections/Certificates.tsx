import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo, defaultCertificates } from '../../constants/data';
import { useInView } from '../../hooks/useAnimations';
import { FiAward, FiX, FiExternalLink, FiShield, FiRefreshCw, FiFileText } from 'react-icons/fi';

interface GithubCertFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  download_url: string | null;
  type: string;
}

interface ParsedCert {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  color: string;
  description: string;
  url: string;
  downloadUrl?: string | null;
  type: string;
}

const colorPalette = ['#00F5FF', '#6E00FF', '#FF00AA', '#00FF66', '#FFB800'];

function formatCertName(filename: string): { title: string; issuer: string } {
  // Remove file extension
  const base = filename.replace(/\.[^/.]+$/, '');
  // Format readable title
  const parts = base.split(/[-_]/).filter(Boolean);
  const cleanTitle = parts.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  let issuer = 'Krunal Vaghamshi';
  if (cleanTitle.toLowerCase().includes('aws')) issuer = 'Amazon Web Services';
  else if (cleanTitle.toLowerCase().includes('meta') || cleanTitle.toLowerCase().includes('react')) issuer = 'Meta';
  else if (cleanTitle.toLowerCase().includes('google')) issuer = 'Google';
  else if (cleanTitle.toLowerCase().includes('python') || cleanTitle.toLowerCase().includes('udemy')) issuer = 'Verified Course';
  else if (cleanTitle.toLowerCase().includes('diploma') || cleanTitle.toLowerCase().includes('degree')) issuer = 'Academic Credential';

  return { title: cleanTitle || filename, issuer };
}

function CertCard({ cert, index, onClick }: { cert: ParsedCert; index: number; onClick: () => void }) {
  const isImage = cert.downloadUrl && (cert.downloadUrl.endsWith('.png') || cert.downloadUrl.endsWith('.jpg') || cert.downloadUrl.endsWith('.jpeg'));
  const colorIdx = colorPalette.indexOf(cert.color);
  const secondaryColor = colorIdx >= 0 ? colorPalette[(colorIdx + 2) % colorPalette.length] : '#FFF';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={onClick}
      className="cursor-pointer group relative rounded-2xl overflow-hidden aspect-[4/3] flex flex-col"
    >
      {/* Animated RGB/Colored Border Background */}
      <div className="absolute -inset-[100%] animate-spin" 
           style={{ 
             background: `conic-gradient(from 0deg, transparent 0%, ${cert.color} 15%, transparent 25%, transparent 50%, ${secondaryColor} 65%, transparent 75%)`,
             animationDuration: '4s'
           }} />
           
      {/* Inner Card Background */}
      <div className="absolute inset-[2px] rounded-[14px] bg-[#050816] overflow-hidden flex flex-col z-10">
        
        {/* Certificate Image or Fallback */}
        <div className="flex-1 overflow-hidden relative bg-black/20 flex flex-col items-center justify-center">
           {isImage ? (
             <img src={cert.downloadUrl!} alt={cert.title} className="w-full h-full object-contain p-2 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
           ) : (
             <div className="w-full h-full flex items-center justify-center text-muted flex-col gap-2 group-hover:text-white transition-colors group-hover:scale-105 duration-500">
               <FiFileText size={40} style={{ color: cert.color }} />
               <span className="text-xs font-mono">{cert.type.toUpperCase()}</span>
             </div>
           )}
        </div>

        {/* Certificate Name */}
        <div className="p-4 border-t border-white/5 bg-[#050816] text-center shrink-0 z-20">
           <h3 className="font-clash text-base md:text-lg font-bold text-white group-hover:text-primary transition-colors truncate">
             {cert.title}
           </h3>
           <p className="text-xs text-muted mt-1">{cert.issuer}</p>
        </div>
      </div>
    </motion.div>
  );
}

function CertModal({ cert, onClose }: { cert: ParsedCert; onClose: () => void }) {
  const isImage = cert.downloadUrl && (cert.downloadUrl.endsWith('.png') || cert.downloadUrl.endsWith('.jpg') || cert.downloadUrl.endsWith('.jpeg'));
  const [isZoomed, setIsZoomed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lock background scroll when modal is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(5,8,22,0.6)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="rounded-3xl max-w-3xl w-full flex flex-col relative overflow-hidden"
        style={{ border: `1px solid ${cert.color}25`, boxShadow: `0 0 60px ${cert.color}15`, background: '#050816' }}
      >
        {/* Buttons */}
        <div className="absolute top-4 right-4 z-50 flex gap-2">
            {isImage && (
              <button onClick={() => setIsZoomed(!isZoomed)} className="px-3 py-2 rounded-xl text-white hover:bg-white/10 transition-colors bg-black/60 text-xs font-mono flex items-center gap-2 backdrop-blur-md">
                {isZoomed ? 'Zoom Out' : 'Zoom In'}
              </button>
            )}
            <button onClick={onClose} className="p-2 rounded-xl text-white hover:bg-white/10 transition-colors bg-black/60 backdrop-blur-md">
              <FiX size={20} />
            </button>
        </div>

        {/* Certificate Image / Preview — always scrollable */}
        <div
          ref={scrollRef}
          className="w-full p-4 md:p-6 overflow-y-auto overflow-x-hidden"
          style={{ maxHeight: isZoomed ? '75vh' : '60vh' }}
          onWheel={(e) => e.stopPropagation()}
        >
          {isImage ? (
            <img
              src={cert.downloadUrl!}
              alt={cert.title}
              className={`${isZoomed ? 'w-[180%] max-w-none' : 'w-full'} h-auto rounded-xl drop-shadow-2xl block transition-all duration-300 origin-top-left`}
            />
          ) : (
            <div className="w-full h-[40vh] flex flex-col items-center justify-center text-muted shrink-0">
              <FiFileText size={64} className="mb-4" style={{ color: cert.color }} />
              <p className="mb-4">PDF / Document preview not supported.</p>
              <a href={cert.url} target="_blank" rel="noreferrer" className="px-6 py-2 rounded-xl border border-white/10 text-white hover:bg-white/5 flex items-center gap-2">
                <FiExternalLink /> View on GitHub
              </a>
            </div>
          )}
        </div>

        {/* Title bar */}
        <div className="p-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div>
            <h3 className="font-clash text-xl font-bold text-white mb-0.5">{cert.title}</h3>
            <p className="text-muted text-sm">{cert.issuer}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Certificates() {
  const { ref, inView } = useInView(0.05);
  const [certs, setCerts] = useState<ParsedCert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ParsedCert | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const fetchGithubCerts = async () => {
    setLoading(true);
    try {
      const fetchContents = async (path = '') => {
        const url = `https://api.github.com/repos/krunal9116/Certifications-Krunal-Vaghamshi/contents${path ? `/${path}` : ''}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('GitHub API error');
        return res.json();
      };

      const getAllFiles = async (path = ''): Promise<GithubCertFile[]> => {
        let files: GithubCertFile[] = [];
        const items = await fetchContents(path);
        const itemList = Array.isArray(items) ? items : [items];
        
        for (const item of itemList) {
          if (item.name === '.gitignore' || item.name === 'README.md') continue;
          if (item.type === 'dir') {
            const subFiles = await getAllFiles(item.path);
            files = files.concat(subFiles);
          } else {
            files.push(item);
          }
        }
        return files;
      };

      const data = await getAllFiles('');

      const priorityKeywords = ['swayam', 'hackathon', 'meta', 'ibm', 'google', 'microsoft'];
      const getPriority = (name: string) => {
        const lowerName = name.toLowerCase();
        for (let i = 0; i < priorityKeywords.length; i++) {
          if (lowerName.includes(priorityKeywords[i])) return 1;
        }
        return 0;
      };

      const sortedData = data.sort((a, b) => {
        const pA = getPriority(a.name);
        const pB = getPriority(b.name);
        if (pA !== pB) return pB - pA;
        // Same priority: sort by name to ensure stable ordering
        return a.name.localeCompare(b.name);
      });

      const parsed: ParsedCert[] = sortedData
        .map((file, idx) => {
          const { title, issuer } = formatCertName(file.name);
          const color = colorPalette[idx % colorPalette.length];
          return {
            id: file.sha || String(idx),
            title,
            issuer,
            date: 'Auto-Synced',
            credentialId: file.name,
            color,
            description: `Official certification document (${file.name}).`,
            url: file.html_url,
            downloadUrl: file.download_url,
            type: file.name.split('.').pop() || 'file',
          };
        });

      if (parsed.length > 0) {
        setCerts(parsed);
      } else {
        // Fallback default
        setCerts([
          {
            id: 'default-1',
            title: 'Certifications Repository',
            issuer: 'Krunal Vaghamshi',
            date: 'Live Sync',
            credentialId: 'Certifications-Krunal-Vaghamshi',
            color: '#00F5FF',
            description: 'Official verified certifications repository synced live from GitHub.',
            url: personalInfo.certificationsRepo,
            type: 'repository',
          },
        ]);
      }
    } catch (err) {
      console.warn('GitHub Certs Fetch fallback:', err);
      setCerts([
        {
          id: 'fallback-1',
          title: 'Certifications Vault',
          issuer: 'Krunal Vaghamshi GitHub',
          date: 'Live Sync',
          credentialId: 'Certifications-Krunal-Vaghamshi',
          color: '#00F5FF',
          description: 'Official certifications repository automatically updated whenever new credentials are uploaded.',
          url: personalInfo.certificationsRepo,
          type: 'repository',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubCerts();
  }, []);

  return (
    <section id="certificates" ref={ref} className="section" style={{ background: '#050816' }}>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase mb-3 block">
            Achievements
          </span>
          <h2 className="font-clash text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Certificates</span> &amp; Badges
          </h2>
          <p className="text-muted max-w-xl mx-auto text-base">
            Explore my latest verified credentials, professional certifications, and technical badges.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={fetchGithubCerts}
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-primary/30 text-primary text-xs font-mono hover:bg-primary/10 transition-colors"
            >
              <FiRefreshCw className={loading ? 'animate-spin' : ''} /> Sync Now
            </button>
            <a
              href={personalInfo.certificationsRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10 text-muted hover:text-white text-xs font-mono transition-colors"
            >
              View GitHub Repo <FiExternalLink />
            </a>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((cert, i) => (
                <CertCard key={cert.id} cert={cert} index={i} onClick={() => setSelected(cert)} />
              ))}
            </div>

            {certs.length > ITEMS_PER_PAGE && (
              <div className="mt-12 flex flex-col items-center gap-4">
                <span className="font-mono text-sm text-muted">
                  Page-{currentPage} &nbsp; {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, certs.length)} of {certs.length}
                </span>
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      setCurrentPage(p => Math.max(1, p - 1));
                      document.getElementById('certificates')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    disabled={currentPage === 1}
                    className="px-4 py-2 glass rounded-xl border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-all text-white font-mono text-sm"
                  >
                    Previous
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentPage(p => Math.min(Math.ceil(certs.length / ITEMS_PER_PAGE), p + 1));
                      document.getElementById('certificates')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    disabled={currentPage === Math.ceil(certs.length / ITEMS_PER_PAGE)}
                    className="px-4 py-2 glass rounded-xl border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-all text-white font-mono text-sm"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
