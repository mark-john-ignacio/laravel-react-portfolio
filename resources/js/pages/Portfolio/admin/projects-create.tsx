import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { TagInput } from '@/components/ui/tag-input';
import { MultiSelect } from '@/components/ui/multi-select';

type ProjectForm = {
    title: string;
    slug: string;
    short_description: string;
    description: string;
    role: string;
    start_date: string;
    end_date: string;
    is_featured: boolean;
    is_published: boolean;
    technologies: string[];
    project_category_ids: number[];
    github_url: string;
    demo_url: string;
    website_url: string;
    image: File | null;
    reading_time_override: string;
};

export default function ProjectsCreate({ categories }: { categories: any[] }) {
    const { data, setData, post, processing, errors } = useForm<ProjectForm>({
        title: '',
        slug: '',
        short_description: '',
        description: '',
        role: '',
        start_date: '',
        end_date: '',
        is_featured: false,
        is_published: true,
        technologies: [],
        project_category_ids: [],
        github_url: '',
        demo_url: '',
        website_url: '',
        image: null as File | null,
        reading_time_override: ''
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        post('/admin/portfolio/projects');
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Projects', href: '/admin/portfolio/projects' }, { title: 'Create', href: '/admin/portfolio/projects/create' }]}>            
            <Head title="Create Project" />
            <form onSubmit={submit} className="p-4 space-y-6 max-w-5xl">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">New Project</h1>
                    <div className="flex items-center gap-3">
                        <Link href="/admin/portfolio/projects" className="text-xs underline">Cancel</Link>
                        <Button type="submit" size="sm" disabled={processing}>Create</Button>
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-3 items-start">
                    <div className="space-y-6 md:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Core Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} />
                                        {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="slug">Slug (optional)</Label>
                                        <Input id="slug" value={data.slug} onChange={e => setData('slug', e.target.value)} />
                                        {errors.slug && <p className="text-xs text-destructive">{errors.slug}</p>}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="short_description">Short Description</Label>
                                    <Textarea id="short_description" value={data.short_description} onChange={e => setData('short_description', e.target.value)} />
                                    {errors.short_description && <p className="text-xs text-destructive">{errors.short_description}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description (Markdown)</Label>
                                    <Textarea id="description" className="min-h-[180px]" value={data.description} onChange={e => setData('description', e.target.value)} />
                                    {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Timeline & Role</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2 md:col-span-1">
                                    <Label htmlFor="role">Role</Label>
                                    <Input id="role" value={data.role} onChange={e => setData('role', e.target.value)} />
                                    {errors.role && <p className="text-xs text-destructive">{errors.role}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="start_date">Start Date</Label>
                                    <Input type="date" id="start_date" value={data.start_date} onChange={e => setData('start_date', e.target.value)} />
                                    {errors.start_date && <p className="text-xs text-destructive">{errors.start_date}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="end_date">End Date</Label>
                                    <Input type="date" id="end_date" value={data.end_date || ''} onChange={e => setData('end_date', e.target.value)} />
                                    {errors.end_date && <p className="text-xs text-destructive">{errors.end_date}</p>}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Content Metadata</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Featured</Label>
                                    <div className="flex items-center gap-2">
                                        <Switch checked={data.is_featured} onCheckedChange={(v:boolean) => setData('is_featured', v)} id="is_featured" />
                                        <Label htmlFor="is_featured" className="text-xs text-muted-foreground">Mark to highlight on homepage</Label>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Published</Label>
                                    <div className="flex items-center gap-2">
                                        <Switch checked={data.is_published} onCheckedChange={(v:boolean) => setData('is_published', v)} id="is_published" />
                                        <Label htmlFor="is_published" className="text-xs text-muted-foreground">Toggle visibility</Label>
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Technologies</Label>
                                    <TagInput value={data.technologies} onChange={tags => setData('technologies', tags)} />
                                    {errors.technologies && <p className="text-xs text-destructive">{errors.technologies}</p>}
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Categories</Label>
                                    <MultiSelect
                                        options={categories.map(c => ({ value: c.id, label: c.name }))}
                                        value={data.project_category_ids}
                                        onChange={(vals) => setData('project_category_ids', vals as number[])}
                                        placeholder="Select categories"
                                    />
                                    {errors.project_category_ids && <p className="text-xs text-destructive">{errors.project_category_ids}</p>}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Links & Media</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="github_url">GitHub URL</Label>
                                    <Input id="github_url" value={data.github_url} onChange={e => setData('github_url', e.target.value)} />
                                    {errors.github_url && <p className="text-xs text-destructive">{errors.github_url}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="demo_url">Demo URL</Label>
                                    <Input id="demo_url" value={data.demo_url} onChange={e => setData('demo_url', e.target.value)} />
                                    {errors.demo_url && <p className="text-xs text-destructive">{errors.demo_url}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="website_url">Website URL</Label>
                                    <Input id="website_url" value={data.website_url} onChange={e => setData('website_url', e.target.value)} />
                                    {errors.website_url && <p className="text-xs text-destructive">{errors.website_url}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="image">Primary Image</Label>
                                    <Input type="file" id="image" onChange={e => setData('image', e.target.files ? e.target.files[0] : null)} />
                                    {errors.image && <p className="text-xs text-destructive">{errors.image}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reading_time_override">Reading Time Override (mins)</Label>
                                    <Input id="reading_time_override" value={data.reading_time_override} onChange={e => setData('reading_time_override', e.target.value)} />
                                    {errors.reading_time_override && <p className="text-xs text-destructive">{errors.reading_time_override}</p>}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-xs text-muted-foreground">
                                <p>Fill in the core details then add metadata, categories and technologies. You can update images and links later.</p>
                                <Button type="submit" size="sm" className="w-full" disabled={processing}>Create Project</Button>
                                <Link href="/admin/portfolio/projects" className="block text-center text-[11px] underline">Back to list</Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
