<?php

it('returns 404 for register route (disabled)', function () {
    $this->get('/register')->assertStatus(404);
    $this->post('/register', [
        'name' => 'Test',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ])->assertStatus(404);
});
