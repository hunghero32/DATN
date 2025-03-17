<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorService extends Model
{
    use HasFactory;

    protected $table = 'doctor_service';

    protected $fillable = [
        'doctor_id',
        'service_id',
        'isDeleted'
    ];

    // Relationship with Doctor model
    public function doctor()
    {
        return $this->belongsTo(Doctor::class, 'doctor_id', 'id');
    }

    // Relationship with Service model
    public function service()
    {
        return $this->belongsTo(Services::class, 'service_id', 'id');
    }
}
