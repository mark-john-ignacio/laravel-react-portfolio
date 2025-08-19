import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';

interface Experience {
    id: number;
    role: string;
    company: string;
    start_date: string;
    end_date?: string | null;
    is_current?: boolean;
    location?: string | null;
}
interface Props {
    experiences: Experience[];
}

export default function AdminExperiencesIndex({ experiences }: Props) {
    return (
        <>
            <Head title="Admin • Experiences" />
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Experiences</h1>
                <Button asChild>
                    <Link href={route('admin.experiences.create')}>New</Link>
                </Button>
            </div>
            <div className="space-y-3">
                {experiences.map((e) => (
                    <Card key={e.id}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                                {e.role} – {e.company}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>
                                {e.start_date} {e.is_current ? '– Present' : e.end_date}
                            </span>
                            <Link className="underline" href={route('admin.experiences.edit', e.id)}>
                                Edit
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}
