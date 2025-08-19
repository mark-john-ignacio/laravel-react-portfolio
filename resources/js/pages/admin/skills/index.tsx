import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';

interface Skill {
    id: number;
    name: string;
    category?: string | null;
    level?: string | null;
    sort_order?: number | null;
}
interface Props {
    skills: Skill[];
}

export default function AdminSkillsIndex({ skills }: Props) {
    return (
        <>
            <Head title="Admin • Skills" />
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Skills</h1>
                <Button asChild>
                    <Link href={route('admin.skills.create')}>New</Link>
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                {skills.map((s) => (
                    <Card key={s.id}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">{s.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1 text-xs text-muted-foreground">
                            <p>{s.category}</p>
                            <p>{s.level}</p>
                            <div className="flex gap-2 text-[10px]">
                                <Link href={route('admin.skills.edit', s.id)} className="underline">
                                    Edit
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}
