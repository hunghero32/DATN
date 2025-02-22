<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalRecord extends Model
{
    use HasFactory;
    protected $fillable = [
        'guest_id',
        'BHYT',
        'medical_condition',
        'medications',
        'allergies',
        'family_history',
        'treatment',
        'note',
    ];

    // Quan hệ với bảng Guest
    public function guest()
    {
        return $this->belongsTo(Guest::class);
    }
}
