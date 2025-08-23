import { motion } from 'framer-motion';
import React from 'react';

interface TechnologyBadgeProps {
  label: string;
}

export const TechnologyBadge: React.FC<TechnologyBadgeProps> = ({ label }) => (
  <motion.li
    whileHover={{ x: 4 }}
    className="flex items-center gap-2 font-mono text-sm text-[#8892b0] transition-colors hover:text-[#64ffda]"
  >
    <span className="text-[#64ffda]">▹</span>
    <span>{label}</span>
  </motion.li>
);
