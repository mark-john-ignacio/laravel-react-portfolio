import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent, useMemo } from 'react';

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

    function renderInput(s: SettingRecord) {
        const common = {
            className: 'input',
            value: data[s.key] ?? '',
            onChange: (e: any) => setData(s.key, e.target.value)
        };
        switch (s.type) {
            case 'boolean':
                return <input type="checkbox" checked={!!data[s.key]} onChange={e => setData(s.key, e.target.checked)} />;
            case 'text':
                return <textarea {...common as any} className="input min-h-[100px]" />;
            case 'integer':
            case 'number':
                return <input type="number" {...common as any} />;
            case 'json':
                return <textarea {...common as any} className="input font-mono min-h-[120px]" />;
            default:
                return <input {...common as any} />;
        }
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Settings', href: '/admin/portfolio/settings' }]}>            
            <Head title="Settings" />
            <form onSubmit={submit} className="p-4 space-y-8 max-w-5xl">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Site Settings</h1>
                    <button disabled={processing} className="rounded bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50">Save All</button>
                </div>
                {Object.entries(grouped).map(([group, items]) => (
                    <div key={group} className="space-y-4 border rounded p-4">
                        <h2 className="font-medium capitalize text-sm tracking-wide">{group.replace('-', ' ')}</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {items.map(s => (
                                <div key={s.key} className="space-y-2">
                                    <div className="flex justify-between items-center gap-4">
                                        <label className="block text-xs font-semibold uppercase tracking-wide">{s.key}</label>
                                        {s.description && <span className="text-[10px] text-muted-foreground">{s.description}</span>}
                                    </div>
                                    {renderInput(s)}
                                    {errors[s.key] && <p className="text-xs text-red-500">{errors[s.key]}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </form>
        </AppLayout>
    );
}
