<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;
    protected $table = 'bookings';
    protected $fillable = [
        'doctor_id',
        'service_id',
        'guest_id',
        'doctor_name',
        'service_name',
        'service_price',
        'booking_date',
        'booking_time',
        'notes',
        'status',
    ];

    // Quan hệ với bảng Doctor
    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    // Quan hệ với bảng Service
    public function service()
    {
        return $this->belongsTo(Services::class);
    }

    // Quan hệ với bảng Guest
    public function guest()
    {
        return $this->belongsTo(Guest::class);
    }
    public function result()
{
    return $this->hasOne(Result::class, 'booking_id');
}
    public function invoiceDetails()
    {
        return $this->hasMany(\App\Models\InvoiceDetail::class, 'booking_id');
    }

    // Scope tìm kiếm theo tên, email, số điện thoại của guest
    public function scopeSearchGuest($query, $search)
    {
        if (!empty($search)) {
            return $query->whereHas('guest', function ($q) use ($search) {
                $q->where('guest_name', 'LIKE', "%$search%")
                    ->orWhere('guest_phone', 'LIKE', "%$search%")
                    ->orWhere('guest_email', 'LIKE', "%$search%");
            });
        }
        return $query;
    }

    // Scope lọc theo giới tính
    public function scopeFilterGender($query, $gender)
    {
        if (!empty($gender) && in_array($gender, ['male', 'female', 'other'])) {
            return $query->whereHas('guest', function ($q) use ($gender) {
                $q->where('gender', $gender);
            });
        }
        return $query;
    }

    // Scope lọc theo tuổi
    public function scopeFilterAge($query, $age)
    {
        if (!empty($age) && is_numeric($age)) {
            return $query->whereHas('guest', function ($q) use ($age) {
                $q->whereNotNull('birthday')
                    ->whereRaw("YEAR(CURDATE()) - YEAR(birthday) = ?", [$age]);
            });
        }
        return $query;
    }

    // Scope lọc theo chuyên khoa của dịch vụ
    public function scopeFilterSpecialty($query, $specialty)
    {
        if (!empty($specialty)) {
            return $query->whereHas('service', function ($q) use ($specialty) {
                $q->where('specialty', 'LIKE', "%$specialty%");
            });
        }
        return $query;
    }
    // Lọc danh sách bệnh nhân đã "pending" của bác sĩ đang đăng nhập
    public function scopeFilterDoctorPending($query)
    {
        return $query->where('doctor_id', auth()->id())
            ->where('status', 'pending');
    }
    // Lọc danh sách bệnh nhân đã "confirmed" của bác sĩ đang đăng nhập
    public function scopeFilterDoctorConfirmed($query)
    {
        return $query->where('doctor_id', auth()->id())
            ->where('status', 'confirmed');
    }

    // Lọc danh sách bệnh nhân đã "completed" của bác sĩ đang đăng nhập
    public function scopeFilterDoctorCompleted($query)
    {
        return $query->where('doctor_id', auth()->id())
            ->where('status', 'completed');
    }
}
