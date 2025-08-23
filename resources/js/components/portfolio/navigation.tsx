import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { useEffect } from 'react';

interface NavItem {
  id: string;
  label: string;
}

interface NavigationProps {
  items: NavItem[];
}

export function Navigation({ items }: NavigationProps) {
  const { activeId } = useScrollSpy(items.map(i => i.id));

  useEffect(() => {
    // Optional: could sync activeId with URL hash
  }, [activeId]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 py-4 font-mono text-xs">
      <div className="text-mint font-semibold tracking-wide">MJ</div>
      <ol className="flex items-center gap-6">
        {items.map((item, idx) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className="group">
              <a
                href={`#${item.id}`}
                className={`transition-colors flex items-center gap-2 text-slate-400 hover:text-mint ${isActive ? 'text-mint' : ''}`}
              >
                <span className="text-mint text-[10px]">{String(idx + 1).padStart(2, '0')}.</span>{' '}
                <span className="tracking-wide">{item.label}</span>
              </a>
            </li>
          );
        })}
        <li>
          <a
            href="/resume.pdf"
            className="border border-mint px-4 py-2 rounded text-mint hover:bg-mint/10 transition-colors"
          >
            Resume
          </a>
        </li>
      </ol>
    </nav>
  );
}
