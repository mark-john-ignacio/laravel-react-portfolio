import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function Blog({ posts }: { posts: any[] }) {
    return (
        <>
            <Head title="Blog" />
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-4">Blog</h1>
                <ul className="space-y-4">
                    {posts.map((post: any) => (
                        <li key={post.id} className="border p-4 rounded">
                            <h3 className="font-medium">{post.title}</h3>
                            <p className="text-sm text-gray-600">{post.excerpt}</p>
                            <Link href={route('blog.show', { post: post.slug })} className="text-blue-600 underline">
                                Read
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
