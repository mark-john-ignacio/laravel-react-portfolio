import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { TagInput } from '@/components/ui/tag-input';
import { MultiSelect } from '@/components/ui/multi-select';
import { Badge } from '@/components/ui/badge';

type ProjectForm = {
    _method: 'PUT';
    title: string;
    slug: string;
    short_description: string;
    long_description: string; // renamed from description
    technologies: string[];
    features: string[];
    challenges: string[];
    github_url: string;
    live_url: string; // consolidated demo/website
    image: File | null;
    gallery: File[];
    is_featured: boolean;
    is_published: boolean;
    sort_order: number;
    categories: number[]; // renamed from project_category_ids
};

export default function ProjectsEdit({ project, categories }: { project: any; categories: any[] }) {
    const { data, setData, post, processing, errors } = useForm<ProjectForm>({
        _method: 'PUT',
        title: project.title || '',
        slug: project.slug || '',
        short_description: project.short_description || '',
        long_description: project.long_description || project.description || '',
        technologies: project.technologies || [],
        features: project.features || [],
        challenges: project.challenges || [],
        github_url: project.github_url || '',
        live_url: project.live_url || project.demo_url || project.website_url || '',
        image: null,
        gallery: [],
        is_featured: project.is_featured || false,
        is_published: project.is_published || false,
        sort_order: project.sort_order ?? 0,
        categories: project.categories?.map((c: any) => c.id) || [],
    });

    const [featureInput, setFeatureInput] = useState('');
    const [challengeInput, setChallengeInput] = useState('');
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

    function submit(e: FormEvent) {
        e.preventDefault();
        setData('gallery', galleryFiles);
        post(`/admin/portfolio/projects/${project.id}`, { forceFormData: true });
    }

    function addFeature() {
        if (!featureInput.trim()) return;
        setData('features', [...data.features, featureInput.trim()]);
        setFeatureInput('');
    }
    function addChallenge() {
        if (!challengeInput.trim()) return;
        setData('challenges', [...data.challenges, challengeInput.trim()]);
        setChallengeInput('');
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Projects', href: '/admin/portfolio/projects' }, { title: project.title, href: `/admin/portfolio/projects/${project.id}/edit` }]}>            
            <Head title={`Edit ${project.title}`} />
            <form onSubmit={submit} className="p-4 space-y-6 max-w-5xl">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Edit Project</h1>
                    <div className="flex items-center gap-3">
                        <Link href="/admin/portfolio/projects" className="text-xs underline">Back</Link>
                        <Button type="submit" size="sm" disabled={processing}>Save</Button>
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-3 items-start">
                    <div className="space-y-6 md:col-span-2">
                        {/* Core Details */}
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
                                    <Label htmlFor="long_description">Long Description (Markdown)</Label>
                                    <Textarea id="long_description" className="min-h-[220px]" value={data.long_description} onChange={e => setData('long_description', e.target.value)} />
                                    {errors.long_description && <p className="text-xs text-destructive">{errors.long_description}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Content Metadata */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Content Metadata</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="flex items-center justify-between border rounded-md p-3">
                                        <div className="space-y-0.5">
                                            <Label className="text-sm">Featured</Label>
                                            <p className="text-[11px] text-muted-foreground">Homepage highlight</p>
                                        </div>
                                        <Switch checked={data.is_featured} onCheckedChange={v => setData('is_featured', v)} />
                                    </div>
                                    <div className="flex items-center justify-between border rounded-md p-3">
                                        <div className="space-y-0.5">
                                            <Label className="text-sm">Published</Label>
                                            <p className="text-[11px] text-muted-foreground">Public visibility</p>
                                        </div>
                                        <Switch checked={data.is_published} onCheckedChange={v => setData('is_published', v)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="sort_order">Sort Order</Label>
                                        <Input id="sort_order" type="number" value={data.sort_order} onChange={e => setData('sort_order', Number(e.target.value))} />
                                        {errors.sort_order && <p className="text-xs text-destructive">{errors.sort_order}</p>}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Categories</Label>
                                    <MultiSelect
                                        options={categories.map(c => ({ value: c.id, label: c.name }))}
                                        value={data.categories}
                                        onChange={(vals) => setData('categories', vals as number[])}
                                        placeholder="Select categories"
                                    />
                                    {errors.categories && <p className="text-xs text-destructive">{errors.categories}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Technologies</Label>
                                    <TagInput value={data.technologies} onChange={tags => setData('technologies', tags)} />
                                    {errors.technologies && <p className="text-xs text-destructive">{errors.technologies}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Links & Media */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Links & Media</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2 md:col-span-1">
                                    <Label htmlFor="github_url">GitHub URL</Label>
                                    <Input id="github_url" value={data.github_url} onChange={e => setData('github_url', e.target.value)} />
                                    {errors.github_url && <p className="text-xs text-destructive">{errors.github_url}</p>}
                                </div>
                                <div className="space-y-2 md:col-span-1">
                                    <Label htmlFor="live_url">Live URL</Label>
                                    <Input id="live_url" value={data.live_url} onChange={e => setData('live_url', e.target.value)} />
                                    {errors.live_url && <p className="text-xs text-destructive">{errors.live_url}</p>}
                                </div>
                                <div className="space-y-2 md:col-span-1">
                                    <Label htmlFor="image">Primary Image</Label>
                                    <Input type="file" id="image" onChange={e => setData('image', e.target.files ? e.target.files[0] : null)} />
                                    {errors.image && <p className="text-xs text-destructive">{errors.image}</p>}
                                    {project.image_url && <img src={project.image_url} alt="Current" className="max-h-24 mt-2 rounded" />}
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="gallery">Gallery Images (additive)</Label>
                                    <Input multiple type="file" id="gallery" onChange={e => setGalleryFiles(e.target.files ? Array.from(e.target.files) : [])} />
                                    {errors.gallery && <p className="text-xs text-destructive">{errors.gallery}</p>}
                                    {project.gallery_images?.length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {project.gallery_images.map((g:string, i:number) => (
                                                <img key={i} src={g} className="h-12 w-12 object-cover rounded border" />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Features & Challenges */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Features & Challenges</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Input placeholder="Add feature" value={featureInput} onChange={e => setFeatureInput(e.target.value)} className="h-8" />
                                        <Button type="button" size="sm" variant="secondary" onClick={addFeature} disabled={!featureInput.trim()}>Add</Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {data.features.map((f,i) => (
                                            <Badge key={i} variant="secondary" className="flex items-center gap-1">
                                                <span className="max-w-[140px] truncate" title={f}>{f}</span>
                                                <button type="button" onClick={() => setData('features', data.features.filter((_,idx)=>idx!==i))} className="text-[10px]">×</button>
                                            </Badge>
                                        ))}
                                    </div>
                                    {errors.features && <p className="text-xs text-destructive">{errors.features}</p>}
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Input placeholder="Add challenge" value={challengeInput} onChange={e => setChallengeInput(e.target.value)} className="h-8" />
                                        <Button type="button" size="sm" variant="secondary" onClick={addChallenge} disabled={!challengeInput.trim()}>Add</Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {data.challenges.map((c,i) => (
                                            <Badge key={i} variant="outline" className="flex items-center gap-1">
                                                <span className="max-w-[140px] truncate" title={c}>{c}</span>
                                                <button type="button" onClick={() => setData('challenges', data.challenges.filter((_,idx)=>idx!==i))} className="text-[10px]">×</button>
                                            </Badge>
                                        ))}
                                    </div>
                                    {errors.challenges && <p className="text-xs text-destructive">{errors.challenges}</p>}
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
                                <p>Update project details and metadata. Manage visibility & feature status.</p>
                                <div className="flex flex-col gap-2">
                                    <Button type="submit" size="sm" disabled={processing}>Save Changes</Button>
                                    <Link href={`/admin/portfolio/projects/${project.id}/toggle-featured`} method="post" as="button" className="text-[11px] underline">{project.is_featured ? 'Unfeature' : 'Feature'}</Link>
                                    <Link href={`/admin/portfolio/projects/${project.id}/toggle-published`} method="post" as="button" className="text-[11px] underline">{project.is_published ? 'Unpublish' : 'Publish'}</Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
