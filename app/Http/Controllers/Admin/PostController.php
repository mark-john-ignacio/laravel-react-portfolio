<?php

namespace App\Http\Controllers\Admin;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends BaseAdminController
{
    public function index(): Response
    {
        return Inertia::render('admin/posts/index', [
            'posts' => Post::orderByDesc('created_at')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/posts/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required','string','max:190'],
            'slug' => ['nullable','string','max:190','unique:posts,slug'],
            'excerpt' => ['nullable','string','max:500'],
            'body' => ['required','string'],
            'published_at' => ['nullable','date'],
        ]);
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
        }
        Post::create($data);
        return redirect()->route('admin.posts.index')->with('success','Post created');
    }

    public function edit(Post $post): Response
    {
        return Inertia::render('admin/posts/edit', [ 'post' => $post ]);
    }

    public function update(Request $request, Post $post)
    {
        $data = $request->validate([
            'title' => ['required','string','max:190'],
            'slug' => ['required','string','max:190','unique:posts,slug,' . $post->id],
            'excerpt' => ['nullable','string','max:500'],
            'body' => ['required','string'],
            'published_at' => ['nullable','date'],
        ]);
        $post->update($data);
        return redirect()->route('admin.posts.index')->with('success','Post updated');
    }

    public function show(Post $post): Response
    {
        return Inertia::render('admin/posts/show', [ 'post' => $post ]);
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return back()->with('success','Post deleted');
    }
}
