import { Head } from '@inertiajs/react';
import React from 'react';

export default function PostShow({ post }: { post: any }) {
    return (
        <>
            <Head title={post.title} />
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-4">{post.title}</h1>
                <div className="text-sm text-gray-600 mb-4">{post.published_at}</div>
                <div dangerouslySetInnerHTML={{ __html: post.body }} />
            </div>
        </>
    );
}
