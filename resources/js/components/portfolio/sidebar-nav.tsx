import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { motion } from 'framer-motion';
import type { NavItem } from '@/layouts/portfolio-layout';

interface SidebarNavProps {
  items: NavItem[];
  onNavigate?: (id: string) => void;
}

export function SidebarNav({ items, onNavigate }: SidebarNavProps) {
  const { activeId } = useScrollSpy(items.map(i => i.id));

  return (
    <ol className="portfolio-nav" aria-label="Primary">
      {items.map((item, idx) => {
        const active = activeId === item.id;
        return (
          <li key={item.id}>
            <motion.a
              href={`#${item.id}`}
              onClick={e => {
                e.preventDefault();
                onNavigate?.(item.id);
              }}
              className={active ? 'active' : ''}
              aria-current={active ? 'true' : undefined}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 + 0.2 }}
            >
              <span className="portfolio-nav-index">{item.number}.</span>
              <span>{item.label}</span>
            </motion.a>
          </li>
        );
      })}
    </ol>
  );
}
