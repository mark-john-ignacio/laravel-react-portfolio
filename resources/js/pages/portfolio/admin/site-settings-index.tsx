import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface SettingRecord { key: string; value: any; type: string; group: string; description?: string }

export default function SiteSettingsIndex({ settings }: { settings: SettingRecord[] }) {
    const grouped = useMemo(() => {
        return settings.reduce((acc: Record<string, SettingRecord[]>, s) => {
            acc[s.group || 'general'] = acc[s.group || 'general'] || [];
            acc[s.group || 'general'].push(s);
            return acc;
        }, {});
    }, [settings]);

    type SettingsForm = Record<string, string | number | boolean | null>;
    const initial: SettingsForm = {};
    settings.forEach(s => { initial[s.key] = s.value; });
    const { data, setData, put, processing, errors } = useForm<SettingsForm>(initial);

    function submit(e: FormEvent) {
        e.preventDefault();
        put('/admin/portfolio/settings');
    }

    function renderField(s: SettingRecord) {
        const val = data[s.key];
        const set = (v: any) => setData(s.key, v);
        switch (s.type) {
            case 'boolean':
                return (
                    <div className="flex items-center gap-3">
                        <Switch id={s.key} checked={!!val} onCheckedChange={(v:boolean)=>set(v)} />
                        <Label htmlFor={s.key} className="text-xs text-muted-foreground">{s.description || 'Toggle'}</Label>
                    </div>
                );
            case 'text':
                return <Textarea value={val as any || ''} onChange={e=>set(e.target.value)} className="min-h-[120px]" />;
            case 'integer':
            case 'number':
                return <Input type="number" value={val as any || ''} onChange={e=>set(e.target.value)} />;
            case 'json':
                return <Textarea value={typeof val === 'string' ? val : JSON.stringify(val, null, 2)} onChange={e=>set(e.target.value)} className="font-mono min-h-[160px]" />;
            default:
                return <Input value={val as any || ''} onChange={e=>set(e.target.value)} />;
        }
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Settings', href: '/admin/portfolio/settings' }]}>            
            <Head title="Settings" />
            <form onSubmit={submit} className="p-4 space-y-8 max-w-6xl">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Site Settings</h1>
                    <Button type="submit" size="sm" disabled={processing}>Save All</Button>
                </div>
                <div className="grid gap-6">
                    {Object.entries(grouped).map(([group, items]) => (
                        <Card key={group}>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-semibold tracking-wide capitalize">{group.replace('-', ' ')}</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-6 md:grid-cols-2">
                                {items.map(s => (
                                    <div key={s.key} className="space-y-2">
                                        <div className="flex justify-between items-start gap-4">
                                            <Label htmlFor={s.key} className="text-[11px] font-medium tracking-wide uppercase">{s.key}</Label>
                                            {s.description && s.type !== 'boolean' && <span className="text-[10px] text-muted-foreground max-w-[180px] line-clamp-3">{s.description}</span>}
                                        </div>
                                        {renderField(s)}
                                        {errors[s.key] && <p className="text-[10px] text-destructive">{errors[s.key] as any}</p>}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-end">
                    <Button type="submit" disabled={processing}>Save Changes</Button>
                </div>
            </form>
        </AppLayout>
    );
}
