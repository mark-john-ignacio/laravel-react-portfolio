<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMessage extends Mailable
{
    use Queueable, SerializesModels;

    public string $name;
    public string $email;
    public string $messageBody;

    public function __construct(string $name, string $email, string $messageBody)
    {
        $this->name = $name;
        $this->email = $email;
        $this->messageBody = $messageBody;
    }

    public function build(): self
    {
        return $this->subject('New portfolio contact message')
            ->replyTo($this->email, $this->name)
            ->view('emails.contact-message');
    }
}
