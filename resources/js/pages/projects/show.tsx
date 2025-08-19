import { PublicNav } from '@/components/public-nav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/types/portfolio';
import { Head } from '@inertiajs/react';

interface Props {
    project: Project;
}

export default function ProjectShow({ project }: Props) {
    return (
        <>
            <Head title={project.title} />
            <PublicNav />
            <main className="mx-auto max-w-3xl space-y-6 px-4 py-10">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{project.summary}</p>
                        {project.tech_stack && <p className="text-xs">Stack: {project.tech_stack.join(', ')}</p>}
                        <div className="prose dark:prose-invert max-w-none text-sm whitespace-pre-wrap">{project.description}</div>
                    </CardContent>
                </Card>
            </main>
        </>
    );
}
