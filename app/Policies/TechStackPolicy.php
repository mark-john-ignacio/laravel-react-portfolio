<?php

namespace App\Policies;

use App\Models\User;
use App\Models\TechStack;

class TechStackPolicy
{
    public function viewAny(User $user): bool { return $user->is_admin ?? true; }
    public function view(User $user, TechStack $model): bool { return $user->is_admin ?? true; }
    public function create(User $user): bool { return $user->is_admin ?? true; }
    public function update(User $user, TechStack $model): bool { return $user->is_admin ?? true; }
    public function delete(User $user, TechStack $model): bool { return $user->is_admin ?? true; }
}
