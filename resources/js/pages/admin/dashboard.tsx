import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function AdminDashboard() {
    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-4">Admin</h1>
                <ul className="space-y-2">
                    <li>
                        <Link href={route('admin.experiences.index')} className="text-blue-600 underline">
                            Manage Experiences
                        </Link>
                    </li>
                    <li>
                        <Link href={route('admin.projects.index')} className="text-blue-600 underline">
                            Manage Projects
                        </Link>
                    </li>
                    <li>
                        <Link href={route('admin.posts.index')} className="text-blue-600 underline">
                            Manage Posts
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}
