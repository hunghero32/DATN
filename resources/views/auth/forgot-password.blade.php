@extends('layouts.guest')
@section('title', 'Đăng Nhập')
@section('content')
<div class="container-xxl">
    <div class="authentication-wrapper authentication-basic container-p-y">
        <div class="authentication-inner py-4">
            <!-- Forgot Password -->
            <div class="card">
                <div class="card-body">
                    <h4 class="mb-2">Quên Mật Khẩu ? 🔒</h4>
                    <p class="mb-4">Hãy nhập email để lấy lại mật khẩu</p>
                    <form id="formAuthentication" class="mb-3" method="POST" action="{{ route('password.email') }}">
                        @csrf
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input
                                type="text"
                                class="form-control"
                                id="email"
                                name="email"
                                placeholder="Email của bạn"
                                autofocus />
                            @if ($errors->has('email'))
                            <span class="text-danger small">{{ $errors->first('email') }}</span>
                            @endif
                        </div>
                        <button class="btn btn-primary d-grid w-100">Đặt lại mật khẩu</button>
                    </form>
                    <div class="text-center">
                        <a href="{{ route('login') }}" class="d-flex align-items-center justify-content-center">
                            <i class="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
                            Về trang đăng nhập
                        </a>
                    </div>
                </div>
            </div>
            <!-- /Forgot Password -->
        </div>
    </div>
</div>
@endsection