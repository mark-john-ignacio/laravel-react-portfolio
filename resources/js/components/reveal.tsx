import React, { createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import { useReveal } from '@/hooks/useReveal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface RevealProps extends React.HTMLAttributes<any> {
  as?: keyof React.JSX.IntrinsicElements | React.ComponentType<any>;
  delay?: number;
  distance?: number; // vertical offset
  y?: number; // alias for distance
  duration?: number;
  children: React.ReactNode;
  once?: boolean;
  index?: number; // used inside group
  style?: React.CSSProperties;
  disableAnimations?: boolean;
  [key: string]: any; // allow arbitrary attributes (e.g., form props, aria-*)
}

interface RevealGroupContextValue {
  stagger: number;
  baseDelay: number;
}

const RevealGroupContext = createContext<RevealGroupContextValue | null>(null);

export const Reveal: React.FC<RevealProps> = ({
  as: Component = 'div',
  delay = 0,
  distance = 24,
  y,
  duration = 0.6,
  children,
  once = true,
  index,
  style,
  className,
  disableAnimations = false,
  ...rest
}) => {
  const { ref, inView, hasAnimated } = useReveal<HTMLDivElement>({ once });
  const group = useContext(RevealGroupContext);
  const reduceMotion = usePrefersReducedMotion();
  const computedDelay = group && typeof index === 'number' ? group.baseDelay + group.stagger * index : delay;
  const offset = typeof y === 'number' ? y : distance;
  const shouldAnimate = !disableAnimations && !reduceMotion;

  if (!shouldAnimate) {
    const Comp: any = Component; // fallback without animation
    return (
      <Comp ref={ref} className={className} style={style} {...rest}>
        {children}
      </Comp>
    );
  }

  const MotionTag: any = motion(Component as any);

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y: offset }}
      animate={inView || hasAnimated ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, ease: 'easeOut', delay: computedDelay }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

interface RevealGroupProps {
  children: React.ReactNode;
  stagger?: number;
  baseDelay?: number;
  as?: keyof React.JSX.IntrinsicElements | React.ComponentType<any>;
  className?: string;
  distance?: number;
  y?: number; // alias for distance
  duration?: number;
  once?: boolean;
  style?: React.CSSProperties;
  disableAnimations?: boolean;
}

export const RevealGroup: React.FC<RevealGroupProps> = ({
  children,
  stagger = 0.08,
  baseDelay = 0,
  as: Component = 'div',
  className,
  distance = 0,
  y,
  duration = 0.5,
  once = true,
  style,
  disableAnimations = false,
}) => {
  const offset = typeof y === 'number' ? y : distance;
  // If offset provided, animate the container itself once; children will still stagger internally.
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children: inner }) =>
    offset !== 0 ? (
      <Reveal
        as={Component as any}
        distance={offset}
        duration={duration}
        once={once}
        className={className}
        style={style}
        disableAnimations={disableAnimations}
      >
        {inner}
      </Reveal>
    ) : (
      <Component className={className} style={style}>
        {inner}
      </Component>
    );
  return (
    <RevealGroupContext.Provider value={{ stagger, baseDelay }}>
      <Wrapper>
        {React.Children.map(children, (child, index) =>
          React.isValidElement(child)
            ? React.cloneElement(child as any, {
                index,
                disableAnimations:
                  typeof (child as any).props?.disableAnimations === 'boolean'
                    ? (child as any).props.disableAnimations
                    : disableAnimations,
              })
            : child
        )}
      </Wrapper>
    </RevealGroupContext.Provider>
  );
};
