<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\UserController;

use App\Http\Controllers\Api\SystemController;
use App\Http\Controllers\Api\Admin\SpecialtyController;
use App\Http\Controllers\Api\Admin\DoctorSpecialtyController;
use App\Http\Controllers\Api\Admin\GuestController;
use App\Http\Controllers\Api\Admin\MedicalRecordController;
use App\Http\Controllers\Api\Admin\NotificationController;
use App\Http\Controllers\Api\Admin\ResultController;




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
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy']);
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
 Route::apiResource('posts',PostController::class);
 ////*****************     End postpost    *******************////
  ////****************   Start  user  **************////
  Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::apiResource('users',UserController::class);
});
  Route::apiResource('guests',GuestController::class);
  Route::apiResource('medical-records', MedicalRecordController::class);
  Route::apiResource('notifications', NotificationController::class);
  Route::apiResource('results', ResultController::class);


