<?php

namespace App\Mail;

use App\Models\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMessageMailable extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public ContactMessage $contactMessage) {}

    public function build(): self
    {
        return $this->subject('New Contact Message: '.($this->contactMessage->subject ?? 'No subject'))
            ->view('emails.contact-message');
    }
}
