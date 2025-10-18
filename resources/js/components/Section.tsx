import { SECTION_PADDING } from '@/data/layout';
import { useReveal } from '@/hooks/useReveal';
import { motion } from 'framer-motion';
import React, { ElementType } from 'react';

type PolymorphicProps<E extends ElementType> = {
    as?: E;
    noPadding?: boolean;
    id?: string;
    className?: string;
} & Omit<React.ComponentPropsWithoutRef<E>, 'as' | 'className'>;

export const Section = React.forwardRef(<E extends ElementType = 'section'>(props: PolymorphicProps<E>, ref: React.Ref<Element>) => {
    const { as, noPadding, className = '', id, ...rest } = props;
    const Component = (as || 'section') as ElementType;
    // Add proper mobile-first responsive container with safe maximum width and overflow handling
    return <Component ref={ref} id={id} className={`mx-auto w-full max-w-7xl ${noPadding ? '' : SECTION_PADDING} ${className}`} {...rest} />;
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
            className="mb-10 flex scroll-mt-24 items-center gap-3 text-[clamp(26px,5vw,32px)] font-semibold whitespace-nowrap text-[#ccd6f6]"
        >
            <span className="font-mono text-xl font-normal text-[#64ffda]">{String(index).padStart(2, '0')}.</span>
            {children}
            <span className="hidden h-px w-full max-w-[300px] bg-[#233554] sm:block" />
        </motion.h2>
    );
};
