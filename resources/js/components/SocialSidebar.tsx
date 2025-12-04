import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

export interface SocialLinkItem {
  platform: string;
  label: string;
  url: string;
  icon?: string | null; // could represent an icon key
}

// Use broad typing to preserve icon component props (className, etc.)
const iconMap: Record<string, React.ComponentType<any>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

interface SocialSidebarProps { links: SocialLinkItem[]; }

export const SocialSidebar: React.FC<SocialSidebarProps> = ({ links }) => {
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
        {links.map(({ url, label, platform }) => {
          const IconCmp = iconMap[platform.toLowerCase()] ?? Github;
          return (
          <motion.li
            key={label+platform}
            variants={reduceMotion ? undefined : { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            transition={reduceMotion ? undefined : { duration: 0.5, ease: 'easeOut' }}
          >
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="group block text-[#8892b0] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50"
            >
              <IconCmp
                size={20}
                className="transition duration-300 group-hover:-translate-y-[3px] group-hover:text-[#64ffda] text-[#8892b0]"
              />
            </a>
          </motion.li>
        ); })}
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
