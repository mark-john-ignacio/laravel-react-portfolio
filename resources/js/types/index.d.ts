import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// Public portfolio page props
export interface PublicPortfolioProps {
    personalInfo: {
        name?: string;
        title?: string;
        tagline?: string;
        hero_greeting?: string;
        hero_tagline?: string;
        bio_short?: string;
        bio_long?: string;
        email?: string;
        location?: string;
        availability_status?: string;
        resume_url?: string | null;
        profile_image_url?: string | null;
    };
    socialLinks: { platform: string; label: string; url: string; icon?: string | null }[];
    experiences: { company: string; role: string; period: string; bullets: string[]; url?: string | null }[];
    projects: { featured: any[]; secondary: any[] };
    meta: { description: string; canonical: string; og_image?: string | null };
    tech: string[];
}
