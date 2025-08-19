import { Head, Link } from '@inertiajs/react';

export default function Blog({ posts }: { posts: any[] }) {
    return (
        <>
            <Head title="Blog" />
            <div className="mx-auto max-w-4xl p-6">
                <h1 className="mb-4 text-2xl font-semibold">Blog</h1>
                <ul className="space-y-4">
                    {posts.map((post: any) => (
                        <li key={post.id} className="rounded border p-4">
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
