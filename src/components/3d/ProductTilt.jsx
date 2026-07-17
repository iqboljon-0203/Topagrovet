'use client';

import { motion } from 'framer-motion';

export default function ProductTilt({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: 1.02,
        rotateX: -2,
        rotateY: 2,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.98 }}
      style={{ perspective: 800 }}
    >
      {children}
    </motion.div>
  );
}
