import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  'Python', 'Java', 'Assembly (8051, ARM7)', 'Verilog',
  'Canva', 'Adobe Photoshop', 'Adobe Express',
  'Canva AI', 'Grok AI', 'Meta AI', 'ChatGPT', 'DeepSeek', 'Gamma',
  'Technical Writing', 'Prompt Engineering', 'UI/UX Design'
];

const Skills: React.FC = () => (
  <section id="skills" className="bg-dark-300 py-20">
    <div className="max-w-5xl mx-auto px-6">
      <h2 className="text-4xl font-bold neon-text mb-8 text-center">Skills</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {skills.map((skill, i) => (
          <motion.div
            key={skill}
            className="rounded-xl card-hover-effect p-6 text-center text-lg font-semibold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
