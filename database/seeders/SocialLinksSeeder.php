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
            ['platform' => 'LinkedIn', 'display_name' => 'linkedin.com/in/markjohnignacio', 'icon' => 'linkedin', 'url' => 'https://www.linkedin.com/in/markjohnignacio', 'sort_order' => 2],
            ['platform' => 'Twitter', 'display_name' => '@markjohncodes', 'icon' => 'twitter', 'url' => 'https://twitter.com/markjohncodes', 'sort_order' => 3],
            ['platform' => 'Email', 'display_name' => 'Email Me', 'icon' => 'mail', 'url' => 'mailto:Markme44.mm@gmail.com', 'sort_order' => 4],
            ['platform' => 'Dev.to', 'display_name' => 'dev.to profile', 'icon' => 'devto', 'url' => 'https://dev.to/markjohn', 'sort_order' => 5],
            ['platform' => 'Stack Overflow', 'display_name' => 'stackoverflow user', 'icon' => 'stackoverflow', 'url' => 'https://stackoverflow.com/users/0000000/mark-john', 'sort_order' => 6],
            ['platform' => 'Medium', 'display_name' => 'medium articles', 'icon' => 'medium', 'url' => 'https://medium.com/@markjohn', 'sort_order' => 7],
        ];
        foreach ($links as $link) {
            SocialLink::create($link + ['is_active' => true]);
        }
    }
}
