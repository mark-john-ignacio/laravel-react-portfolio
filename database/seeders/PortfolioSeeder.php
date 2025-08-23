<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Throwable;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        
        try {
            // DB::beginTransaction();
            $this->call([
                PersonalInfoSeeder::class,
                SocialLinksSeeder::class,
                TechStackSeeder::class,
                ExperienceSeeder::class,
                ProjectSeeder::class,
                SiteSettingsSeeder::class,
            ]);
            // DB::commit();
        } catch (Throwable $e) {
            // DB::rollBack();
            throw $e; // Let the exception bubble; artisan will show error
        }
    }
}
