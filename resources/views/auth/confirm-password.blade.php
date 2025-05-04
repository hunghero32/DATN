@extends('layouts.guest')
@section('title', 'Đăng Nhập')
@section('content')
<div class="row justify-content-center">
    <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
                <!-- Nested Row within Card Body -->
                <div class="row">
                    <div class="col-lg-6 d-none d-lg-block bg-password-confirm-image"></div>
                    <div class="col-lg-6">
                        <div class="p-5">
                            <div class="text-center">
                                <h1 class="h4 text-gray-900 mb-4">Confirm Your Password</h1>
                                <p class="mb-4">
                                    {{ __('This is a secure area of the application. Please confirm your password before continuing.') }}
                                </p>
                            </div>
                            <!-- Form for Password Confirmation -->
                            <form method="POST" action="{{ route('password.confirm') }}" class="user">
                                @csrf
                                <div class="form-group">
                                    <input type="password" name="password" class="form-control form-control-user"
                                        id="password" placeholder="Enter your password..." required>
                                    @error('password')
                                        <span class="text-danger small">{{ $message }}</span>
                                    @enderror
                                </div>
                                <button type="submit" class="btn btn-primary btn-user btn-block">
                                    {{ __('Confirm') }}
                                </button>
                            </form>
                            <hr>
                            <div class="text-center">
                                <a class="small" href="{{ route('login') }}">Back to Login</a>
                            </div>
                            <div class="text-center">
                                <a class="small" href="{{ route('register') }}">Create an Account</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection