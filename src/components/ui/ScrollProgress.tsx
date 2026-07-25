import { useScrollProgress } from '../../hooks/useAnimations';
import { motion } from 'framer-motion';

export default function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX: progress,
        background: 'linear-gradient(90deg, #00F5FF, #6E00FF, #FF00AA)',
      }}
    />
  );
}
