<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\Auth\AdminProfileController;
use App\Http\Controllers\Admin\{
    BookingController,
    CategoryController,
    DashboardController,
    DoctorController,
    DoctorServiceController,
    FeedbackController,
    GuestController,
    InvoiceController,
    InvoiceDetailController,
    MedicalRecordController,
    NotificationController,
    PostController,
    ReportController,
    SchedulesController,
    ServiceController,
    SpecialtyController,
    SystemController,
    UserController,
    DoctorSpecialtyController
};


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/
Route::get('notification-read-redirect/{id}', [NotificationController::class, 'readAndRedirect'])->name('notification.read.redirect');
Route::get('/', [AdminAuthController::class, 'create'])->name('admin.login');
Route::get('admin', [AdminAuthController::class, 'create'])->name('admin.login');
Route::prefix('admin')->group(function () {
    Route::get('/', [AdminAuthController::class, 'create'])->name('admin.login');
    Route::get('login', [AdminAuthController::class, 'create'])->name('admin.login');
    Route::post('login', [AdminAuthController::class, 'login'])->name('admin.login.post');
});

Route::prefix('admin')->group(function () {
    // Auth & Profile
    Route::post('logout', [AdminAuthController::class, 'destroy'])->name('admin.logout');
    Route::get('profile', [AdminProfileController::class, 'edit'])->name('admin.profile.edit');
    Route::patch('profile', [AdminProfileController::class, 'update'])->name('admin.profile.update');
    Route::patch('profile/password', [AdminProfileController::class, 'updatePassword'])->name('admin.password.update');

    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    // Doctors
    Route::get('doctors', [DoctorController::class, 'index'])->name('admin.doctors.index');
    Route::get('doctors-searh', [DoctorController::class, 'search'])->name('admin.doctors.search');
    Route::get('doctors-create', [DoctorController::class, 'create'])->name('admin.doctors.create');
    Route::post('save-doctors-create', [DoctorController::class, 'store'])->name('admin.doctors.store');
    Route::get('doctors-{doctor}/edit', [DoctorController::class, 'edit'])->name('admin.doctors.edit');
    Route::put('doctors-{doctor}', [DoctorController::class, 'update'])->name('admin.doctors.update');
    Route::delete('delete-doctor/{id}', [DoctorController::class, 'destroy'])->name('admin.doctors.delete');
    Route::patch('doctors/{id}/status', [DoctorController::class, 'updateStatus'])->name('admin.doctors.update-status');

    // Doctor Schedule
    Route::get('doctor-schedule', [SchedulesController::class, 'index'])->name('admin.schedule.index');
    Route::get('doctor-schedule-create', [SchedulesController::class, 'create'])->name('admin.schedule.create');
    Route::post('doctor-schedule-save', [SchedulesController::class, 'store'])->name('admin.schedule.store');
    Route::get('doctor-schedule-{schedule}/edit', [SchedulesController::class, 'edit'])->name('admin.schedule.edit');
    Route::put('doctor-schedule-{schedule}', [SchedulesController::class, 'update'])->name('admin.schedule.update');
    Route::delete('doctor-schedule-{schedule}', [SchedulesController::class, 'destroy'])->name('admin.schedule.delete');
    Route::get('doctor-schedule-search', [SchedulesController::class, 'search'])->name('admin.schedule.search');
    Route::patch('doctor-schedule-{id}/status', [SchedulesController::class, 'updateStatus'])->name('admin.schedule.update-status');

    // Medical Records & Notifications
    Route::resource('medical_records', MedicalRecordController::class)->names('admin.medical_records');
    Route::resource('notifications', NotificationController::class)->names('admin.notifications');



    // Bookings
    Route::get('bookings', [BookingController::class, 'index'])->name('admin.bookings.index');
    Route::get('bookings-create', [BookingController::class, 'create'])->name('admin.bookings.create');
    Route::put('bookings-{booking}', [BookingController::class, 'update'])->name('admin.bookings.update');
    Route::delete('bookings-{booking}', [BookingController::class, 'destroy'])->name('admin.bookings.delete');
    Route::get('bookings-search', [BookingController::class, 'search'])->name('admin.bookings.search');
    Route::patch('bookings/{id}/status', [BookingController::class, 'updateStatus'])->name('admin.bookings.update-status');


    // Services
    Route::get('services', [ServiceController::class, 'index'])->name('admin.services.index');
    Route::get('services-create', [ServiceController::class, 'create'])->name('admin.services.create');
    Route::post('services', [ServiceController::class, 'store'])->name('admin.services.store');
    Route::get('services-edit/{id}', [ServiceController::class, 'edit'])->name('admin.services.edit');
    Route::put('services-update/{id}', [ServiceController::class, 'update'])->name('admin.services.update');
    Route::delete('services/{id}', [ServiceController::class, 'delete'])->name('admin.services.delete');
    Route::get('services-search', [ServiceController::class, 'search'])->name('admin.services.search');
    Route::patch('services/{id}/status', [ServiceController::class, 'updateStatus'])->name('admin.services.update-status');

    // Categories
    Route::get('categories', [CategoryController::class, 'index'])->name('admin.categories.index');
    Route::get('categories/create', [CategoryController::class, 'create'])->name('admin.categories.create');
    Route::post('categories', [CategoryController::class, 'store'])->name('admin.categories.store');
    Route::get('categories/edit/{id}', [CategoryController::class, 'edit'])->name('admin.categories.edit');
    Route::put('categories/update/{id}', [CategoryController::class, 'update'])->name('admin.categories.update');
    Route::delete('doctors/{id}', [CategoryController::class, 'delete'])->name('admin.categories.delete');
    Route::get('categories/search', [CategoryController::class, 'search'])->name('admin.categories.search');

    // Posts
    Route::get('posts', [PostController::class, 'index'])->name('admin.posts.index');
    Route::get('posts/create', [PostController::class, 'create'])->name('admin.posts.create');
    Route::post('posts', [PostController::class, 'store'])->name('admin.posts.store');
    Route::delete('posts/{id}', [PostController::class, 'delete'])->name('admin.posts.delete');
    Route::get('post/edit/{id}', [PostController::class, 'edit'])->name('admin.posts.edit');
    Route::put('posts/update/{id}', [PostController::class, 'update'])->name('admin.posts.update');
    Route::get('posts/search-category', [PostController::class, 'searchCategory'])->name('admin.posts.searchCategory');
    Route::get('posts/search-author', [PostController::class, 'searchAuthor'])->name('admin.posts.searchAuthor');

    // Users
    Route::get('users', [UserController::class, 'index'])->name('admin.users.index');
    Route::get('users/create', [UserController::class, 'create'])->name('admin.users.create');
    Route::post('users/store', [UserController::class, 'store'])->name('admin.users.store');
    Route::delete('users/delete/{id}', [UserController::class, 'delete'])->name('admin.users.delete');
    Route::get('users/edit/{id}', [UserController::class, 'edit'])->name('admin.users.edit');
    Route::put('users/update/{id}', [UserController::class, 'update'])->name('admin.users.update');

    // Guests
    Route::get('guests', [GuestController::class, 'index'])->name('admin.guests.index');
    Route::get('guests/create', [GuestController::class, 'create'])->name('admin.guests.create');
    Route::post('guests', [GuestController::class, 'store'])->name('admin.guests.store');
    Route::delete('guests/delete/{id}', [GuestController::class, 'delete'])->name('admin.guests.delete');
    Route::get('guests/edit/{id}', [GuestController::class, 'edit'])->name('admin.guests.edit');
    Route::put('guests/update/{id}', [GuestController::class, 'update'])->name('admin.guests.update');

    // System Settings
    Route::get('systems/edit', [SystemController::class, 'edit'])->name('admin.systems.edit');
    Route::put('systems/update', [SystemController::class, 'update'])->name('admin.systems.update');
    Route::get('systems/banner', [SystemController::class, 'editBanner'])->name('admin.systems.editBanner');
    Route::post('systems/banner', [SystemController::class, 'updateBanner'])->name('admin.systems.updateBanner');

    // Invoices & Details
    Route::get('invoices', [InvoiceController::class, 'index'])->name('admin.invoices.index');
    Route::get('invoices/create', [InvoiceController::class, 'create'])->name('admin.invoices.create');
    Route::post('invoices', [InvoiceController::class, 'store'])->name('admin.invoices.store');
    Route::get('invoices/{id}/edit', [InvoiceController::class, 'edit'])->name('admin.invoices.edit');
    Route::put('invoices/{id}', [InvoiceController::class, 'update'])->name('admin.invoices.update');
    Route::delete('invoices/{id}', [InvoiceController::class, 'delete'])->name('admin.invoices.delete');
    Route::patch('/admin/invoices/{id}/status', [InvoiceController::class, 'updateStatus'])->name('admin.invoices.updateStatus');

    Route::get('invoice-details', [InvoiceDetailController::class, 'index'])->name('invoice_details.index');
    Route::get('invoice-details/create', [InvoiceDetailController::class, 'create'])->name('invoice_details.create');
    Route::post('invoice-details', [InvoiceDetailController::class, 'store'])->name('invoice_details.store');
    Route::get('invoice-details/{id}/edit', [InvoiceDetailController::class, 'edit'])->name('invoice_details.edit');
    Route::put('invoice-details/{id}', [InvoiceDetailController::class, 'update'])->name('invoice_details.update');
    Route::delete('invoice-details/{id}', [InvoiceDetailController::class, 'delete'])->name('invoice_details.delete');

    // Feedback
    Route::get('feedback', [FeedbackController::class, 'index'])->name('admin.feedback.index');
    Route::get('feedback/create', [FeedbackController::class, 'create'])->name('admin.feedback.create');
    Route::post('feedback', [FeedbackController::class, 'store'])->name('admin.feedback.store');
    Route::get('feedback/{id}/edit', [FeedbackController::class, 'edit'])->name('admin.feedback.edit');
    Route::put('feedback/{id}', [FeedbackController::class, 'update'])->name('admin.feedback.update');
    Route::delete('feedback/{id}', [FeedbackController::class, 'delete'])->name('admin.feedback.delete');

    // Specialties
    Route::get('specialties', [SpecialtyController::class, 'index'])->name('admin.specialties.index');
    Route::get('specialties/create', [SpecialtyController::class, 'create'])->name('admin.specialties.create');
    Route::post('specialties', [SpecialtyController::class, 'store'])->name('admin.specialties.store');
    Route::get('specialties/{id}/edit', [SpecialtyController::class, 'edit'])->name('admin.specialties.edit');
    Route::put('specialties/{id}', [SpecialtyController::class, 'update'])->name('admin.specialties.update');
    Route::delete('specialties/{id}', [SpecialtyController::class, 'delete'])->name('admin.specialties.delete');
    Route::get('specialties/{id}', [SpecialtyController::class, 'show'])->name('admin.specialties.show');
    Route::put('/admin/specialties/{id}/status', [SpecialtyController::class, 'updateStatus'])->name('admin.specialties.updateStatus');


    // Reports
    Route::get('report', [ReportController::class, 'index'])->name('admin.report.index');
    Route::get('report/export', [ReportController::class, 'export'])->name('admin.report.export');

    // Doctor Services & Specialties
    Route::get('doctor-service', [DoctorServiceController::class, 'index'])->name('admin.doctor_service.index');
    Route::get('doctor-service-search', [DoctorServiceController::class, 'search'])->name('admin.doctor_service.search'); // Add this line
    Route::get('doctor-service/create', [DoctorServiceController::class, 'create'])->name('admin.doctor_service.create');
    Route::post('doctor-service', [DoctorServiceController::class, 'store'])->name('admin.doctor_service.store');
    Route::get('doctor-service/{id}/edit', [DoctorServiceController::class, 'edit'])->name('admin.doctor_service.edit');
    Route::put('doctor-service/{id}', [DoctorServiceController::class, 'update'])->name('admin.doctor_service.update');
    Route::delete('doctor-service-deleted/{id}', [DoctorServiceController::class, 'destroy'])->name('admin.doctor_service.destroy');
    Route::resource('doctor_specialties', DoctorSpecialtyController::class);
});
// Auth routes
require __DIR__ . '/auth.php';
