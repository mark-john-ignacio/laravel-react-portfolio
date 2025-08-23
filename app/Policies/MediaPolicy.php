<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Http\UploadedFile;

class MediaPolicy
{
    public function viewAny(User $user): bool { return $user->is_admin ?? true; }
    public function upload(User $user, UploadedFile $file): bool { return $user->is_admin ?? true; }
    public function delete(User $user): bool { return $user->is_admin ?? true; }
    public function optimize(User $user): bool { return $user->is_admin ?? true; }
}
