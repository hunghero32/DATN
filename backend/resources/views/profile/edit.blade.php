@extends('layouts.app')
@section('title', 'Account Settings')
@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
    <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Account Settings /</span> Account</h4>

    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <!-- Thẻ bên trái -->
                <div class="col-12 col-md-6 mb-3 mb-md-0">
                    <div class="card shadow-sm">
                        <div class="card-body text-center">
                            <h5 class="card-title mb-0">Số Dư Hiện Tại</h5>
                        </div>
                    </div>
                </div>
                <!-- Thẻ bên phải -->
                <div class="col-12 col-md-6 mb-3 mb-md-0">
                <div class="card shadow-sm">
                        <div class="card-body text-center">
                            <h5 class="card-title mb-0">{{ number_format(Auth::user()->balance ?? 0) }}đ</h5>
                        </div>
                    </div>
                </div>
            </div>
<br>
            <!-- Update Profile Information -->
            @include('profile.partials.update-profile-information-form')<br>
            <!-- Update Password -->
            @include('profile.partials.update-password-form')<br>
            <!-- Delete User -->
            <!-- @include('profile.partials.delete-user-form')<br> -->
        </div>
    </div>
</div>
@endsection