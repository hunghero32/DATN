<?php

namespace App\Repositories;

use App\Models\Feedback;

class FeedbackRepository
{
    public function search(string $query)
    {
        return Feedback::with('service')
            ->where('comments', 'like', "%{$query}%")
            ->orWhereHas('service', function ($q) use ($query) {
                $q->where('services_name', 'like', "%{$query}%");
            })
            ->get();
    }
}
