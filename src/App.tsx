import React from 'react';
import ScrollTechProgress from './components/ScrollTechProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CombinedSkills from './components/CombinedSkills';
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
      <CombinedSkills />
      <Projects />
      <Achievements />
      <LanguagesInterests />
      <Contact />
    </main>
  </div>
);

export default App;
