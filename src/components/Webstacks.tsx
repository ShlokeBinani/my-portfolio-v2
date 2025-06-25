import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

// Import all your logos from src/assets/webstacks/
import assemblyLogo from '../assets/webstacks/assembly.svg';
import chatgptLogo from '../assets/webstacks/chatgpt.svg';
import claudeLogo from '../assets/webstacks/claude.svg';
import geminiLogo from '../assets/webstacks/gemini.svg';
import grokLogo from '../assets/webstacks/grok.svg';
import javaLogo from '../assets/webstacks/java.svg';
import perplexityLogo from '../assets/webstacks/perplexity.svg';
import pythonLogo from '../assets/webstacks/python.svg';
import verilogLogo from '../assets/webstacks/verilog.svg';

interface WebstackLogo {
  name: string;
  logo: string;
  description: string;
  learnedAt: string;
}

const webstacks: WebstackLogo[] = [
  { name: 'Assembly', logo: assemblyLogo, description: 'Low-level programming for microcontrollers and embedded systems.', learnedAt: 'Learnt in VIT coursework and hardware projects.' },
  { name: 'ChatGPT', logo: chatgptLogo, description: 'AI language model for prompt engineering and automation.', learnedAt: 'Used for prompt engineering and AI-driven content creation.' },
  { name: 'Claude', logo: claudeLogo, description: 'Anthropic\'s advanced conversational AI for research and automation.', learnedAt: 'Applied in research and AI tool comparisons.' },
  { name: 'Gemini', logo: geminiLogo, description: 'Google\'s AI for advanced language and multimodal tasks.', learnedAt: 'Used for AI experiments and portfolio features.' },
  { name: 'Grok', logo: grokLogo, description: 'xAI\'s conversational model for technical and creative tasks.', learnedAt: 'Explored for technical writing and creative coding.' },
  { name: 'Java', logo: javaLogo, description: 'Object-oriented programming language for scalable applications.', learnedAt: 'Learnt in school and college projects.' },
  { name: 'Perplexity', logo: perplexityLogo, description: 'AI-powered search and research assistant.', learnedAt: 'Used for research and information retrieval.' },
  { name: 'Python', logo: pythonLogo, description: 'High-level programming language for AI, ML, and automation.', learnedAt: 'Learnt in school, college, and personal projects.' },
  { name: 'Verilog', logo: verilogLogo, description: 'Hardware description language for digital design.', learnedAt: 'Applied in digital logic and FPGA coursework.' },
];

const BALL_RADIUS = 45;
const CONTAINER_WIDTH = 900;
const CONTAINER_HEIGHT = 400;
const GROUND_Y = CONTAINER_HEIGHT - 60;
const GRAVITY = 0.5;
const BOUNCE = 0.7;
const FRICTION = 0.98;

