import { Link } from '@inertiajs/react';

export function TerminalNavbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur font-mono">
      <div className="container mx-auto flex h-12 items-center justify-between px-4 text-sm">
        <Link href="/" className="text-green-400">~/</Link>
        <div className="flex items-center gap-4">
          <Link href={route().has('about') ? route('about') : '/about'} className="hover:text-cyan-400">about</Link>
          <Link href={route().has('projects') ? route('projects') : '/projects'} className="hover:text-cyan-400">projects</Link>
          <Link href={route().has('contact') ? route('contact') : '/contact'} className="hover:text-cyan-400">contact</Link>
          <Link href={route().has('dashboard') ? route('dashboard') : '/dashboard'} className="hover:text-purple-400">admin</Link>
        </div>
      </div>
    </nav>
  );
}
