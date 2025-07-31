import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => (
  <section id="about" className="min-h-[60vh] flex items-center justify-center bg-dark-200 py-20">
    <motion.div
      className="max-w-5xl mx-auto px-6 py-10 rounded-xl card-hover-effect shadow-2xl"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Photo Section */}
        <motion.div 
          className="md:col-span-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="relative group">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 p-1 overflow-hidden">
              <div className="w-full h-full rounded-full bg-dark-100 flex items-center justify-center relative overflow-hidden">
                {/* TODO: Replace this placeholder with the actual photo provided by the user */}
                {/* <img src="/path/to/photo.jpg" alt="Shloke Binani" className="w-44 h-44 rounded-full object-cover" /> */}
                <div className="w-44 h-44 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center border-2 border-primary-500/30">
                  <span className="text-4xl font-bold text-primary-500">SB</span>
                </div>
                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                     style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }}></div>
              </div>
            </div>
            {/* Floating elements around photo */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-primary-500 rounded-full animate-pulse delay-300"></div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="md:col-span-2">
          <motion.h2 
            className="text-4xl font-bold mb-6 neon-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            About Me
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 leading-relaxed mb-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Dedicated Electronics and Communication Engineering student specializing in artificial intelligence and machine learning applications, with a strong foundation in hardware projects and a proven track record in UI/UX and marketing design. Seeking internships to leverage AI/ML expertise and design proficiency in innovative tech solutions.
          </motion.p>
          <motion.div 
            className="text-gray-400 text-base space-y-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-primary-500">📧</span>
              <b>Email:</b> shlokebinani@gmail.com
            </div>
            <div className="flex items-center gap-3">
              <span className="text-primary-500">📱</span>
              <b>Phone:</b> +91 7003855628
            </div>
            <div className="flex items-center gap-3">
              <span className="text-primary-500">📍</span>
              <b>Location:</b> 33A Canal Circular Road, Swarnamani, Kolkata-700054
            </div>
            <div className="flex items-center gap-3">
              <span className="text-primary-500">💼</span>
              <b>LinkedIn:</b> <a href="https://linkedin.com/in/shlokebinani" target="_blank" rel="noopener noreferrer" className="text-primary-500 underline hover:text-accent-500 transition-colors">LinkedIn</a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  </section>
);

export default About;
