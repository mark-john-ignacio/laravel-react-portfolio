import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';

interface Project {
    id: number;
    title: string;
    slug: string;
    summary?: string | null;
    featured?: boolean;
    published?: boolean;
}
interface Props {
    projects: Project[];
}

export default function AdminProjectsIndex({ projects }: Props) {
    return (
        <>
            <Head title="Admin • Projects" />
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Projects</h1>
                <Button asChild>
                    <Link href={route('admin.projects.create')}>New</Link>
                </Button>
            </div>
            <div className="space-y-3">
                {projects.map((p) => (
                    <Card key={p.id}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">{p.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{p.slug}</span>
                            <Link className="underline" href={route('admin.projects.edit', p.id)}>
                                Edit
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}
