import { PublicNav } from '@/components/public-nav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Post } from '@/types/portfolio';
import { Head } from '@inertiajs/react';

interface Props {
    post: Post;
}

export default function BlogShow({ post }: Props) {
    return (
        <>
            <Head title={post.title} />
            <PublicNav />
            <main className="mx-auto max-w-3xl space-y-6 px-4 py-10">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {post.rendered_body ? (
                            <div className="prose dark:prose-invert max-w-none text-sm" dangerouslySetInnerHTML={{ __html: post.rendered_body }} />
                        ) : (
                            <div className="prose dark:prose-invert max-w-none text-sm whitespace-pre-wrap">{post.body}</div>
                        )}
                    </CardContent>
                </Card>
            </main>
        </>
    );
}
