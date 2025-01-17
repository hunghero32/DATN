<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;
    protected $fillable = [
        'guest_id',
        'doctor_id',
        'clinic_id',
        'service_id',
        'rating',
        'comments',
        'status',
    ];

    // Quan hệ với bảng Guest
    public function guest()
    {
        return $this->belongsTo(Guest::class);
    }

    // Quan hệ với bảng Doctor
    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    // Quan hệ với bảng Clinic
    public function clinic()
    {
        return $this->belongsTo(Clinic::class);
    }

    // Quan hệ với bảng Service
    public function service()
    {
        return $this->belongsTo(Services::class);
    }
}
