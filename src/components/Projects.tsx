import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Distance Detector Using IR Sensor',
    desc: 'Designed and built an IR-based distance detector for short-range obstacle detection. Achieved accurate detection up to 10cm.',
    tools: 'Analog Circuits, Op-Amps, Comparators',
    year: 'April 2025'
  },
  {
    title: 'Light Detector Circuit',
    desc: 'Developed a light detector for ambient light sensing. Designed and calibrated circuit for reliable light intensity detection.',
    tools: 'Analog Circuits, LDR, Transistors',
    year: 'April 2025'
  },
  {
    title: 'Code Lock System',
    desc: 'Created a code lock system for secure access control. Designed and implemented a functional 4-digit code prototype.',
    tools: 'Analog Circuits, Switches, Logic Gates',
    year: 'April 2025'
  },
  {
    title: 'Python Snake Game',
    desc: 'Developed a classic snake game using Python and Pygame. Implemented game logic, UI, and scoring system.',
    tools: 'Python, Pygame',
    year: '2021'
  },
  {
    title: 'Prompt Engineering for Marketing',
    desc: 'Designed marketing materials for SAE-VIT events using ChatGPT and Canva. Enhanced event visibility through creative ad content.',
    tools: 'ChatGPT, Canva',
    year: '2023–Present'
  }
];

const Projects: React.FC = () => (
  <section id="projects" className="bg-dark-400 py-20">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-4xl font-bold neon-text mb-8 text-center">Projects</h2>
      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((proj, i) => (
          <motion.div
            key={proj.title}
            className="rounded-2xl card-hover-effect overflow-hidden shadow-xl group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-500 transition">{proj.title}</h3>
              <div className="text-gray-400 text-sm mb-2">{proj.year} &nbsp;|&nbsp; <span className="italic">{proj.tools}</span></div>
              <p className="text-gray-300">{proj.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
