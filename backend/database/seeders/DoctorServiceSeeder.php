<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\DoctorService;
use Illuminate\Database\Seeder;

class DoctorServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DoctorService::factory(50)->create(); 
    }
}
