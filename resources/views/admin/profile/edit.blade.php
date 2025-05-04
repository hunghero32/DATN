@extends('admin.index')

@section('title', 'Hồ sơ cá nhân')

@section('content')
<div class="container">
    <h2 class="mb-4">Hồ sơ cá nhân</h2>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <div class="row">
        <!-- Cột trái: Cập nhật thông tin -->
        <div class="col-md-6">
            <form action="{{ route('admin.profile.update') }}" method="POST" class="mb-4 border p-4 rounded shadow-sm bg-white">
                @csrf
                @method('PATCH')

                <h5 class="mb-3">Cập nhật thông tin</h5>
                <div class="mb-3">
                    <label class="form-label">Tên</label>
                    <input type="text" name="name" class="form-control" value="{{ old('name', $user->name) }}" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" name="email" class="form-control" value="{{ old('email', $user->email) }}" required>
                </div>

                <button class="btn btn-primary">Cập nhật</button>
            </form>
        </div>

        <!-- Cột phải: Đổi mật khẩu -->
        <div class="col-md-6">
            <form action="{{ route('admin.password.update') }}" method="POST" class="mb-4 border p-4 rounded shadow-sm bg-white">
                @csrf
                @method('PATCH')

                <h5 class="mb-3">Đổi mật khẩu</h5>
                <div class="mb-3">
                    <label class="form-label">Mật khẩu hiện tại</label>
                    <input type="password" name="current_password" class="form-control" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Mật khẩu mới</label>
                    <input type="password" name="password" class="form-control" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Xác nhận mật khẩu mới</label>
                    <input type="password" name="password_confirmation" class="form-control" required>
                </div>

                <button class="btn btn-warning">Đổi mật khẩu</button>
            </form>
        </div>
    </div>
</div>
@endsection
