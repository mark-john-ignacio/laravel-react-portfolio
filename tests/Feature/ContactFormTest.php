<?php

use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMessage;

it('sends a contact message with valid data', function () {
    Mail::fake();

    $response = $this->post('/contact', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'message' => 'This is a valid message body with more than ten chars.',
    ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    Mail::assertSent(ContactMessage::class, function ($mail) {
        return $mail->name === 'Test User' && $mail->email === 'test@example.com';
    });
});

it('validates contact message input', function () {
    $response = $this->post('/contact', [
        'name' => '', // missing name
        'email' => 'not-an-email',
        'message' => 'short',
    ]);

    $response->assertSessionHasErrors(['name', 'email', 'message']);
});
