import { Head } from '@inertiajs/react';
import { Card } from '@/components/ui/card';

export default function Experiences({ experiences }: { experiences: any[] }) {
    return (
        <>
            <Head title="Experiences" />
            <div className="mx-auto max-w-4xl p-6">
                <h1 className="mb-4 text-2xl font-semibold">Experience</h1>
                <ul className="space-y-4">
                    {experiences.map((exp: any) => (
                        <li key={exp.id}>
                            <Card className="transform transition-transform duration-500 motion-safe:hover:-translate-y-1">
                                <div className="p-4">
                                    <h3 className="font-medium">{exp.title} — {exp.company}</h3>
                                    <div className="text-sm text-gray-600">{exp.start_date} — {exp.is_current ? 'Present' : exp.end_date}</div>
                                    <p className="mt-2">{exp.description}</p>
                                </div>
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
