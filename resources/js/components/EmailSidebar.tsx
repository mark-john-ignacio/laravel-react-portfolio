import React from 'react';
import { motion } from 'framer-motion';

export const EmailSidebar: React.FC = () => {
  const email = 'Markme44.mm@gmail.com';
  return (
    <div className="pointer-events-none hidden md:flex fixed right-10 bottom-0 z-40 flex-col items-center">
      <motion.a
        href={`mailto:${email}`}
        className="pointer-events-auto font-mono text-[14px] tracking-wide text-[#8892b0] transition duration-300 hover:-translate-y-[3px] hover:text-[#64ffda] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50"
        style={{ writingMode: 'vertical-rl' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.6, ease: 'easeOut' }}
      >
        {email}
      </motion.a>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.6 }}
        className="mt-5 h-[90px] w-px bg-[#8892b0]"
        aria-hidden="true"
      />
    </div>
  );
};
