import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ContactSubmissionsIndex({ submissions }: { submissions: any }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Contact Submissions', href: '/admin/portfolio/contact-submissions' }]}>            
            <Head title="Contact Submissions" />
            <div className="p-4 space-y-6 max-w-5xl">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Contact Messages</h1>
                    <Button asChild size="sm" variant="secondary"><Link href="/admin/portfolio/contact-submissions/export">Export CSV</Link></Button>
                </div>
                <div className="space-y-3">
                    {submissions.data.map((s: any) => (
                        <Card key={s.id} className="hover:bg-muted/40 transition-colors">
                            <CardHeader className="pb-2 flex flex-row items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <CardTitle className="text-sm font-medium leading-tight">
                                        <Link href={`/admin/portfolio/contact-submissions/${s.id}`} className="underline-offset-2 hover:underline">
                                            {s.name}
                                        </Link>
                                    </CardTitle>
                                    <div className="text-[11px] text-muted-foreground flex items-center gap-2">
                                        <span>{s.created_at_human}</span>
                                        {!s.is_read && <Badge variant="outline" className="text-[10px] px-2 py-0">Unread</Badge>}
                                    </div>
                                </div>
                                <div className="text-[11px] text-right text-muted-foreground line-clamp-3 max-w-[260px] hidden md:block">
                                    {s.email}
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0 text-xs text-muted-foreground line-clamp-2">
                                {s.message}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
