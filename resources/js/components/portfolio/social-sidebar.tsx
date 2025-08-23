import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export interface SocialLinkItem {
  href: string;
  label: string;
  icon: ReactNode;
}

const defaultLinks: SocialLinkItem[] = [
  { href: 'https://github.com/markjohnignacio', label: 'GitHub', icon: <Github size={18} /> },
  { href: 'https://linkedin.com/in/markjohnignacio', label: 'LinkedIn', icon: <Linkedin size={18} /> },
  { href: 'https://twitter.com/markjohnignacio', label: 'Twitter', icon: <Twitter size={18} /> },
  { href: 'mailto:hello@example.com', label: 'Email', icon: <Mail size={18} /> },
];

export function SocialSidebar({ links = defaultLinks }: { links?: SocialLinkItem[] }) {
  return (
    <div className="flex flex-col items-center gap-4" aria-label="Social links">
      {links.map((item, idx) => (
        <motion.a
          key={item.href}
          href={item.href}
          aria-label={item.label}
          target="_blank"
          rel="noreferrer"
          className="text-slate-400 hover:text-mint transition-colors"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 + 0.4, duration: 0.4 }}
        >
          {item.icon}
        </motion.a>
      ))}
      <div className="w-px h-24 bg-slate-500/50" />
    </div>
  );
}
