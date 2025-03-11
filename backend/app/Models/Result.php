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
        'isDeleted'
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
    // Scope tìm kiếm theo tên, email, số điện thoại của guest
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
    // Scope lọc theo ngày đặt lịch.
    public function scopeFilterBookingDate($query, $date)
    {
        if (!empty($date)) {
            return $query->whereHas('booking', function ($q) use ($date) {
                $q->whereDate('booking_date', $date);
            });
        }
        return $query;
    }
    // Scope lọc theo giờ đặt lịch.
    public function scopeFilterBookingTime($query, $time)
    {
        if (!empty($time)) {
            return $query->whereHas('booking', function ($q) use ($time) {
                $q->whereTime('booking_time', $time);
            });
        }
        return $query;
    }
}
