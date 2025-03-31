<?php

use App\Http\Controllers\Api\Admin\BookingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Api\Admin\CategoryController;
use App\Http\Controllers\Api\Admin\PostController;
use App\Http\Controllers\Api\Admin\UserController;

use App\Http\Controllers\Api\Admin\SystemController;
use App\Http\Controllers\Api\Admin\SpecialtyController;
use App\Http\Controllers\Api\Admin\DoctorSpecialtyController;
use App\Http\Controllers\Api\Admin\GuestController;
use App\Http\Controllers\Api\Admin\MedicalRecordController;
use App\Http\Controllers\Api\Admin\NotificationController;
use App\Http\Controllers\Api\Admin\ResultController;
use App\Http\Controllers\Api\Admin\DoctorController;
use App\Http\Controllers\Api\Admin\SchedulesController;

use App\Http\Controllers\Api\Admin\InvoiceController;
use App\Http\Controllers\Api\Admin\InvoiceDetailController;
use App\Http\Controllers\Api\Admin\FeedbackController;
use App\Http\Controllers\Api\Admin\ServiceController;

use App\Http\Controllers\Api\Doctor;

use App\Http\Controllers\Api\ProfileController;
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


Route::apiResource('specialties', SpecialtyController::class);
Route::apiResource('system', SystemController::class);
Route::apiResource('doctor-specialties', DoctorSpecialtyController::class);

////****************   Start  Categories  **************////
Route::apiResource('categories', CategoryController::class);
//     ////*****************     End categorycategory    *******************////
////****************   Start  POST  **************////
Route::apiResource('posts', PostController::class);
////*****************     End postpost    *******************////
////****************   Start  user  **************////
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::apiResource('users', UserController::class);
});
Route::apiResource('guests', GuestController::class);
Route::apiResource('medical-records', MedicalRecordController::class);
Route::apiResource('notifications', NotificationController::class);
Route::apiResource('results', ResultController::class);

Route::apiResource('invoices', InvoiceController::class);
Route::apiResource('invoice-details', InvoiceDetailController::class);
Route::apiResource('feedbacks', FeedbackController::class);


////****************   Start  Doctors  **************////
Route::prefix('doctors')->group(function () {
    Route::get('/', [DoctorController::class, 'index']); // Lấy danh sách bác sĩ
    Route::get('/search', [DoctorController::class, 'search']); // Tìm kiếm bác sĩ
    Route::post('/create', [DoctorController::class, 'store']); // Tạo bác sĩ mới
    Route::get('/{id}', [DoctorController::class, 'show']); // Xem chi tiết bác sĩ
    Route::put('/{id}', [DoctorController::class, 'update']); // Cập nhật bác sĩ
    Route::delete('/{id}', [DoctorController::class, 'destroy']); // Xóa bác sĩ
});

////*****************     End Doctors    *******************////

////****************   Start  Schedules  **************////
Route::prefix('schedules')->group(function () {
    Route::get('/', [SchedulesController::class, 'index']);
    Route::post('/', [SchedulesController::class, 'store']);
    Route::get('/{id}', [SchedulesController::class, 'show']);
    Route::put('/{id}', [SchedulesController::class, 'update']);
    Route::delete('/{id}', [SchedulesController::class, 'destroy']);
});
////*****************     End Schedules    *******************////


////****************   Start  Bookings  **************////
Route::prefix('admin')->group(function () {
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);
    Route::get('/bookings/search', [BookingController::class, 'search']);
});
////*****************     End Bookings    *******************////


////****************   Start  Invoices  **************////
Route::prefix('services')->group(function () {
    Route::get('/', [ServiceController::class, 'index']); // Lấy danh sách dịch vụ
    Route::post('/', [ServiceController::class, 'store']); // Thêm dịch vụ mới
    Route::get('/{id}', [ServiceController::class, 'show']); // Lấy thông tin một dịch vụ
    Route::put('/{id}', [ServiceController::class, 'update']); // Cập nhật dịch vụ
    Route::delete('/{id}', [ServiceController::class, 'delete']); // Xóa dịch vụ
});
////*****************     End Invoices    *******************////


// Phần API để Frontend xử lý cho doctor 
Route::middleware(['auth:sanctum', 'role:doctor'])->prefix('doctor')->group(function () {
    // Hiển thị và sửa profile của bác sĩ
    Route::get('profile', [Doctor\ProfileDoctor::class, 'show']);
    Route::put('profile', [Doctor\ProfileDoctor::class, 'update']);
    // Hiển thị dashboard của bác sĩ
    Route::get('dashboard', [Doctor\DashboardController::class, 'index']);
    // Hiển thị và sửa booking của bác sĩ
    Route::get('bookings', [Doctor\BookingController::class, 'index']);
    Route::get('bookings/{booking}', [Doctor\BookingController::class, 'show']);
    Route::put('bookings/{booking}', [Doctor\BookingController::class, 'update']);
    // Hiển thị, thêm và sửa kết quả khám của bác sĩ
    Route::apiResource('results', Doctor\ResultController::class);
    Route::get('results/booking/{booking_id}', [Doctor\ResultController::class, 'showByBooking']);
    Route::put('/results/booking/{booking_id}', [Doctor\ResultController::class, 'updateByBooking']);
    Route::apiResource('medical-records', Doctor\MedicalRecordController::class);
    Route::apiResource('posts', Doctor\PostController::class);
    Route::apiResource('invoices', Doctor\InvoiceController::class);
    Route::apiResource('services', Doctor\DoctorServiceController::class);
    Route::apiResource('schedules', Doctor\ScheduleController::class);
    Route::patch('schedules/leave/{date}',[Doctor\ScheduleController::class,'leave'] );
    Route::apiResource('services', Doctor\DoctorServiceController::class);
});