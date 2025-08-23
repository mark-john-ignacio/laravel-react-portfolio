import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function ProjectsIndex({ projects, categories }: { projects: any; categories: any[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Projects', href: '/admin/portfolio/projects' }]}>            
            <Head title="Projects" />
            <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Projects</h1>
                    <Link href="/admin/portfolio/projects/create" className="rounded bg-primary px-3 py-1 text-primary-foreground">New</Link>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    {projects.data.map((p: any) => (
                        <div key={p.id} className="rounded border p-3 space-y-2">
                            <div className="flex justify-between">
                                <h3 className="font-semibold text-sm line-clamp-1">{p.title}</h3>
                                {p.is_featured && <span className="text-[10px] bg-amber-500/20 text-amber-700 px-2 py-0.5 rounded">Featured</span>}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-3">{p.short_description}</p>
                            <div className="flex flex-wrap gap-1">
                                {(p.technologies || []).slice(0,4).map((t: string) => <span key={t} className="text-[10px] bg-muted rounded px-2 py-0.5">{t}</span>)}
                            </div>
                            <div className="flex justify-between text-xs">
                                <Link href={`/admin/portfolio/projects/${p.id}/edit`} className="text-primary underline">Edit</Link>
                                <span>{p.is_published ? 'Published' : 'Draft'}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
