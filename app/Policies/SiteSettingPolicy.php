<?php

namespace App\Policies;

use App\Models\User;
use App\Models\SiteSetting;

class SiteSettingPolicy
{
    public function viewAny(User $user): bool { return $user->is_admin ?? true; }
    public function update(User $user, SiteSetting $model): bool { return $user->is_admin ?? true; }
}
