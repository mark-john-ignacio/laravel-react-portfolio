import { Head } from '@inertiajs/react';

export default function Projects({ projects }: { projects: any[] }) {
    return (
        <>
            <Head title="Projects" />
            <div className="mx-auto max-w-4xl p-6">
                <h1 className="mb-4 text-2xl font-semibold">Projects</h1>
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {projects.map((p: any) => (
                        <li key={p.id} className="rounded border p-4">
                            <h3 className="font-medium">{p.title}</h3>
                            <p className="text-sm text-gray-600">
                                {p.year} — {p.technologies?.join?.(', ')}
                            </p>
                            <p className="mt-2">{p.description}</p>
                            {p.url && (
                                <a href={p.url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-blue-600 underline">
                                    Visit
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
