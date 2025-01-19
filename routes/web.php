<?php

use App\Http\Controllers\Admin\DoctorController;
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
    Route::get("dashboard",function(){
        return view('admin.pages.dashboard');

    })->name('admin.dashboard');
/////****************   End  Dashboard  **************/////


////****************   Start  Doctors  **************////
    // Danh sách bác sĩ
    Route::get('doctors', [DoctorController::class, 'index'])->name('admin.doctors.index');

    // Thêm bác sĩ
    Route::get('doctors-create', [DoctorController::class, 'create'])->name('admin.doctors.create');
    Route::post('doctors', [DoctorController::class, 'store'])->name('admin.doctors.store');

    // Sửa bác sĩ
    Route::get('doctors-{doctor}/edit', [DoctorController::class, 'edit'])->name('admin.doctors.edit');
    Route::put('doctors-{doctor}', [DoctorController::class, 'update'])->name('admin.doctors.update');

    // Xóa bác sĩ
    Route::delete('doctors-{doctor}', [DoctorController::class, 'destroy'])->name('admin.doctors.delete');
////*****************     End Doctors    *******************////
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


