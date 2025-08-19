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
            <div className="mx-auto max-w-2xl p-6">
                <h1 className="mb-4 text-2xl font-semibold">Contact</h1>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 block w-full" />
                        {errors.name && <div className="text-sm text-red-600">{errors.name}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input value={data.email} onChange={(e) => setData('email', e.target.value)} className="mt-1 block w-full" />
                        {errors.email && <div className="text-sm text-red-600">{errors.email}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Message</label>
                        <textarea value={data.message} onChange={(e) => setData('message', e.target.value)} className="mt-1 block w-full" />
                        {errors.message && <div className="text-sm text-red-600">{errors.message}</div>}
                    </div>
                    <div>
                        <button type="submit" disabled={processing} className="rounded bg-blue-600 px-4 py-2 text-white">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
