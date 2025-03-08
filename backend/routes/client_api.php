<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Client\HomeController;

Route::prefix('client')->group(function () {
    Route::get('/home', [HomeController::class, 'index']);
});
