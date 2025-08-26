import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function TechStackIndex({ grouped }: { grouped: Record<string, any[]> }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Tech Stack', href: '/admin/portfolio/tech-stack' }]}>            
            <Head title="Tech Stack" />
            <div className="p-4 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold tracking-tight">Tech Stack</h1>
                    <Button asChild size="sm">
                        <Link href="/admin/portfolio/tech-stack/create">Create New</Link>
                    </Button>
                </div>
                {Object.entries(grouped).map(([category, items]) => (
                    <div key={category} className="space-y-2">
                        <h2 className="text-lg font-semibold capitalize">{category}</h2>
                        <div className="grid gap-3 md:grid-cols-3">
                            {items.map(i => (
                                <div key={i.id} className="rounded border p-3 space-y-2">
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="flex flex-col">
                                            <span className="font-medium leading-tight">{i.name}</span>
                                            <span className="text-xs text-muted-foreground">{i.proficiency_level}% proficiency</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {i.is_featured && <span className="inline-block text-[10px] rounded bg-amber-500/20 px-2 py-0.5 text-amber-700 dark:text-amber-300">Featured</span>}
                                            <Button asChild size="sm" variant="outline" className="h-6 px-2 text-[11px]">
                                                <Link href={`/admin/portfolio/tech-stack/${i.id}/edit`}>Edit</Link>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-muted mt-2 rounded">
                                        <div className="h-2 rounded bg-primary" style={{ width: i.proficiency_level + '%' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
