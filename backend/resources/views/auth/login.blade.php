@extends('layouts.guest')
@section('title', 'Đăng Nhập')
@section('content')
<div class="card">
    <div class="card-body">
        <!-- Logo -->
        <div class="app-brand justify-content-center">
            <a href="index.html" class="app-brand-link gap-2">
                <span class="app-brand-logo demo">
                    <span class="app-brand-text demo text-body fw-bolder">TDZ</span>
            </a>
        </div>
        <!-- /Logo -->
        <h4 class="mb-2">Welcome to TDZ! 👋</h4>
        <p class="mb-4">Đăng Nhập</p>

        <form id="formAuthentication" class="mb-3" action="{{ route('login') }}" method="POST">
            @csrf
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="text" class="form-control" id="email" name="email" placeholder="Email của bạn" value="{{ old('email') }}" required autofocus />
            </div>
            <div class="mb-3 form-password-toggle">
                <div class="d-flex justify-content-between">
                    <label class="form-label" for="password">Mật khẩu</label>
                    @if (Route::has('password.request'))
                    <a href="{{ route('password.request') }}">
                        <small>Quên mật khẩu ?</small>
                    </a>
                    @endif
                </div>
                <div class="input-group input-group-merge">
                    <input type="password" id="password" class="form-control" name="password" placeholder="********" required />
                </div>
            </div>
            <div class="mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="remember-me" name="remember" />
                    <label class="form-check-label" for="remember-me"> Ghi nhớ đăng nhập</label>
                </div>
            </div>
            <div class="mb-3">
                <button class="btn btn-primary d-grid w-100" type="submit">Đăng nhập</button>
            </div>
            <input type="hidden" name="last_login_at" value="{{ now() }}" />
        </form>
        {{-- <a href="{{ route('facebook.login') }}" class="btn btn-primary">Login with Facebook</a>
        <a href="{{ route('google.login') }}" class="btn btn-danger">Login with Google</a> --}}
        <p class="text-center">
            <span>Bạn chưa có tài khoản ?</span>
            <a href="{{ route('register') }}">
                <span>Đăng Ký</span>
            </a>
        </p>

    </div>
</div>
@endsection