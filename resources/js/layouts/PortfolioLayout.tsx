import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

interface PortfolioLayoutProps {
    children: React.ReactNode;
}

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
    const { url } = usePage();

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Experience', href: '/experience' },
        { name: 'Projects', href: '/projects' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Link href="/" className="font-bold text-xl">
                            Mark John Ignacio
                        </Link>
                    </div>

                    <NavigationMenu>
                        <NavigationMenuList>
                            {navigation.map((item) => (
                                <NavigationMenuItem key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            url === item.href && 'bg-accent text-accent-foreground'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="flex items-center space-x-2">
                        <a
                            href="https://github.com/mark-john-ignacio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-accent rounded-md"
                        >
                            <Github className="h-5 w-5" />
                        </a>
                        <a
                            href="https://linkedin.com/in/mark-john-ignacio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-accent rounded-md"
                        >
                            <Linkedin className="h-5 w-5" />
                        </a>
                        <a
                            href="mailto:mark@example.com"
                            className="p-2 hover:bg-accent rounded-md"
                        >
                            <Mail className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="border-t bg-background">
                <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                    <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                            Built with{' '}
                            <a
                                href="https://laravel.com"
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium underline underline-offset-4"
                            >
                                Laravel
                            </a>
                            ,{' '}
                            <a
                                href="https://reactjs.org"
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium underline underline-offset-4"
                            >
                                React
                            </a>
                            , and{' '}
                            <a
                                href="https://inertiajs.com"
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium underline underline-offset-4"
                            >
                                Inertia.js
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
