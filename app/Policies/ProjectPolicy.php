<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Project;

class ProjectPolicy
{
    public function viewAny(User $user): bool { return $user->is_admin ?? true; }
    public function view(User $user, Project $model): bool { return $user->is_admin ?? true; }
    public function create(User $user): bool { return $user->is_admin ?? true; }
    public function update(User $user, Project $model): bool { return $user->is_admin ?? true; }
    public function delete(User $user, Project $model): bool { return $user->is_admin ?? true; }
}
