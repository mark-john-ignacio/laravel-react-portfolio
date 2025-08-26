import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { FormEvent } from 'react';

type TechForm = {
    _method: 'PUT';
    name: string;
    category: string;
    icon: string;
    color: string;
    proficiency_level: number; // 0-100
    is_featured: boolean;
    sort_order: number;
};

export default function TechStackEdit({ tech }: { tech: any }) {
    const { data, setData, post, processing, errors } = useForm<TechForm>({
        _method: 'PUT',
        name: tech.name || '',
        category: tech.category || '',
        icon: tech.icon || '',
        color: tech.color || '',
        proficiency_level: (tech.proficiency_level ?? tech.proficiency ?? 50),
        is_featured: !!tech.is_featured,
        sort_order: (tech.sort_order ?? tech.order_column ?? 0),
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        post(`/admin/portfolio/tech-stack/${tech.id}`);
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Tech Stack', href: '/admin/portfolio/tech-stack' }, { title: tech.name, href: `/admin/portfolio/tech-stack/${tech.id}/edit` }]}>            
            <Head title={`Edit ${tech.name}`} />
            <form onSubmit={submit} className="p-4 max-w-xl space-y-6">
                <div className="flex justify-between items-center gap-4">
                    <h1 className="text-xl font-semibold tracking-tight">Edit Technology</h1>
                    <Button asChild variant="outline" size="sm"><Link href="/admin/portfolio/tech-stack">Back</Link></Button>
                </div>
                <Card className="p-5 space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} />
                        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" value={data.category} onChange={e => setData('category', e.target.value)} />
                        {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label htmlFor="icon">Icon</Label>
                            <Input id="icon" value={data.icon} onChange={e => setData('icon', e.target.value)} />
                            {errors.icon && <p className="text-xs text-destructive">{errors.icon}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Proficiency Level</Label>
                            <div className="space-y-2">
                                <Slider min={0} max={100} step={1} value={[data.proficiency_level]} onValueChange={(vals: number[]) => setData('proficiency_level', vals[0])} />
                                <p className="text-[10px] text-muted-foreground">{data.proficiency_level}%</p>
                            </div>
                            {errors.proficiency_level && <p className="text-xs text-destructive">{errors.proficiency_level}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label htmlFor="color">Color</Label>
                            <Input id="color" type="color" value={data.color || '#000000'} onChange={e => setData('color', e.target.value)} className="h-9 p-1" />
                            {errors.color && <p className="text-xs text-destructive">{errors.color}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sort_order">Sort Order</Label>
                            <Input id="sort_order" type="number" value={data.sort_order} onChange={e => setData('sort_order', Number(e.target.value))} />
                            {errors.sort_order && <p className="text-xs text-destructive">{errors.sort_order}</p>}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Switch checked={data.is_featured} onCheckedChange={(v: boolean) => setData('is_featured', !!v)} id="featured" />
                        <Label htmlFor="featured" className="text-sm font-normal">Featured</Label>
                    </div>
                </Card>
                <div className="flex gap-3">
                    <Button type="submit" disabled={processing}>Save</Button>
                </div>
            </form>
        </AppLayout>
    );
}
