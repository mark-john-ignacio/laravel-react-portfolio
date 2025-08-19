import { Head, Link } from '@inertiajs/react';

export default function AdminDashboard() {
    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="mx-auto max-w-4xl p-6">
                <h1 className="mb-4 text-2xl font-semibold">Admin</h1>
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
