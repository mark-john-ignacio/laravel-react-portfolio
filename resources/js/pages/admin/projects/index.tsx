import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function AdminProjects({ projects }: { projects: any[] }) {
    const { data, setData, post } = useForm({ title: '', description: '', url: '', repo: '', year: '', technologies: [] });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.projects.store'));
    }

    return (
        <>
            <Head title="Manage Projects" />
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-4">Manage Projects</h1>
                <form onSubmit={submit} className="space-y-3">
                    <input value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Title" className="block w-full" />
                    <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="Description" className="block w-full" />
                    <button className="rounded bg-blue-600 text-white px-3 py-1">Create</button>
                </form>

                <ul className="mt-6 space-y-3">
                    {projects.map((p: any) => (
                        <li key={p.id} className="border p-3 rounded flex justify-between items-start">
                            <div>
                                <div className="font-medium">{p.title} — {p.year}</div>
                                <p className="mt-1">{p.description}</p>
                            </div>
                            <form method="post" action={route('admin.projects.destroy', { project: p.id })}>
                                <input type="hidden" name="_method" value="delete" />
                                <button className="text-red-600">Delete</button>
                            </form>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
