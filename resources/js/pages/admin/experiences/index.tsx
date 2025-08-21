import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

interface Experience {
    id: number;
    company: string;
    role: string;
    is_current: boolean;
    order: number;
}

export default function AdminExperiencesIndex({ experiences }: { experiences: { data: Experience[] } }) {
    return (
        <AppLayout>
            <Head title="admin/experiences" />
            <main className="p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-green-400">$ admin experiences</h1>
                    <Link href={route('admin.experiences.create')} className="text-cyan-400 underline">
                        + new
                    </Link>
                </div>
                <Card className="border-green-500/30 bg-card/60">
                    <CardContent className="overflow-x-auto p-0">
                        <table className="min-w-full text-sm">
                            <thead className="bg-background/80">
                                <tr className="border-b border-border/40">
                                    <th className="p-3 text-left">id</th>
                                    <th className="p-3 text-left">company</th>
                                    <th className="p-3 text-left">role</th>
                                    <th className="p-3 text-left">current</th>
                                    <th className="p-3 text-right">actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {experiences.data.map((e) => (
                                    <tr key={e.id} className="border-b border-border/20 hover:bg-background/40">
                                        <td className="p-3">{e.id}</td>
                                        <td className="p-3">{e.company}</td>
                                        <td className="p-3">{e.role}</td>
                                        <td className="p-3">{e.is_current ? 'yes' : 'no'}</td>
                                        <td className="p-3 text-right">
                                            <Link href={route('admin.experiences.edit', e.id)} className="mr-3 text-purple-400 underline">
                                                edit
                                            </Link>
                                            <Link
                                                as="button"
                                                method="delete"
                                                href={route('admin.experiences.destroy', e.id)}
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
