<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::orderByDesc('published_at')->get();

        return Inertia::render('blog/index', compact('posts'));
    }

    public function show(Post $post)
    {
        return Inertia::render('blog/show', compact('post'));
    }

    public function store(PostRequest $request): RedirectResponse
    {
        Post::create($request->validated());

        return redirect()->route('admin.posts.index');
    }

    public function update(PostRequest $request, Post $post): RedirectResponse
    {
        $post->update($request->validated());

        return redirect()->route('admin.posts.index');
    }

    public function destroy(Post $post): RedirectResponse
    {
        $post->delete();

        return redirect()->route('admin.posts.index');
    }
}
