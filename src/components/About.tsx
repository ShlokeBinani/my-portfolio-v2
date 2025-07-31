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
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Photo Section */}
        <motion.div 
          className="flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="w-64 h-64 rounded-2xl overflow-hidden border-4 border-primary-500/30 shadow-2xl">
            <img 
              src="/shloke-photo.jpg" 
              alt="Shloke Binani" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image doesn't exist
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling!.setAttribute('style', 'display: flex');
              }}
            />
            <div 
              className="w-full h-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 hidden items-center justify-center text-gray-400 text-sm text-center p-4"
            >
              Photo Coming Soon
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4 neon-text">About Me</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            Dedicated Electronics and Communication Engineering student specializing in artificial intelligence and machine learning applications, with a strong foundation in hardware projects and a proven track record in UI/UX and marketing design. Seeking internships to leverage AI/ML expertise and design proficiency in innovative tech solutions.
          </p>
          <div className="text-gray-400 text-base space-y-1">
            <div><b>Email:</b> shlokebinani@gmail.com</div>
            <div><b>Phone:</b> +91 7003855628</div>
            <div><b>Location:</b> 33A Canal Circular Road, Swarnamani, Kolkata-700054</div>
            <div><b>LinkedIn:</b> <a href="https://linkedin.com/in/shlokebinani" target="_blank" rel="noopener noreferrer" className="text-primary-500 underline">LinkedIn</a></div>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

export default About;
