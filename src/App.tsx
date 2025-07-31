import React from 'react';
import ScrollTechProgress from './components/ScrollTechProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SkillsAndTech from './components/SkillsAndTech';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import LanguagesInterests from './components/LanguagesInterests';
import Contact from './components/Contact';

const App: React.FC = () => (
  <div className="bg-dark-100 min-h-screen">
    <ScrollTechProgress />
    <Navbar />
    <main>
      <Hero />
      <About />
      <SkillsAndTech />
      <Projects />
      <Achievements />
      <LanguagesInterests />
      <Contact />
    </main>
  </div>
);

export default App;
