@extends('layouts.guest')
@section('title', 'Đăng Ký')
@section('content')
<div class="card">
    <div class="card-body">
        <!-- Logo -->
        <div class="app-brand justify-content-center">
            <a href="/" class="app-brand-link gap-2">
                <span class="app-brand-logo demo">
                    <svg width="25" viewBox="0 0 25 42" xmlns="http://www.w3.org/2000/svg">
                        <!-- SVG logo content -->
                    </svg>
                </span>
                <span class="app-brand-text demo text-body fw-bolder">TDZ</span>
            </a>
        </div>
        <!-- /Logo -->
        <h4 class="mb-2">Đăng Ký Ngay 🚀</h4>
        <p class="mb-4">TDZ group</p>

        <form id="formAuthentication" class="mb-3" method="POST" action="{{ route('register') }}">
            @csrf
            <!-- Tên -->
            <div class="mb-3">
                <label for="name" class="form-label">Tên</label>
                <input type="text" class="form-control" id="name" name="name" placeholder="Nhập tên của bạn" value="{{ old('name') }}" required autofocus>
            </div>

            <!-- Email -->
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" name="email" placeholder="Nhập email của bạn" value="{{ old('email') }}" required>
            </div>

            <!-- Số điện thoại -->
            <div class="mb-3">
                <label for="phone" class="form-label">Số điện thoại (Tùy chọn)</label>
                <input type="text" class="form-control" id="phone" name="phone" placeholder="Nhập số điện thoại của bạn" value="{{ old('phone') }}">
            </div>

            <!-- Mật khẩu -->
            <div class="mb-3 form-password-toggle">
                <label class="form-label" for="password">Mật khẩu</label>
                <div class="input-group input-group-merge">
                    <input type="password" id="password" class="form-control" name="password" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" required>
                    <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
                </div>
            </div>

            <!-- Xác nhận mật khẩu -->
            <div class="mb-3 form-password-toggle">
                <label class="form-label" for="password_confirmation">Xác nhận mật khẩu</label>
                <div class="input-group input-group-merge">
                    <input type="password" id="password_confirmation" class="form-control" name="password_confirmation" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" required>
                </div>
            </div>

            <button type="submit" class="btn btn-primary d-grid w-100">Đăng ký</button>
        </form>

        <p class="text-center">
            <span>Đã có tài khoản?</span>
            <a href="{{ route('login') }}">
                <span>Đăng nhập ngay</span>
            </a>
        </p>
    </div>
</div>
@endsection
