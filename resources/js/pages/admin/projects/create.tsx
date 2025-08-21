import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

export default function CreateProject() {
  const { data, setData, post, processing, errors } = useForm({
    title: '', slug: '', description: '', technologies: [] as string[], featured: false, image_url: '', github_url: '', live_url: '', order: 0,
  });

  function submit(e: React.FormEvent) { e.preventDefault(); post(route('admin.projects.store')); }

  return (
    <AppLayout>
      <Head title="admin/projects/create" />
      <main className="p-4">
        <h1 className="text-2xl font-bold text-green-400 mb-4">$ projects create</h1>
        <Card className="bg-card/60 border-cyan-500/30 max-w-3xl">
          <CardContent className="p-6">
            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label htmlFor="title">title</Label>
                <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                {errors.title && <p className="text-red-400 text-sm">{errors.title}</p>}
              </div>
              <div>
                <Label htmlFor="slug">slug</Label>
                <Input id="slug" value={data.slug} onChange={(e) => setData('slug', e.target.value)} />
                {errors.slug && <p className="text-red-400 text-sm">{errors.slug}</p>}
              </div>
              <div>
                <Label htmlFor="description">description</Label>
                <textarea id="description" className="w-full rounded border bg-background p-2 font-mono" rows={6} value={data.description} onChange={(e) => setData('description', e.target.value)} />
                {errors.description && <p className="text-red-400 text-sm">{errors.description}</p>}
              </div>
              <div>
                <Label htmlFor="technologies">technologies (comma-separated)</Label>
                <Input id="technologies" value={data.technologies.join(', ')} onChange={(e) => setData('technologies', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="image_url">image_url</Label>
                  <Input id="image_url" value={data.image_url} onChange={(e) => setData('image_url', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="github_url">github_url</Label>
                  <Input id="github_url" value={data.github_url} onChange={(e) => setData('github_url', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="live_url">live_url</Label>
                  <Input id="live_url" value={data.live_url} onChange={(e) => setData('live_url', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="order">order</Label>
                  <Input id="order" type="number" value={data.order} onChange={(e) => setData('order', Number(e.target.value))} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input id="featured" type="checkbox" checked={data.featured} onChange={(e) => setData('featured', e.target.checked)} />
                <Label htmlFor="featured">featured</Label>
              </div>
              <div className="flex gap-3">
                <Button type="submit" disabled={processing} className="bg-green-600 hover:bg-green-700">save</Button>
                <Link href={route('admin.projects.index')} className="text-cyan-400 underline self-center">cancel</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </AppLayout>
  );
}
