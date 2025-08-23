import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function PersonalInfoShow({ personalInfo }: { personalInfo: any }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Personal Info', href: '/admin/portfolio/personal-info' }]}>            
            <Head title="Personal Info" />
            <div className="p-4 space-y-2 max-w-3xl">
                <h1 className="text-2xl font-semibold">{personalInfo.name}</h1>
                <p className="text-muted-foreground">{personalInfo.title}</p>
                <p>{personalInfo.tagline}</p>
                <div className="prose dark:prose-invert">
                    <p>{personalInfo.bio_long}</p>
                </div>
            </div>
        </AppLayout>
    );
}
