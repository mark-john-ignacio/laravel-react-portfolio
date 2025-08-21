import { TerminalNavbar } from '@/components/custom/terminal-navbar';
import { Head } from '@inertiajs/react';

interface Experience {
    id: number;
    company: string;
    role: string;
    start_date: string;
    end_date?: string | null;
    is_current: boolean;
    summary?: string | null;
    highlights?: string[];
}

export default function About({ experiences }: { experiences: Experience[] }) {
    return (
        <div className="min-h-screen bg-background font-mono text-foreground">
            <Head title="~/about" />
            <TerminalNavbar />
            <main className="container mx-auto px-4 py-10">
                <h1 className="mb-6 text-3xl font-bold text-cyan-400">$ timeline --experience</h1>
                <div className="space-y-6">
                    {experiences.map((e) => (
                        <div key={e.id} className="border-l-2 border-green-500/40 pl-4">
                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                <span className="font-semibold text-purple-400">{e.role}</span>
                                <span>@ {e.company}</span>
                                <span>•</span>
                                <span>
                                    {e.start_date} – {e.is_current ? 'Present' : e.end_date || '—'}
                                </span>
                            </div>
                            {e.summary && <p className="mt-2 text-sm">{e.summary}</p>}
                            {e.highlights?.length ? (
                                <ul className="mt-2 list-disc pl-6 marker:text-green-400/70">
                                    {e.highlights.map((h, i) => (
                                        <li key={i}>{h}</li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
