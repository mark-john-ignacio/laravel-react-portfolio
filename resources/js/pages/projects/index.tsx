import { Head } from '@inertiajs/react';
import React from 'react';

export default function Projects({ projects }: { projects: any[] }) {
    return (
        <>
            <Head title="Projects" />
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-4">Projects</h1>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((p: any) => (
                        <li key={p.id} className="border rounded p-4">
                            <h3 className="font-medium">{p.title}</h3>
                            <p className="text-sm text-gray-600">{p.year} — {p.technologies?.join?.(', ')}</p>
                            <p className="mt-2">{p.description}</p>
                            {p.url && (
                                <a href={p.url} target="_blank" rel="noreferrer" className="text-blue-600 underline mt-2 inline-block">
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
