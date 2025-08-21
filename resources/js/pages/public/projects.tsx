import { Head } from '@inertiajs/react';
import { TerminalNavbar } from '@/components/custom/terminal-navbar';
import { Card, CardContent } from '@/components/ui/card';
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

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <Head title="~/projects" />
      <TerminalNavbar />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-green-400 mb-6">$ ls ./projects -la</h1>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((p) => (
            <Card key={p.id} className="bg-card/60 border-cyan-500/20 hover:border-cyan-500/50 transition-colors">
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
                    <Badge key={t} variant="outline" className="border-purple-400/40 text-purple-400">{t}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
