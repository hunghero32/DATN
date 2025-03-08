<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Client\HomeController;

Route::get('/home', [HomeController::class, 'index']);
