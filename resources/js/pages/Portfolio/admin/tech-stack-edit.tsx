import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type TechForm = {
    _method: 'PUT';
    name: string;
    category: string;
    description: string;
    icon: string;
    proficiency: number;
    is_featured: boolean;
    order_column: number;
};

export default function TechStackEdit({ tech }: { tech: any }) {
    const { data, setData, post, processing, errors } = useForm<TechForm>({
        _method: 'PUT',
        name: tech.name || '',
        category: tech.category || '',
        description: tech.description || '',
        icon: tech.icon || '',
        proficiency: tech.proficiency || 3,
        is_featured: tech.is_featured || false,
        order_column: tech.order_column || 0
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        post(`/admin/portfolio/tech-stack/${tech.id}`);
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Tech Stack', href: '/admin/portfolio/tech-stack' }, { title: tech.name, href: `/admin/portfolio/tech-stack/${tech.id}/edit` }]}>            
            <Head title={`Edit ${tech.name}`} />
            <form onSubmit={submit} className="p-4 space-y-6 max-w-xl">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Edit Technology</h1>
                    <Link href="/admin/portfolio/tech-stack" className="text-sm underline">Back</Link>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Name</label>
                        <input className="input" value={data.name} onChange={e => setData('name', e.target.value)} />
                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Category</label>
                        <input className="input" value={data.category} onChange={e => setData('category', e.target.value)} />
                        {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Icon</label>
                        <input className="input" value={data.icon} onChange={e => setData('icon', e.target.value)} />
                        {errors.icon && <p className="text-xs text-red-500">{errors.icon}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Proficiency (1-5)</label>
                        <input type="number" min={1} max={5} className="input" value={data.proficiency} onChange={e => setData('proficiency', Number(e.target.value))} />
                        {errors.proficiency && <p className="text-xs text-red-500">{errors.proficiency}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Description</label>
                        <textarea className="input min-h-[120px]" value={data.description} onChange={e => setData('description', e.target.value)} />
                        {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked={data.is_featured} onChange={e => setData('is_featured', e.target.checked)} /> <span className="text-sm">Featured</span>
                    </div>
                </div>
                <div className="pt-4 flex gap-3">
                    <button disabled={processing} className="rounded bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50">Save</button>
                </div>
            </form>
        </AppLayout>
    );
}
