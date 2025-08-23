import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type ProjectForm = {
    _method: 'PUT';
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

export default function ProjectsEdit({ project, categories }: { project: any; categories: any[] }) {
    const { data, setData, post, processing, errors } = useForm<ProjectForm>({
        _method: 'PUT',
        title: project.title || '',
        slug: project.slug || '',
        short_description: project.short_description || '',
        description: project.description || '',
        role: project.role || '',
        start_date: project.start_date || '',
        end_date: project.end_date || '',
        is_featured: project.is_featured || false,
        is_published: project.is_published || false,
        technologies: project.technologies || [],
        project_category_ids: project.categories?.map((c: any) => c.id) || [],
        github_url: project.github_url || '',
        demo_url: project.demo_url || '',
        website_url: project.website_url || '',
        image: null as File | null,
        reading_time_override: project.reading_time_override || ''
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        post(`/admin/portfolio/projects/${project.id}`);
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Projects', href: '/admin/portfolio/projects' }, { title: project.title, href: `/admin/portfolio/projects/${project.id}/edit` }]}>            
            <Head title={`Edit ${project.title}`} />
            <form onSubmit={submit} className="p-4 space-y-6 max-w-4xl">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Edit Project</h1>
                    <Link href="/admin/portfolio/projects" className="text-sm underline">Back</Link>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Title</label>
                        <input className="input" value={data.title} onChange={e => setData('title', e.target.value)} />
                        {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Slug (optional)</label>
                        <input className="input" value={data.slug} onChange={e => setData('slug', e.target.value)} />
                        {errors.slug && <p className="text-xs text-red-500">{errors.slug}</p>}
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="block text-sm font-medium">Short Description</label>
                        <textarea className="input min-h-[60px]" value={data.short_description} onChange={e => setData('short_description', e.target.value)} />
                        {errors.short_description && <p className="text-xs text-red-500">{errors.short_description}</p>}
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="block text-sm font-medium">Description (Markdown)</label>
                        <textarea className="input min-h-[160px]" value={data.description} onChange={e => setData('description', e.target.value)} />
                        {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Role</label>
                        <input className="input" value={data.role} onChange={e => setData('role', e.target.value)} />
                        {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Start Date</label>
                        <input type="date" className="input" value={data.start_date} onChange={e => setData('start_date', e.target.value)} />
                        {errors.start_date && <p className="text-xs text-red-500">{errors.start_date}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">End Date</label>
                        <input type="date" className="input" value={data.end_date || ''} onChange={e => setData('end_date', e.target.value)} />
                        {errors.end_date && <p className="text-xs text-red-500">{errors.end_date}</p>}
                    </div>
                    <div className="flex items-center gap-4 md:col-span-2">
                        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={data.is_featured} onChange={e => setData('is_featured', e.target.checked)} /> Featured</label>
                        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={data.is_published} onChange={e => setData('is_published', e.target.checked)} /> Published</label>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-medium">Technologies (comma separated)</label>
                        <input className="input" value={data.technologies.join(', ')} onChange={e => setData('technologies', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
                        {errors.technologies && <p className="text-xs text-red-500">{errors.technologies}</p>}
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-medium">Categories</label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(c => (
                                <label key={c.id} className="text-xs flex items-center gap-1 border rounded px-2 py-1">
                                    <input type="checkbox" checked={data.project_category_ids.includes(c.id)} onChange={e => {
                                        if (e.target.checked) setData('project_category_ids', [...data.project_category_ids, c.id]);
                                        else setData('project_category_ids', data.project_category_ids.filter((id: number) => id !== c.id));
                                    }} /> {c.name}
                                </label>
                            ))}
                        </div>
                        {errors.project_category_ids && <p className="text-xs text-red-500">{errors.project_category_ids}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">GitHub URL</label>
                        <input className="input" value={data.github_url} onChange={e => setData('github_url', e.target.value)} />
                        {errors.github_url && <p className="text-xs text-red-500">{errors.github_url}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Demo URL</label>
                        <input className="input" value={data.demo_url} onChange={e => setData('demo_url', e.target.value)} />
                        {errors.demo_url && <p className="text-xs text-red-500">{errors.demo_url}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Website URL</label>
                        <input className="input" value={data.website_url} onChange={e => setData('website_url', e.target.value)} />
                        {errors.website_url && <p className="text-xs text-red-500">{errors.website_url}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Primary Image</label>
                        <input type="file" onChange={e => setData('image', e.target.files ? e.target.files[0] : null)} />
                        {errors.image && <p className="text-xs text-red-500">{errors.image}</p>}
                        {project.image_path && <img src={project.image_url} alt="Current" className="max-h-24 mt-1 rounded" />}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Reading Time Override (mins)</label>
                        <input className="input" value={data.reading_time_override} onChange={e => setData('reading_time_override', e.target.value)} />
                        {errors.reading_time_override && <p className="text-xs text-red-500">{errors.reading_time_override}</p>}
                    </div>
                </div>
                <div className="pt-4 flex gap-3">
                    <button disabled={processing} className="rounded bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50">Save</button>
                    <Link href={`/admin/portfolio/projects/${project.id}/toggle-featured`} method="post" as="button" className="text-xs underline">{project.is_featured ? 'Unfeature' : 'Feature'}</Link>
                    <Link href={`/admin/portfolio/projects/${project.id}/toggle-published`} method="post" as="button" className="text-xs underline">{project.is_published ? 'Unpublish' : 'Publish'}</Link>
                </div>
            </form>
        </AppLayout>
    );
}
