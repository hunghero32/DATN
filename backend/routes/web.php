<?php

use App\Http\Controllers\Admin\DoctorController;

use App\Http\Controllers\Admin\SchedulesController;
use App\Http\Controllers\Auth\RegisteredUserController;

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\DoctorSpecialtyController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SpecialtyController;
use App\Http\Controllers\SystemController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::prefix('admin')->group(function () {
    ////****************   Start  Dashboard  **************////
    Route::get("dashboard", function () {
        return view('admin.pages.dashboard');
    })->name('admin.dashboard');

    /////****************   End  Dashboard  **************/////


    ////****************   Start  Doctors  **************////
    // Danh sách bác sĩ
    Route::get('doctors', [DoctorController::class, 'index'])->name('admin.doctors.index');
    Route::get('doctors-searh', [DoctorController::class, 'search'])->name('admin.doctors.search');

    // Thêm bác sĩ
    Route::get('doctors-create', [DoctorController::class, 'create'])->name('admin.doctors.create');
    Route::post('save-doctors-create', [DoctorController::class, 'store'])->name('admin.doctors.store');

    // Sửa bác sĩ
    Route::get('doctors-{doctor}/edit', [DoctorController::class, 'edit'])->name('admin.doctors.edit');
    Route::put('doctors-{doctor}', [DoctorController::class, 'update'])->name('admin.doctors.update');

    // Xóa bác sĩ

    Route::delete('delete-doctor/{id}', [DoctorController::class, 'destroy'])->name('admin.doctors.delete');



    ////*****************     End Doctors    *******************////


     ////*****************     Start Schedule    *******************////
     Route::get("doctor-schedule",[SchedulesController::class,'index'])->name('admin.schedule.index');
     Route::get("doctor-schedule-create",[SchedulesController::class,'create'])->name('admin.schedule.create');
     Route::post("doctor-schedule-save",[SchedulesController::class,'store'])->name('admin.schedule.store');
     Route::get("doctor-schedule-{schedule}/edit",[SchedulesController::class,'edit'])->name('admin.schedule.edit');
     Route::put("doctor-schedule-{schedule}",[SchedulesController::class,'update'])->name('admin.schedule.update');
     Route::delete("doctor-schedule-{schedule}",[SchedulesController::class,'destroy'])->name('admin.schedule.delete');
     Route::get("doctor-search", [SchedulesController::class, 'search'])->name('admin.schedule.search');




     ////*****************     End Schedule    *******************////



     ////*****************     Start Bookings    *******************////
        Route::get("bookings",[BookingController::class,'index'])->name('admin.bookings.index');
        Route::get("bookings-create",[BookingController::class,'create'])->name('admin.bookings.create');
        Route::put("bookings-{booking}",[BookingController::class,'update'])->name('admin.bookings.update');
        Route::delete("bookings-{booking}",[BookingController::class,'destroy'])->name('admin.bookings.delete');
        Route::get("bookings-search", [BookingController::class, 'search'])->name('admin.bookings.search');

    ////*****************     End Bookings    *******************////


    ////*****************     Start Services    *******************////

    Route::get('services', [ServiceController::class, 'index'])->name('admin.services.index');
    Route::get('services-create', [ServiceController::class, 'create'])->name('admin.services.create');
    Route::post('services', [ServiceController::class, 'store'])->name('admin.services.store');
    Route::get('services-edit/{id}', [ServiceController::class, 'edit'])->name('admin.services.edit');
    Route::put('services-update/{id}', [ServiceController::class, 'update'])->name('admin.services.update');
    Route::delete('services/{id}', [ServiceController::class, 'delete'])->name('admin.services.delete');
    Route::get('services-search', [ServiceController::class, 'search'])->name('admin.services.search');

    ////*****************     End Services    *******************////

    ////****************   Start  Categories  **************////
    Route::get('categories', [CategoryController::class, 'index'])->name('admin.categories.index');
    Route::get('categories-create', [CategoryController::class, 'create'])->name('admin.categories.create');
    Route::post('categories', [CategoryController::class, 'store'])->name('admin.categories.store');
    Route::get('categories-edit/{id}', [CategoryController::class, 'edit'])->name('admin.categories.edit');
    Route::put('categories-update/{id}', [CategoryController::class, 'update'])->name('admin.categories.update');
    Route::delete('doctors/{id}', [CategoryController::class, 'delete'])->name('admin.categories.delete');

    ////*****************     End categorycategory    *******************////




    ////****************   Start  POST  **************////

    Route::get('posts', [PostController::class, 'index'])->name('admin.posts.index');
    Route::get('posts-create', [PostController::class, 'create'])->name('admin.posts.create');
    Route::post('posts', [PostController::class, 'store'])->name('admin.posts.store');
    Route::delete('posts/{id}', [PostController::class, 'delete'])->name('admin.posts.delete');
    Route::get('post-edit/{id}', [PostController::class, 'edit'])->name('admin.posts.edit');
    Route::put('posts-update/{id}', [PostController::class, 'update'])->name('admin.posts.update');
    ////*****************     End postpost    *******************////




    ////****************   Start  useruser  **************////
    Route::get('users', [UserController::class, 'index'])->name('admin.users.index');
    Route::get('users-create',[UserController::class,'create'])->name('admin.users.create');
    Route::post('users-store',[UserController::class, 'store'])->name('admin.users.store');
    route::delete('users-delete/{id}',[UserController::class ,'delete'])->name('admin.users.delete');
    route::get('users-edit/{id}',[UserController::class ,'edit'])->name('admin.users.edit');
    route::put('users-update/{id}',[UserController::class,'update'])->name('admin.users.update');


});







// =========== System =======================
Route::get('system', [SystemController::class, 'show'])->name('systems.show');
Route::get('system', [SystemController::class, 'edit'])->name('system.edit');
Route::put('system', [SystemController::class, 'update'])->name('system.update');

Route::resource('specialties', SpecialtyController::class); // Chuyên khoa
Route::resource('doctor_specialties', DoctorSpecialtyController::class); // Các Chuyên khoa
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__ . '/auth.php';