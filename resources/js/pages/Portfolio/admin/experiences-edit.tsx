import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

type ExperienceForm = {
    _method: 'PUT';
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

export default function ExperiencesEdit({ experience }: { experience: any }) {
    const { data, setData, post, processing, errors } = useForm<ExperienceForm>({
        _method: 'PUT',
        company: experience.company || '',
        role: experience.role || '',
        location: experience.location || '',
        start_date: experience.start_date || '',
        end_date: experience.end_date || '',
        is_current: experience.is_current || false,
        description: experience.description || '',
        achievements: experience.achievements || [],
        skills: experience.skills || [],
        order_column: experience.order_column || 0
    });

    const [achievementInput, setAchievementInput] = useState('');
    const [skillInput, setSkillInput] = useState('');

    function submit(e: FormEvent) {
        e.preventDefault();
        post(`/admin/portfolio/experiences/${experience.id}`);
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
        <AppLayout breadcrumbs={[{ title: 'Experiences', href: '/admin/portfolio/experiences' }, { title: experience.company, href: `/admin/portfolio/experiences/${experience.id}/edit` }]}>            
            <Head title={`Edit ${experience.company}`} />
            <form onSubmit={submit} className="p-4 space-y-6 max-w-3xl">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Edit Experience</h1>
                    <Link href="/admin/portfolio/experiences" className="text-sm underline">Back</Link>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Company</label>
                        <input className="input" value={data.company} onChange={e => setData('company', e.target.value)} />
                        {errors.company && <p className="text-xs text-red-500">{errors.company}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Role</label>
                        <input className="input" value={data.role} onChange={e => setData('role', e.target.value)} />
                        {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Location</label>
                        <input className="input" value={data.location} onChange={e => setData('location', e.target.value)} />
                        {errors.location && <p className="text-xs text-red-500">{errors.location}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Start Date</label>
                        <input type="date" className="input" value={data.start_date} onChange={e => setData('start_date', e.target.value)} />
                        {errors.start_date && <p className="text-xs text-red-500">{errors.start_date}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">End Date</label>
                        <input type="date" className="input" value={data.end_date || ''} onChange={e => setData('end_date', e.target.value)} disabled={data.is_current} />
                        {errors.end_date && <p className="text-xs text-red-500">{errors.end_date}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked={data.is_current} onChange={e => setData('is_current', e.target.checked)} /> <span className="text-sm">Current Role</span>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="block text-sm font-medium">Description (Markdown)</label>
                        <textarea className="input min-h-[120px]" value={data.description} onChange={e => setData('description', e.target.value)} />
                        {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-medium">Achievements</label>
                        <div className="flex gap-2">
                            <input className="input flex-1" value={achievementInput} onChange={e => setAchievementInput(e.target.value)} />
                            <button type="button" onClick={addAchievement} className="rounded bg-muted px-3">Add</button>
                        </div>
                        <ul className="text-xs flex flex-wrap gap-2 pt-2">
                            {data.achievements.map((a: string, i: number) => (
                                <li key={i} className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
                                    {a}
                                    <button type="button" onClick={() => setData('achievements', data.achievements.filter((_, idx) => idx !== i))} className="text-red-500">×</button>
                                </li>
                            ))}
                        </ul>
                        {errors.achievements && <p className="text-xs text-red-500">{errors.achievements}</p>}
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-medium">Skills</label>
                        <div className="flex gap-2">
                            <input className="input flex-1" value={skillInput} onChange={e => setSkillInput(e.target.value)} />
                            <button type="button" onClick={addSkill} className="rounded bg-muted px-3">Add</button>
                        </div>
                        <ul className="text-xs flex flex-wrap gap-2 pt-2">
                            {data.skills.map((a: string, i: number) => (
                                <li key={i} className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
                                    {a}
                                    <button type="button" onClick={() => setData('skills', data.skills.filter((_, idx) => idx !== i))} className="text-red-500">×</button>
                                </li>
                            ))}
                        </ul>
                        {errors.skills && <p className="text-xs text-red-500">{errors.skills}</p>}
                    </div>
                </div>
                <div className="pt-4 flex gap-3">
                    <button disabled={processing} className="rounded bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50">Save</button>
                </div>
            </form>
        </AppLayout>
    );
}
