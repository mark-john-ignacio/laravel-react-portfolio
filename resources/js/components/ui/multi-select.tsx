import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface MultiSelectOption { value: string | number; label: string }
interface MultiSelectProps {
  options: MultiSelectOption[];
  value: (string | number)[];
  onChange: (vals: (string | number)[]) => void;
  className?: string;
  placeholder?: string;
  maxTags?: number;
}
export function MultiSelect({ options, value, onChange, className, placeholder = 'Select…', maxTags = 5 }: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  function toggle(val: string | number) {
    if (value.includes(val)) onChange(value.filter(v => v !== val));
    else onChange([...value, val]);
  }
  return (
    <div className={cn('relative', className)}>
      <button type="button" onClick={() => setOpen(o => !o)} className="flex min-h-[42px] w-full flex-wrap items-center gap-1 rounded-md border border-input bg-background px-2 py-1 text-left text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
        {value.length === 0 && <span className="text-muted-foreground text-xs">{placeholder}</span>}
        {value.slice(0, maxTags).map(val => {
          const opt = options.find(o => o.value === val);
          if (!opt) return null;
          return <Badge key={val} variant="secondary" className="px-2 py-0 text-[10px]">{opt.label}</Badge>;
        })}
        {value.length > maxTags && <Badge variant="outline" className="px-2 py-0 text-[10px]">+{value.length - maxTags}</Badge>}
        <span className="ml-auto text-[10px] text-muted-foreground">{open ? 'Close' : 'Open'}</span>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow">
          {options.map(o => {
            const active = value.includes(o.value);
            return (
              <button type="button" key={o.value} onClick={() => toggle(o.value)} className={cn('flex w-full items-center justify-between rounded-sm px-2 py-1 text-xs hover:bg-accent', active && 'bg-accent')}>{o.label}{active && <span className="text-[10px]">✓</span>}</button>
            );
          })}
        </div>
      )}
    </div>
  );
}
