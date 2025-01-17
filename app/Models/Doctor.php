<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'doctor_avatar',
        'doctor_name',
        'doctor_bio',
        'clinic_id',
        'specialty_id',
        'exp',
        'file',
        'approve',
    ];

    // Quan hệ với bảng User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Quan hệ với bảng Clinic
    public function clinic()
    {
        return $this->belongsTo(Clinic::class);
    }

    // Quan hệ với bảng Specialty
    public function specialty()
    {
        return $this->belongsTo(Specialty::class);
    }
}
