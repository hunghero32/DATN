<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;
    protected $fillable = [
        'doctor_id',
        'clinic_id',
        'time_start',
        'time_end',
        'working_date',
        'max_patients',
        'status',
    ];

    protected $casts = [
        'working_date' => 'array', // Đảm bảo working_date được chuyển đổi thành mảng khi truy xuất
    ];

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
}
