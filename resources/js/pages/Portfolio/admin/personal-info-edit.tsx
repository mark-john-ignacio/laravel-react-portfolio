import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

type PersonalInfoForm = {
    name: string; title: string; tagline: string; hero_greeting: string; hero_tagline: string;
    email: string; phone: string; bio_short: string; bio_long: string; availability_status: string;
};
export default function PersonalInfoEdit({ personalInfo }: { personalInfo: any }) {
    const initial: PersonalInfoForm = {
        name: personalInfo.name || '',
        title: personalInfo.title || '',
        tagline: personalInfo.tagline || '',
        hero_greeting: personalInfo.hero_greeting || '',
        hero_tagline: personalInfo.hero_tagline || '',
        email: personalInfo.email || '',
        phone: personalInfo.phone || '',
        bio_short: personalInfo.bio_short || '',
        bio_long: personalInfo.bio_long || '',
        availability_status: personalInfo.availability_status || 'available'
    };
    const { data, setData, put, processing, errors } = useForm<PersonalInfoForm>(initial);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/admin/portfolio/personal-info');
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Personal Info', href: '/admin/portfolio/personal-info' }, { title: 'Edit', href: '#' }]}>            
            <Head title="Edit Personal Info" />
            <form onSubmit={submit} className="space-y-6 p-4 max-w-4xl">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle>Profile Basics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={data.name} onChange={e=>setData('name', e.target.value)} />
                                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" value={data.title} onChange={e=>setData('title', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="tagline">Tagline</Label>
                                <Input id="tagline" value={data.tagline} onChange={e=>setData('tagline', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="availability_status">Availability</Label>
                                <select id="availability_status" className="w-full rounded border bg-background h-9 text-sm" value={data.availability_status} onChange={e=>setData('availability_status', e.target.value)}>
                                    <option value="available">Available</option>
                                    <option value="open_for_opportunities">Open for opportunities</option>
                                    <option value="unavailable">Unavailable</option>
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle>Hero Section</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="hero_greeting">Hero Greeting</Label>
                            <Input id="hero_greeting" value={data.hero_greeting} onChange={e=>setData('hero_greeting', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hero_tagline">Hero Tagline</Label>
                            <Input id="hero_tagline" value={data.hero_tagline} onChange={e=>setData('hero_tagline', e.target.value)} />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle>Contact</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={data.email} onChange={e=>setData('email', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" value={data.phone} onChange={e=>setData('phone', e.target.value)} />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle>Biography</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="bio_short">Bio Short</Label>
                            <Textarea id="bio_short" value={data.bio_short} onChange={e=>setData('bio_short', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bio_long">Bio Long</Label>
                            <Textarea id="bio_long" className="min-h-[180px]" value={data.bio_long} onChange={e=>setData('bio_long', e.target.value)} />
                        </div>
                    </CardContent>
                </Card>
                <div className="flex justify-end">
                    <Button type="submit" disabled={processing}>Save Changes</Button>
                </div>
            </form>
        </AppLayout>
    );
}
