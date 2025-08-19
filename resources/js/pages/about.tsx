import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function About() {
    return (
        <>
            <Head title="About" />
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-4">About</h1>
                <p className="mb-4">This is the About page. Replace this content with a short bio and animated timeline component.</p>
                <Link href={route('projects.index')} className="text-blue-600 underline">
                    View projects
                </Link>
            </div>
        </>
    );
}
