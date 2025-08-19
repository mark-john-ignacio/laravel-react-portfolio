import { PublicNav } from '@/components/public-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { About, Experience, Project, Skill } from '@/types/portfolio';
import { Head } from '@inertiajs/react';

interface HomeProps {
    about: About | null;
    skills: Skill[];
    featuredProjects: Project[];
    recentExperiences: Experience[];
}

export default function Home({ about, skills, featuredProjects, recentExperiences }: HomeProps) {
    return (
        <>
            <Head title="Home" />
            <PublicNav />
            <main className="mx-auto max-w-5xl space-y-12 px-4 py-10">
                <section>
                    <h1 className="mb-4 text-3xl font-semibold tracking-tight">About</h1>
                    <p className="leading-relaxed text-muted-foreground">{about?.summary}</p>
                </section>

                <section>
                    <h2 className="mb-4 text-2xl font-semibold">Skills</h2>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {skills.map((skill) => (
                            <Card key={skill.id} className="p-0">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base">{skill.name}</CardTitle>
                                    <CardDescription className="text-xs">
                                        {skill.category} • {skill.level}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="mb-4 text-2xl font-semibold">Featured Projects</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {featuredProjects.map((p) => (
                            <Card key={p.id}>
                                <CardHeader>
                                    <CardTitle className="text-lg">{p.title}</CardTitle>
                                    <CardDescription>{p.summary}</CardDescription>
                                </CardHeader>
                                <CardContent className="text-xs text-muted-foreground">{p.tech_stack?.join(', ')}</CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="mb-4 text-2xl font-semibold">Recent Experience</h2>
                    <div className="space-y-4">
                        {recentExperiences.map((e) => (
                            <Card key={e.id}>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base">
                                        {e.role} – {e.company}
                                    </CardTitle>
                                    <CardDescription className="text-xs">
                                        {e.start_date} {e.is_current ? '– Present' : e.end_date}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground">{e.description}</CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
