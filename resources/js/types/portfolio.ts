export interface About {
    id: number;
    summary: string | null;
    timeline: TimelineEvent[] | null;
    created_at: string;
    updated_at: string;
}
export interface TimelineEvent {
    year: string;
    title: string;
    description?: string;
}
export interface Skill {
    id: number;
    name: string;
    category?: string | null;
    level?: string | null;
    sort_order: number;
    created_at: string;
    updated_at: string;
}
export interface Experience {
    id: number;
    role: string;
    company: string;
    location?: string | null;
    start_date: string;
    end_date?: string | null;
    is_current: boolean;
    description?: string | null;
    created_at: string;
    updated_at: string;
}
export interface Project {
    id: number;
    title: string;
    slug: string;
    summary?: string | null;
    description?: string | null;
    rendered_description?: string; // HTML from markdown
    tech_stack?: string[] | null;
    image_path?: string | null;
    repo_url?: string | null;
    live_url?: string | null;
    featured: boolean;
    created_at: string;
    updated_at: string;
}
export interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    body: string;
    rendered_body?: string; // HTML from markdown
    published_at?: string | null;
    created_at: string;
    updated_at: string;
}
export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    subject?: string | null;
    message: string;
    created_at: string;
    updated_at: string;
}
