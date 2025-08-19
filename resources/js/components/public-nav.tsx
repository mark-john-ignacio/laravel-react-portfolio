import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';

const links: { title: string; href: string; name: string }[] = [
    { title: 'Home', href: route('home'), name: 'home' },
    { title: 'Experience', href: route('experience'), name: 'experience' },
    { title: 'Projects', href: route('projects.index'), name: 'projects' },
    { title: 'Blog', href: route('blog.index'), name: 'blog' },
    { title: 'Contact', href: route('contact.show'), name: 'contact' },
];

export function PublicNav() {
    const page = usePage();
    const url = page.url.split('?')[0];
    return (
        <div className="flex w-full justify-center border-b bg-background/70 backdrop-blur">
            <NavigationMenu className="max-w-5xl">
                <NavigationMenuList>
                    {links.map((l) => (
                        <NavigationMenuItem key={l.name}>
                            <NavigationMenuLink asChild>
                                <Link
                                    href={l.href}
                                    className={cn(
                                        'rounded-md px-3 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground',
                                        url === new URL(l.href, window.location.origin).pathname && 'bg-accent text-accent-foreground',
                                    )}
                                >
                                    {l.title}
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
