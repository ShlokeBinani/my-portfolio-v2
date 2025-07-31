import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface GeminiEffectProps {
  children: React.ReactNode;
  className?: string;
}

const GeminiEffect: React.FC<GeminiEffectProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createWave = () => {
      const wave = document.createElement('div');
      wave.className = 'absolute inset-0 opacity-10';
      wave.style.background = `linear-gradient(
        45deg,
        transparent,
        rgba(99, 102, 241, 0.05),
        rgba(6, 182, 212, 0.05),
        transparent
      )`;
      wave.style.transform = 'translateX(-100%)';
      wave.style.animation = 'geminiWave 6s ease-in-out infinite';
      
      container.appendChild(wave);
      
      setTimeout(() => {
        if (container.contains(wave)) {
          container.removeChild(wave);
        }
      }, 6000);
    };

    const interval = setInterval(createWave, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent transform -skew-x-12 animate-pulse opacity-30"></div>
      {children}
    </motion.div>
  );
};

export default GeminiEffect;
