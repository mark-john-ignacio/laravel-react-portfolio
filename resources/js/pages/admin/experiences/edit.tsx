import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Head, useForm } from '@inertiajs/react';

interface Experience {
    id: number;
    role: string;
    company: string;
    location?: string | null;
    start_date: string;
    end_date?: string | null;
    is_current?: boolean;
    description?: string | null;
}
interface Props {
    experience: Experience;
}

export default function AdminExperiencesEdit({ experience }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        role: experience.role,
        company: experience.company,
        location: experience.location || '',
        start_date: experience.start_date,
        end_date: experience.end_date || '',
        is_current: !!experience.is_current,
        description: experience.description || '',
    });
    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(route('admin.experiences.update', experience.id));
    }
    return (
        <>
            <Head title="Admin • Edit Experience" />
            <h1 className="mb-4 text-2xl font-semibold">Edit Experience</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Experience</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-3">
                        <Input placeholder="Role" value={data.role} onChange={(e) => setData('role', e.target.value)} />
                        {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
                        <Input placeholder="Company" value={data.company} onChange={(e) => setData('company', e.target.value)} />
                        <Input placeholder="Location" value={data.location} onChange={(e) => setData('location', e.target.value)} />
                        <Input type="date" value={data.start_date} onChange={(e) => setData('start_date', e.target.value)} />
                        <Input type="date" value={data.end_date} onChange={(e) => setData('end_date', e.target.value)} />
                        <label className="flex items-center gap-2 text-xs">
                            <input type="checkbox" checked={data.is_current} onChange={(e) => setData('is_current', e.target.checked)} /> Current
                        </label>
                        <Textarea
                            rows={5}
                            placeholder="Description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        <Button type="submit" disabled={processing}>
                            Save
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
