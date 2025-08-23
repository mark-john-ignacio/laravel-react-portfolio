<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UploadMediaRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    protected string $disk = 'public';
    protected string $basePath = 'portfolio/media';

    public function index(): Response
    {
        $files = collect(Storage::disk($this->disk)->allFiles($this->basePath))
            ->map(fn($f) => [
                'path' => $f,
                'url' => Storage::disk($this->disk)->url($f),
                'size' => Storage::disk($this->disk)->size($f),
                'last_modified' => Storage::disk($this->disk)->lastModified($f),
            ]);
        return Inertia::render('portfolio/admin/media-index', [
            'files' => $files,
        ]);
    }

    public function upload(UploadMediaRequest $request): RedirectResponse
    {
        $file = $request->file('file');
        $path = $file->store($this->basePath, $this->disk);
        // Placeholder for optimization pipeline
        return back()->with('success','File uploaded')->with('uploaded', [
            'path' => $path,
            'url' => Storage::disk($this->disk)->url($path)
        ]);
    }

    public function destroy(string $file): RedirectResponse
    {
        if (Storage::disk($this->disk)->exists($file)) {
            Storage::disk($this->disk)->delete($file);
        }
        return back()->with('success','Deleted file');
    }

    public function optimize(string $file): RedirectResponse
    {
        // Stub - real optimization would process image variants
        return back()->with('success','Optimization queued');
    }
}
