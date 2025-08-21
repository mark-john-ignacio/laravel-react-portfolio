<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactSubmitted extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public string $email,
        public string $messageText,
    ) {}

    public function build()
    {
        return $this
            ->subject('New Contact Message')
            ->view('emails.contact-submitted')
            ->with([
                'name' => $this->name,
                'email' => $this->email,
                'messageText' => $this->messageText,
            ]);
    }
}
