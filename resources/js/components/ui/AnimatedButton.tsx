import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

/**
 * Enhanced animated button component with loading states
 */
export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, children, className, disabled, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 rounded font-mono transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a192f] disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-[#64ffda]/10 text-[#64ffda] border border-[#64ffda] hover:bg-[#64ffda]/20 active:scale-[0.98]',
      secondary: 'bg-[#112240] text-[#64ffda] border border-[#233554] hover:border-[#64ffda]/50 hover:bg-[#112240]/80',
      outline: 'border border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10 active:scale-[0.98]',
      ghost: 'text-[#64ffda] hover:bg-[#64ffda]/5',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.96 }}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';
