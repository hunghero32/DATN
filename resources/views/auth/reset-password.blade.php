@extends('layouts.guest')
@section('title', 'Đặt Lại Mật Khẩu')
@section('content')
<div class="container-xxl">
    <div class="authentication-wrapper authentication-basic container-p-y">
        <div class="authentication-inner py-4">
            <!-- Reset Password -->
            <div class="card">
                <div class="card-body">
                    <h4 class="mb-2">Đặt Lại Mật Khẩu 🔒</h4>
                    <p class="mb-4">Hãy nhập thông tin bên dưới để đặt lại mật khẩu của bạn.</p>

                    <form id="formAuthentication" class="mb-3" method="POST" action="{{ route('password.store') }}">
                        @csrf

                        <!-- Password Reset Token -->
                        <input type="hidden" name="token" value="{{ $request->route('token') }}">

                        <!-- Email Address -->
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input 
                                type="email" 
                                class="form-control" 
                                id="email" 
                                name="email" 
                                value="{{ old('email', $request->email) }}" 
                                required 
                                autofocus 
                                placeholder="Nhập địa chỉ email" />
                            @if ($errors->has('email'))
                                <span class="text-danger small">{{ $errors->first('email') }}</span>
                            @endif
                        </div>

                        <!-- Password -->
                        <div class="mb-3">
                            <label for="password" class="form-label">Mật Khẩu</label>
                            <input 
                                type="password" 
                                class="form-control" 
                                id="password" 
                                name="password" 
                                required 
                                autocomplete="new-password" 
                                placeholder="Nhập mật khẩu mới" />
                            @if ($errors->has('password'))
                                <span class="text-danger small">{{ $errors->first('password') }}</span>
                            @endif
                        </div>

                        <!-- Confirm Password -->
                        <div class="mb-3">
                            <label for="password_confirmation" class="form-label">Xác Nhận Mật Khẩu</label>
                            <input 
                                type="password" 
                                class="form-control" 
                                id="password_confirmation" 
                                name="password_confirmation" 
                                required 
                                autocomplete="new-password" 
                                placeholder="Nhập lại mật khẩu" />
                            @if ($errors->has('password_confirmation'))
                                <span class="text-danger small">{{ $errors->first('password_confirmation') }}</span>
                            @endif
                        </div>

                        <button class="btn btn-primary d-grid w-100" type="submit">Đặt Lại Mật Khẩu</button>
                    </form>

                    <div class="text-center">
                        <a href="{{ route('login') }}" class="d-flex align-items-center justify-content-center">
                            <i class="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
                            Quay Lại Đăng Nhập
                        </a>
                    </div>
                </div>
            </div>
            <!-- /Reset Password -->
        </div>
    </div>
</div>
@endsection
