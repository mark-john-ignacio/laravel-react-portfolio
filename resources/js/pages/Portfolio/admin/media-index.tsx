import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEvent, ChangeEvent, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

type MediaUploadForm = { file: File | null; files: string[] };
interface MediaFile {
    path: string;
    url: string;
    size: number;
    last_modified: number;
}
// Backend provides `files`; keep backward compatibility if `media` ever sent.
export default function MediaIndex({ files, media }: { files?: MediaFile[]; media?: MediaFile[] }) {
    const { data, setData, post, progress, processing, errors, transform } = useForm<MediaUploadForm>({ file: null, files: [] });
    const list: MediaFile[] = (files || media || []).map(f => ({ ...f, size: (f as any).size ?? 0 }));
    const [selected, setSelected] = useState<string[]>([]);
    const allSelected = selected.length > 0 && selected.length === list.length;

    function toggleSelect(path: string) {
        setSelected(prev => prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]);
    }
    function toggleAll() {
        if (allSelected) setSelected([]); else setSelected(list.map(f => f.path));
    }
    function bulkDelete() {
        if (!selected.length) return;
        if (!confirm(`Delete ${selected.length} file(s)? This cannot be undone.`)) return;
        setData('files', selected);
        transform(original => ({ ...original, files: selected }));
        post('/admin/portfolio/media/batch-destroy', {
            preserveScroll: true,
            forceFormData: true,
            onFinish: () => {
                setSelected([]);
                setData('files', []);
                transform(o => o);
            }
        });
    }

    function submit(e: FormEvent) {
        e.preventDefault();
        if (!data.file) return; // no file selected
        post('/admin/portfolio/media/upload', {
            forceFormData: true,
            onSuccess: () => setData('file', null)
        });
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
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs">
                        <input type="checkbox" aria-label="Select all" checked={allSelected} onChange={toggleAll} />
                        <span>{selected.length ? `${selected.length} selected` : 'Select files'}</span>
                        {selected.length > 0 && (
                            <Button type="button" variant="destructive" size="sm" onClick={bulkDelete} disabled={processing}>
                                Delete Selected
                            </Button>
                        )}
                    </div>
                    {progress && <p className="text-[10px] text-muted-foreground">Uploading… {progress.percentage}%</p>}
                </div>
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
                                    <div className="flex items-center justify-between">
                                        <input type="checkbox" className="scale-90" checked={selected.includes(m.path)} onChange={() => toggleSelect(m.path)} />
                                        <span className="text-[9px] text-muted-foreground">{(m.size/1024).toFixed(1)} KB</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-[11px] font-medium line-clamp-1" title={basename(m.path)}>{basename(m.path)}</p>
                                        {isImage(m.path) && <Badge variant="outline" className="text-[9px] px-1 py-0">IMG</Badge>}
                                    </div>
                                    <div className="flex justify-between items-center pt-1">
                                        <Link as="button" href={`/admin/portfolio/media/${encodeURIComponent(m.path)}`} method="delete" className="text-[10px] underline text-red-600" onBefore={() => !confirm('Delete this file?') && false}>Delete</Link>
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
