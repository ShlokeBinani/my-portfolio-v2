import React from 'react';
import { motion } from 'framer-motion';

const languages = [
  { name: 'English', level: 'Full Professional' },
  { name: 'Hindi', level: 'Native' },
  { name: 'Bengali', level: 'Professional Working' }
];

const interests = [
  'Artificial Intelligence',
  'Machine Learning',
  'Prompt Engineering',
  'Digital Design',
  'Traveling & Cultural Exchange',
  'Technical Writing',
  'UI/UX Trends'
];

const LanguagesInterests: React.FC = () => (
  <section id="languages-interests" className="bg-dark-300 py-20">
    <div className="max-w-4xl mx-auto px-6">
      <h2 className="text-4xl font-bold neon-text mb-8 text-center">Languages & Technical Interests</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          className="rounded-xl card-hover-effect p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Languages</h3>
          <ul className="space-y-2">
            {languages.map((lang, i) => (
              <li key={lang.name} className="flex justify-between">
                <span>{lang.name}</span>
                <span className="text-gray-400">{lang.level}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          className="rounded-xl card-hover-effect p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Technical Interests</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            {interests.map((interest, i) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);

export default LanguagesInterests;
