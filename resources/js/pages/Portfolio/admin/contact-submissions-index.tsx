import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function ContactSubmissionsIndex({ submissions }: { submissions: any }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Contact Submissions', href: '/admin/portfolio/contact-submissions' }]}>            
            <Head title="Contact Submissions" />
            <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Contact Messages</h1>
                    <Link href="/admin/portfolio/contact-submissions/export" as="button" className="rounded bg-muted px-3 py-1 text-xs">Export CSV</Link>
                </div>
                <div className="space-y-2">
                    {submissions.data.map((s: any) => (
                        <Link href={`/admin/portfolio/contact-submissions/${s.id}`} key={s.id} className="block border rounded p-3 hover:bg-muted/40">
                            <div className="flex justify-between text-xs">
                                <span className="font-medium">{s.name}</span>
                                <span className="text-muted-foreground">{s.created_at_human}</span>
                            </div>
                            <p className="text-xs line-clamp-2 text-muted-foreground">{s.message}</p>
                            {!s.is_read && <span className="inline-block mt-1 text-[10px] bg-amber-500/20 text-amber-700 px-2 py-0.5 rounded">Unread</span>}
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
