import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, User, Share2, Layers3, BriefcaseBusiness, FolderKanban, Image as ImageIcon, Settings2, Inbox } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { title: 'Personal Info', href: '/admin/portfolio/personal-info', icon: User },
    { title: 'Social Links', href: '/admin/portfolio/social-links', icon: Share2 },
    { title: 'Tech Stack', href: '/admin/portfolio/tech-stack', icon: Layers3 },
    { title: 'Experiences', href: '/admin/portfolio/experiences', icon: BriefcaseBusiness },
    { title: 'Projects', href: '/admin/portfolio/projects', icon: FolderKanban },
    { title: 'Media', href: '/admin/portfolio/media', icon: ImageIcon },
    { title: 'Contact', href: '/admin/portfolio/contact-submissions', icon: Inbox },
    { title: 'Settings', href: '/admin/portfolio/settings', icon: Settings2 },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
