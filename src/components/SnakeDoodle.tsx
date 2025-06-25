import React, { useRef, useEffect } from 'react';

const WIDTH = 1920; // Covers all screens
const HEIGHT = 600; // Height of your hero area
const SNAKE_LENGTH = 180; // Longer snake
const SEGMENT_LENGTH = 16;
const EASING = 0.18;
const MAX_ANGLE = Math.PI / 4;

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function getRandomTarget() {
  const margin = 80;
  return {
    x: Math.random() * (WIDTH - margin * 2) + margin,
    y: Math.random() * (HEIGHT - margin * 2) + margin,
  };
}

const SnakeDoodle: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouse = useRef<{ x: number; y: number; inside: boolean }>({ x: 240, y: 300, inside: false });
  const snake = useRef<{ x: number; y: number }[]>([]);
  const randomTarget = useRef<{ x: number; y: number }>(getRandomTarget());
  const paused = useRef(false);

  // Pause animation when hero is out of view
  useEffect(() => {
    const onScroll = () => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      paused.current = rect.bottom < 80 || rect.top > window.innerHeight - 80;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Initialize snake points
    snake.current = [];
    for (let i = 0; i < SNAKE_LENGTH; i++) {
      snake.current.push({ x: 40 - i * SEGMENT_LENGTH, y: HEIGHT / 2 });
    }

    let wanderTimer = 0;

    const draw = () => {
      if (paused.current) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;

      // Fade trail
      ctx.globalAlpha = 0.16;
      ctx.fillStyle = "#101017";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.globalAlpha = 1;

      // Move head toward mouse or random target
      let head = snake.current[0];
      let target;
      if (mouse.current.inside) {
        target = mouse.current;
      } else {
        wanderTimer++;
        if (wanderTimer > 120) {
          randomTarget.current = getRandomTarget();
          wanderTimer = 0;
        }
        target = randomTarget.current;
      }

      head.x += (target.x - head.x) * EASING;
      head.y += (target.y - head.y) * EASING;

      // Move each segment to follow the previous one, with angle constraint
      for (let i = 1; i < SNAKE_LENGTH; i++) {
        let prev = snake.current[i - 1];
        let curr = snake.current[i];
        let dx = prev.x - curr.x;
        let dy = prev.y - curr.y;
        let angle = Math.atan2(dy, dx);

        // Clamp angle for more "spine" effect
        if (i > 1) {
          let prevAngle = Math.atan2(snake.current[i - 2].y - prev.y, snake.current[i - 2].x - prev.x);
          let diff = angle - prevAngle;
          if (diff > MAX_ANGLE) angle = prevAngle + MAX_ANGLE;
          if (diff < -MAX_ANGLE) angle = prevAngle - MAX_ANGLE;
        }

        curr.x = prev.x - Math.cos(angle) * SEGMENT_LENGTH;
        curr.y = prev.y - Math.sin(angle) * SEGMENT_LENGTH;
      }

      // Draw the snake as a glowing line
      ctx.save();
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.shadowColor = "#06b6d4";
      ctx.shadowBlur = 22;
      ctx.beginPath();
      ctx.moveTo(snake.current[0].x, snake.current[0].y);
      for (let i = 1; i < SNAKE_LENGTH; i++) {
        ctx.lineTo(snake.current[i].x, snake.current[i].y);
      }
      // Gradient
      const grad = ctx.createLinearGradient(
        snake.current[0].x, snake.current[0].y,
        snake.current[SNAKE_LENGTH - 1].x, snake.current[SNAKE_LENGTH - 1].y
      );
      grad.addColorStop(0, "#06b6d4");
      grad.addColorStop(1, "#6366f1");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 9;
      ctx.globalAlpha = 0.88;
      ctx.stroke();
      ctx.restore();

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Mouse events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouse.current.x = clamp(e.clientX - rect.left, 0, WIDTH);
      mouse.current.y = clamp(e.clientY - rect.top, 0, HEIGHT);
    };
    const handleMouseEnter = () => { mouse.current.inside = true; };
    const handleMouseLeave = () => { mouse.current.inside = false; };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseenter', handleMouseEnter);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseenter', handleMouseEnter);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={WIDTH}
      height={HEIGHT}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100vw',
        height: '100vh',
        display: 'block',
        background: '#101017',
        zIndex: 0,
        pointerEvents: 'auto'
      }}
    />
  );
};

export default SnakeDoodle;
