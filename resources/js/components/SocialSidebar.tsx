import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

const socials = [
  { href: 'https://github.com/markjohnignacio', label: 'GitHub', Icon: Github },
  { href: 'https://linkedin.com/in/markjohnignacio', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://twitter.com/markjohnignacio', label: 'Twitter', Icon: Twitter },
];

export const SocialSidebar: React.FC = () => {
  const reduceMotion = useReducedMotion();
  return (
    <div className="pointer-events-none hidden md:flex fixed left-10 bottom-0 z-40 flex-col items-center">
      <motion.ul
        className="pointer-events-auto flex flex-col items-center gap-5"
        initial={reduceMotion ? undefined : 'hidden'}
        animate={reduceMotion ? undefined : 'show'}
        variants={reduceMotion ? undefined : {
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { delay: 2, staggerChildren: 0.1 } },
        }}
        aria-label="Social links"
      >
        {socials.map(({ href, label, Icon }) => (
          <motion.li
            key={label}
            variants={reduceMotion ? undefined : { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            transition={reduceMotion ? undefined : { duration: 0.5, ease: 'easeOut' }}
          >
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="group block text-[#8892b0] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50"
            >
              <Icon
                size={20}
                className="transition duration-300 group-hover:-translate-y-[3px] group-hover:text-[#64ffda] text-[#8892b0]"
              />
            </a>
          </motion.li>
        ))}
      </motion.ul>
      {reduceMotion ? (
        <div className="mt-5 h-[90px] w-px bg-[#8892b0]" aria-hidden="true" />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.6 }}
          className="mt-5 h-[90px] w-px bg-[#8892b0]"
          aria-hidden="true"
        />
      )}
    </div>
  );
};
