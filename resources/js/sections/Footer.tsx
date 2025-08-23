import React from 'react';

export const Footer: React.FC = () => (
  <footer className="px-6 pb-10 pt-12 md:px-24 text-center text-xs text-[#8892b0] space-y-2">
    <p>&copy; {new Date().getFullYear()} Mark John Ignacio. Built with Laravel, React, TypeScript & Tailwind.</p>
    <p>Design inspired by <a href="https://brittanychiang.com" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-[#64ffda] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]/50">Brittany Chiang</a>.</p>
  </footer>
);
