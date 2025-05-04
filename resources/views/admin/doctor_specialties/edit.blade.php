@extends('layouts.app')

@section('content')
<div class="container my-5">
    <div class="card">
        <div class="card-header">
            <h2 class="mb-0">Chỉnh sửa hồ sơ người dùng</h2>
        </div>
        <div class="card-body">
            <form action="{{ route('admin.users.update', $user->id) }}" method="POST">
                @csrf
                @method('PUT')

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="name" class="form-label">Tên:</label>
                        <input type="text" name="name" id="name" value="{{ old('name', $user->name) }}" class="form-control @error('name') is-invalid @enderror" required>
                        @error('name')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="col-md-6">
                        <label for="email" class="form-label">Email:</label>
                        <input type="email" name="email" id="email" value="{{ old('email', $user->email) }}" class="form-control @error('email') is-invalid @enderror" required>
                        @error('email')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="phone" class="form-label">Số điện thoại:</label>
                        <input type="text" name="phone" id="phone" value="{{ old('phone', $user->phone) }}" class="form-control @error('phone') is-invalid @enderror">
                        @error('phone')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="col-md-6">
                        <label for="role" class="form-label">Vai trò:</label>
                        <select name="role" id="role" class="form-select @error('role') is-invalid @enderror" required>
                            <option value="guest" {{ old('role', $user->role) == 'guest' ? 'selected' : '' }}>Khách</option>
                            <option value="regular" {{ old('role', $user->role) == 'regular' ? 'selected' : '' }}>Thường</option>
                            <option value="premium" {{ old('role', $user->role) == 'premium' ? 'selected' : '' }}>Cao cấp</option>
                            <option value="vip" {{ old('role', $user->role) == 'vip' ? 'selected' : '' }}>VIP</option>
                            <option value="manage" {{ old('role', $user->role) == 'manage' ? 'selected' : '' }}>Manage</option>
                            <option value="admin" {{ old('role', $user->role) == 'admin' ? 'selected' : '' }}>Admin</option>
                        </select>
                        @error('role')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="balance" class="form-label">Số dư:</label>
                        <input type="number" name="balance" id="balance" value="{{ old('balance', $user->balance) }}" class="form-control @error('balance') is-invalid @enderror" required>
                        @error('balance')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="col-md-6">
                        <label for="two_factor_enabled" class="form-label">Xác thực 2 yếu tố:</label>
                        <select name="two_factor_enabled" id="two_factor_enabled" class="form-select @error('two_factor_enabled') is-invalid @enderror">
                            <option value="1" {{ old('two_factor_enabled', $user->two_factor_enabled) == 1 ? 'selected' : '' }}>Đã bật</option>
                            <option value="0" {{ old('two_factor_enabled', $user->two_factor_enabled) == 0 ? 'selected' : '' }}>Chưa bật</option>
                        </select>
                        @error('two_factor_enabled')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="email_verified_at" class="form-label">Xác minh email:</label>
                        <input type="text" name="email_verified_at" id="email_verified_at" value="{{ old('email_verified_at', $user->email_verified_at) }}" class="form-control" readonly>
                    </div>
                    <div class="col-md-6">
                        <label for="social_provider" class="form-label">Nhà cung cấp mạng xã hội:</label>
                        <input type="text" name="social_provider" id="social_provider" value="{{ old('social_provider', $user->social_provider) }}" class="form-control" readonly>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-12">
                        <label for="preferences" class="form-label">Tùy chọn:</label>
                        <textarea name="preferences" id="preferences" class="form-control @error('preferences') is-invalid @enderror" rows="3">{{ old('preferences', json_encode($user->preferences)) }}</textarea>
                        @error('preferences')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>
                <div class="d-flex justify-content-between">

                    <div class="d-flex">
                    <button type="submit" class="btn btn-danger me-2" id="generatePasswordBtn">Đổi mật khẩu</button>
                        <a href="{{ route('admin.users.index') }}" class="btn btn-secondary">Hủy</a>
                    </div>
                    <button type="submit" class="btn btn-primary">Cập nhật</button>
                </div>
                <input type="hidden" name="password" id="password">
            </form>
        </div>
    </div>
</div>
<script>
    // Khi nhấn nút "Đổi mật khẩu", hiển thị cửa sổ xác nhận
    document.getElementById('generatePasswordBtn').addEventListener('click', function() {
        // Hiển thị cửa sổ xác nhận
        if (confirm("Bạn có chắc chắn muốn thay đổi mật khẩu? Một mật khẩu mới sẽ được tạo tự động.")) {
            var randomPassword = generateRandomPassword();
            document.getElementById('password').value = randomPassword; // Điền mật khẩu ngẫu nhiên vào trường ẩn
            alert('Mật khẩu mới đã được tạo: ' + randomPassword); // Thông báo mật khẩu mới đã được tạo

            // Tự động gửi form sau khi xác nhận thay đổi mật khẩu
            document.querySelector('form').submit();
        } else {
            // Nếu người dùng chọn "Hủy", không làm gì cả
            return false;
        }
    });

    // Hàm tạo mật khẩu ngẫu nhiên
    function generateRandomPassword() {
        var length = 10; // Độ dài mật khẩu
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"; // Tập ký tự có thể sử dụng
        var password = "";
        for (var i = 0; i < length; i++) {
            var randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }
</script>
@endsection
