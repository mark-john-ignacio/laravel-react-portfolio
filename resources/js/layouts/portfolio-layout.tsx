import { PropsWithChildren, useMemo } from 'react';
import { Navigation } from '@/components/portfolio/navigation';
import { SocialSidebar } from '@/components/portfolio/social-sidebar';
import '../../css/portfolio.css';

interface PortfolioLayoutProps {
  sectionIds: string[];
}

export function PortfolioLayout({ children, sectionIds }: PropsWithChildren<PortfolioLayoutProps>) {
  const navItems = useMemo(
    () => [
      { id: 'about', label: 'About' },
      { id: 'experience', label: 'Experience' },
      { id: 'work', label: 'Work' },
      { id: 'contact', label: 'Contact' },
    ],
    []
  );

  return (
    <div className="portfolio-bg text-slate-300 font-sans relative">
      <div className="fixed top-0 left-0 right-0 z-40 backdrop-blur bg-navy/70 border-b border-navy-light/40">
        <Navigation items={navItems} />
      </div>
      <div className="fixed left-6 bottom-0 hidden md:flex flex-col items-center gap-6 z-30">
        <SocialSidebar />
      </div>
      <main className="pt-24 md:pt-32 mx-auto max-w-5xl px-6 md:px-12">
        {children}
      </main>
      <div className="fixed right-6 bottom-0 hidden md:flex flex-col items-center gap-6 z-30">
        <a href="mailto:hello@example.com" className="rotate-90 origin-bottom-right text-xs tracking-wider text-mint hover:text-mint-bright transition-colors">hello@example.com</a>
        <div className="w-px h-24 bg-slate-500/50"></div>
      </div>
    </div>
  );
}
