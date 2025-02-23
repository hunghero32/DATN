<?php

use App\Http\Controllers\Admin\DoctorController;
use App\Http\Controllers\Admin\SchedulesController;
use App\Http\Controllers\Auth\RegisteredUserController;
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
    Route::get('doctors-searh',[DoctorController::class,'search'])->name('admin.doctors.search');

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

    ////*****************     End Schedule    *******************////


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

require __DIR__.'/auth.php';


