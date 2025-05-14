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
        'doctor_fee',
        'note',
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
        /**
     * Scope lọc theo chuyên khoa
     */
    public function scopeFilterBySpecialty($query, $specialtyId)
    {
        return $query->when($specialtyId, function ($query) use ($specialtyId) {
            $query->whereHas('doctor', function ($subQuery) use ($specialtyId) {
                $subQuery->where('specialty_id', $specialtyId);
            });
        });
    }

    /**
     * Scope tìm kiếm theo tên dịch vụ
     */
    public function scopeSearchByServiceName($query, $serviceName)
    {
        return $query->when($serviceName, function ($query) use ($serviceName) {
            $query->whereHas('service', function ($subQuery) use ($serviceName) {
                $subQuery->where('name', 'LIKE', '%' . $serviceName . '%');
            });
        });
    }
}
