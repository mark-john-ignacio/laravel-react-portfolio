import { PublicNav } from '@/components/public-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Experience } from '@/types/portfolio';
import { Head } from '@inertiajs/react';

interface Props {
    experiences: Experience[];
}

export default function ExperiencePage({ experiences }: Props) {
    return (
        <>
            <Head title="Experience" />
            <PublicNav />
            <main className="mx-auto max-w-4xl space-y-6 px-4 py-10">
                <h1 className="text-3xl font-semibold">Experience</h1>
                <div className="space-y-4">
                    {experiences.map((exp) => (
                        <Card key={exp.id}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">
                                    {exp.role} – {exp.company}
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    {exp.start_date} {exp.is_current ? '– Present' : `– ${exp.end_date}`}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm whitespace-pre-wrap text-muted-foreground">{exp.description}</CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </>
    );
}
