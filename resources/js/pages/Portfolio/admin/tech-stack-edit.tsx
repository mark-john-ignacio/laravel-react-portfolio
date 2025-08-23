import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { FormEvent } from 'react';

type TechForm = {
    _method: 'PUT';
    name: string;
    category: string;
    description: string;
    icon: string;
    proficiency: number;
    is_featured: boolean;
    order_column: number;
};

export default function TechStackEdit({ tech }: { tech: any }) {
    const { data, setData, post, processing, errors } = useForm<TechForm>({
        _method: 'PUT',
        name: tech.name || '',
        category: tech.category || '',
        description: tech.description || '',
        icon: tech.icon || '',
        proficiency: tech.proficiency || 3,
        is_featured: tech.is_featured || false,
        order_column: tech.order_column || 0
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
                            <Label>Proficiency</Label>
                            <div className="space-y-2">
                                <Slider min={1} max={5} step={1} value={[data.proficiency]} onValueChange={(vals: number[]) => setData('proficiency', vals[0])} />
                                <p className="text-[10px] text-muted-foreground">{data.proficiency} / 5</p>
                            </div>
                            {errors.proficiency && <p className="text-xs text-destructive">{errors.proficiency}</p>}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} className="min-h-[140px]" />
                        {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
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