type BallState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
};

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const Webstacks: React.FC = () => {
  const [balls, setBalls] = useState<BallState[]>([]);
  const [animationStarted, setAnimationStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) setAnimationStarted(true);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!animationStarted) return;
    setBalls(
      webstacks.map((_, i) => ({
        x: getRandom(BALL_RADIUS, CONTAINER_WIDTH - BALL_RADIUS),
        y: getRandom(-200, -50) - i * 20,
        vx: getRandom(-3, 3),
        vy: 0,
        mass: 1,
      }))
    );
  }, [animationStarted]);

  useEffect(() => {
    if (!animationStarted || balls.length === 0) return;

    let frame: number;
    const animate = () => {
      setBalls((prev) => {
        const next = prev.map(ball => ({ ...ball }));

        for (let i = 0; i < next.length; i++) {
          const ball = next[i];

          // Gravity
          ball.vy += GRAVITY;
          // Friction
          ball.vx *= FRICTION;
          // Update position
          ball.x += ball.vx;
          ball.y += ball.vy;

          // Ground collision
          if (ball.y + BALL_RADIUS >= GROUND_Y) {
            ball.y = GROUND_Y - BALL_RADIUS;
            ball.vy = -ball.vy * BOUNCE;
            ball.vx *= 0.9;
            if (Math.abs(ball.vy) < 1) ball.vy = 0;
          }

          // Wall collisions
          if (ball.x - BALL_RADIUS <= 0) {
            ball.x = BALL_RADIUS;
            ball.vx = -ball.vx * BOUNCE;
          }
          if (ball.x + BALL_RADIUS >= CONTAINER_WIDTH) {
            ball.x = CONTAINER_WIDTH - BALL_RADIUS;
            ball.vx = -ball.vx * BOUNCE;
          }

          // Ball-to-ball collisions
          for (let j = i + 1; j < next.length; j++) {
            const other = next[j];
            const dx = ball.x - other.x;
            const dy = ball.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = BALL_RADIUS * 2;

            if (distance < minDistance) {
              const overlap = minDistance - distance;
              const separationX = (dx / distance) * overlap * 0.5;
              const separationY = (dy / distance) * overlap * 0.5;

              ball.x += separationX;
              ball.y += separationY;
              other.x -= separationX;
              other.y -= separationY;

              const normalX = dx / distance;
              const normalY = dy / distance;

              const relativeVelX = ball.vx - other.vx;
              const relativeVelY = ball.vy - other.vy;
              const velAlongNormal = relativeVelX * normalX + relativeVelY * normalY;
              if (velAlongNormal > 0) continue;

              const restitution = 0.8;
              let j = -(1 + restitution) * velAlongNormal;
              j /= (1 / ball.mass + 1 / other.mass);

              const impulseX = j * normalX;
              const impulseY = j * normalY;

              ball.vx += impulseX / ball.mass;
              ball.vy += impulseY / ball.mass;
              other.vx -= impulseX / other.mass;
              other.vy -= impulseY / other.mass;
            }
          }
        }

        return next;
      });

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [animationStarted, balls.length]);

  return (
    <section id="webstacks" className="relative bg-dark-400 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold neon-text mb-12 text-center">My Webstacks</h2>
        <div
          ref={containerRef}
          className="relative mx-auto"
          style={{
            width: CONTAINER_WIDTH,
            height: CONTAINER_HEIGHT,
            background: 'transparent',
            margin: '0 auto',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
          }}
        >
          {/* Thin ground line */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: GROUND_Y,
              width: '100%',
              height: 2,
              background: 'linear-gradient(90deg, rgba(255,255,255,0.8), rgba(59,130,246,0.8))',
              boxShadow: '0 0 10px rgba(59,130,246,0.5)',
              zIndex: 1,
            }}
          />

          {/* Physics balls */}
          {balls.map((ball, i) => (
            <motion.div
              key={i}
              data-tooltip-id={`webstack-tooltip-${i}`}
              style={{
                position: 'absolute',
                left: ball.x - BALL_RADIUS,
                top: ball.y - BALL_RADIUS,
                width: BALL_RADIUS * 2,
                height: BALL_RADIUS * 2,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 65% 35%, #6366f1 65%, #06b6d4 100%)',
                boxShadow: '0 0 20px #06b6d4cc, 0 0 35px #3b82f688',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2,
                border: '3px solid #3b82f6',
                filter: 'drop-shadow(0 0 8px #3b82f6)',
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <img
                src={webstacks[i].logo}
                alt={webstacks[i].name}
                style={{ width: 40, height: 40 }}
              />
            </motion.div>
          ))}

          {/* Tooltips */}
          {webstacks.map((stack, i) => (
            <Tooltip
              key={i}
              id={`webstack-tooltip-${i}`}
              place="top"
              style={{
                backgroundColor: '#181825',
                color: '#06b6d4',
                border: '1px solid #6366f1',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                maxWidth: '250px',
                zIndex: 9999
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px', color: '#06b6d4' }}>
                {stack.name}
              </div>
              <div style={{ color: '#cbd5e1', marginBottom: '4px' }}>
                {stack.description}
              </div>
              <div style={{ color: '#818cf8', fontSize: '12px' }}>
                {stack.learnedAt}
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Webstacks;
