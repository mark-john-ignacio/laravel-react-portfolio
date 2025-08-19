<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;
use League\CommonMark\Environment\Environment;
use League\CommonMark\MarkdownConverter;

class BlogController extends Controller
{
    public function index(): Response
    {
        $posts = Post::query()->whereNotNull('published_at')
            ->orderByDesc('published_at')
            ->paginate(10)
            ->through(fn ($p) => [
                'id' => $p->id,
                'title' => $p->title,
                'slug' => $p->slug,
                'excerpt' => $p->excerpt,
                'published_at' => $p->published_at?->toIso8601String(),
            ]);
        return Inertia::render('blog/index', [
            'posts' => $posts,
        ]);
    }

    public function show(Post $post): Response
    {
        $converter = app(MarkdownConverter::class);
        $html = $converter->convert($post->body ?? '');
        $post->rendered_body = (string) $html;
        return Inertia::render('blog/show', [
            'post' => $post,
        ]);
    }
}
