<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;
    protected $fillable = [
        'booking_id',
        'doctor_id',
        'guest_id',
        'diagnosis',
        'note',
        'file',
    ];

    // Quan hệ với bảng Booking
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    // Quan hệ với bảng Doctor
    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    // Quan hệ với bảng Guest
    public function guest()
    {
        return $this->belongsTo(Guest::class);
    }
}
