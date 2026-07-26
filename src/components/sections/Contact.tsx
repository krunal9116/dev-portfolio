import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../../hooks/useAnimations';
import { personalInfo } from '../../constants/data';
import emailjs from '@emailjs/browser';
import { FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

// EmailJS Configuration Keys
const EMAILJS_SERVICE_ID = 'service_eupcd0n';
const EMAILJS_TEMPLATE_ID = 'template_8yyyc83';
const EMAILJS_PUBLIC_KEY = 'e6VLVRnkCAnLgMRZw';

type Status = 'idle' | 'sending' | 'success' | 'error';

const PROMPTS = [
  { label: 'name', question: "What's your name?" },
  { label: 'email', question: "What's your email?" },
  { label: 'subject', question: "What's the subject?" },
  { label: 'message', question: 'Type your message...' },
];

export default function Contact() {
  const { ref, inView } = useInView(0.1);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [current, setCurrent] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [history, setHistory] = useState<{ q: string; a: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView) setTimeout(() => inputRef.current?.focus(), 300);
  }, [inView, step]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, step]);

  const [error, setError] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' || !current.trim()) return;
    const currentLabel = PROMPTS[step].label;

    if (currentLabel === 'email') {
      const emailVal = current.trim().toLowerCase();
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!emailRegex.test(emailVal)) {
        setError('Please enter a valid Gmail address!!!');
        return;
      }
    }

    setError('');
    const key = currentLabel as keyof typeof values;
    const newValues = { ...values, [key]: current };
    setValues(newValues);
    setHistory((h) => [...h, { q: PROMPTS[step].question, a: current }]);
    setCurrent('');

    if (step < PROMPTS.length - 1) {
      setStep((s) => s + 1);
    } else {
      sendMessage(newValues);
    }
  };

  const sendMessage = async (data: typeof values) => {
    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
    } catch (error) {
      console.error('Failed to send email via EmailJS:', error);
      setStatus('error');
    }
  };

  const reset = () => {
    setStep(0);
    setValues({ name: '', email: '', subject: '', message: '' });
    setCurrent('');
    setHistory([]);
    setError('');
    setStatus('idle');
  };

  return (
    <section id="contact" ref={ref} className="section" style={{ background: '#050816' }}>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase mb-3 block">Let's Connect</span>
          <h2 className="font-clash text-4xl md:text-6xl font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-base">
            Open to new developer roles, internship opportunities, or creative collaborations. Send a terminal message directly to {personalInfo.name}.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="terminal rounded-2xl overflow-hidden"
          >
            {/* Terminal top bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-primary/10">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <div className="flex-1 text-center">
                <span className="font-mono text-xs text-muted">krunal@vaghamshi — bash</span>
              </div>
            </div>

            {/* Terminal body */}
            <div ref={terminalRef} className="p-6 min-h-[380px] max-h-[480px] overflow-y-auto space-y-3 font-mono text-sm">
              {/* Intro */}
              <div className="text-primary">
                Welcome to <span className="text-white font-bold">{personalInfo.name}'s Terminal</span> 🤖
              </div>
              <div className="text-muted text-xs">Type your response and press Enter to proceed.</div>
              <div className="text-muted text-xs mb-4">──────────────────────────────</div>

              {/* History */}
              {history.map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-muted text-xs">{item.q}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-secondary">$</span>
                    <span className="text-white">{item.a}</span>
                  </div>
                </div>
              ))}

              {/* Current prompt */}
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-2 pt-2"
                  >
                    <div className="text-primary text-xs">{PROMPTS[step].question}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-secondary">$</span>
                      <input
                        ref={inputRef}
                        type={PROMPTS[step].label === 'email' ? 'email' : 'text'}
                        value={current}
                        onChange={(e) => {
                          setCurrent(e.target.value);
                          if (error) setError('');
                        }}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent text-white outline-none caret-primary placeholder-muted/30"
                        placeholder={PROMPTS[step].question}
                        autoComplete="off"
                      />
                      <span className="cursor-blink" />
                    </div>
                    {error && <div className="text-red-400 text-xs mt-1 font-mono">bash: error: {error}</div>}
                    <div className="text-muted/40 text-xs mt-1">Step {step + 1} / {PROMPTS.length} · Press Enter to continue</div>
                  </motion.div>
                )}

                {status === 'sending' && (
                  <motion.div
                    key="sending"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 text-primary pt-2"
                  >
                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span className="text-xs">Transmitting message...</span>
                  </motion.div>
                )}

                {status === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-2 pt-2"
                  >
                    <div className="flex items-center gap-2 text-green-400">
                      <FiCheckCircle />
                      <span className="text-xs font-bold">Message sent successfully to {personalInfo.name}! 🚀</span>
                    </div>
                    <div className="text-muted text-xs">I'll reply to your email shortly.</div>
                    <button
                      onClick={reset}
                      className="mt-3 px-4 py-1.5 rounded-lg border border-primary/30 text-primary text-xs hover:bg-primary/10 transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div key="error" className="flex items-center gap-2 text-red-400 pt-2">
                    <FiAlertCircle />
                    <span className="text-xs">Transmission failed. </span>
                    <button onClick={reset} className="text-primary underline text-xs">Try again</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom bar */}
            <div className="px-6 py-3 border-t border-primary/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-xs text-muted">Online · Ready</span>
              </div>
              <motion.button
                onClick={() => handleKeyDown({ key: 'Enter' } as React.KeyboardEvent)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg font-mono text-xs transition-all"
                style={{ background: 'linear-gradient(135deg, #00F5FF20, #6E00FF20)', border: '1px solid rgba(0,245,255,0.2)', color: '#00F5FF' }}
              >
                <FiSend size={12} /> Send
              </motion.button>
            </div>
          </motion.div>

          {/* Direct Contact Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid sm:grid-cols-3 gap-4 mt-8"
          >
            {[
              { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: '#00F5FF' },
              { label: 'LinkedIn', value: 'krunal-vaghamshi', href: personalInfo.linkedin, color: '#6E00FF' },
              { label: 'GitHub', value: 'krunal9116', href: personalInfo.github, color: '#FF00AA' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl p-4 hover:border-white/10 transition-all group text-center"
              >
                <p className="font-mono text-xs text-muted mb-1">{item.label}</p>
                <p className="text-sm font-medium group-hover:scale-105 transition-transform duration-300 truncate" style={{ color: item.color }}>
                  {item.value}
                </p>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
