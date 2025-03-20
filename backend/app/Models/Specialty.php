<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Booking;

class Specialty extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'icon',
        'image',
        'isDeleted'
    ];
    public function services() {
        return $this->hasMany(Services::class);
    }

    public function doctors() {
        return $this->hasMany(Doctor::class);
    }

    public function bookings()
    {
        return $this->hasManyThrough(
            Booking::class,
            Services::class,
            'specialty_id', // Foreign key on services table
            'service_id',   // Foreign key on bookings table
            'id',          // Local key on specialties table
            'id'           // Local key on services table
        );
    }
}