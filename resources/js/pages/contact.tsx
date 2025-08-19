import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function Contact() {
    const { data, setData, post, processing, errors } = useForm({ name: '', email: '', message: '' });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('contact.send'));
    }

    return (
        <>
            <Head title="Contact" />
            <div className="max-w-2xl mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-4">Contact</h1>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 block w-full" />
                        {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input value={data.email} onChange={(e) => setData('email', e.target.value)} className="mt-1 block w-full" />
                        {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Message</label>
                        <textarea value={data.message} onChange={(e) => setData('message', e.target.value)} className="mt-1 block w-full" />
                        {errors.message && <div className="text-red-600 text-sm">{errors.message}</div>}
                    </div>
                    <div>
                        <button type="submit" disabled={processing} className="rounded bg-blue-600 text-white px-4 py-2">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
