import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function TechStackIndex({ grouped }: { grouped: Record<string, any[]> }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Tech Stack', href: '/admin/portfolio/tech-stack' }]}>            
            <Head title="Tech Stack" />
            <div className="p-4 space-y-6">
                {Object.entries(grouped).map(([category, items]) => (
                    <div key={category} className="space-y-2">
                        <h2 className="text-lg font-semibold capitalize">{category}</h2>
                        <div className="grid gap-3 md:grid-cols-3">
                            {items.map(i => (
                                <div key={i.id} className="rounded border p-3">
                                    <div className="flex justify-between"><span className="font-medium">{i.name}</span><span className="text-xs">{i.proficiency_level}%</span></div>
                                    <div className="h-2 bg-muted mt-2 rounded">
                                        <div className="h-2 rounded bg-primary" style={{ width: i.proficiency_level + '%' }} />
                                    </div>
                                    {i.is_featured && <span className="mt-2 inline-block text-[10px] rounded bg-amber-500/20 px-2 py-0.5 text-amber-700 dark:text-amber-300">Featured</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
