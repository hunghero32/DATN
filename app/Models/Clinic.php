<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clinic extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'clinic_avatar',
        'clinic_name',
        'clinic_bio',
        'clinic_phone',
        'email',
        'file',
        'address',
        'approve'
    ];
    protected $casts = [
        'address' => 'array',
    ];
    // Quan hệ với bảng User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
