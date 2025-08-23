import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(function Progress({ value = 0, max = 100, className, ...props }, ref) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div ref={ref} className={cn('relative h-2 w-full overflow-hidden rounded bg-muted', className)} {...props}>
      <div className="h-full bg-primary transition-all" style={{ width: pct + '%' }} />
    </div>
  );
});
