import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEvent, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type MediaUploadForm = { file: File | null };
export default function MediaIndex({ media }: { media: any[] }) {
    const { data, setData, post, progress, processing, errors } = useForm<MediaUploadForm>({ file: null });

    function submit(e: FormEvent) {
        e.preventDefault();
        post('/admin/portfolio/media');
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Media Library', href: '/admin/portfolio/media' }]}>            
            <Head title="Media Library" />
            <div className="p-4 space-y-6">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Upload Media</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="flex flex-col gap-3 md:flex-row md:items-end">
                            <div className="space-y-2">
                                <Label htmlFor="file">File</Label>
                                <Input id="file" type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => setData('file', e.target.files ? e.target.files[0] : null)} />
                                {errors.file && <p className="text-xs text-destructive">{errors.file}</p>}
                                {progress && <p className="text-[10px] text-muted-foreground">Uploading {progress.percentage}%</p>}
                            </div>
                            <div>
                                <Button type="submit" disabled={processing} className="mt-1 md:mt-0">Upload</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <div className="grid gap-4 md:grid-cols-4">
                    {media.map(m => (
                        <Card key={m.id} className="overflow-hidden group">
                            <CardContent className="p-0">
                                {m.is_image ? (
                                    <div className="relative">
                                        <img src={m.url} alt={m.filename} className="aspect-video w-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="aspect-video flex items-center justify-center text-xs bg-muted">{m.extension.toUpperCase()}</div>
                                )}
                                <div className="p-2 space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-[11px] font-medium line-clamp-1" title={m.filename}>{m.filename}</p>
                                        {m.is_image && <Badge variant="outline" className="text-[9px] px-1 py-0">IMG</Badge>}
                                    </div>
                                    <p className="text-[10px] text-muted-foreground">{(m.size_kb).toFixed(1)} KB</p>
                                    <div className="flex justify-between items-center pt-1">
                                        <Link as="button" href={`/admin/portfolio/media/${m.id}`} method="delete" className="text-[10px] underline text-red-600">Delete</Link>
                                        {m.is_image && <Link as="button" href={`/admin/portfolio/media/${m.id}/optimize`} method="post" className="text-[10px] underline">Optimize</Link>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
