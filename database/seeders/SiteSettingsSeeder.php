<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['key' => 'seo.meta_description', 'value' => 'Portfolio of Mark John Ignacio - Full Stack Developer specializing in Laravel, React, and AWS.', 'type' => 'text', 'description' => 'Default meta description'],
            ['key' => 'seo.keywords', 'value' => json_encode(['Laravel','React','Full Stack Developer','AWS','Portfolio']), 'type' => 'json', 'description' => 'SEO keywords'],
            ['key' => 'seo.og_image', 'value' => '/images/og-default.png', 'type' => 'text', 'description' => 'Default Open Graph image'],
            ['key' => 'contact.notification_email', 'value' => 'Markme44.mm@gmail.com', 'type' => 'text', 'description' => 'Email to receive contact form notifications'],
            ['key' => 'portfolio.projects_per_page', 'value' => '9', 'type' => 'text', 'description' => 'Projects per page'],
            ['key' => 'portfolio.featured_count', 'value' => '3', 'type' => 'text', 'description' => 'Number of featured projects to highlight'],
            ['key' => 'analytics.enable_tracking', 'value' => '1', 'type' => 'boolean', 'description' => 'Enable analytics tracking'],
        ];

        foreach ($settings as $row) {
            SiteSetting::updateOrCreate(['key' => $row['key']], $row);
        }
    }
}
