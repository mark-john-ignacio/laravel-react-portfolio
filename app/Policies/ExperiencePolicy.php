<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Experience;

class ExperiencePolicy
{
    public function viewAny(User $user): bool { return $user->is_admin ?? true; }
    public function view(User $user, Experience $model): bool { return $user->is_admin ?? true; }
    public function create(User $user): bool { return $user->is_admin ?? true; }
    public function update(User $user, Experience $model): bool { return $user->is_admin ?? true; }
    public function delete(User $user, Experience $model): bool { return $user->is_admin ?? true; }
}
