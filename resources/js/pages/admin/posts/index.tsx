import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';

interface Post {
    id: number;
    title: string;
    slug: string;
    published_at?: string | null;
}
interface Props {
    posts: Post[];
}

export default function AdminPostsIndex({ posts }: Props) {
    return (
        <>
            <Head title="Admin • Posts" />
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Posts</h1>
                <Button asChild>
                    <Link href={route('admin.posts.create')}>New</Link>
                </Button>
            </div>
            <div className="space-y-3">
                {posts.map((p) => (
                    <Card key={p.id}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">{p.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{p.slug}</span>
                            <Link className="underline" href={route('admin.posts.edit', p.id)}>
                                Edit
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}
