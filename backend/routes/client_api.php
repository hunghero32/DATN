<?php

use App\Http\Controllers\Api\Client\PostController;
use App\Http\Controllers\Api\Client\ServiceController;
use App\Http\Controllers\Api\Client\SpecialtyController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Client\HomeController;
use App\Http\Controllers\Api\Client\BookingController; // Update this line
use App\Models\Post;

Route::get('/home', [HomeController::class, 'index']);

//*************** Lấy ra chi tiết chuyên khoa  ************/
Route::get('/detail-specialty/{id}', [SpecialtyController::class, 'detailSpecialty']);

//*************** Lấy ra danh sách chuyên khoa ************/
Route::get('/list-specialty', [SpecialtyController::class, 'listSpecialty']);


//*************** Lấy ra danh sách dịch vụ  ************/
Route::get('/list-service',[ServiceController::class,'listService']);

//*************** Lấy ra chi tiết dịch vụ  ************/
Route::get('/detail-service/{id}',[ServiceController::class,'detailService']);

//*************** Lấy ra chi tiết bài viết  ************/
Route::get('detail-post/{slug}-{id}', [PostController::class, 'detailPost'])
    ->where('slug', '[a-zA-Z0-9\-]+')
    ->where('id', '[0-9]+');

Route::middleware('web')->group(function () {
    Route::post('/temp-booking', [BookingController::class, 'tempBooking']);
    Route::get('/get-temp-booking', [BookingController::class, 'getTempBooking']);
    Route::post('/confirm-booking', [BookingController::class, 'confirmBooking']);
});
