// File: src/components/Hero.tsx

import React from 'react';
import SnakeDoodle from './SnakeDoodle';
import GeminiEffect from './GeminiEffect';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: '#101017',
      }}
    >
      {/* Full-screen background doodle */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <SnakeDoodle />
      </div>

      {/* Hero content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          pointerEvents: 'auto',
        }}
      >
        <GeminiEffect className="w-full flex flex-col items-center justify-center py-32">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold neon-text text-center mb-4"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="glitch" data-text="Shloke Binani">Shloke Binani</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 text-center max-w-2xl mb-8 typewriter"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Electronics & Communication Engineering @ VIT | AI/ML Enthusiast | UI/UX & Marketing Designer | Traveler
          </motion.p>
          {/* Contact Me button removed as requested */}
        </GeminiEffect>
      </div>
    </section>
  );
};

export default Hero;
