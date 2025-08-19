<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function show()
    {
        return Inertia::render('contact');
    }

    public function send(ContactRequest $request): RedirectResponse
    {
        $data = $request->validated();

        Mail::raw($data['message'], function ($message) use ($data) {
            $message->to(config('mail.from.address'))
                ->subject('Portfolio contact: ' . $data['name'])
                ->replyTo($data['email']);
        });

        return redirect()->route('contact')->with('status', 'Message sent');
    }
}
