@extends('layouts.guest')
@section('title', 'Xác Minh Email')
@section('content')
<div class="container-xxl">
    <div class="authentication-wrapper authentication-basic container-p-y">
        <div class="authentication-inner py-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="mb-2">Xác Minh Email 🔒</h4>
                    <p class="mb-4">
                        Cảm ơn bạn đã đăng ký! Trước khi bắt đầu, vui lòng xác minh email của bạn bằng cách nhấp vào liên kết chúng tôi vừa gửi. 
                        Nếu bạn chưa nhận được email, chúng tôi sẽ gửi lại.
                    </p>

                    @if (session('status') == 'verification-link-sent')
                        <div class="alert alert-success mb-4">
                            Một liên kết xác minh mới đã được gửi đến email của bạn.
                        </div>
                    @endif

                    <div class="d-flex justify-content-between align-items-center mt-4">
                        <!-- Resend Verification Email -->
                        <form method="POST" action="{{ route('verification.send') }}" class="d-inline">
                            @csrf
                            <button class="btn btn-primary">
                                Gửi Lại Email Xác Minh
                            </button>
                        </form>

                        <!-- Log Out -->
                        <form method="POST" action="{{ route('logout') }}" class="d-inline">
                            @csrf
                            <button type="submit" class="btn btn-secondary">
                                Đăng Xuất
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
