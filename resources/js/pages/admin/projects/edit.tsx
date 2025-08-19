import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Head, useForm } from '@inertiajs/react';

interface Project {
    id: number;
    title: string;
    slug: string;
    summary?: string | null;
    description?: string | null;
    tech_stack?: string[] | null;
    url?: string | null;
    repo_url?: string | null;
    featured?: boolean;
    published?: boolean;
}
interface Props {
    project: Project;
}

export default function AdminProjectsEdit({ project }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: project.title,
        slug: project.slug,
        summary: project.summary || '',
        description: project.description || '',
        tech_stack: project.tech_stack || [],
        url: project.url || '',
        repo_url: project.repo_url || '',
        featured: !!project.featured,
        published: !!project.published,
    });
    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(route('admin.projects.update', project.id));
    }
    return (
        <>
            <Head title="Admin • Edit Project" />
            <h1 className="mb-4 text-2xl font-semibold">Edit Project</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Project</CardTitle>
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
                            value={Array.isArray(data.tech_stack) ? data.tech_stack.join(', ') : ''}
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
