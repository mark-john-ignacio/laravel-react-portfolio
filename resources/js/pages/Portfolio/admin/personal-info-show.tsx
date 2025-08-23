import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function PersonalInfoShow({ personalInfo }: { personalInfo: any }) {
    const availabilityMap: Record<string, { label: string; variant: 'outline' | 'secondary' | 'default' }> = {
        available: { label: 'Available', variant: 'secondary' },
        open_for_opportunities: { label: 'Open for Opportunities', variant: 'outline' },
        unavailable: { label: 'Unavailable', variant: 'outline' },
    };
    const availability = availabilityMap[personalInfo.availability_status] || availabilityMap['available'];
    return (
        <AppLayout breadcrumbs={[{ title: 'Personal Info', href: '/admin/portfolio/personal-info' }]}>            
            <Head title="Personal Info" />
            <div className="p-4 space-y-6 max-w-5xl">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-semibold tracking-tight">{personalInfo.name}</h1>
                        <p className="text-sm text-muted-foreground">{personalInfo.title}</p>
                        {personalInfo.tagline && <p className="text-sm">{personalInfo.tagline}</p>}
                        <Badge variant={availability.variant} className="text-[10px]">{availability.label}</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button asChild size="sm" variant="secondary"><Link href="/admin/portfolio/personal-info/edit">Edit</Link></Button>
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-3 items-start">
                    <Card className="md:col-span-2">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm">Biography</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm leading-relaxed">
                            {personalInfo.bio_short && <p className="text-muted-foreground">{personalInfo.bio_short}</p>}
                            <Separator />
                            <div className="prose dark:prose-invert max-w-none">
                                {personalInfo.bio_long?.split(/\n\n+/).map((para: string, i: number) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Contact</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-xs">
                                <div>
                                    <p className="font-medium uppercase tracking-wide text-[11px] mb-0.5">Email</p>
                                    <p className="break-all text-muted-foreground">{personalInfo.email}</p>
                                </div>
                                {personalInfo.phone && <div>
                                    <p className="font-medium uppercase tracking-wide text-[11px] mb-0.5">Phone</p>
                                    <p className="text-muted-foreground">{personalInfo.phone}</p>
                                </div>}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Hero Section</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-xs">
                                {personalInfo.hero_greeting && <div>
                                    <p className="font-medium uppercase tracking-wide text-[11px] mb-0.5">Greeting</p>
                                    <p className="text-muted-foreground">{personalInfo.hero_greeting}</p>
                                </div>}
                                {personalInfo.hero_tagline && <div>
                                    <p className="font-medium uppercase tracking-wide text-[11px] mb-0.5">Hero Tagline</p>
                                    <p className="text-muted-foreground">{personalInfo.hero_tagline}</p>
                                </div>}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
