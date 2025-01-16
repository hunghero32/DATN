<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'booking_id',
        'title',
        'content',
        'type',
        'is_read',    // Trạng thái đã đọc
    ];

    // Quan hệ với bảng User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Quan hệ với bảng Booking
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
