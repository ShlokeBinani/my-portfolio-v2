import React from 'react';
import ScrollTechProgress from './components/ScrollTechProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SkillsSection from './components/SkillsSection';
import Webstacks from './components/Webstacks';
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
      <SkillsSection />
      <Webstacks />
      <Projects />
      <Achievements />
      <LanguagesInterests />
      <Contact />
    </main>
  </div>
);

export default App;
