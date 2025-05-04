<?php

namespace App\Repositories;

use App\Models\Result;

class ResultRepository
{
    public function search(string $query)
    {
        return Result::where('diagnosis', 'like', "%{$query}%")
            ->orWhere('prescription', 'like', "%{$query}%")
            ->orWhere('note', 'like', "%{$query}%")
            ->get();
    }
}
