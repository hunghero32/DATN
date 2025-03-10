<?php

use App\Http\Controllers\Api\Client\DetailServiceController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Client\HomeController;

Route::get('/home', [HomeController::class, 'index']);
Route::get('/detail-service-{id}', [DetailServiceController::class, 'detailService']);
