<?php

namespace Database\Seeders;

use App\Models\SocialLink;
use Illuminate\Database\Seeder;

class SocialLinksSeeder extends Seeder
{
    public function run(): void
    {
        SocialLink::truncate();
        $links = [
            ['platform' => 'GitHub', 'display_name' => 'github.com/mark-john-ignacio', 'icon' => 'github', 'url' => 'https://github.com/mark-john-ignacio', 'sort_order' => 1],
            ['platform' => 'LinkedIn', 'display_name' => 'linkedin.com/in/markjohnignacio', 'icon' => 'linkedin', 'url' => 'https://www.linkedin.com/in/mark-john-ignacio/', 'sort_order' => 2],
        ];
        foreach ($links as $link) {
            SocialLink::create($link + ['is_active' => true]);
        }
    }
}
