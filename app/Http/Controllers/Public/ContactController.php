<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Mail\ContactMessageMailable;
use App\Models\ContactMessage;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('contact');
    }

    public function send(ContactRequest $request)
    {
        $data = $request->validated();
        $message = ContactMessage::create($data);

        $to = config('mail.to.address') ?? env('MAIL_TO_ADDRESS') ?? config('mail.from.address');
        if ($to) {
            Mail::to($to)->send(new ContactMessageMailable($message));
        }

        return back()->with('success', 'Message sent successfully!');
    }
}
