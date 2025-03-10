<?php

use App\Http\Controllers\Api\Client\ServiceController;
use App\Http\Controllers\Api\Client\SpecialtyController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Client\HomeController;

Route::get('/home', [HomeController::class, 'index']);

//*************** Lấy ra chi tiết chuyên khoa  ************/
Route::get('/detail-specialty-{id}', [SpecialtyController::class, 'detailSpecialty']);

//*************** Lấy ra danh sách chuyên khoa ************/
Route::get('/list-specialty', [SpecialtyController::class, 'listSpecialty']);


//*************** Lấy ra danh sách dịch vụ  ************/
Route::get('/list-service',[ServiceController::class,'listService']);

//*************** Lấy ra chi tiết dịch vụ  ************/
Route::get('/detail-service-{id}',[ServiceController::class,'detailService']);



