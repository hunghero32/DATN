@extends('layouts.app')

@section('content')
<div class="container my-5">
    <div class="card">
        <div class="card-header">
            <h2 class="mb-0 text-center text-primary">Thêm Người Dùng Mới</h2>
        </div>
        <div class="card-body">
            <form action="{{ route('admin.users.store') }}" method="POST" class="needs-validation" novalidate>
                @csrf

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="name" class="form-label">Tên:</label>
                        <input type="text" id="name" name="name" class="form-control @error('name') is-invalid @enderror" value="{{ old('name') }}" placeholder="Nhập tên người dùng" required>
                        @error('name')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="col-md-6">
                        <label for="email" class="form-label">Email:</label>
                        <input type="email" id="email" name="email" class="form-control @error('email') is-invalid @enderror" value="{{ old('email') }}" placeholder="Nhập email" required>
                        @error('email')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="phone" class="form-label">Số Điện Thoại:</label>
                        <input type="text" id="phone" name="phone" class="form-control @error('phone') is-invalid @enderror" value="{{ old('phone') }}" placeholder="Nhập số điện thoại">
                        @error('phone')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="col-md-6">
                        <label for="role" class="form-label">Vai Trò:</label>
                        <select id="role" name="role" class="form-select @error('role') is-invalid @enderror" required>
                            <option value="" disabled selected>Chọn vai trò</option>
                            <option value="guest" {{ old('role') == 'guest' ? 'selected' : '' }}>Khách</option>
                            <option value="regular" {{ old('role') == 'regular' ? 'selected' : '' }}>Thường</option>
                            <option value="premium" {{ old('role') == 'premium' ? 'selected' : '' }}>Cao cấp</option>
                            <option value="vip" {{ old('role') == 'vip' ? 'selected' : '' }}>VIP</option>
                            <option value="manage" {{ old('role') == 'manage' ? 'selected' : '' }}>Manage</option>
                            <option value="admin" {{ old('role') == 'admin' ? 'selected' : '' }}>Admin</option>
                        </select>
                        @error('role')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="balance" class="form-label">Số Dư:</label>
                        <input type="number" id="balance" name="balance" class="form-control @error('balance') is-invalid @enderror" value="{{ old('balance', 0) }}" placeholder="Nhập số dư" required>
                        @error('balance')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="col-md-6">
                        <label for="two_factor_enabled" class="form-label">Xác Thực 2 Yếu Tố:</label>
                        <select id="two_factor_enabled" name="two_factor_enabled" class="form-select @error('two_factor_enabled') is-invalid @enderror" required>
                            <option value="1" {{ old('two_factor_enabled') == 1 ? 'selected' : '' }}>Đã bật</option>
                            <option value="0" {{ old('two_factor_enabled') == 0 ? 'selected' : '' }}>Chưa bật</option>
                        </select>
                        @error('two_factor_enabled')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="password" class="form-label">Mật Khẩu:</label>
                        <input type="password" id="password" name="password" class="form-control @error('password') is-invalid @enderror" placeholder="Nhập mật khẩu" required>
                        @error('password')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="col-md-6">
                        <label for="password_confirmation" class="form-label">Xác Nhận Mật Khẩu:</label>
                        <input type="password" id="password_confirmation" name="password_confirmation" class="form-control @error('password_confirmation') is-invalid @enderror" placeholder="Xác nhận mật khẩu" required>
                        @error('password_confirmation')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-12">
                        <label for="preferences" class="form-label">Tùy Chọn:</label>
                        <textarea id="preferences" name="preferences" class="form-control @error('preferences') is-invalid @enderror" rows="3" placeholder="Nhập các tùy chọn cá nhân">{{ old('preferences') }}</textarea>
                        @error('preferences')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div class="d-flex justify-content-between mt-4">
                    <button type="submit" class="btn btn-primary btn-lg px-5">Thêm Người Dùng</button>
                    <a href="{{ route('admin.users.index') }}" class="btn btn-secondary btn-lg px-5">Hủy</a>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
