import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface EmailSidebarProps { email: string; }

export const EmailSidebar: React.FC<EmailSidebarProps> = ({ email }) => {
  const reduceMotion = useReducedMotion();
  return (
    <div className="pointer-events-none hidden md:flex fixed right-12 bottom-4 z-40 flex-col items-center">
      {reduceMotion ? (
        <>
          <a
            href={`mailto:${email}`}
            aria-label="Email Mark John Ignacio"
            className="pointer-events-auto font-mono text-[14px] tracking-wide text-[#8892b0] transition duration-300 hover:-translate-y-[3px] hover:text-[#64ffda] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50 px-2 py-3 rounded"
            style={{ writingMode: 'vertical-rl' }}
          >
            {email}
          </a>
          <div className="mt-6 h-[110px] w-px bg-[#8892b0]" aria-hidden="true" />
        </>
      ) : (
        <>
          <motion.a
            href={`mailto:${email}`}
            aria-label="Email Mark John Ignacio"
            className="pointer-events-auto font-mono text-[14px] tracking-wide text-[#8892b0] transition duration-300 hover:-translate-y-[3px] hover:text-[#64ffda] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50 px-2 py-3 rounded"
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
            className="mt-6 h-[110px] w-px bg-[#8892b0]"
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
};
