import { PublicNav } from '@/components/public-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/types/portfolio';
import { Head, Link } from '@inertiajs/react';

interface Props {
    projects: Project[];
}

export default function ProjectsIndex({ projects }: Props) {
    return (
        <>
            <Head title="Projects" />
            <PublicNav />
            <main className="mx-auto max-w-5xl space-y-8 px-4 py-10">
                <h1 className="text-3xl font-semibold">Projects</h1>
                <div className="grid gap-6 md:grid-cols-3">
                    {projects.map((p) => (
                        <Card key={p.id}>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    <Link href={route('projects.show', p.slug)}>{p.title}</Link>
                                </CardTitle>
                                <CardDescription>{p.summary}</CardDescription>
                            </CardHeader>
                            <CardContent className="text-xs text-muted-foreground">{p.tech_stack?.join(', ')}</CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </>
    );
}
