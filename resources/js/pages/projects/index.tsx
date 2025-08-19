import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Head } from '@inertiajs/react';

export default function Projects({ projects }: { projects: any[] }) {
    return (
        <>
            <Head title="Projects" />
            <div className="mx-auto max-w-4xl p-6">
                <h1 className="mb-4 text-2xl font-semibold">Projects</h1>
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {projects.map((p: any) => (
                        <li key={p.id}>
                            <Card className="p-4">
                                <h3 className="font-medium">{p.title}</h3>
                                <p className="text-sm text-gray-600">
                                    {p.year} — {p.technologies?.join?.(', ')}
                                </p>
                                <p className="mt-2">{p.description}</p>
                                <div className="mt-3">
                                    {p.url && (
                                        <a href={p.url} target="_blank" rel="noreferrer">
                                            <Button variant="outline">Visit</Button>
                                        </a>
                                    )}
                                </div>
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
