// File: src/components/SnakeDoodle.tsx

import React, { useRef, useEffect, useState, useCallback } from 'react';

const SNAKE_LENGTH = 180;
const SEGMENT_LENGTH = 16;
const NORMAL_EASE = 0.03;    // Slow wandering speed when idle
const MOUSE_EASE = 0.65;     // Fast follow speed when mouse moves
const MAX_ANGLE = Math.PI / 4;
const IDLE_TIMEOUT = 1200;   // ms before switching back to random wandering

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function getRandomTarget(width: number, height: number) {
  const margin = 80;
  return {
    x: Math.random() * (width - margin * 2) + margin,
    y: Math.random() * (height - margin * 2) + margin,
  };
}

const SnakeDoodle: React.FC = () => {
  // State for canvas dimensions matching #hero
  const [size, setSize] = useState({ w: 0, h: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frame = useRef<number>(0);

  // Snake segments and wandering target
  const snake = useRef<{ x: number; y: number }[]>([]);
  const wanderTarget = useRef<{ x: number; y: number }>(getRandomTarget(window.innerWidth, window.innerHeight));

  // Mouse tracking
  const mouse = useRef({ x: 0, y: 0, active: false, lastMove: 0 });
  const wanderTimer = useRef(0);

  // Match canvas to hero section size
  useEffect(() => {
    const updateSize = () => {
      const hero = document.getElementById('hero');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setSize({ w: Math.round(rect.width), h: Math.round(rect.height) });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Listen to mouse moves anywhere on window
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = clamp((e.clientX - rect.left) * scaleX, 0, canvas.width);
      const y = clamp((e.clientY - rect.top) * scaleY, 0, canvas.height);

      mouse.current = { x, y, active: true, lastMove: Date.now() };
    };
    const handleLeave = () => {
      mouse.current.active = false;
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseout', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseout', handleLeave);
    };
  }, []);

  // Main animation loop
  useEffect(() => {
    if (!size.w || !size.h) return;

    // Initialize snake positions
    snake.current = Array.from({ length: SNAKE_LENGTH }, (_, i) => ({
      x: 40 - i * SEGMENT_LENGTH,
      y: size.h / 2
    }));
    wanderTarget.current = getRandomTarget(size.w, size.h);

    const draw = () => {
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) {
        // Fade previous frame
        ctx.globalAlpha = 0.16;
        ctx.fillStyle = '#101017';
        ctx.fillRect(0, 0, size.w, size.h);
        ctx.globalAlpha = 1;

        // Determine whether mouse is active
        const now = Date.now();
        const isMouseActive = mouse.current.active && (now - mouse.current.lastMove) < IDLE_TIMEOUT;

        // Select target and easing
        const target = isMouseActive
          ? mouse.current
          : (() => {
              wanderTimer.current++;
              if (wanderTimer.current > 240) {  // slower retarget interval
                wanderTarget.current = getRandomTarget(size.w, size.h);
                wanderTimer.current = 0;
              }
              return wanderTarget.current;
            })();
        const ease = isMouseActive ? MOUSE_EASE : NORMAL_EASE;

        // Move head toward target
        const head = snake.current[0];
        head.x += (target.x - head.x) * ease;
        head.y += (target.y - head.y) * ease;

        // Move each segment toward previous one with angle clamping
        for (let i = 1; i < SNAKE_LENGTH; i++) {
          const prev = snake.current[i - 1];
          const curr = snake.current[i];
          const dx = prev.x - curr.x;
          const dy = prev.y - curr.y;
          let angle = Math.atan2(dy, dx);

          if (i > 1) {
            const p2 = snake.current[i - 2];
            const prevAngle = Math.atan2(p2.y - prev.y, p2.x - prev.x);
            let diff = angle - prevAngle;
            if (diff > MAX_ANGLE) angle = prevAngle + MAX_ANGLE;
            if (diff < -MAX_ANGLE) angle = prevAngle - MAX_ANGLE;
          }

          curr.x = prev.x - Math.cos(angle) * SEGMENT_LENGTH;
          curr.y = prev.y - Math.sin(angle) * SEGMENT_LENGTH;
        }

        // Draw snake with glow and gradient
        ctx.save();
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 22;
        ctx.beginPath();
        ctx.moveTo(head.x, head.y);
        for (let i = 1; i < SNAKE_LENGTH; i++) {
          ctx.lineTo(snake.current[i].x, snake.current[i].y);
        }
        const grad = ctx.createLinearGradient(
          head.x, head.y,
          snake.current[SNAKE_LENGTH - 1].x,
          snake.current[SNAKE_LENGTH - 1].y
        );
        grad.addColorStop(0, '#06b6d4');
        grad.addColorStop(1, '#6366f1');
        ctx.strokeStyle = grad;
        ctx.lineWidth = isMouseActive ? 11 : 9;
        ctx.globalAlpha = 0.88;
        ctx.stroke();
        ctx.restore();
      }
      frame.current = requestAnimationFrame(draw);
    };

    frame.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame.current!);
  }, [size]);

  // Render only when size is known
  if (!size.w || !size.h) return null;

  return (
    <canvas
      ref={canvasRef}
      width={size.w}
      height={size.h}
      style={{
        position: 'absolute',
        inset: 0,
        width: `${size.w}px`,
        height: `${size.h}px`,
        background: '#101017',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default SnakeDoodle;
