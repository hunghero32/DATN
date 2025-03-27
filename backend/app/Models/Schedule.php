<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;
    protected $fillable = [
        'doctor_id',
        'time_start',
        'time_end',
        'working_date',
        'max_patients',
        'status',
        'isDeleted',
    ];

    protected $casts = [
        'working_date' => 'datetime:Y-m-d',
    ];

    protected $dates = [
        'working_date',
    ];

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }
}
