import React, { useState, KeyboardEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  max?: number;
}

export function TagInput({ value, onChange, placeholder = 'Add technology and press Enter', className, max = 20 }: TagInputProps) {
  const [input, setInput] = useState('');
  function addTag(tag: string) {
    const t = tag.trim();
    if (!t) return;
    if (value.includes(t)) return;
    if (value.length >= max) return;
    onChange([...value, t]);
    setInput('');
  }
  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && input === '' && value.length) {
      onChange(value.slice(0, -1));
    } else if (e.key === ',' ) {
      e.preventDefault();
      addTag(input);
    }
  }
  function remove(tag: string) {
    onChange(value.filter(t => t !== tag));
  }
  return (
    <div className={cn('flex min-h-[42px] w-full flex-wrap items-center gap-1 rounded-md border border-input bg-background px-2 py-1 text-sm shadow-sm focus-within:ring-1 focus-within:ring-ring', className)}>
      {value.map(t => (
        <Badge key={t} variant="secondary" className="flex items-center gap-1 px-2 py-0 text-[10px]">
          <span>{t}</span>
          <button type="button" onClick={() => remove(t)} className="text-[10px] hover:text-destructive">×</button>
        </Badge>
      ))}
      <Input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="border-0 shadow-none focus-visible:ring-0 h-6 flex-1 px-1 py-0 text-xs"
      />
    </div>
  );
}
