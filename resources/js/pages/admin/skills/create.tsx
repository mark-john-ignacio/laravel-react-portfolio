import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Head, useForm } from '@inertiajs/react';

export default function AdminSkillsCreate() {
    const { data, setData, post, processing, errors } = useForm({ name: '', category: '', level: '', sort_order: '' });
    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.skills.store'));
    }
    return (
        <>
            <Head title="Admin • New Skill" />
            <h1 className="mb-4 text-2xl font-semibold">New Skill</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Create Skill</CardTitle>
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
