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
        'isDeleted',
    ];

    // Quan hệ với bảng Guest
    public function guest()
    {
        return $this->belongsTo(Guest::class,'guest_id');
    }
    public function results()
{
    return $this->hasMany(Result::class, 'guest_id', 'guest_id');
}
    public function scopeSearchGuest($query, $search)
    {
        if (!empty($search)) {
            return $query->whereHas('guest', function ($q) use ($search) {
                $q->where('guest_name', 'LIKE', "%$search%")
                    ->orWhere('guest_phone', 'LIKE', "%$search%")
                    ->orWhere('guest_email', 'LIKE', "%$search%");
            });
        }
        return $query;
    }
}
