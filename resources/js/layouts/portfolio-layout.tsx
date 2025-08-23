import { PropsWithChildren, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import '../../css/portfolio.css';

export interface NavItem {
  id: string;
  label: string;
  number: string; // formatted number string e.g. 01
}

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface PortfolioLayoutProps {
  sectionIds: string[]; // For scroll spy
  navItems?: NavItem[];
  social?: SocialLink[];
  email?: string;
}

export function PortfolioLayout({
  children,
  sectionIds,
  navItems: navOverride,
  social: socialOverride,
  email = 'hello@example.com',
}: PropsWithChildren<PortfolioLayoutProps>) {
  const [open, setOpen] = useState(false);

  const navItems: NavItem[] = useMemo(
    () =>
      navOverride || [
        { id: 'about', label: 'About', number: '01' },
        { id: 'experience', label: 'Experience', number: '02' },
        { id: 'work', label: 'Work', number: '03' },
        { id: 'contact', label: 'Contact', number: '04' },
      ],
    [navOverride]
  );

  const { activeId } = useScrollSpy(sectionIds);

  const handleNavClick = useCallback((id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="portfolio-bg font-sans flex">
      {/* Desktop Sidebar */}
      <aside className="portfolio-sidebar hidden lg:block">
        <div className="portfolio-sidebar-inner">
          <div className="portfolio-logo">MJ</div>
          <ol className="portfolio-nav">
            {navItems.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={e => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={item.id === activeId ? 'active' : ''}
                  aria-current={item.id === activeId ? 'true' : undefined}
                >
                  <span className="portfolio-nav-index">{item.number}.</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="portfolio-social">
            {/* Social links inserted via props possibly later */}
            {socialOverride?.map(s => (
              <a key={s.href} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* Main content wrapper */}
      <div className="flex-1 w-full min-h-screen">
        {/* Mobile trigger */}
        <button
          className="mobile-nav-trigger lg:hidden"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
          <span className="font-mono">Menu</span>
        </button>

        {/* Email rail (desktop) */}
        <div className="fixed right-8 bottom-0 hidden xl:flex flex-col items-center gap-6 z-20">
          <a
            href={`mailto:${email}`}
            className="font-mono text-[12px] tracking-wider text-slate-light hover:text-mint rotate-90 origin-bottom-right"
          >
            {email}
          </a>
          <div className="w-px h-24 bg-slate/40" />
        </div>

        <main className="max-w-5xl mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-32">
          {children}
        </main>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="mobile-nav-overlay lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="mobile-drawer lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 32 }}
            >
              <div className="portfolio-logo mb-4">MJ</div>
              <ol className="mobile-nav-list">
                {navItems.map(item => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={e => {
                        e.preventDefault();
                        handleNavClick(item.id);
                      }}
                      className={item.id === activeId ? 'active' : ''}
                    >
                      <span className="text-mint font-mono text-xs">{item.number}.</span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
              <div className="mt-auto flex gap-4 pt-10">
                {socialOverride?.map(s => (
                  <a key={s.href} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer" className="text-slate hover:text-mint">
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
