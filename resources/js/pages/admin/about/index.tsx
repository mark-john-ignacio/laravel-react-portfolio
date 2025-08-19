import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Head, useForm } from '@inertiajs/react';

interface About {
    id?: number;
    summary?: string | null;
    timeline?: any[] | null;
}
interface Props {
    about: About | null;
}

export default function AdminAbout({ about }: Props) {
    const { data, setData, put, processing } = useForm({
        summary: about?.summary || '',
        timeline: about?.timeline || [],
    });
    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(route('admin.about.update', about?.id || 1));
    }
    return (
        <>
            <Head title="Admin • About" />
            <h1 className="mb-4 text-2xl font-semibold">About</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Edit About</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <Textarea value={data.summary} onChange={(e) => setData('summary', e.target.value)} rows={6} />
                        </div>
                        <Button type="submit" disabled={processing}>
                            Save
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
