<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(50)->create(); 
        $this->call([
            SystemSeeder::class,
            SpecialtySeeder::class,
            CategorySeeder::class,
            DoctorSeeder::class,
            GuestSeeder::class,
            MedicalRecordSeeder::class,
            ServicesSeeder::class,
            BookingSeeder::class,
            ResultSeeder::class,
            NotificationSeeder::class,
            DoctorSpecialtySeeder::class,
            ScheduleSeeder::class,
            InvoiceSeeder::class,
            InvoiceDetailSeeder::class,
            PostSeeder::class,
            FeedbackSeeder::class
        ]);
    }
}
