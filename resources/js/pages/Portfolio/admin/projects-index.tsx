import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ProjectsIndex({ projects, categories }: { projects: any; categories: any[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Projects', href: '/admin/portfolio/projects' }]}>            
            <Head title="Projects" />
            <div className="p-4 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Projects</h1>
                    <Button asChild size="sm"><Link href="/admin/portfolio/projects/create">New Project</Link></Button>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    {projects.data.map((p: any) => (
                        <Card key={p.id} className="group flex flex-col">
                            <CardHeader className="pb-2 space-y-1">
                                <div className="flex items-start justify-between gap-2">
                                    <CardTitle className="text-sm font-medium leading-tight line-clamp-2">{p.title}</CardTitle>
                                    <div className="flex flex-col items-end gap-1">
                                        {p.is_featured && <Badge variant="outline" className="text-[10px]">Featured</Badge>}
                                        <Badge variant={p.is_published ? 'secondary' : 'outline'} className="text-[10px]">{p.is_published ? 'Published' : 'Draft'}</Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-3 text-xs">
                                <p className="text-muted-foreground line-clamp-3 min-h-[48px]">{p.short_description}</p>
                                <div className="flex flex-wrap gap-1">
                                    {(p.technologies || []).slice(0,4).map((t: string) => <Badge key={t} variant="secondary" className="text-[10px] px-2 py-0">{t}</Badge>)}
                                    {(p.technologies || []).length > 4 && <Badge variant="outline" className="text-[10px] px-2 py-0">+{(p.technologies || []).length - 4}</Badge>}
                                </div>
                                <div className="mt-auto flex justify-between items-center pt-1">
                                    <Link href={`/admin/portfolio/projects/${p.id}/edit`} className="text-[11px] underline">Edit</Link>
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
