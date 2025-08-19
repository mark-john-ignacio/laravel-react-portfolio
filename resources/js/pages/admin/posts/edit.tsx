import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Head, useForm } from '@inertiajs/react';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    body: string;
    published_at?: string | null;
}
interface Props {
    post: Post;
}

export default function AdminPostsEdit({ post }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        body: post.body,
        published_at: post.published_at || '',
    });
    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(route('admin.posts.update', post.id));
    }
    return (
        <>
            <Head title="Admin • Edit Post" />
            <h1 className="mb-4 text-2xl font-semibold">Edit Post</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-3">
                        <Input placeholder="Title" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                        {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                        <Input placeholder="Slug" value={data.slug} onChange={(e) => setData('slug', e.target.value)} />
                        <Textarea rows={3} placeholder="Excerpt" value={data.excerpt} onChange={(e) => setData('excerpt', e.target.value)} />
                        <Textarea rows={10} placeholder="Body (markdown)" value={data.body} onChange={(e) => setData('body', e.target.value)} />
                        <Input type="datetime-local" value={data.published_at} onChange={(e) => setData('published_at', e.target.value)} />
                        <Button type="submit" disabled={processing}>
                            Save
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
