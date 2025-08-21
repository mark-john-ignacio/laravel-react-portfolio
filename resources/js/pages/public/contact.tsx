import { Head, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TerminalNavbar } from '@/components/custom/terminal-navbar';

export default function Contact() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    message: '',
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post(route('contact.submit'));
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <Head title="~/contact" />
      <TerminalNavbar />
      <main className="container mx-auto px-4 py-10">
  <h1 className="text-3xl font-bold text-purple-400 mb-6">$ echo \"hello\" {'>'} contact.form</h1>
        <Card className="bg-card/60 border-purple-500/30 max-w-2xl">
          <CardContent className="p-6">
            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label htmlFor="name">name</Label>
                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="font-mono" />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="email">email</Label>
                <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="font-mono" />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="message">message</Label>
                <textarea id="message" className="w-full rounded border bg-background p-2 font-mono" rows={6} value={data.message} onChange={(e) => setData('message', e.target.value)} />
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
              </div>
              <Button type="submit" disabled={processing} className="bg-purple-600 hover:bg-purple-700">send</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
