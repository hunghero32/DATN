<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'guest_name',
        'gender',
        'birthday',
        'guest_phone',
        'guest_email',
        'address',
        'file',
        'isDeleted',
    ];
    protected $casts = [
        'address' => 'array',
    ];
    // Quan hệ với bảng User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Define the relationship with MedicalRecord
    public function medicalRecord()
    {
        // Assuming MedicalRecord model exists and has a 'guest_id' foreign key
        return $this->hasOne(MedicalRecord::class);
    }
}
