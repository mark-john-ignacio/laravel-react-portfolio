import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function PersonalInfoEdit({ personalInfo }: { personalInfo: any }) {
    const { data, setData, put, processing, errors } = useForm(personalInfo);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/admin/portfolio/personal-info');
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Personal Info', href: '/admin/portfolio/personal-info' }, { title: 'Edit', href: '#' }]}>            
            <Head title="Edit Personal Info" />
            <form onSubmit={submit} className="space-y-4 p-4 max-w-3xl">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input className="mt-1 w-full rounded border bg-background" value={data.name||''} onChange={e=>setData('name', e.target.value)} />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Title</label>
                        <input className="mt-1 w-full rounded border bg-background" value={data.title||''} onChange={e=>setData('title', e.target.value)} />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Tagline</label>
                        <input className="mt-1 w-full rounded border bg-background" value={data.tagline||''} onChange={e=>setData('tagline', e.target.value)} />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium">Hero Greeting</label>
                    <input className="mt-1 w-full rounded border bg-background" value={data.hero_greeting||''} onChange={e=>setData('hero_greeting', e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium">Hero Tagline</label>
                    <input className="mt-1 w-full rounded border bg-background" value={data.hero_tagline||''} onChange={e=>setData('hero_tagline', e.target.value)} />
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Email</label>
                        <input className="mt-1 w-full rounded border bg-background" value={data.email||''} onChange={e=>setData('email', e.target.value)} />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Phone</label>
                        <input className="mt-1 w-full rounded border bg-background" value={data.phone||''} onChange={e=>setData('phone', e.target.value)} />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium">Bio Short</label>
                    <textarea className="mt-1 w-full rounded border bg-background" value={data.bio_short||''} onChange={e=>setData('bio_short', e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium">Bio Long</label>
                    <textarea className="mt-1 w-full rounded border bg-background h-40" value={data.bio_long||''} onChange={e=>setData('bio_long', e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium">Availability</label>
                    <select className="mt-1 w-full rounded border bg-background" value={data.availability_status||''} onChange={e=>setData('availability_status', e.target.value)}>
                        <option value="available">Available</option>
                        <option value="open_for_opportunities">Open for opportunities</option>
                        <option value="unavailable">Unavailable</option>
                    </select>
                </div>
                <button disabled={processing} className="rounded bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50">Save</button>
            </form>
        </AppLayout>
    );
}
