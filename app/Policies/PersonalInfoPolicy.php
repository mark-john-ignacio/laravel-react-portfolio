<?php

namespace App\Policies;

use App\Models\User;
use App\Models\PersonalInfo;

class PersonalInfoPolicy
{
    public function viewAny(User $user): bool { return $user->is_admin ?? true; }
    public function view(User $user, PersonalInfo $personalInfo): bool { return $user->is_admin ?? true; }
    public function update(User $user, PersonalInfo $personalInfo): bool { return $user->is_admin ?? true; }
}
