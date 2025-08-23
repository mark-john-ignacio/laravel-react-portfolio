import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

// Narrow form data shape to avoid deep instantiation via any + inference
type SocialLinkForm = {
    label: string;
    platform: string;
    url: string;
    icon: string;
    is_active: boolean;
    order_column: number;
};

export default function SocialLinksCreate() {
    const { data, setData, post, processing, errors } = useForm<SocialLinkForm>({
        label: '',
        platform: '',
        url: '',
        icon: '',
        is_active: true,
        order_column: 0
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        post('/admin/portfolio/social-links');
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Social Links', href: '/admin/portfolio/social-links' }, { title: 'Create', href: '/admin/portfolio/social-links/create' }]}>            
            <Head title="Create Social Link" />
            <form onSubmit={submit} className="p-4 space-y-6 max-w-xl">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">New Social Link</h1>
                    <Link href="/admin/portfolio/social-links" className="text-sm underline">Back</Link>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Label</label>
                        <input className="input" value={data.label} onChange={e => setData('label', e.target.value)} />
                        {errors.label && <p className="text-xs text-red-500">{errors.label}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Platform</label>
                        <input className="input" value={data.platform} onChange={e => setData('platform', e.target.value)} />
                        {errors.platform && <p className="text-xs text-red-500">{errors.platform}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">URL</label>
                        <input className="input" value={data.url} onChange={e => setData('url', e.target.value)} />
                        {errors.url && <p className="text-xs text-red-500">{errors.url}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Icon (Heroicon / Lucide name)</label>
                        <input className="input" value={data.icon} onChange={e => setData('icon', e.target.value)} />
                        {errors.icon && <p className="text-xs text-red-500">{errors.icon}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} /> <span className="text-sm">Active</span>
                    </div>
                </div>
                <div className="pt-4">
                    <button disabled={processing} className="rounded bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50">Create</button>
                </div>
            </form>
        </AppLayout>
    );
}
