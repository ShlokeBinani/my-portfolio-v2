// src/components/Contact.tsx
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';

export default function Contact() {
  // replace FORM_ID with the one from your Formspree dashboard
  const [state, handleSubmit] = useForm('mnnvgknw');

  if (state.succeeded) {
    return (
      <section id="contact" className="bg-dark-200 py-20">
        <div className="max-w-xl mx-auto px-6 text-center">
          <motion.div
            className="rounded-xl card-hover-effect p-10 shadow-2xl"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold neon-text mb-4">Thank you!</h2>
            <p className="text-gray-300">
              Your message has been sent. I’ll get back to you soon.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-dark-200 py-20">
      <div className="max-w-xl mx-auto px-6">
        <motion.div
          className="rounded-xl card-hover-effect p-10 shadow-2xl"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold neon-text mb-4">Contact Me</h2>
          <p className="text-gray-300 mb-6">
            Interested in collaborating or have an opportunity?
            Reach out via the form below or email me directly at{' '}
            <a
              href="mailto:shlokebinani@gmail.com"
              className="text-primary-500 underline"
            >
              shlokebinani@gmail.com
            </a>.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full p-3 rounded bg-dark-300 text-white focus:outline-none"
            />
            <ValidationError
              prefix="Name"
              field="name"
              errors={state.errors}
            />

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full p-3 rounded bg-dark-300 text-white focus:outline-none"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />

            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Your Message"
              required
              className="w-full p-3 rounded bg-dark-300 text-white focus:outline-none"
            ></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full py-3 rounded bg-gradient-to-r from-primary-500 to-accent-500 text-white font-bold hover:scale-105 transition-transform disabled:opacity-60"
            >
              {state.submitting ? 'Sending...' : 'Send'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
