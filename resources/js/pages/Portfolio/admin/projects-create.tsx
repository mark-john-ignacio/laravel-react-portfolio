import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { TagInput } from '@/components/ui/tag-input';
import { MultiSelect } from '@/components/ui/multi-select';
import { Badge } from '@/components/ui/badge';
import { GripVertical } from 'lucide-react';

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

// helper to resolve stored relative paths to accessible URLs
function buildUrl(path?: string | null) {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    return `/storage/${path.replace(/^\/+/, '')}`;
}

export default function ProjectsCreate({ categories }: { categories: any[] }) {
    const { data, setData, post, processing, errors, transform } = useForm<ProjectForm>({
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
    const [slugTouched, setSlugTouched] = useState(false);
    const debounceRef = useRef<number | undefined>(undefined);
    const [showPreview, setShowPreview] = useState(false);
    const dragIndex = useRef<number | null>(null);

    function onGalleryChange(list: File[]) {
        setGalleryFiles(list);
    }
    function handleGalleryInput(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files ? Array.from(e.target.files) : [];
        if (!files.length) return;
        onGalleryChange([...galleryFiles, ...files]);
    }
    function removeGalleryItem(idx: number) {
        onGalleryChange(galleryFiles.filter((_, i) => i !== idx));
    }
    function handleDragStart(idx: number) { dragIndex.current = idx; }
    function handleDragEnter(idx: number) {
        if (dragIndex.current === null || dragIndex.current === idx) return;
        const updated = [...galleryFiles];
        const [moved] = updated.splice(dragIndex.current, 1);
        updated.splice(idx, 0, moved);
        dragIndex.current = idx;
        onGalleryChange(updated);
    }
    function handleDragEnd() { dragIndex.current = null; }

    // simple slugify util
    function slugify(value: string) {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }

    // Debounce slug auto-generation if user hasn't manually modified slug
    useEffect(() => {
        if (slugTouched) return; // user wants manual control
        if (!data.title) return;
        window.clearTimeout(debounceRef.current);
        debounceRef.current = window.setTimeout(() => {
            // only set slug if currently empty
            if (!data.slug) {
                setData('slug', slugify(data.title));
            }
        }, 400);
        return () => window.clearTimeout(debounceRef.current);
    }, [data.title]);

    function submit(e: FormEvent) {
        e.preventDefault();
        // use transform to inject current gallery File[] just-in-time (avoids race with state update)
        transform(original => ({ ...original, gallery: galleryFiles }));
        post('/admin/portfolio/projects', {
            forceFormData: true,
            onFinish: () => {
                // reset transform to identity to prevent stale gallery injection on future edits
                transform(d => d);
            }
        });
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

    function applyMd(format: 'bold' | 'italic' | 'link') {
        if (showPreview) return;
        const textarea = document.getElementById('long_description') as HTMLTextAreaElement | null;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const original = data.long_description;
        let before = original.slice(0, start);
        let selected = original.slice(start, end) || (format === 'link' ? 'text' : 'your text');
        let after = original.slice(end);
        let inserted = '';
        switch (format) {
            case 'bold':
                inserted = `**${selected}**`;
                break;
            case 'italic':
                inserted = `*${selected}*`;
                break;
            case 'link':
                inserted = `[${selected}](https://)`;
                break;
        }
        const next = before + inserted + after;
        setData('long_description', next);
        setTimeout(() => {
            textarea.focus();
            const cursorPos = before.length + inserted.length;
            textarea.setSelectionRange(cursorPos, cursorPos);
        }, 0);
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
                                        <Input id="slug" value={data.slug} onChange={e => { setSlugTouched(true); setData('slug', e.target.value); }} placeholder={slugify(data.title || '')} />
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
                                    <div className="flex items-center justify-between mb-1">
                                        <button type="button" onClick={() => setShowPreview(p=>!p)} className="text-[11px] underline">
                                            {showPreview ? 'Edit Markdown' : 'Preview'}
                                        </button>
                                    </div>
                                    {!showPreview && (
                                        <div className="flex gap-2 mb-2">
                                            <Button type="button" variant="secondary" size="sm" className="h-6 px-2 text-[11px]" onClick={() => applyMd('bold')}>**B**</Button>
                                            <Button type="button" variant="secondary" size="sm" className="h-6 px-2 text-[11px] italic" onClick={() => applyMd('italic')}>/i/</Button>
                                            <Button type="button" variant="secondary" size="sm" className="h-6 px-2 text-[11px]" onClick={() => applyMd('link')}>link</Button>
                                        </div>
                                    )}
                                    {showPreview ? (
                                        <div className="prose dark:prose-invert max-w-none border rounded-md p-3 text-sm bg-muted/30 min-h-[220px] overflow-auto" dangerouslySetInnerHTML={{ __html: renderMarkdown(data.long_description) }} />
                                    ) : (
                                        <Textarea id="long_description" className="min-h-[220px]" value={data.long_description} onChange={e => setData('long_description', e.target.value)} />
                                    )}
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
                                    <Input multiple type="file" id="gallery" onChange={handleGalleryInput} />
                                    {errors.gallery && <p className="text-xs text-destructive">{errors.gallery}</p>}
                                    {galleryFiles.length > 0 && (
                                        <div className="flex flex-wrap gap-3 pt-3">
                                            {galleryFiles.map((file, i) => {
                                                const url = URL.createObjectURL(file);
                                                return (
                                                    <div key={i}
                                                         className="relative group border rounded-md overflow-hidden h-20 w-20 flex items-center justify-center bg-muted cursor-move"
                                                         draggable
                                                         onDragStart={() => handleDragStart(i)}
                                                         onDragEnter={() => handleDragEnter(i)}
                                                         onDragEnd={handleDragEnd}
                                                         onDragOver={(e) => e.preventDefault()}>
                                                        <img src={url} alt={file.name} className="object-cover h-full w-full pointer-events-none" />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex flex-col justify-between">
                                                            <div className="flex justify-between items-start p-1">
                                                                <GripVertical className="h-3 w-3 text-white opacity-70" />
                                                                <button type="button" onClick={() => removeGalleryItem(i)} className="bg-black/60 text-white text-[10px] px-1 py-0.5 rounded">×</button>
                                                            </div>
                                                            <span className="text-[9px] text-white/70 px-1 pb-1 truncate">{i+1}</span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
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

// Extremely small markdown renderer (headings, bold, italic, code, links, line breaks)
function renderMarkdown(src: string): string {
    let html = src
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    html = html.replace(/^###### (.*)$/gm, '<h6>$1</h6>')
        .replace(/^##### (.*)$/gm, '<h5>$1</h5>')
        .replace(/^#### (.*)$/gm, '<h4>$1</h4>')
        .replace(/^### (.*)$/gm, '<h3>$1</h3>')
        .replace(/^## (.*)$/gm, '<h2>$1</h2>')
        .replace(/^# (.*)$/gm, '<h1>$1</h1>');
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline">$1</a>');
    html = html.replace(/\n\n+/g, '</p><p>');
    html = '<p>' + html + '</p>';
    return html;
}
