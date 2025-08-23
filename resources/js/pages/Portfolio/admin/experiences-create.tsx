import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FormEvent, useState } from 'react';

type ExperienceForm = {
    company: string;
    role: string;
    location: string;
    start_date: string;
    end_date: string;
    is_current: boolean;
    description: string;
    achievements: string[];
    skills: string[];
    order_column: number;
};

export default function ExperiencesCreate() {
    const { data, setData, post, processing, errors } = useForm<ExperienceForm>({
        company: '',
        role: '',
        location: '',
        start_date: '',
        end_date: '',
        is_current: false,
        description: '',
        achievements: [] as string[],
        skills: [] as string[],
        order_column: 0
    });

    const [achievementInput, setAchievementInput] = useState('');
    const [skillInput, setSkillInput] = useState('');

    function submit(e: FormEvent) {
        e.preventDefault();
        post('/admin/portfolio/experiences');
    }

    function addAchievement() {
        if (!achievementInput.trim()) return;
        setData('achievements', [...data.achievements, achievementInput.trim()]);
        setAchievementInput('');
    }
    function addSkill() {
        if (!skillInput.trim()) return;
        setData('skills', [...data.skills, skillInput.trim()]);
        setSkillInput('');
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Experiences', href: '/admin/portfolio/experiences' }, { title: 'Create', href: '/admin/portfolio/experiences/create' }]}>            
            <Head title="Create Experience" />
            <form onSubmit={submit} className="p-4 space-y-6 max-w-3xl">
                <div className="flex justify-between items-center gap-4">
                    <h1 className="text-xl font-semibold tracking-tight">New Experience</h1>
                    <Button asChild size="sm" variant="outline"><Link href="/admin/portfolio/experiences">Back</Link></Button>
                </div>
                <Card className="p-6 space-y-8">
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="company">Company</Label>
                            <Input id="company" value={data.company} onChange={e => setData('company', e.target.value)} />
                            {errors.company && <p className="text-xs text-destructive">{errors.company}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Input id="role" value={data.role} onChange={e => setData('role', e.target.value)} />
                            {errors.role && <p className="text-xs text-destructive">{errors.role}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" value={data.location} onChange={e => setData('location', e.target.value)} />
                            {errors.location && <p className="text-xs text-destructive">{errors.location}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="start_date">Start Date</Label>
                            <Input id="start_date" type="date" value={data.start_date} onChange={e => setData('start_date', e.target.value)} />
                            {errors.start_date && <p className="text-xs text-destructive">{errors.start_date}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="end_date">End Date</Label>
                            <Input id="end_date" type="date" value={data.end_date || ''} disabled={data.is_current} onChange={e => setData('end_date', e.target.value)} />
                            {errors.end_date && <p className="text-xs text-destructive">{errors.end_date}</p>}
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                            <Switch id="is_current" checked={data.is_current} onCheckedChange={(v: boolean) => setData('is_current', !!v)} />
                            <Label htmlFor="is_current" className="text-sm font-normal">Current Role</Label>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description (Markdown)</Label>
                        <Textarea id="description" className="min-h-[140px]" value={data.description} onChange={e => setData('description', e.target.value)} />
                        {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
                    </div>
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between gap-4">
                                <Label>Achievements</Label>
                                <div className="flex gap-2">
                                    <Input placeholder="Add achievement" value={achievementInput} onChange={e => setAchievementInput(e.target.value)} className="h-8" />
                                    <Button type="button" size="sm" variant="secondary" onClick={addAchievement} disabled={!achievementInput.trim()}>Add</Button>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {data.achievements.map((a, i) => (
                                    <Badge key={i} variant="secondary" className="flex items-center gap-1">
                                        <span className="max-w-[150px] truncate" title={a}>{a}</span>
                                        <button type="button" onClick={() => setData('achievements', data.achievements.filter((_, idx) => idx !== i))} className="text-[10px] leading-none">×</button>
                                    </Badge>
                                ))}
                            </div>
                            {errors.achievements && <p className="text-xs text-destructive">{errors.achievements}</p>}
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between gap-4">
                                <Label>Skills</Label>
                                <div className="flex gap-2">
                                    <Input placeholder="Add skill" value={skillInput} onChange={e => setSkillInput(e.target.value)} className="h-8" />
                                    <Button type="button" size="sm" variant="secondary" onClick={addSkill} disabled={!skillInput.trim()}>Add</Button>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((a, i) => (
                                    <Badge key={i} variant="outline" className="flex items-center gap-1">
                                        <span className="max-w-[150px] truncate" title={a}>{a}</span>
                                        <button type="button" onClick={() => setData('skills', data.skills.filter((_, idx) => idx !== i))} className="text-[10px] leading-none">×</button>
                                    </Badge>
                                ))}
                            </div>
                            {errors.skills && <p className="text-xs text-destructive">{errors.skills}</p>}
                        </div>
                    </div>
                </Card>
                <div className="flex gap-3">
                    <Button type="submit" disabled={processing}>Create</Button>
                </div>
            </form>
        </AppLayout>
    );
}
