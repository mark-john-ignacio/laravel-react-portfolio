import { Head } from '@inertiajs/react';
import React from 'react';

export default function Experiences({ experiences }: { experiences: any[] }) {
    return (
        <>
            <Head title="Experiences" />
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-4">Experience</h1>
                <ul className="space-y-4">
                    {experiences.map((exp: any) => (
                        <li key={exp.id} className="border p-4 rounded">
                            <h3 className="font-medium">{exp.title} — {exp.company}</h3>
                            <div className="text-sm text-gray-600">{exp.start_date} — {exp.is_current ? 'Present' : exp.end_date}</div>
                            <p className="mt-2">{exp.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
