import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function ExperiencesIndex({ experiences }: { experiences: any[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Experience', href: '/admin/portfolio/experiences' }]}>            
            <Head title="Experience" />
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold tracking-tight">Experience</h1>
                    <Button asChild size="sm">
                        <Link href="/admin/portfolio/experiences/create">Create New</Link>
                    </Button>
                </div>
                {experiences.map(exp => (
                    <div key={exp.id} className="rounded border p-4 space-y-1">
                        <div className="flex justify-between gap-2">
                            <div>
                                <h3 className="font-semibold leading-tight">{exp.position} @ {exp.company}</h3>
                                <span className="text-xs text-muted-foreground">{exp.formatted_duration || ''}</span>
                            </div>
                            <div className="flex items-start gap-1">
                                <Button asChild size="sm" variant="outline" className="h-7 px-2 text-[11px]">
                                    <Link href={`/admin/portfolio/experiences/${exp.id}/edit`}>Edit</Link>
                                </Button>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{exp.location}</p>
                        <p className="text-sm">{exp.description}</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                            {(exp.technologies || []).map((t: string) => <span key={t} className="text-[10px] rounded bg-muted px-2 py-0.5">{t}</span>)}
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
