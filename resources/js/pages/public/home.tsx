import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { TerminalNavbar } from '@/components/custom/terminal-navbar';
import { Badge } from '@/components/ui/badge';

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

interface Experience {
  id: number;
  company: string;
  role: string;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  highlights?: string[];
}

export default function Home({ projects, experiences }: { projects: Project[]; experiences: Experience[] }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <Head title="~/home" />
      <TerminalNavbar />
      <main className="container mx-auto px-4 py-10">
        <section className="mb-10">
          <div className="mb-4 text-green-400">$ whoami</div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Mark John Ignacio<span className="text-cyan-400">@portfolio</span>
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Laravel + React engineer crafting clean, fast, and scalable apps. Terminal-first, cyberpunk aesthetics, production-grade quality.
          </p>
          <div className="mt-4 flex gap-2">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Laravel</Badge>
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50">React</Badge>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">TypeScript</Badge>
          </div>
        </section>

        <section className="mb-10">
          <div className="mb-3 text-green-400">$ ls ./projects --featured</div>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((p) => (
              <Card key={p.id} className="bg-card/60 border-green-500/20 hover:border-green-500/50 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    <div className="flex gap-2">
                      {p.github_url && (
                        <a className="text-cyan-400 underline" href={p.github_url} target="_blank">github</a>
                      )}
                      {p.live_url && (
                        <a className="text-purple-400 underline" href={p.live_url} target="_blank">live</a>
                      )}
                    </div>
                  </div>
                  <pre className="mt-3 whitespace-pre-wrap text-sm bg-background/60 p-3 rounded border border-border/40">
{p.description}
                  </pre>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.technologies?.map((t) => (
                      <Badge key={t} variant="outline" className="border-cyan-400/40 text-cyan-400">{t}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-4">
            <Link href={route('projects')} className="text-cyan-400 underline">view all →</Link>
          </div>
        </section>

        <section>
          <div className="mb-3 text-green-400">$ cat ./about/experience.log</div>
          <div className="space-y-3">
            {experiences.map((e) => (
              <div key={e.id} className="border-l-2 border-purple-500/40 pl-4">
                <div className="flex items-center gap-2">
                  <span className="text-purple-400">{e.role}</span>
                  <span className="text-muted-foreground">@ {e.company}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {e.start_date} – {e.is_current ? 'Present' : e.end_date || '—'}
                </div>
                {e.highlights?.length ? (
                  <ul className="mt-2 list-disc pl-6 marker:text-green-400/70">
                    {e.highlights.map((h, i) => (
                      <li key={i} className="text-sm">{h}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
