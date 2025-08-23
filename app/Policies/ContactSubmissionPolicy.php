<?php

namespace App\Policies;

use App\Models\User;
use App\Models\ContactSubmission;

class ContactSubmissionPolicy
{
    public function viewAny(User $user): bool { return $user->is_admin ?? true; }
    public function view(User $user, ContactSubmission $model): bool { return $user->is_admin ?? true; }
    public function update(User $user, ContactSubmission $model): bool { return $user->is_admin ?? true; }
    public function delete(User $user, ContactSubmission $model): bool { return $user->is_admin ?? true; }
    public function export(User $user): bool { return $user->is_admin ?? true; }
}
