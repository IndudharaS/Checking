import { motion } from 'framer-motion';

export default function PageShell({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
      className={`relative z-10 ${className}`}
    >
      {children}
    </motion.div>
  );
}
