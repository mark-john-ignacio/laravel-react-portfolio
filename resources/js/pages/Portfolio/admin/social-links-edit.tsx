import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { FormField } from '@/components/ui/form-field';
import { Label } from '@/components/ui/label';

type SocialLinkForm = {
    _method: 'PUT';
    label: string;
    platform: string;
    url: string;
    icon: string;
    is_active: boolean;
    order_column: number;
};

export default function SocialLinksEdit({ socialLink }: { socialLink: any }) {
    const { data, setData, post, processing, errors } = useForm<SocialLinkForm>({
        _method: 'PUT',
        label: socialLink.label || '',
        platform: socialLink.platform || '',
        url: socialLink.url || '',
        icon: socialLink.icon || '',
        is_active: socialLink.is_active || false,
        order_column: socialLink.order_column || 0
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        post(`/admin/portfolio/social-links/${socialLink.id}`);
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Social Links', href: '/admin/portfolio/social-links' }, { title: socialLink.label, href: `/admin/portfolio/social-links/${socialLink.id}/edit` }]}>            
            <Head title={`Edit ${socialLink.label}`} />
            <form onSubmit={submit} className="p-4 space-y-6 max-w-xl">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Edit Social Link</h1>
                    <Link href="/admin/portfolio/social-links" className="text-xs underline">Back</Link>
                </div>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField label="Label" htmlFor="label" error={errors.label as string}>
                            <Input id="label" value={data.label} onChange={e => setData('label', e.target.value)} />
                        </FormField>
                        <FormField label="Platform" htmlFor="platform" error={errors.platform as string}>
                            <Input id="platform" value={data.platform} onChange={e => setData('platform', e.target.value)} />
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
                    <Button type="submit" size="sm" disabled={processing}>Save</Button>
                </div>
            </form>
        </AppLayout>
    );
}
