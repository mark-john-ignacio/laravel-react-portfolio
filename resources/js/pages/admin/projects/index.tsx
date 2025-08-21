import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

interface Project {
    id: number;
    title: string;
    slug: string;
    featured: boolean;
    order: number;
}

export default function AdminProjectsIndex({ projects }: { projects: { data: Project[] } }) {
    return (
        <AppLayout>
            <Head title="admin/projects" />
            <main className="p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-green-400">$ admin projects</h1>
                    <Link href={route('admin.projects.create')} className="text-cyan-400 underline">
                        + new
                    </Link>
                </div>
                <Card className="border-green-500/30 bg-card/60">
                    <CardContent className="overflow-x-auto p-0">
                        <table className="min-w-full text-sm">
                            <thead className="bg-background/80">
                                <tr className="border-b border-border/40">
                                    <th className="p-3 text-left">id</th>
                                    <th className="p-3 text-left">title</th>
                                    <th className="p-3 text-left">slug</th>
                                    <th className="p-3 text-left">featured</th>
                                    <th className="p-3 text-right">actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.data.map((p) => (
                                    <tr key={p.id} className="border-b border-border/20 hover:bg-background/40">
                                        <td className="p-3">{p.id}</td>
                                        <td className="p-3">{p.title}</td>
                                        <td className="p-3">{p.slug}</td>
                                        <td className="p-3">{p.featured ? 'yes' : 'no'}</td>
                                        <td className="p-3 text-right">
                                            <Link href={route('admin.projects.edit', p.id)} className="mr-3 text-purple-400 underline">
                                                edit
                                            </Link>
                                            <Link
                                                as="button"
                                                method="delete"
                                                href={route('admin.projects.destroy', p.id)}
                                                className="text-red-400 underline"
                                            >
                                                delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </main>
        </AppLayout>
    );
}
