import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

interface Experience {
    id: number;
    company: string;
    role: string;
    start_date: string;
    end_date?: string | null;
    is_current: boolean;
    summary?: string | null;
    highlights?: string[];
    order: number;
}

export default function EditExperience({ experience }: { experience: Experience }) {
    const { data, setData, put, processing, errors } = useForm({ ...experience, highlights: experience.highlights || [] });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(route('admin.experiences.update', experience.id));
    }

    return (
        <AppLayout>
            <Head title={`admin/experiences/${experience.id}/edit`} />
            <main className="p-4">
                <h1 className="mb-4 text-2xl font-bold text-green-400">$ experiences edit --id {experience.id}</h1>
                <Card className="max-w-3xl border-cyan-500/30 bg-card/60">
                    <CardContent className="p-6">
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="company">company</Label>
                                <Input id="company" value={data.company} onChange={(e) => setData('company', e.target.value)} />
                                {errors.company && <p className="text-sm text-red-400">{errors.company}</p>}
                            </div>
                            <div>
                                <Label htmlFor="role">role</Label>
                                <Input id="role" value={data.role} onChange={(e) => setData('role', e.target.value)} />
                                {errors.role && <p className="text-sm text-red-400">{errors.role}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="start_date">start_date</Label>
                                    <Input
                                        id="start_date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="end_date">end_date</Label>
                                    <Input
                                        id="end_date"
                                        type="date"
                                        value={data.end_date || ''}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                    />
                                </div>
                                <div className="col-span-2 flex items-center gap-2">
                                    <input
                                        id="is_current"
                                        type="checkbox"
                                        checked={!!data.is_current}
                                        onChange={(e) => setData('is_current', e.target.checked)}
                                    />
                                    <Label htmlFor="is_current">current</Label>
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="summary">summary</Label>
                                <textarea
                                    id="summary"
                                    className="w-full rounded border bg-background p-2 font-mono"
                                    rows={4}
                                    value={data.summary || ''}
                                    onChange={(e) => setData('summary', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="highlights">highlights (one per line)</Label>
                                <textarea
                                    id="highlights"
                                    className="w-full rounded border bg-background p-2 font-mono"
                                    rows={4}
                                    value={(data.highlights as string[]).join('\n')}
                                    onChange={(e) =>
                                        setData(
                                            'highlights',
                                            e.target.value
                                                .split('\n')
                                                .map((s) => s.trim())
                                                .filter(Boolean),
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="order">order</Label>
                                <Input id="order" type="number" value={data.order} onChange={(e) => setData('order', Number(e.target.value))} />
                            </div>
                            <div className="flex gap-3">
                                <Button type="submit" disabled={processing} className="bg-green-600 hover:bg-green-700">
                                    save
                                </Button>
                                <Link href={route('admin.experiences.index')} className="self-center text-cyan-400 underline">
                                    cancel
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </AppLayout>
    );
}
