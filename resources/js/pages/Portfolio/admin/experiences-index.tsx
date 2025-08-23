import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function ExperiencesIndex({ experiences }: { experiences: any[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Experience', href: '/admin/portfolio/experiences' }]}>            
            <Head title="Experience" />
            <div className="p-4 space-y-4">
                {experiences.map(exp => (
                    <div key={exp.id} className="rounded border p-4 space-y-1">
                        <div className="flex justify-between">
                            <h3 className="font-semibold">{exp.position} @ {exp.company}</h3>
                            <span className="text-xs text-muted-foreground">{exp.formatted_duration || ''}</span>
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
