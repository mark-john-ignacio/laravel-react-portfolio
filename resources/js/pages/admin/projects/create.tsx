import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Head, useForm } from '@inertiajs/react';

export default function AdminProjectsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        summary: '',
        description: '',
        tech_stack: '' as any,
        url: '',
        repo_url: '',
        featured: false,
        published: false,
    });
    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.projects.store'));
    }
    return (
        <>
            <Head title="Admin • New Project" />
            <h1 className="mb-4 text-2xl font-semibold">New Project</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Create Project</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-3">
                        <Input placeholder="Title" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                        {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                        <Input placeholder="Slug" value={data.slug} onChange={(e) => setData('slug', e.target.value)} />
                        <Textarea rows={3} placeholder="Summary" value={data.summary} onChange={(e) => setData('summary', e.target.value)} />
                        <Textarea
                            rows={6}
                            placeholder="Description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        <Input
                            placeholder="Tech stack (comma separated)"
                            value={Array.isArray(data.tech_stack) ? data.tech_stack.join(', ') : data.tech_stack}
                            onChange={(e) =>
                                setData(
                                    'tech_stack',
                                    e.target.value
                                        .split(',')
                                        .map((v) => v.trim())
                                        .filter(Boolean),
                                )
                            }
                        />
                        <Input placeholder="URL" value={data.url} onChange={(e) => setData('url', e.target.value)} />
                        <Input placeholder="Repo URL" value={data.repo_url} onChange={(e) => setData('repo_url', e.target.value)} />
                        <label className="flex items-center gap-2 text-xs">
                            <input type="checkbox" checked={data.featured} onChange={(e) => setData('featured', e.target.checked)} /> Featured
                        </label>
                        <label className="flex items-center gap-2 text-xs">
                            <input type="checkbox" checked={data.published} onChange={(e) => setData('published', e.target.checked)} /> Published
                        </label>
                        <Button type="submit" disabled={processing}>
                            Save
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
