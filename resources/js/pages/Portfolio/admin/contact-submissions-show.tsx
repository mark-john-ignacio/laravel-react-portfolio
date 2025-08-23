import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

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
            <div className="p-4 space-y-6 max-w-3xl">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Message from {submission.name}</h1>
                    <Link href="/admin/portfolio/contact-submissions" className="text-sm underline">Back</Link>
                </div>
                <div className="space-y-4 border rounded p-4 bg-background">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                            <div className="font-semibold">Name</div>
                            <div>{submission.name}</div>
                        </div>
                        <div>
                            <div className="font-semibold">Email</div>
                            <div>{submission.email}</div>
                        </div>
                        {submission.phone && <div>
                            <div className="font-semibold">Phone</div>
                            <div>{submission.phone}</div>
                        </div>}
                        {submission.company && <div>
                            <div className="font-semibold">Company</div>
                            <div>{submission.company}</div>
                        </div>}
                        {submission.subject && <div className="col-span-2">
                            <div className="font-semibold">Subject</div>
                            <div>{submission.subject}</div>
                        </div>}
                    </div>
                    <div className="space-y-2">
                        <div className="font-semibold text-xs">Message</div>
                        <p className="text-sm whitespace-pre-line leading-relaxed">{submission.message}</p>
                    </div>
                </div>
                <form onSubmit={toggleRead} className="flex gap-3">
                    <button disabled={processing} className="rounded bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50">
                        Mark as {data.is_read ? 'Unread' : 'Read'}
                    </button>
                    <Link as="button" href={`/admin/portfolio/contact-submissions/${submission.id}`} method="delete" className="rounded bg-red-600 px-4 py-2 text-white text-xs">Delete</Link>
                </form>
            </div>
        </AppLayout>
    );
}
