<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\Doctor\BookingController;
use App\Http\Controllers\Api\Doctor\ProfileDoctor;
use App\Http\Controllers\Api\Doctor\DashboardController;
use App\Http\Controllers\Api\Doctor\ResultController;
use App\Http\Controllers\Api\Doctor\MedicalRecordController;
use App\Http\Controllers\Api\Doctor\PostController;
use App\Http\Controllers\Api\Doctor\InvoiceController;
use App\Http\Controllers\Api\Doctor\DoctorServiceController;
use App\Http\Controllers\Api\Doctor\ScheduleController;


// Phần API để Frontend xử lý cho doctor 
Route::middleware(['auth:sanctum', 'role:doctor'])->group(function () {
    // Hiển thị và sửa profile của bác sĩ
    Route::get('profile', [ProfileDoctor::class, 'show']);
    Route::put('profile', [ProfileDoctor::class, 'update']);
    // Hiển thị dashboard của bác sĩ
    Route::get('dashboard', [DashboardController::class, 'index']);
    // Hiển thị và sửa booking của bác sĩ
    Route::get('bookings', [BookingController::class, 'index']);
    Route::get('bookings/{booking}', [BookingController::class, 'show']);
    Route::put('bookings/{booking}', [BookingController::class, 'update']);
    // Hiển thị, thêm và sửa kết quả khám của bác sĩ
    Route::apiResource('results', ResultController::class);
    Route::get('results/booking/{booking_id}', [ResultController::class, 'showByBooking']);
    Route::put('/results/booking/{booking_id}', [ResultController::class, 'updateByBooking']);
    // Hiển thị, thêm và sửa hồ sơ bệnh án của bác sĩ
    Route::apiResource('medical-records', MedicalRecordController::class);
    // Hiển thị, thêm và sửa bài viết của bác sĩ
    Route::apiResource('posts', PostController::class);
    // Hiển thị, thêm và sửa hóa đơn của bác sĩ
    Route::apiResource('invoices', InvoiceController::class);
    // Hiển thị, thêm và sửa dịch vụ của bác sĩ
    Route::apiResource('services', DoctorServiceController::class);
    // Hiển thị, thêm và sửa lịch hẹn của bác sĩ
    Route::apiResource('schedules', ScheduleController::class);
    Route::patch('schedules/leave/{date}',[ScheduleController::class,'leave'] );
});