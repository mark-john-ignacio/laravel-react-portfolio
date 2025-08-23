<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactFormRequest;
use App\Mail\ContactMessage;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\RedirectResponse;

class ContactController extends Controller
{
    public function send(ContactFormRequest $request): RedirectResponse
    {
        $data = $request->validated();

        Mail::to(config('mail.from.address'))
            ->send(new ContactMessage($data['name'], $data['email'], $data['message']));

        return back()->with('success', 'Thanks for reaching out! Your message has been sent.');
    }
}
