<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;
    protected $fillable = [
        'doctor_id',
        'combo_id',
        'service_id',
        'guest_id',
        'booking_date',
        'booking_time',
        'notes',
        'status',
    ];

    // Quan hệ với bảng Doctor
    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    // Quan hệ với bảng Combo
    public function combo()
    {
        return $this->belongsTo(Combo::class);
    }

    // Quan hệ với bảng Service
    public function service()
    {
        return $this->belongsTo(Services::class);
    }

    // Quan hệ với bảng Guest
    public function guest()
    {
        return $this->belongsTo(Guest::class);
    }
}
