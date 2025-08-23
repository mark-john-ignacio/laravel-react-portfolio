import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function MediaIndex({ media }: { media: any[] }) {
    const { data, setData, post, progress, processing, errors } = useForm<any>({
        file: null as File | null,
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        post('/admin/portfolio/media');
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Media Library', href: '/admin/portfolio/media' }]}>            
            <Head title="Media Library" />
            <div className="p-4 space-y-6">
                <form onSubmit={submit} className="flex items-end gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Upload File</label>
                        <input type="file" onChange={e => setData('file', e.target.files ? e.target.files[0] : null)} />
                        {errors.file && <p className="text-xs text-red-500">{errors.file}</p>}
                        {progress && <p className="text-xs">Uploading {progress.percentage}%</p>}
                    </div>
                    <button disabled={processing} className="rounded bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50">Upload</button>
                </form>
                <div className="grid gap-4 md:grid-cols-4">
                    {media.map(m => (
                        <div key={m.id} className="border rounded p-2 space-y-2">
                            {m.is_image ? (
                                <img src={m.url} alt={m.filename} className="aspect-video object-cover rounded" />
                            ) : (
                                <div className="aspect-video flex items-center justify-center text-xs bg-muted rounded">{m.extension.toUpperCase()}</div>
                            )}
                            <div className="space-y-1">
                                <p className="text-[11px] font-medium break-all">{m.filename}</p>
                                <p className="text-[10px] text-muted-foreground">{(m.size_kb).toFixed(1)} KB</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <Link as="button" href={`/admin/portfolio/media/${m.id}`} method="delete" className="text-[10px] underline text-red-600">Delete</Link>
                                {m.is_image && <Link as="button" href={`/admin/portfolio/media/${m.id}/optimize`} method="post" className="text-[10px] underline">Optimize</Link>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
