import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

function buildUrl(path?: string | null) {
    // Legacy helper: falls back to local /storage path when a full URL isn't provided.
    // Prefer using p.cover_url from the API, which already points to S3/MinIO (or a signed URL).
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    return `/storage/${path.replace(/^\/+/, '')}`;
}

export default function ProjectsIndex({ projects, categories }: { projects: any; categories: any[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Projects', href: '/admin/portfolio/projects' }]}>
            <Head title="Projects" />
            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Projects</h1>
                    <Button asChild size="sm">
                        <Link href="/admin/portfolio/projects/create">New Project</Link>
                    </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    {projects.data.map((p: any) => (
                        <Card key={p.id} className="group flex flex-col overflow-hidden">
                            {(p.cover_url || p.image_url) && (
                                <div className="relative h-32 w-full overflow-hidden bg-muted">
                                    <img
                                        src={p.cover_url || buildUrl(p.image_url)}
                                        alt={p.title}
                                        className="h-full w-full object-cover transition group-hover:scale-105"
                                    />
                                </div>
                            )}
                            <CardHeader className="space-y-1 pb-2">
                                <div className="flex items-start justify-between gap-2">
                                    <CardTitle className="line-clamp-2 text-sm leading-tight font-medium">{p.title}</CardTitle>
                                    <div className="flex flex-col items-end gap-1">
                                        {p.is_featured && (
                                            <Badge variant="outline" className="text-[10px]">
                                                Featured
                                            </Badge>
                                        )}
                                        <Badge variant={p.is_published ? 'secondary' : 'outline'} className="text-[10px]">
                                            {p.is_published ? 'Published' : 'Draft'}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-3 text-xs">
                                <p className="line-clamp-3 min-h-[48px] text-muted-foreground">{p.short_description}</p>
                                <div className="flex flex-wrap gap-1">
                                    {(p.technologies || []).slice(0, 4).map((t: string) => (
                                        <Badge key={t} variant="secondary" className="px-2 py-0 text-[10px]">
                                            {t}
                                        </Badge>
                                    ))}
                                    {(p.technologies || []).length > 4 && (
                                        <Badge variant="outline" className="px-2 py-0 text-[10px]">
                                            +{(p.technologies || []).length - 4}
                                        </Badge>
                                    )}
                                </div>
                                <div className="mt-auto flex items-center justify-between pt-1">
                                    <Link href={`/admin/portfolio/projects/${p.id}/edit`} className="text-[11px] underline">
                                        Edit
                                    </Link>
                                    <span className="text-[10px] text-muted-foreground">{p.reading_time} min read</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
