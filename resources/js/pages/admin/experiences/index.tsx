import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function AdminExperiences({ experiences }: { experiences: any[] }) {
    const { data, setData, post } = useForm({ title: '', company: '', start_date: '', end_date: '', is_current: false, description: '' });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.experiences.store'));
    }

    return (
        <>
            <Head title="Manage Experiences" />
            <div className="mx-auto max-w-4xl p-6">
                <h1 className="mb-4 text-2xl font-semibold">Manage Experiences</h1>
                <form onSubmit={submit} className="space-y-3">
                    <input value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Title" className="block w-full" />
                    <input value={data.company} onChange={(e) => setData('company', e.target.value)} placeholder="Company" className="block w-full" />
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder="Description"
                        className="block w-full"
                    />
                    <button className="rounded bg-blue-600 px-3 py-1 text-white">Create</button>
                </form>

                <ul className="mt-6 space-y-3">
                    {experiences.map((exp: any) => (
                        <li key={exp.id} className="flex items-start justify-between rounded border p-3">
                            <div>
                                <div className="font-medium">
                                    {exp.title} — {exp.company}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {exp.start_date} — {exp.is_current ? 'Present' : exp.end_date}
                                </div>
                                <p className="mt-1">{exp.description}</p>
                            </div>
                            <form method="post" action={route('admin.experiences.destroy', { experience: exp.id })}>
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
