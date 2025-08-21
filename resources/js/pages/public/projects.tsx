import { TerminalNavbar } from '@/components/custom/terminal-navbar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    technologies: string[];
    featured: boolean;
    github_url?: string;
    live_url?: string;
}

export default function Projects({ projects }: { projects: Project[] }) {
    return (
        <div className="min-h-screen bg-background font-mono text-foreground">
            <Head title="~/projects" />
            <TerminalNavbar />
            <main className="container mx-auto px-4 py-10">
                <h1 className="mb-6 text-3xl font-bold text-green-400">$ ls ./projects -la</h1>
                <div className="grid gap-4 md:grid-cols-2">
                    {projects.map((p, i) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <Card className="border-cyan-500/20 bg-card/60 transition-colors hover:border-cyan-500/50">
                                <CardContent className="p-5">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-semibold">{p.title}</h3>
                                        <div className="flex gap-2">
                                            {p.github_url && (
                                                <a className="text-cyan-400 underline" href={p.github_url} target="_blank">
                                                    github
                                                </a>
                                            )}
                                            {p.live_url && (
                                                <a className="text-purple-400 underline" href={p.live_url} target="_blank">
                                                    live
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <pre className="mt-3 rounded border border-border/40 bg-background/60 p-3 text-sm whitespace-pre-wrap">
                                        {p.description}
                                    </pre>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {p.technologies?.map((t) => (
                                            <Badge key={t} variant="outline" className="border-purple-400/40 text-purple-400">
                                                {t}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
