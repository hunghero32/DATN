<?php

namespace App\Repositories;

use App\Models\Services;

class ServiceRepository
{
    public function search(string $query)
    {
        return Services::with('specialty')
            ->where('services_name', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->orWhereHas('specialty', function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%");
            })
            ->get();
    }
}
