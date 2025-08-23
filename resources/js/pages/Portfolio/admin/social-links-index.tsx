import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function SocialLinksIndex({ links }: { links: any[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Social Links', href: '/admin/portfolio/social-links' }]}>            
            <Head title="Social Links" />
            <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Social Links</h1>
                    <Link href="/admin/portfolio/social-links/create" className="rounded bg-primary px-3 py-1 text-primary-foreground">New</Link>
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="py-2">Platform</th>
                            <th>Display</th>
                            <th>URL</th>
                            <th>Active</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {links.map(l => (
                        <tr key={l.id} className="border-b last:border-none">
                            <td className="py-2 font-medium">{l.platform}</td>
                            <td>{l.display_name}</td>
                            <td className="truncate max-w-[300px]"><a href={l.url} target="_blank" rel="noreferrer" className="text-blue-500 underline">{l.url}</a></td>
                            <td>{l.is_active ? 'Yes' : 'No'}</td>
                            <td><Link href={`/admin/portfolio/social-links/${l.id}/edit`} className="text-primary underline">Edit</Link></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
