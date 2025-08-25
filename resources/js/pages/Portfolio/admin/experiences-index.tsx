import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
                    <div key={exp.id} className="rounded border p-4 space-y-2">
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between gap-3">
                                <div className="flex flex-col gap-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="font-semibold leading-tight truncate">{exp.position} @ {exp.company}</h3>
                                        {exp.is_current && <Badge variant="secondary" className="h-5 px-2 text-[10px]">Current</Badge>}
                                        {typeof exp.sort_order === 'number' && <Badge variant="outline" className="h-5 px-2 text-[10px]">#{exp.sort_order}</Badge>}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                                        <span>{exp.formatted_duration || ''}</span>
                                        {exp.location && <span>• {exp.location}</span>}
                                        {exp.company_url && (
                                            <span>• <a href={exp.company_url} target="_blank" rel="noreferrer" className="underline hover:text-primary">Site</a></span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    {exp.company_logo && <img src={exp.company_logo} alt={exp.company + ' logo'} className="h-8 w-8 object-contain rounded" />}
                                    <Button asChild size="sm" variant="outline" className="h-7 px-2 text-[11px] shrink-0">
                                        <Link href={`/admin/portfolio/experiences/${exp.id}/edit`}>Edit</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {exp.description && <p className="text-sm leading-relaxed whitespace-pre-line">{exp.description}</p>}
                        <div className="flex flex-wrap gap-1 pt-1">
                            {(exp.technologies || []).map((t: string) => <span key={t} className="text-[10px] rounded bg-muted px-2 py-0.5">{t}</span>)}
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
