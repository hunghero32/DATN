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
        'approve'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function clinic()
    {
        return $this->belongsTo(Clinic::class);
    }

    public function specialty()
    {
        return $this->belongsTo(Specialty::class);
    }
}
