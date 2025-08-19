import { Head } from '@inertiajs/react';

export default function PostShow({ post }: { post: any }) {
    return (
        <>
            <Head title={post.title} />
            <div className="mx-auto max-w-4xl p-6">
                <h1 className="mb-4 text-2xl font-semibold">{post.title}</h1>
                <div className="mb-4 text-sm text-gray-600">{post.published_at}</div>
                <div dangerouslySetInnerHTML={{ __html: post.body }} />
            </div>
        </>
    );
}
