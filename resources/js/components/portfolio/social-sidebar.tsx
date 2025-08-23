import { Github, Linkedin, Mail } from 'lucide-react';

export function SocialSidebar() {
  const links = [
    { href: 'https://github.com/mark-john-ignacio', label: 'GitHub', Icon: Github },
    { href: 'https://linkedin.com', label: 'LinkedIn', Icon: Linkedin },
    { href: 'mailto:hello@example.com', label: 'Email', Icon: Mail },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      {links.map(({ href, label, Icon }) => (
        <a
          key={href}
            href={href}
            aria-label={label}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-mint transition-colors"
        >
          <Icon size={18} />
        </a>
      ))}
      <div className="w-px h-24 bg-slate-500/50"></div>
    </div>
  );
}
