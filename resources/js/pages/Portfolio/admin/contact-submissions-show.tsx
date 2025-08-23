import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ContactSubmissionsShow({ submission }: { submission: any }) {
    const { data, setData, post, processing } = useForm<any>({
        _method: 'PUT',
        is_read: submission.is_read
    });

    function toggleRead(e: FormEvent) {
        e.preventDefault();
        post(`/admin/portfolio/contact-submissions/${submission.id}`);
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Contact Submissions', href: '/admin/portfolio/contact-submissions' }, { title: submission.name, href: `/admin/portfolio/contact-submissions/${submission.id}` }]}>            
            <Head title={submission.name} />
            <div className="p-4 space-y-6 max-w-4xl">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <h1 className="text-xl font-semibold">Message from {submission.name}</h1>
                    <div className="flex items-center gap-3">
                        {!submission.is_read && <Badge variant="outline" className="text-[10px]">Unread</Badge>}
                        <Link href="/admin/portfolio/contact-submissions" className="text-xs underline">Back to list</Link>
                    </div>
                </div>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2 text-xs">
                            <div className="space-y-1"><div className="font-semibold">Name</div><div>{submission.name}</div></div>
                            <div className="space-y-1"><div className="font-semibold">Email</div><div className="break-all">{submission.email}</div></div>
                            {submission.phone && <div className="space-y-1"><div className="font-semibold">Phone</div><div>{submission.phone}</div></div>}
                            {submission.company && <div className="space-y-1"><div className="font-semibold">Company</div><div>{submission.company}</div></div>}
                            {submission.subject && <div className="space-y-1 md:col-span-2"><div className="font-semibold">Subject</div><div>{submission.subject}</div></div>}
                            <div className="space-y-1 md:col-span-2"><div className="font-semibold">Received</div><div>{submission.created_at_human}</div></div>
                        </div>
                        <div className="space-y-2">
                            <div className="font-semibold text-xs">Message</div>
                            <p className="text-sm whitespace-pre-line leading-relaxed">{submission.message}</p>
                        </div>
                    </CardContent>
                </Card>
                <form onSubmit={toggleRead} className="flex flex-wrap gap-3">
                    <Button type="submit" disabled={processing} size="sm">Mark as {data.is_read ? 'Unread' : 'Read'}</Button>
                    <Link as="button" href={`/admin/portfolio/contact-submissions/${submission.id}`} method="delete" className="text-xs underline text-red-600">Delete</Link>
                </form>
            </div>
        </AppLayout>
    );
}
