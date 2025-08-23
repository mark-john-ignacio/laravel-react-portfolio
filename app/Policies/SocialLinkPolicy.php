<?php

namespace App\Policies;

use App\Models\User;
use App\Models\SocialLink;

class SocialLinkPolicy
{
    public function viewAny(User $user): bool { return $user->is_admin ?? true; }
    public function view(User $user, SocialLink $model): bool { return $user->is_admin ?? true; }
    public function create(User $user): bool { return $user->is_admin ?? true; }
    public function update(User $user, SocialLink $model): bool { return $user->is_admin ?? true; }
    public function delete(User $user, SocialLink $model): bool { return $user->is_admin ?? true; }
}
