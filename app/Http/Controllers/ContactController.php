<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactFormRequest;
use App\Mail\ContactSubmitted;
use App\Models\ContactMessage;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function submit(ContactFormRequest $request)
    {
        $data = $request->validated();

        ContactMessage::create($data);

        if (config('mail.mailers.smtp.host')) {
            Mail::to(config('mail.from.address'))
                ->send(new ContactSubmitted($data['name'], $data['email'], $data['message']));
        }

        return redirect()->route('contact')->with('success', 'Message sent. Thank you!');
    }
}
