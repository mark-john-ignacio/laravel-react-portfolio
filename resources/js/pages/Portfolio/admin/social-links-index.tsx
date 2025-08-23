import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function SocialLinksIndex({ links }: { links: any[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Social Links', href: '/admin/portfolio/social-links' }]}>            
            <Head title="Social Links" />
            <div className="p-4 space-y-6">
                <div className="flex justify-between items-center gap-4">
                    <h1 className="text-xl font-semibold tracking-tight">Social Links</h1>
                    <Button asChild size="sm">
                        <Link href="/admin/portfolio/social-links/create">New</Link>
                    </Button>
                </div>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {links.map(l => (
                        <Card key={l.id} className="p-4 flex flex-col gap-3">
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 min-w-0">
                                    <span className="font-medium text-sm truncate max-w-[140px]">{l.platform}</span>
                                    {l.is_active ? (
                                        <Badge variant="secondary" className="text-[10px]">Active</Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-[10px]">Inactive</Badge>
                                    )}
                                </div>
                                <Button asChild size="sm" variant="outline">
                                    <Link href={`/admin/portfolio/social-links/${l.id}/edit`}>Edit</Link>
                                </Button>
                            </div>
                            <div className="space-y-1 text-xs">
                                <p className="text-muted-foreground truncate" title={l.display_name}>{l.display_name}</p>
                                <a href={l.url} target="_blank" rel="noreferrer" className="text-primary underline break-all inline-block max-w-full text-[11px]">{l.url}</a>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
