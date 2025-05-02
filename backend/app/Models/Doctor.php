<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Services\NotificationService;

class Doctor extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'doctor_avatar',
        'doctor_name',
        'doctor_bio',
        'specialty_id',
        'exp',
        'file',
        'approve',
        'isDeleted'
    ];

    // In app/Models/Doctor.php
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Quan hệ với bảng Specialty
    public function specialty()
    {
        return $this->belongsTo(Specialty::class);
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'doctor_id', 'id');
    }

    public function services()
    {
        return $this->belongsToMany(Services::class, 'doctor_service', 'doctor_id', 'service_id');
    }

    // Định nghĩa mối quan hệ với bảng doctor_service
    public function doctorServices()
    {
        return $this->hasMany(DoctorService::class, 'doctor_id', 'id');
    }

    // Phương thức gửi thông báo khi tạo tài khoản bác sĩ
    public function sendAccountCreationNotification()
    {
        if (!$this->user_id) {
            \Log::error('Cannot send notification: No user_id found for doctor ID ' . $this->id);
            return false;
        }

        try {
            $user = $this->user;
            if (!$user) {
                \Log::error('Cannot send notification: User not found for doctor ID ' . $this->id);
                return false;
            }

            if (!$user->email) {
                \Log::error('Cannot send notification: User has no email for doctor ID ' . $this->id);
                return false;
            }

            $specialty = $this->specialty;

            $notificationService = app(NotificationService::class);

            $title = 'Chào mừng bạn đến với hệ thống đặt lịch khám bệnh';
            $content = '<p>Xin chào <strong>' . $this->doctor_name . '</strong>,</p>'
                     . '<p>Tài khoản bác sĩ của bạn đã được tạo thành công trên hệ thống đặt lịch khám bệnh.</p>'
                     . '<p><strong>Thông tin tài khoản:</strong></p>'
                     . '<ul>'
                     . '<li>Email: ' . $user->email . '</li>'
                     . '<li>Chuyên khoa: ' . ($specialty ? $specialty->name : 'Chưa xác định') . '</li>'
                     . '</ul>'
                     . '<p>Vui lòng đăng nhập vào hệ thống để cập nhật thông tin và quản lý lịch khám của bạn.</p>'
                     . '<p>Lưu ý: Tài khoản của bạn đang chờ được phê duyệt từ quản trị viên.</p>';

            \Log::info('Attempting to send account creation notification to doctor ID ' . $this->id . ' with email ' . $user->email);

            return $notificationService->sendNotification(
                $user->id,
                $title,
                $content,
                'account_created',
                null,
                ['doctor_id' => $this->id]
            );
        } catch (\Exception $e) {
            \Log::error('Error sending account creation notification: ' . $e->getMessage(), [
                'doctor_id' => $this->id,
                'exception' => $e
            ]);
            return false;
        }
    }

}
