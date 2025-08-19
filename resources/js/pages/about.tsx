import { Head, Link } from '@inertiajs/react';

export default function About() {
    return (
        <>
            <Head title="About" />
            <div className="mx-auto max-w-4xl p-6">
                <h1 className="mb-4 text-2xl font-semibold">About</h1>
                <p className="mb-4">This is the About page. Replace this content with a short bio and animated timeline component.</p>
                <Link href={route('projects.index')} className="text-blue-600 underline">
                    View projects
                </Link>
            </div>
        </>
    );
}
