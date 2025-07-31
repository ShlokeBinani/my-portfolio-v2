import React, { useRef, useEffect, useState } from 'react';

const RobotAnimation: React.FC = () => {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frame = useRef<number>(0);
  const robots = useRef<any[]>([]);
  const particles = useRef<any[]>([]);
  const mouse = useRef({ x: 0, y: 0, active: false });

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

  // Mouse tracking
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      mouse.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
        active: true
      };
    };
    const handleLeave = () => {
      mouse.current.active = false;
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    if (!size.w || !size.h) return;

    // Initialize robots
    robots.current = [
      {
        x: size.w * 0.2,
        y: size.h * 0.3,
        targetX: size.w * 0.2,
        targetY: size.h * 0.3,
        rotation: 0,
        eyeOffset: 0,
        glowIntensity: 0.5,
        size: 40
      },
      {
        x: size.w * 0.8,
        y: size.h * 0.7,
        targetX: size.w * 0.8,
        targetY: size.h * 0.7,
        rotation: Math.PI,
        eyeOffset: 0,
        glowIntensity: 0.3,
        size: 35
      },
      {
        x: size.w * 0.5,
        y: size.h * 0.8,
        targetX: size.w * 0.5,
        targetY: size.h * 0.8,
        rotation: Math.PI * 0.5,
        eyeOffset: 0,
        glowIntensity: 0.7,
        size: 30
      }
    ];

    particles.current = [];

    const draw = () => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;

      // Clear with dark background
      ctx.fillStyle = '#101017';
      ctx.fillRect(0, 0, size.w, size.h);

      const time = Date.now() * 0.001;

      // Update robots
      robots.current.forEach((robot, index) => {
        // Gentle wandering motion
        if (!mouse.current.active) {
          robot.targetX = size.w * 0.3 + Math.sin(time * 0.3 + index) * size.w * 0.4;
          robot.targetY = size.h * 0.4 + Math.cos(time * 0.2 + index * 2) * size.h * 0.3;
        } else {
          // React to mouse with some offset
          robot.targetX = mouse.current.x + Math.sin(index * 2) * 100;
          robot.targetY = mouse.current.y + Math.cos(index * 2) * 100;
        }

        // Smooth movement
        robot.x += (robot.targetX - robot.x) * 0.02;
        robot.y += (robot.targetY - robot.y) * 0.02;
        robot.rotation += 0.005;
        robot.eyeOffset = Math.sin(time * 2 + index) * 3;
        robot.glowIntensity = 0.3 + Math.sin(time * 1.5 + index) * 0.4;

        // Draw robot
        drawRobot(ctx, robot, time);

        // Emit particles occasionally
        if (Math.random() < 0.02) {
          particles.current.push({
            x: robot.x,
            y: robot.y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 60,
            maxLife: 60
          });
        }
      });

      // Update and draw particles
      particles.current = particles.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        
        const alpha = particle.life / particle.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha * 0.6;
        ctx.fillStyle = '#06b6d4';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return particle.life > 0;
      });

      // Draw connecting lines between robots
      ctx.save();
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.lineWidth = 1;
      ctx.shadowColor = '#6366f1';
      ctx.shadowBlur = 5;
      for (let i = 0; i < robots.current.length; i++) {
        for (let j = i + 1; j < robots.current.length; j++) {
          const robot1 = robots.current[i];
          const robot2 = robots.current[j];
          const distance = Math.hypot(robot1.x - robot2.x, robot1.y - robot2.y);
          if (distance < 300) {
            ctx.globalAlpha = (300 - distance) / 300 * 0.5;
            ctx.beginPath();
            ctx.moveTo(robot1.x, robot1.y);
            ctx.lineTo(robot2.x, robot2.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      frame.current = requestAnimationFrame(draw);
    };

    const drawRobot = (ctx: CanvasRenderingContext2D, robot: any, time: number) => {
      ctx.save();
      ctx.translate(robot.x, robot.y);
      ctx.rotate(robot.rotation);

      // Robot glow
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 20 * robot.glowIntensity;

      // Robot body
      ctx.fillStyle = '#1a1a2e';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-robot.size/2, -robot.size/2, robot.size, robot.size, 8);
      ctx.fill();
      ctx.stroke();

      // Robot head
      ctx.fillStyle = '#16213e';
      ctx.beginPath();
      ctx.roundRect(-robot.size/3, -robot.size/2 - 15, robot.size/1.5, 20, 10);
      ctx.fill();
      ctx.stroke();

      // Eyes
      ctx.fillStyle = '#06b6d4';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(-robot.size/6 + robot.eyeOffset, -robot.size/2 - 5, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(robot.size/6 + robot.eyeOffset, -robot.size/2 - 5, 3, 0, Math.PI * 2);
      ctx.fill();

      // Antenna
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -robot.size/2 - 15);
      ctx.lineTo(0, -robot.size/2 - 25);
      ctx.stroke();

      // Antenna light
      ctx.fillStyle = '#6366f1';
      ctx.shadowColor = '#6366f1';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(0, -robot.size/2 - 25, 2, 0, Math.PI * 2);
      ctx.fill();

      // Chest panel
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(-robot.size/4, -robot.size/6, robot.size/2, robot.size/3, 4);
      ctx.fill();
      ctx.stroke();

      // Chest lights
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = i % 2 === Math.floor(time * 2) % 2 ? '#06b6d4' : '#1a1a2e';
        ctx.beginPath();
        ctx.arc(-robot.size/6 + i * robot.size/6, 0, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    frame.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame.current!);
  }, [size]);

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

export default RobotAnimation;