<?php

namespace App\Repositories;

use App\Models\Specialty;

class SpecialtyRepository
{
    public function search(string $query)
    {
        return Specialty::where('name', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->get();
    }
}
