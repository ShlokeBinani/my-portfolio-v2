import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Element } from 'react-scroll';
import GirlSkillSVG from './GirlSkillSVG';
import GirlByeSVG from './GirlByeSVG';

const skills = [
  'Python', 'Java', 'Assembly', 'Verilog',
  'Canva', 'Photoshop', 'Adobe Express', 'Canva AI',
  'Grok AI', 'Meta AI', 'ChatGPT', 'DeepSeek',
  'Gamma', 'Technical Writing', 'Prompt Engineering', 'UI/UX Design'
];

const SkillsSection: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [showByeCloud, setShowByeCloud] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);

  // Loop skills infinitely in Show Less mode
  useEffect(() => {
    if (!showAll) {
      const interval = setInterval(() => {
        setCurrentSkillIndex(prev => (prev + 1) % skills.length);
      }, 1500);
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

  return (
    <>
      {/* Invisible anchor for react-scroll */}
      <Element name="skills" />
      <section className="skills-section">
        <h2 className="neon-text">My Skills</h2>

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
        {showAll ? (
          <button className="show-less-btn" onClick={() => setShowAll(false)}>
            Show Less
          </button>
        ) : (
          <button className="show-all-btn" onClick={() => setShowAll(true)}>
            Show All Skills
          </button>
        )}
      </section>
    </>
  );
};

export default SkillsSection;

