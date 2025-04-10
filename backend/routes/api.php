<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers for authentication
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\SocialController;

// Controllers for API routes 
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
use App\Http\Controllers\Api\Admin\BookingController;
use App\Http\Controllers\Api\Admin\CategoryController;
use App\Http\Controllers\Api\Admin\PostController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Client\SearchController;
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

Route::middleware(['web'])->group(function () {
    Route::get('/auth/google/redirect', [SocialController::class, 'redirect']);
    Route::get('/auth/google/callback', [SocialController::class, 'callback']);

    Route::get('/auth/github/redirect', [SocialController::class, 'redirectToGitHub']);
    Route::get('/auth/github/callback', [SocialController::class, 'handleGitHubCallback']);

    Route::get('/auth/facebook/redirect', [SocialController::class, 'redirectToFacebook']);
    Route::get('/auth/facebook/callback', [SocialController::class, 'handleFacebookCallback']);
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
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::apiResource('users', UserController::class);
});

Route::get('/client/search', [SearchController::class, 'search']);

Route::apiResource('system', SystemController::class);
Route::apiResource('specialties', SpecialtyController::class);
Route::apiResource('doctor-specialties', DoctorSpecialtyController::class);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('posts', PostController::class);
Route::apiResource('guests', GuestController::class);
Route::apiResource('medical-records', MedicalRecordController::class);
Route::apiResource('notifications', NotificationController::class);
Route::apiResource('results', ResultController::class);
Route::apiResource('invoices', InvoiceController::class);
Route::apiResource('invoice-details', InvoiceDetailController::class);
Route::apiResource('feedbacks', FeedbackController::class);
Route::apiResource('doctors',DoctorController::class);
Route::apiResource('schedules',SchedulesController::class);
Route::apiResource('bookings',BookingController::class);
Route::apiResource('services', ServiceController::class);
Route::apiResource('users', UserController::class);