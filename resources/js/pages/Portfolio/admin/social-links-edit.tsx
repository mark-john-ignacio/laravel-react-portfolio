import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEvent, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { FormField } from '@/components/ui/form-field';
import { Label } from '@/components/ui/label';

type SocialLinkForm = {
    _method: 'PUT';
    display_name: string;
    platform: string;
    url: string;
    icon: string;
    is_active: boolean;
    sort_order: number;
};

interface SocialLinkResource {
    id: number | string;
    display_name?: string;
    platform?: string;
    url?: string;
    icon?: string;
    is_active?: boolean;
    sort_order?: number;
}

interface SocialLinksEditPageProps {
    link?: SocialLinkResource;
    socialLink?: SocialLinkResource; // backward compat
    [key: string]: unknown; // allow other inertia shared props
}

export default function SocialLinksEdit(props: { socialLink?: SocialLinkResource; link?: SocialLinkResource }) {
    // Inertia controller provides prop name 'link'. Keep backward compatibility with 'socialLink'.
    const page = usePage();
    const pageProps = page.props as SocialLinksEditPageProps;
    const liveLink: SocialLinkResource | undefined = pageProps.link || props.link || props.socialLink;
    // Provide a safe fallback object if not yet available.
    const link: SocialLinkResource = liveLink ?? { id: '', platform: '', display_name: '', url: '', icon: '', is_active: false, sort_order: 0 };

    const { data, setData, post, processing, errors } = useForm<SocialLinkForm>({
        _method: 'PUT',
        display_name: link.display_name || '',
        platform: link.platform || '',
        url: link.url || '',
        icon: link.icon || '',
        is_active: !!link.is_active,
        sort_order: link.sort_order ?? 0
    });

    // Re-sync form values if the server-provided socialLink arrives after initial blank fallback.
    useEffect(() => {
        if (liveLink) {
            setData(prev => ({
                ...prev,
                platform: liveLink.platform || '',
                display_name: liveLink.display_name || '',
                url: liveLink.url || '',
                icon: liveLink.icon || '',
                is_active: !!liveLink.is_active,
                sort_order: liveLink.sort_order ?? 0,
            }));
        }
    }, [liveLink, setData]);

    function submit(e: FormEvent) {
        e.preventDefault();
        if (!link.id) return; // avoid posting without id
        post(`/admin/portfolio/social-links/${link.id}`);
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Social Links', href: '/admin/portfolio/social-links' }, { title: link.platform || link.display_name || '...', href: `/admin/portfolio/social-links/${link.id}/edit` }]}>            
            <Head title={`Edit ${link.platform || link.display_name || 'Social Link'}`} />
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
                        <FormField label="Platform" htmlFor="platform" error={errors.platform as string}>
                            <Input id="platform" value={data.platform} onChange={e => setData('platform', e.target.value)} />
                        </FormField>
                        <FormField label="Display Name" htmlFor="display_name" description="Optional label shown in listings" error={errors.display_name as string}>
                            <Input id="display_name" value={data.display_name} onChange={e => setData('display_name', e.target.value)} />
                        </FormField>
                        <FormField label="Sort Order" htmlFor="sort_order" description="Lower numbers appear first" error={errors.sort_order as string}>
                            <Input id="sort_order" type="number" value={data.sort_order}
                                   onChange={e => setData('sort_order', Number(e.target.value))} />
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
