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
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-4">Manage Experiences</h1>
                <form onSubmit={submit} className="space-y-3">
                    <input value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Title" className="block w-full" />
                    <input value={data.company} onChange={(e) => setData('company', e.target.value)} placeholder="Company" className="block w-full" />
                    <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="Description" className="block w-full" />
                    <button className="rounded bg-blue-600 text-white px-3 py-1">Create</button>
                </form>

                <ul className="mt-6 space-y-3">
                    {experiences.map((exp: any) => (
                        <li key={exp.id} className="border p-3 rounded flex justify-between items-start">
                            <div>
                                <div className="font-medium">{exp.title} — {exp.company}</div>
                                <div className="text-sm text-gray-600">{exp.start_date} — {exp.is_current ? 'Present' : exp.end_date}</div>
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
