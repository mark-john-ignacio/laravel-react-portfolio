import { PublicNav } from '@/components/public-nav';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';

interface PostListItem {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    published_at?: string | null;
}
interface Props {
    posts: { data: PostListItem[] };
}

export default function BlogIndex({ posts }: Props) {
    return (
        <>
            <Head title="Blog" />
            <PublicNav />
            <main className="mx-auto max-w-3xl space-y-6 px-4 py-10">
                <h1 className="text-3xl font-semibold">Blog</h1>
                <div className="space-y-4">
                    {posts.data.map((p) => (
                        <Card key={p.id}>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    <Link href={route('blog.show', p.slug)}>{p.title}</Link>
                                </CardTitle>
                                <CardDescription>{p.excerpt}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </main>
        </>
    );
}
