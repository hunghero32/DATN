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
        'specialty_id',
        'exp',
        'file',
        'approve',
        'isDeleted'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }



    // Quan hệ với bảng Specialty
    public function specialty()
    {
        return $this->belongsTo(Specialty::class);
    }
    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'doctor_id', 'id');
    }
}
