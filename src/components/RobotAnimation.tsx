import React, { useRef, useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface Circuit {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active: boolean;
  activationTime: number;
}

const RobotAnimation: React.FC = () => {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  
  // Robot state
  const robotRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    eyeGlow: 0,
    coreRotation: 0,
    armRotation: 0,
    scanning: false,
    scanAngle: 0
  });

  // Particles and effects
  const particlesRef = useRef<Particle[]>([]);
  const circuitsRef = useRef<Circuit[]>([]);
  const lastParticleSpawn = useRef<number>(0);

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

  // Initialize robot position and circuits
  useEffect(() => {
    if (size.w > 0 && size.h > 0) {
      const robot = robotRef.current;
      robot.x = size.w / 2;
      robot.y = size.h / 2;
      robot.targetX = robot.x;
      robot.targetY = robot.y;

      // Initialize circuit patterns
      const circuits: Circuit[] = [];
      const numCircuits = 15;
      for (let i = 0; i < numCircuits; i++) {
        circuits.push({
          x1: Math.random() * size.w,
          y1: Math.random() * size.h,
          x2: Math.random() * size.w,
          y2: Math.random() * size.h,
          active: false,
          activationTime: Math.random() * 5000
        });
      }
      circuitsRef.current = circuits;
    }
  }, [size]);

  // Mouse interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const robot = robotRef.current;
        robot.targetX = e.clientX - rect.left;
        robot.targetY = e.clientY - rect.top;
        robot.scanning = true;
      }
    };

    const handleMouseLeave = () => {
      const robot = robotRef.current;
      robot.targetX = size.w / 2;
      robot.targetY = size.h / 2;
      robot.scanning = false;
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [size]);

  // Create particle
  const createParticle = (x: number, y: number) => {
    const colors = ['#00f5ff', '#0080ff', '#4080ff', '#8040ff'];
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: 1,
      maxLife: 60 + Math.random() * 60,
      size: 1 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  };

  // Animation loop
  useEffect(() => {
    const animate = (timestamp: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      
      if (!ctx || size.w === 0 || size.h === 0) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      timeRef.current = timestamp;
      
      // Clear canvas with dark background
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, size.w, size.h);

      const robot = robotRef.current;
      
      // Update robot movement (smooth following)
      robot.x += (robot.targetX - robot.x) * 0.02;
      robot.y += (robot.targetY - robot.y) * 0.02;
      
      // Update robot animations
      robot.eyeGlow = Math.sin(timestamp * 0.003) * 0.5 + 0.5;
      robot.coreRotation += 0.01;
      robot.armRotation = Math.sin(timestamp * 0.002) * 0.3;
      
      if (robot.scanning) {
        robot.scanAngle = Math.atan2(robot.targetY - robot.y, robot.targetX - robot.x);
      }

      // Update circuits
      circuitsRef.current.forEach(circuit => {
        circuit.activationTime -= 16;
        if (circuit.activationTime <= 0) {
          circuit.active = !circuit.active;
          circuit.activationTime = 1000 + Math.random() * 3000;
        }
      });

      // Draw background grid
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.1)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < size.w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, size.h);
        ctx.stroke();
      }
      for (let y = 0; y < size.h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(size.w, y);
        ctx.stroke();
      }

      // Draw circuits
      circuitsRef.current.forEach(circuit => {
        if (circuit.active) {
          ctx.strokeStyle = `rgba(0, 245, 255, ${0.3 + Math.sin(timestamp * 0.01) * 0.2})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(circuit.x1, circuit.y1);
          ctx.lineTo(circuit.x2, circuit.y2);
          ctx.stroke();
          
          // Circuit nodes
          ctx.fillStyle = '#00f5ff';
          ctx.beginPath();
          ctx.arc(circuit.x1, circuit.y1, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(circuit.x2, circuit.y2, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw robot body
      ctx.save();
      ctx.translate(robot.x, robot.y);
      
      // Main body (hexagonal)
      ctx.fillStyle = '#1a1a2e';
      ctx.strokeStyle = '#00f5ff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = Math.cos(angle) * 40;
        const y = Math.sin(angle) * 40;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Core (rotating)
      ctx.save();
      ctx.rotate(robot.coreRotation);
      const coreGlow = 0.5 + Math.sin(timestamp * 0.005) * 0.3;
      ctx.fillStyle = `rgba(0, 245, 255, ${coreGlow})`;
      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.fill();
      
      // Core details
      ctx.strokeStyle = '#4080ff';
      ctx.lineWidth = 2;
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * 8, Math.sin(angle) * 8);
        ctx.lineTo(Math.cos(angle) * 12, Math.sin(angle) * 12);
        ctx.stroke();
      }
      ctx.restore();

      // Eyes
      const eyeY = -20;
      const eyeGlowIntensity = 0.7 + robot.eyeGlow * 0.3;
      
      // Left eye
      ctx.fillStyle = `rgba(255, 80, 80, ${eyeGlowIntensity})`;
      ctx.beginPath();
      ctx.arc(-15, eyeY, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Right eye
      ctx.beginPath();
      ctx.arc(15, eyeY, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Eye pupils
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-15, eyeY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(15, eyeY, 3, 0, Math.PI * 2);
      ctx.fill();

      // Arms
      ctx.save();
      ctx.rotate(robot.armRotation);
      ctx.strokeStyle = '#00f5ff';
      ctx.lineWidth = 4;
      
      // Left arm
      ctx.beginPath();
      ctx.moveTo(-35, 0);
      ctx.lineTo(-60, -10);
      ctx.stroke();
      
      // Right arm
      ctx.beginPath();
      ctx.moveTo(35, 0);
      ctx.lineTo(60, -10);
      ctx.stroke();
      ctx.restore();

      // Scanning beam
      if (robot.scanning) {
        ctx.strokeStyle = `rgba(255, 80, 80, 0.6)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, eyeY);
        const beamLength = 200;
        const beamX = Math.cos(robot.scanAngle) * beamLength;
        const beamY = Math.sin(robot.scanAngle) * beamLength;
        ctx.lineTo(beamX, beamY);
        ctx.stroke();
      }

      ctx.restore();

      // Spawn particles
      if (timestamp - lastParticleSpawn.current > 100) {
        const particleX = robot.x + (Math.random() - 0.5) * 80;
        const particleY = robot.y + (Math.random() - 0.5) * 80;
        particlesRef.current.push(createParticle(particleX, particleY));
        lastParticleSpawn.current = timestamp;
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        
        if (particle.life <= 0) return false;
        
        const alpha = particle.life / particle.maxLife;
        ctx.fillStyle = particle.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * alpha, 0, Math.PI * 2);
        ctx.fill();
        
        return true;
      });

      // Limit particles
      if (particlesRef.current.length > 50) {
        particlesRef.current = particlesRef.current.slice(-50);
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [size]);

  if (size.w === 0 || size.h === 0) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      width={size.w}
      height={size.h}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
};

export default RobotAnimation;