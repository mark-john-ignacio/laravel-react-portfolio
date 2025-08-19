import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Head, useForm } from '@inertiajs/react';

export default function AdminPostsCreate() {
    const { data, setData, post, processing, errors } = useForm({ title: '', slug: '', excerpt: '', body: '', published_at: '' });
    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.posts.store'));
    }
    return (
        <>
            <Head title="Admin • New Post" />
            <h1 className="mb-4 text-2xl font-semibold">New Post</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Create Post</CardTitle>
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
