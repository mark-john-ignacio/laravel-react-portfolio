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
    title: string;
    slug: string;
    short_description: string;
    long_description: string;
    technologies: string[];
    features: string[];
    challenges: string[];
    github_url: string;
    live_url: string;
    image: File | null;
    gallery: File[];
    is_featured: boolean;
    is_published: boolean;
    sort_order: number;
    categories: number[]; // renamed from project_category_ids to align with backend request key
};

export default function ProjectsCreate({ categories }: { categories: any[] }) {
    const { data, setData, post, processing, errors } = useForm<ProjectForm>({
        title: '',
        slug: '',
        short_description: '',
        long_description: '',
        technologies: [],
        features: [],
        challenges: [],
        github_url: '',
        live_url: '',
        image: null,
        gallery: [],
        is_featured: false,
        is_published: true,
        sort_order: 0,
        categories: [],
    });

    const [featureInput, setFeatureInput] = useState('');
    const [challengeInput, setChallengeInput] = useState('');
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

    function submit(e: FormEvent) {
        e.preventDefault();
        // ensure latest gallery files included before submit
        setData('gallery', galleryFiles);
        post('/admin/portfolio/projects', { forceFormData: true });
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
                                            <p className="text-[11px] text-muted-foreground">Highlight on homepage</p>
                                        </div>
                                        <Switch checked={data.is_featured} onCheckedChange={v => setData('is_featured', v)} />
                                    </div>
                                    <div className="flex items-center justify-between border rounded-md p-3">
                                        <div className="space-y-0.5">
                                            <Label className="text-sm">Published</Label>
                                            <p className="text-[11px] text-muted-foreground">Visible publicly</p>
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
                                <div className="space-y-2">
                                    <Label htmlFor="github_url">GitHub URL</Label>
                                    <Input id="github_url" value={data.github_url} onChange={e => setData('github_url', e.target.value)} />
                                    {errors.github_url && <p className="text-xs text-destructive">{errors.github_url}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="live_url">Live URL</Label>
                                    <Input id="live_url" value={data.live_url} onChange={e => setData('live_url', e.target.value)} />
                                    {errors.live_url && <p className="text-xs text-destructive">{errors.live_url}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="image">Primary Image</Label>
                                    <Input type="file" id="image" onChange={e => setData('image', e.target.files ? e.target.files[0] : null)} />
                                    {errors.image && <p className="text-xs text-destructive">{errors.image}</p>}
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="gallery">Gallery Images</Label>
                                    <Input multiple type="file" id="gallery" onChange={e => setGalleryFiles(e.target.files ? Array.from(e.target.files) : [])} />
                                    {errors.gallery && <p className="text-xs text-destructive">{errors.gallery}</p>}
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

                    {/* Side Column */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-xs text-muted-foreground">
                                <p>Fill in core details then add technologies, categories, media, features & challenges.</p>
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
