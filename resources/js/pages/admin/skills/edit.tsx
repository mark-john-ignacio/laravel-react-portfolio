import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Head, useForm } from '@inertiajs/react';

interface Skill {
    id: number;
    name: string;
    category?: string | null;
    level?: string | null;
    sort_order?: number | null;
}
interface Props {
    skill: Skill;
}

export default function AdminSkillsEdit({ skill }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: skill.name,
        category: skill.category || '',
        level: skill.level || '',
        sort_order: String(skill.sort_order ?? ''),
    });
    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(route('admin.skills.update', skill.id));
    }
    return (
        <>
            <Head title="Admin • Edit Skill" />
            <h1 className="mb-4 text-2xl font-semibold">Edit Skill</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Skill</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-4">
                        <Input placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                        <Input placeholder="Category" value={data.category} onChange={(e) => setData('category', e.target.value)} />
                        <Input placeholder="Level" value={data.level} onChange={(e) => setData('level', e.target.value)} />
                        <Input placeholder="Sort Order" value={data.sort_order} onChange={(e) => setData('sort_order', e.target.value)} />
                        <Button type="submit" disabled={processing}>
                            Save
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
