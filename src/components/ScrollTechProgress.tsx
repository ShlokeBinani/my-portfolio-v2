import React, { useEffect, useState } from 'react';

const ScrollTechProgress: React.FC = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScroll(scrolled);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: 24,
        zIndex: 100,
        pointerEvents: 'none',
        background: 'linear-gradient(90deg, rgba(20,24,38,0.8) 60%, rgba(99,102,241,0.06) 100%)',
        backdropFilter: 'blur(6px)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 10,
          width: '100%',
          height: 4,
          borderRadius: 2,
          background: 'linear-gradient(90deg, #181825 0%, #6366f1 100%)',
          opacity: 0.25,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 10,
          height: 4,
          borderRadius: 2,
          width: `${scroll}%`,
          background: 'linear-gradient(90deg, #06b6d4 0%, #6366f1 100%)',
          boxShadow: '0 0 8px #06b6d4cc, 0 0 16px #6366f188',
          transition: 'width 0.2s cubic-bezier(0.4,0,0.2,1)',
        }}
      />
      {/* Animated tech dot */}
      <div
        style={{
          position: 'absolute',
          left: `calc(${scroll}% - 12px)`,
          top: 4,
          width: 24,
          height: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 30%, #06b6d4 70%, #6366f1 100%)',
            boxShadow: '0 0 16px #06b6d4cc, 0 0 32px #6366f188',
            border: '2px solid #fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse-dot 1.5s infinite alternate',
          }}
        >
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <circle cx="4.5" cy="4.5" r="4.5" fill="#fff" opacity="0.6"/>
          </svg>
        </div>
      </div>
      <style>
        {`
          @keyframes pulse-dot {
            0% { box-shadow: 0 0 8px #06b6d4cc, 0 0 16px #6366f188; }
            100% { box-shadow: 0 0 20px #06b6d4cc, 0 0 32px #6366f188; }
          }
        `}
      </style>
    </div>
  );
};

export default ScrollTechProgress;
