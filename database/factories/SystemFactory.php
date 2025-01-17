<?php

namespace Database\Factories;

use App\Models\System;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\System>
 */
class SystemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = System::class;
    public function definition(): array
    {
        return [
            'site_name' => $this->faker->company,
            'site_description' => $this->faker->paragraph,
            'site_keywords' => implode(', ', $this->faker->words(5)),
            'site_logo' => $this->faker->imageUrl(200, 200, 'logo'),
            'site_favicon' => $this->faker->imageUrl(32, 32, 'favicon'),
            'site_url' => $this->faker->url,
            'meta_tags' => '<meta name="example" content="value">',
            'default_language' => 'en',
            'timezone' => 'UTC',
            'tracking_code' => '<script>console.log("Tracking Code")</script>',
        ];
    }
}
