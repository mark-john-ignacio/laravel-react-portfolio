import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

/**
 * Glassmorphic card component with optional glow effect
 * Used for modern, elevated UI elements
 */
export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hover = true,
  glow = false,
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'relative rounded-lg bg-[#112240]/80 backdrop-blur-sm',
        'ring-1 ring-[#233554]/50',
        'transition-all duration-300',
        hover && 'hover:ring-[#64ffda]/50 hover:shadow-lg hover:shadow-[#64ffda]/10',
        glow && 'before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-gradient-to-br before:from-[#64ffda]/20 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
        className
      )}
    >
      {children}
    </motion.div>
  );
};
