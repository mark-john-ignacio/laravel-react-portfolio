import React, { ElementType } from 'react';
import { SECTION_PADDING } from '@/data/layout';
import { motion } from 'framer-motion';
import { useReveal } from '@/hooks/useReveal';

type PolymorphicProps<E extends ElementType> = {
  as?: E;
  noPadding?: boolean;
  id?: string;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<E>, 'as' | 'className'>;

export const Section = React.forwardRef(<E extends ElementType = 'section'>(props: PolymorphicProps<E>, ref: React.Ref<Element>) => {
  const { as, noPadding, className = '', id, ...rest } = props;
  const Component = (as || 'section') as ElementType;
  return <Component ref={ref} id={id} className={`${noPadding ? '' : SECTION_PADDING} ${className}`} {...rest} />;
}) as <E extends ElementType = 'section'>(props: PolymorphicProps<E> & { ref?: React.Ref<Element> }) => React.ReactElement | null;

interface SectionHeadingProps {
  index: number;
  id: string;
  children: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ index, id, children }) => {
  const { ref, inView, hasAnimated } = useReveal<HTMLHeadingElement>({ margin: '-120px', threshold: 0.25 });
  return (
    <motion.h2
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 24 }}
      animate={inView || hasAnimated ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="group mb-8 flex items-center gap-4 font-semibold tracking-tight text-[#e6f1ff] text-2xl md:text-3xl scroll-mt-24"
    >
      <span className="font-mono text-base text-[#64ffda]">{String(index).padStart(2, '0')}.</span>
      {children}
      <span className="h-px flex-1 bg-[#233554] group-hover:bg-[#64ffda]/50 transition-colors" />
    </motion.h2>
  );
};
