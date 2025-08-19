import { PublicNav } from '@/components/public-nav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Head, useForm } from '@inertiajs/react';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactPage() {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('contact.send'));
    }
    return (
        <>
            <Head title="Contact" />
            <PublicNav />
            <main className="mx-auto max-w-3xl px-4 py-10">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold">Contact</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Input placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                            </div>
                            <div>
                                <Input type="email" placeholder="Email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                            </div>
                            <div>
                                <Input placeholder="Subject" value={data.subject} onChange={(e) => setData('subject', e.target.value)} />
                                {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                            </div>
                            <div>
                                <Textarea placeholder="Message" value={data.message} onChange={(e) => setData('message', e.target.value)} rows={6} />
                                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                            </div>
                            <Button type="submit" disabled={processing}>
                                Send
                            </Button>
                            {recentlySuccessful && <p className="text-xs text-green-600">Sent!</p>}
                        </form>
                    </CardContent>
                </Card>
            </main>
        </>
    );
}
