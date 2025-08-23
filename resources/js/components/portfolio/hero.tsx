import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="space-y-6"
      >
        <p className="font-mono text-mint">Hi, my name is</p>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-100 leading-tight">
          Mark John Ignacio.
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-400 leading-tight">
          I build things for the web.
        </h2>
        <p className="max-w-xl text-slate-400">
          I'm a software engineer focused on crafting performant, accessible products with delightful user experiences.
          Currently I'm exploring modern full-stack development with Laravel, React, TypeScript, and beautiful
          component systems.
        </p>
        <div>
          <a
            href="#work"
            className="inline-block border border-mint text-mint px-6 py-3 rounded hover:bg-mint/10 font-mono text-sm tracking-wider"
          >
            Check out my work
          </a>
        </div>
      </motion.div>
    </section>
  );
}
