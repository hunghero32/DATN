<?php

use App\Http\Controllers\Api\Client\CheckoutController;
use App\Http\Controllers\Api\Client\ResultController;
use App\Http\Controllers\Api\Client\InvoiceController;
use App\Http\Controllers\Api\Client\PostController;
use App\Http\Controllers\Api\Client\ServiceController;
use App\Http\Controllers\Api\Client\SpecialtyController;
use App\Http\Controllers\Api\Client\FeedbackController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Client\HomeController;
use App\Http\Controllers\Api\Client\BookingController; // Update this line
use App\Http\Controllers\Api\Client\DoctorController;
use App\Models\Post;

Route::get('/home', [HomeController::class, 'index']);

//*************** Lấy ra chi tiết chuyên khoa  ************/
Route::get('/detail-specialty/{id}', [SpecialtyController::class, 'detailSpecialty']);

//*************** Lấy ra danh sách chuyên khoa ************/
Route::get('/list-specialty', [SpecialtyController::class, 'listSpecialty']);


//*************** Lấy ra danh sách dịch vụ  ************/
Route::get('/list-service', [ServiceController::class, 'listService']);

Route::get('/services/search', [ServiceController::class, 'searchBySpecialtyName']);
//*************** Lấy ra chi tiết dịch vụ  ************/
Route::get('/detail-service/{id}', [ServiceController::class, 'detailService']);


//*************** Lấy ra chi tiết bài viết  ************/
Route::get('bai-viet/{slug}/{id}', [PostController::class, 'detailPost'])
    ->where('slug', '[a-zA-Z0-9\-]+')
    ->where('id', '[0-9]+');

//*************** Lấy ra chi tiết bác sĩ ************/
Route::get('/doctor/{id}', [DoctorController::class, 'detailDoctor']);

Route::middleware('auth:sanctum')->group(function () {
    //*************** Lấy danh sách feedback ************/
    Route::get('/feedbacks', [FeedbackController::class, 'index']);
    Route::post('/feedbacks', [FeedbackController::class, 'store']);
    Route::put('/feedbacks/{id}', [FeedbackController::class, 'update']);
    Route::delete('/feedbacks/{id}', [FeedbackController::class, 'destroy']);
    Route::get('/feedbacks/service/{id}', [FeedbackController::class, 'averageRatingByService']);
    Route::get('/feedbacks/doctor/{id}', [FeedbackController::class, 'averageRatingByDoctor']);
});
Route::middleware('web')->group(function () {

    //*****************  Xử lí đặt lịch khám ******************/
    Route::post('/temp-booking', [BookingController::class, 'tempBooking']);
    Route::get('/get-temp-booking', [BookingController::class, 'getTempBooking']);
    Route::post('/confirm-booking', [BookingController::class, 'confirmBooking']);
    Route::get('/appointments', [BookingController::class, 'appointments']);
    //*************** Lấy ra hóa đơn  ************/
    Route::get('invoice/{booking_id}', [InvoiceController::class, 'invoice']);
    Route::post('momo-payment', [CheckoutController::class, 'momoPayment']);
    Route::post('momo-callback', [CheckoutController::class, 'momoCallback']);
    Route::post('momo-callback', [CheckoutController::class, 'momoCallback']);

    //****************** Lấy ra kết quả khám  **********************/
    Route::get('result/{booking_id}', [ResultController::class, 'result']);
});
