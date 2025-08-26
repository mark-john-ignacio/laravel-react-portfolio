import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { socialLinkColumns, SocialLinkRow } from './social-links-columns';

export default function SocialLinksIndex({ links }: { links: SocialLinkRow[] }) {
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
                <DataTable columns={socialLinkColumns} data={links} searchKey="platform" />
            </div>
        </AppLayout>
    );
}
