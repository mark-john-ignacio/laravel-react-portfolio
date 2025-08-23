import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { FormField } from '@/components/ui/form-field';
import { Label } from '@/components/ui/label';

// Narrow form data shape to avoid deep instantiation via any + inference
type SocialLinkForm = {
    display_name: string;
    platform: string;
    url: string;
    icon: string;
    is_active: boolean;
    sort_order: number;
};

export default function SocialLinksCreate() {
    const { data, setData, post, processing, errors } = useForm<SocialLinkForm>({
        display_name: '',
        platform: '',
        url: '',
        icon: '',
        is_active: true,
        sort_order: 0
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
                    <Link href="/admin/portfolio/social-links" className="text-xs underline">Back</Link>
                </div>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField label="Platform" htmlFor="platform" error={errors.platform as string}>
                            <Input id="platform" value={data.platform} onChange={e => setData('platform', e.target.value)} />
                        </FormField>
                        <FormField label="Display Name" htmlFor="display_name" description="Optional label shown in listings" error={errors.display_name as string}>
                            <Input id="display_name" value={data.display_name} onChange={e => setData('display_name', e.target.value)} />
                        </FormField>
                        <FormField label="Sort Order" htmlFor="sort_order" description="Lower numbers appear first" error={errors.sort_order as string}>
                            <Input id="sort_order" type="number" value={data.sort_order} onChange={e => setData('sort_order', Number(e.target.value))} />
                        </FormField>
                        <FormField label="URL" htmlFor="url" error={errors.url as string}>
                            <Input id="url" value={data.url} onChange={e => setData('url', e.target.value)} />
                        </FormField>
                        <FormField label="Icon" htmlFor="icon" description="Heroicon / Lucide icon name" error={errors.icon as string}>
                            <Input id="icon" value={data.icon} onChange={e => setData('icon', e.target.value)} />
                        </FormField>
                        <div className="flex items-center gap-3">
                            <Switch id="is_active" checked={data.is_active} onCheckedChange={(v:boolean)=>setData('is_active', v)} />
                            <Label htmlFor="is_active" className="text-xs text-muted-foreground">Active</Label>
                        </div>
                    </CardContent>
                </Card>
                <div className="flex justify-end">
                    <Button type="submit" size="sm" disabled={processing}>Create</Button>
                </div>
            </form>
        </AppLayout>
    );
}
