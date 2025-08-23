import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

interface SectionProps {
  id: string;
  number: string;
  title: string;
  className?: string;
}

export function Section({ id, number, title, className = '', children }: PropsWithChildren<SectionProps>) {
  return (
    <section id={id} className={`min-h-screen flex flex-col justify-center py-24 md:py-32 ${className}`}>      
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-8 flex items-center gap-4"
      >
        <h2 className="text-xl md:text-2xl font-semibold tracking-wide text-slate-100 flex items-center gap-3">
          <span className="font-mono text-mint text-sm">{number}.</span>
          {title}
        </h2>
        <span className="h-px flex-1 bg-slate-700" />
      </motion.header>
      <div className="space-y-6 text-slate-400">{children}</div>
    </section>
  );
}
