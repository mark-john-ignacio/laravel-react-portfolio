import { useAppearance } from '@/hooks/use-appearance';
import { Moon, Sun } from 'lucide-react';

export function AppearanceToggle() {
    const { appearance, updateAppearance } = useAppearance();

    const isDark = appearance === 'dark';
    const toggle = () => updateAppearance(isDark ? 'light' : 'dark');

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex items-center justify-center rounded border border-border/50 p-1.5 text-xs hover:bg-accent/10"
        >
            {isDark ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4 text-cyan-300" />}
        </button>
    );
}
