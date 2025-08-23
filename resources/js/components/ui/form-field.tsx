import * as React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  description?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  requiredMark?: boolean;
}
export function FormField({ label, htmlFor, description, error, children, className, requiredMark }: FormFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {(label || description) && (
        <div className="flex items-start justify-between gap-4">
          {label && (
            <Label htmlFor={htmlFor} className="text-xs font-medium tracking-wide">
              {label}{requiredMark && <span className="text-destructive ml-0.5">*</span>}
            </Label>
          )}
          {description && <span className="text-[10px] text-muted-foreground max-w-[200px] leading-snug">{description}</span>}
        </div>
      )}
      {children}
      {error && <p className="text-[10px] text-destructive">{error}</p>}
    </div>
  );
}
