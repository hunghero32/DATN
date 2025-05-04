<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Category;

class Services extends Model
{
    use HasFactory;
    protected $fillable = [
        'specialty_id',
        'services_name',
        'image',
        'description',
        'price',
        'duration',
        'status',
        'isDeleted'
    ];

    // Quan hệ với bảng Specialty
    public function specialty()
    {
        return $this->belongsTo(Specialty::class);
    }

    // Quan hệ với bảng Category
    public function doctorServices()
    {
        return $this->hasMany(DoctorService::class, 'service_id', 'id');
    }

    public function doctors()
    {
        return $this->belongsToMany(Doctor::class, 'doctor_service', 'service_id', 'doctor_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'service_id');
    }

    /**
     * Get the category that owns the service.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
