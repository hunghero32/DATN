<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;


use App\Http\Controllers\Api\Admin\SystemController;

use App\Http\Controllers\Api\Doctor\BookingController;
use App\Http\Controllers\Api\Doctor\ProfileDoctor;
use App\Http\Controllers\Api\Doctor\DashboardController;
use App\Http\Controllers\Api\Doctor\ResultController;
use App\Http\Controllers\Api\Doctor\MedicalRecordController;
use App\Http\Controllers\Api\Doctor\PostController;
use App\Http\Controllers\Api\Doctor\InvoiceController;
use App\Http\Controllers\Api\Doctor\DoctorServiceController;
use App\Http\Controllers\Api\Doctor\ScheduleController;

use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Auth\SocialController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware(['web'])->group(function () {
    Route::get('/auth/google/redirect', [SocialController::class, 'redirect']);
    Route::get('/auth/google/callback', [SocialController::class, 'callback']);
});
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::delete('/profile', [ProfileController::class, 'destroy']);
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy']);
    Route::post('/update-firebase-token', [ProfileController::class, 'updateFirebaseToken']);
    Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])->middleware(['auth', 'throttle:6,1'])->name('verification.send');
});
Route::middleware(['guest'])->group(function () {
    Route::post('register', [RegisteredUserController::class, 'store'])->name('api.register');;
    Route::post('login', [AuthenticatedSessionController::class, 'store'])->name('login');;
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])->middleware('guest')->name('password.email');
    Route::post('/reset-password', [NewPasswordController::class, 'store'])->middleware('guest')->name('password.store');
});
Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['auth', 'signed', 'throttle:6,1'])->name('verification.verify');

Route::apiResource('system', SystemController::class);


// Phần API để Frontend xử lý cho doctor 
Route::middleware(['auth:sanctum', 'role:doctor'])->prefix('doctor')->group(function () {
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
    Route::apiResource('medical-records', MedicalRecordController::class);
    Route::apiResource('posts', PostController::class);
    Route::apiResource('invoices', InvoiceController::class);
    Route::apiResource('services', DoctorServiceController::class);
    Route::apiResource('schedules', ScheduleController::class);
    Route::patch('schedules/leave/{date}',[ScheduleController::class,'leave'] );
});