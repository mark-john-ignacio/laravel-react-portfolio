import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function AdminPosts({ posts }: { posts: any[] }) {
    const { data, setData, post } = useForm({ title: '', slug: '', excerpt: '', body: '' });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.posts.store'));
    }

    return (
        <>
            <Head title="Manage Posts" />
            <div className="mx-auto max-w-4xl p-6">
                <h1 className="mb-4 text-2xl font-semibold">Manage Posts</h1>
                <form onSubmit={submit} className="space-y-3">
                    <input value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Title" className="block w-full" />
                    <input value={data.slug} onChange={(e) => setData('slug', e.target.value)} placeholder="Slug" className="block w-full" />
                    <textarea
                        value={data.excerpt}
                        onChange={(e) => setData('excerpt', e.target.value)}
                        placeholder="Excerpt"
                        className="block w-full"
                    />
                    <textarea
                        value={data.body}
                        onChange={(e) => setData('body', e.target.value)}
                        placeholder="Body (HTML)"
                        className="block w-full"
                    />
                    <button className="rounded bg-blue-600 px-3 py-1 text-white">Create</button>
                </form>

                <ul className="mt-6 space-y-3">
                    {posts.map((post: any) => (
                        <li key={post.id} className="flex items-start justify-between rounded border p-3">
                            <div>
                                <div className="font-medium">{post.title}</div>
                                <div className="text-sm text-gray-600">{post.excerpt}</div>
                            </div>
                            <form method="post" action={route('admin.posts.destroy', { post: post.id })}>
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
