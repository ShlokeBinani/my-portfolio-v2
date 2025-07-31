import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Element } from 'react-scroll';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import GirlSkillSVG from './GirlSkillSVG';
import GirlByeSVG from './GirlByeSVG';

// Import all webstack logos
import assemblyLogo from '../assets/webstacks/assembly.svg';
import chatgptLogo from '../assets/webstacks/chatgpt.svg';
import claudeLogo from '../assets/webstacks/claude.svg';
import geminiLogo from '../assets/webstacks/gemini.svg';
import grokLogo from '../assets/webstacks/grok.svg';
import javaLogo from '../assets/webstacks/java.svg';
import perplexityLogo from '../assets/webstacks/perplexity.svg';
import pythonLogo from '../assets/webstacks/python.svg';
import verilogLogo from '../assets/webstacks/verilog.svg';

const skills = [
  'Python', 'Java', 'Assembly', 'Verilog',
  'Canva', 'Photoshop', 'Adobe Express', 'Canva AI',
  'Grok AI', 'Meta AI', 'ChatGPT', 'DeepSeek',
  'Gamma', 'Technical Writing', 'Prompt Engineering', 'UI/UX Design'
];

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

const CombinedSkills: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [showByeCloud, setShowByeCloud] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'skills' | 'tech'>('skills');

  // Webstack physics simulation
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballsRef = useRef<BallState[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef<{ x: number; y: number; isPressed: boolean }>({ x: 0, y: 0, isPressed: false });

  // Loop skills infinitely in Show Less mode
  useEffect(() => {
    if (!showAll) {
      const interval = setInterval(() => {
        setCurrentSkillIndex(prev => (prev + 1) % skills.length);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [showAll]);

  // Show bye cloud and then grid
  useEffect(() => {
    if (showAll) {
      setShowByeCloud(true);
      setGridVisible(false);
      const byeTimeout = setTimeout(() => {
        setShowByeCloud(false);
        setGridVisible(true);
      }, 1200);
      return () => clearTimeout(byeTimeout);
    } else {
      setGridVisible(false);
      setShowByeCloud(false);
    }
  }, [showAll]);

  // Initialize physics simulation for webstacks
  useEffect(() => {
    if (activeTab === 'tech') {
      const initBalls = () => {
        ballsRef.current = webstacks.map((_, index) => ({
          x: Math.random() * (CONTAINER_WIDTH - BALL_RADIUS * 2) + BALL_RADIUS,
          y: Math.random() * 200 + 50,
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 2,
          mass: 1,
        }));
      };

      const animate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, CONTAINER_WIDTH, CONTAINER_HEIGHT);

        // Update ball physics
        ballsRef.current.forEach((ball, index) => {
          // Apply gravity
          ball.vy += GRAVITY;

          // Apply mouse interaction
          if (mouseRef.current.isPressed) {
            const dx = mouseRef.current.x - ball.x;
            const dy = mouseRef.current.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              const force = (100 - distance) / 100;
              ball.vx += (dx / distance) * force * 0.5;
              ball.vy += (dy / distance) * force * 0.5;
            }
          }

          // Update position
          ball.x += ball.vx;
          ball.y += ball.vy;

          // Apply friction
          ball.vx *= FRICTION;
          ball.vy *= FRICTION;

          // Collision with walls
          if (ball.x - BALL_RADIUS < 0) {
            ball.x = BALL_RADIUS;
            ball.vx *= -BOUNCE;
          }
          if (ball.x + BALL_RADIUS > CONTAINER_WIDTH) {
            ball.x = CONTAINER_WIDTH - BALL_RADIUS;
            ball.vx *= -BOUNCE;
          }

          // Collision with ground
          if (ball.y + BALL_RADIUS > GROUND_Y) {
            ball.y = GROUND_Y - BALL_RADIUS;
            ball.vy *= -BOUNCE;
          }

          // Ball-to-ball collision
          ballsRef.current.forEach((otherBall, otherIndex) => {
            if (index !== otherIndex) {
              const dx = otherBall.x - ball.x;
              const dy = otherBall.y - ball.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const minDistance = BALL_RADIUS * 2;

              if (distance < minDistance) {
                const overlap = minDistance - distance;
                const separationX = (dx / distance) * overlap * 0.5;
                const separationY = (dy / distance) * overlap * 0.5;

                ball.x -= separationX;
                ball.y -= separationY;
                otherBall.x += separationX;
                otherBall.y += separationY;

                const relativeVelocityX = otherBall.vx - ball.vx;
                const relativeVelocityY = otherBall.vy - ball.vy;
                const impulse = 2 * (relativeVelocityX * dx + relativeVelocityY * dy) / (distance * (ball.mass + otherBall.mass));

                ball.vx += impulse * otherBall.mass * dx / distance;
                ball.vy += impulse * otherBall.mass * dy / distance;
                otherBall.vx -= impulse * ball.mass * dx / distance;
                otherBall.vy -= impulse * ball.mass * dy / distance;
              }
            }
          });

          // Draw ball
          const webstack = webstacks[index];
          const img = new Image();
          img.src = webstack.logo;
          
          ctx.save();
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
          ctx.clip();
          
          ctx.drawImage(img, ball.x - BALL_RADIUS, ball.y - BALL_RADIUS, BALL_RADIUS * 2, BALL_RADIUS * 2);
          
          ctx.restore();
          
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
          ctx.stroke();
        });

        animationRef.current = requestAnimationFrame(animate);
      };

      initBalls();
      animate();

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [activeTab]);

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  };

  const handleCanvasMouseDown = () => {
    mouseRef.current.isPressed = true;
  };

  const handleCanvasMouseUp = () => {
    mouseRef.current.isPressed = false;
  };

  return (
    <>
      <Element name="skills" />
      <section className="min-h-screen bg-dark-200 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-12 neon-text"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Skills & Technologies
          </motion.h2>

          {/* Tab Navigation */}
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-dark-100 rounded-full p-1 flex">
              <button
                onClick={() => setActiveTab('skills')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === 'skills'
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Core Skills
              </button>
              <button
                onClick={() => setActiveTab('tech')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === 'tech'
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Tech Stack
              </button>
            </div>
          </motion.div>

          {/* Skills Tab Content */}
          {activeTab === 'skills' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="skills-section"
            >
              {/* SVG and floating box in Show Less */}
              {!showAll && (
                <div style={{ position: 'relative', width: 180, height: 180, margin: "0 auto 2.5rem auto" }}>
                  <GirlSkillSVG />
                  <div className="skill-float-box">
                    {skills[currentSkillIndex]}
                  </div>
                </div>
              )}

              {/* SVG, bye cloud, and grid in Show All */}
              {showAll && (
                <div style={{ position: 'relative', width: 180, height: 180, margin: "0 auto 2.5rem auto" }}>
                  <GirlByeSVG />
                  <AnimatePresence>
                    {showByeCloud && (
                      <motion.div
                        key="bye-cloud"
                        initial={{ opacity: 0, y: -30, scale: 0.8 }}
                        animate={{ opacity: 1, y: -50, scale: 1 }}
                        exit={{ opacity: 0, y: -30, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: 0,
                          transform: 'translate(-50%, -100%)',
                          zIndex: 10,
                          pointerEvents: 'none',
                        }}
                      >
                        <svg width="100" height="60" viewBox="0 0 100 60">
                          <ellipse cx="50" cy="35" rx="45" ry="20" fill="#fff" opacity="0.95" />
                          <ellipse cx="30" cy="35" rx="18" ry="15" fill="#fff" opacity="0.95" />
                          <ellipse cx="70" cy="35" rx="15" ry="12" fill="#fff" opacity="0.95" />
                          <text x="50" y="42" textAnchor="middle" fill="#6366f1" fontSize="16" fontWeight="bold">bye!</text>
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Animated grid after bye cloud */}
              {gridVisible && (
                <motion.div
                  className="skills-grid"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.08 } },
                    hidden: {}
                  }}
                >
                  {skills.map((skill, idx) => (
                    <motion.div
                      className="skill-card"
                      key={skill}
                      variants={{
                        hidden: { opacity: 0, scale: 0.7, y: 30 },
                        visible: { opacity: 1, scale: 1, y: 0 }
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Toggle button */}
              <div className="text-center">
                {showAll ? (
                  <button className="show-less-btn" onClick={() => setShowAll(false)}>
                    Show Less
                  </button>
                ) : (
                  <button className="show-all-btn" onClick={() => setShowAll(true)}>
                    Show All Skills
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Tech Stack Tab Content */}
          {activeTab === 'tech' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-gray-300 mb-8 text-lg">
                Interactive technology showcase - hover and click to interact with the logos!
              </p>
              
              <div className="flex justify-center">
                <div style={{ 
                  border: '3px solid #6366f1', 
                  borderRadius: '16px', 
                  padding: '20px', 
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.1) 100%)',
                  boxShadow: '0 0 30px rgba(99,102,241,0.3)'
                }}>
                  <canvas
                    ref={canvasRef}
                    width={CONTAINER_WIDTH}
                    height={CONTAINER_HEIGHT}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseDown={handleCanvasMouseDown}
                    onMouseUp={handleCanvasMouseUp}
                    onMouseLeave={handleCanvasMouseUp}
                    style={{ 
                      cursor: mouseRef.current.isPressed ? 'grabbing' : 'grab',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)'
                    }}
                  />
                </div>
              </div>

              {/* Tooltips for webstacks */}
              {webstacks.map((stack, index) => (
                <Tooltip
                  key={stack.name}
                  id={`webstack-tooltip-${index}`}
                  style={{
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                    color: '#ffffff',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    maxWidth: '280px',
                    boxShadow: '0 8px 32px rgba(99,102,241,0.3)',
                    border: '1px solid rgba(99,102,241,0.3)',
                    zIndex: 1000,
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
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default CombinedSkills;