<?php

namespace App\Repositories;

use App\Models\Booking;

class BookingRepository
{
    public function search(array $filters)
    {
        return Booking::query()
            ->with(['doctor', 'guest', 'service']) // Eager load quan hệ

            // Lọc theo tên bác sĩ
            ->when($filters['doctor_name'] ?? null, function ($query, $doctorName) {
                $query->whereHas('doctor', function ($q) use ($doctorName) {
                    $q->where('doctor_name', 'like', '%' . $doctorName . '%');
                });
            })

            // Lọc theo tên dịch vụ
            ->when($filters['service_name'] ?? null, function ($query, $serviceName) {
                $query->whereHas('service', function ($q) use ($serviceName) {
                    $q->where('service_name', 'like', '%' . $serviceName . '%');
                });
            })

            // Lọc theo tên khách hàng (guest_name)
            ->when($filters['guest_name'] ?? null, function ($query, $guestName) {
                $query->whereHas('guest', function ($q) use ($guestName) {
                    $q->where('guest_name', 'like', '%' . $guestName . '%');
                });
            })

            // Lọc theo số điện thoại khách hàng
            ->when($filters['guest_phone'] ?? null, function ($query, $guestPhone) {
                $query->whereHas('guest', function ($q) use ($guestPhone) {
                    $q->where('guest_phone', 'like', '%' . $guestPhone . '%');
                });
            })

            // Lọc theo ngày đặt lịch
            ->when($filters['booking_date'] ?? null, function ($query, $bookingDate) {
                $query->whereDate('booking_date', $bookingDate);
            })

            // Lọc theo giờ đặt lịch
            ->when($filters['booking_time'] ?? null, function ($query, $bookingTime) {
                $query->where('booking_time', $bookingTime);
            })

            ->get();
    }
}
