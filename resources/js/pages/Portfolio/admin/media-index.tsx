import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEvent, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

type MediaUploadForm = { file: File | null };
interface MediaFile {
    path: string;
    url: string;
    size: number;
    last_modified: number;
}
// Backend provides `files`; keep backward compatibility if `media` ever sent.
export default function MediaIndex({ files, media }: { files?: MediaFile[]; media?: MediaFile[] }) {
    const { data, setData, post, progress, processing, errors } = useForm<MediaUploadForm>({ file: null });
        const list: MediaFile[] = (files || media || []).map(f => ({ ...f, size: (f as any).size ?? 0 }));

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
                                {progress && (
                                    <div className="space-y-1 w-full max-w-xs">
                                        <Progress value={progress.percentage} />
                                        <p className="text-[10px] text-muted-foreground">Uploading {progress.percentage}%</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <Button type="submit" disabled={processing} className="mt-1 md:mt-0">Upload</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <div className="grid gap-4 md:grid-cols-4">
                    {list.map(m => (
                        <Card key={m.path} className="overflow-hidden group">
                            <CardContent className="p-0">
                                {/* Basic derivations since controller only provides path/url/size */}
                                {isImage(m.path) ? (
                                  <div className="relative aspect-video bg-muted">
                                    <img src={m.url} alt={basename(m.path)} className="w-full h-full object-cover" />
                                  </div>
                                ) : (
                                  <div className="aspect-video flex items-center justify-center text-[10px] bg-muted uppercase">{ext(m.path)}</div>
                                )}
                                <div className="p-2 space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-[11px] font-medium line-clamp-1" title={basename(m.path)}>{basename(m.path)}</p>
                                        {isImage(m.path) && <Badge variant="outline" className="text-[9px] px-1 py-0">IMG</Badge>}
                                    </div>
                                    <p className="text-[10px] text-muted-foreground">{(m.size/1024).toFixed(1)} KB</p>
                                    <div className="flex justify-between items-center pt-1">
                                        <Link as="button" href={`/admin/portfolio/media/${encodeURIComponent(m.path)}`} method="delete" className="text-[10px] underline text-red-600">Delete</Link>
                                        {isImage(m.path) && <Link as="button" href={`/admin/portfolio/media/${encodeURIComponent(m.path)}/optimize`} method="post" className="text-[10px] underline">Optimize</Link>}
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

function ext(path: string) {
  const m = path.match(/\.([a-z0-9]+)$/i); return m ? m[1] : '';
}
function isImage(path: string) {
  return /\.(png|jpe?g|webp|gif|svg)$/i.test(path);
}
function basename(path: string) {
  return path.split(/\\|\//).pop() || path;
}
