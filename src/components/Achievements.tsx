import React from 'react';
import { motion } from 'framer-motion';

const achievements = [
  { title: 'Public Relations & Design Head, SAE-VIT', desc: 'Directed marketing campaigns, managed content creation, and mentored freshmen for the Vellore Chapter of SAE International (2025–2026).' },
  { title: 'Core Member, IEEE Chapter, VIT', desc: 'Organized technical events and workshops, supporting student learning and collaboration (2024–Present).' },
  { title: 'Core Member, CodeChef VIT', desc: 'Coordinated coding competitions and sessions, promoting programming skills among peers (2024–Present).' }
];

const education = [
  { degree: 'B.Tech in Electronics and Communication Engineering', place: 'Vellore Institute of Technology, Vellore, Tamil Nadu', year: 'Expected 2027', details: 'Relevant Courses: Digital Logic Design, Microprocessors, Data Structures' },
  { degree: 'Class 12 (Science Stream)', place: 'Haryana Vidyamandir School', year: '2023', details: '85%' },
  { degree: 'Class 10', place: 'Calcutta Boys’ School', year: '2021', details: '95%' }
];

const Achievements: React.FC = () => (
  <section id="achievements" className="bg-dark-500 py-20">
    <div className="max-w-5xl mx-auto px-6">
      <h2 className="text-4xl font-bold neon-text mb-8 text-center">Achievements & Education</h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-semibold mb-4">Achievements</h3>
          <div className="space-y-6">
            {achievements.map((ach, i) => (
              <motion.div
                key={ach.title}
                className="rounded-xl card-hover-effect p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <h4 className="font-bold mb-1">{ach.title}</h4>
                <p className="text-gray-300">{ach.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4">Education</h3>
          <div className="space-y-6">
            {education.map((edu, i) => (
              <motion.div
                key={edu.degree}
                className="rounded-xl card-hover-effect p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <h4 className="font-bold mb-1">{edu.degree}</h4>
                <div className="text-gray-300">{edu.place}</div>
                <div className="text-gray-400">{edu.year}</div>
                <div className="text-gray-400">{edu.details}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Achievements;
