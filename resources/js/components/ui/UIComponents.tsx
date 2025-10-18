import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Card with floating animation effect
 * Perfect for feature highlights and testimonials
 */
export const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  className,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
      className={cn(
        'relative rounded-lg bg-[#112240]/60 p-6 backdrop-blur-sm',
        'ring-1 ring-[#233554]/50 transition-all duration-300',
        'hover:ring-[#64ffda]/50 hover:shadow-xl hover:shadow-[#64ffda]/5',
        'before:absolute before:inset-0 before:-z-10 before:rounded-lg',
        'before:bg-gradient-to-br before:from-[#64ffda]/10 before:to-transparent',
        'before:opacity-0 before:transition-opacity before:duration-300',
        'hover:before:opacity-100',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

/**
 * Tooltip component with smooth animations
 */
interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className={cn(
            'absolute z-50 whitespace-nowrap rounded bg-[#112240] px-3 py-1.5',
            'text-xs text-[#ccd6f6] shadow-lg ring-1 ring-[#64ffda]/30',
            positions[position]
          )}
        >
          {content}
          <div
            className={cn(
              'absolute h-2 w-2 rotate-45 bg-[#112240] ring-1 ring-[#64ffda]/30',
              position === 'top' && 'bottom-[-4px] left-1/2 -translate-x-1/2',
              position === 'bottom' && 'top-[-4px] left-1/2 -translate-x-1/2',
              position === 'left' && 'right-[-4px] top-1/2 -translate-y-1/2',
              position === 'right' && 'left-[-4px] top-1/2 -translate-y-1/2'
            )}
          />
        </motion.div>
      )}
    </div>
  );
};

/**
 * Badge component for tags and labels
 */
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'secondary';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className,
}) => {
  const variants = {
    default: 'bg-[#112240] text-[#8892b0] ring-[#233554]',
    accent: 'bg-[#64ffda]/10 text-[#64ffda] ring-[#64ffda]/30',
    secondary: 'bg-[#233554]/50 text-[#ccd6f6] ring-[#233554]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1',
        'text-xs font-mono ring-1 transition-colors',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
