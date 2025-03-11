@extends('admin.index')

@section('title', 'Thêm khách mời')

@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Khách mời /</span> Thêm khách mời</h4>

            <div class="card">
                <div class="card-body">
                    <form action="{{ route('admin.guests.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        <div class="row">
                            <div class="mb-3 col-md-6">
                                <label for="user_id" class="form-label">Người dùng</label>
                                <select id="user_id" name="user_id" class="form-control">
                                    <option value="">-- Chọn người dùng --</option>
                                    @foreach ($users as $user)
                                        <option value="{{ $user->id }}">{{ $user->name }}</option>
                                    @endforeach
                                </select>
                            </div>

                            <div class="mb-3 col-md-6">
                                <label for="guest_name" class="form-label">Tên khách mời</label>
                                <input type="text" class="form-control" id="guest_name" name="guest_name" required>
                            </div>

                            <div class="mb-3 col-md-6">
                                <label for="gender" class="form-label">Giới tính</label>
                                <select id="gender" name="gender" class="form-control">
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                    <option value="other">Khác</option>
                                </select>
                            </div>

                            <div class="mb-3 col-md-6">
                                <label for="birthday" class="form-label">Ngày sinh</label>
                                <input type="date" class="form-control" id="birthday" name="birthday">
                            </div>

                            <div class="mb-3 col-md-6">
                                <label for="guest_phone" class="form-label">Số điện thoại</label>
                                <input type="text" class="form-control" id="guest_phone" name="guest_phone">
                            </div>

                            <div class="mb-3 col-md-6">
                                <label for="guest_email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="guest_email" name="guest_email">
                            </div>

                            <div class="mb-3 col-md-6">
                                <label for="address" class="form-label">Địa chỉ</label>
                                <textarea class="form-control" id="address" name="address" rows="3"></textarea>

                            </div>

                            <div class="mb-3 col-md-6">
                                <label for="file" class="form-label">Tệp đính kèm</label>
                                <input type="file" class="form-control" id="file" name="file">
                            </div>
                        </div>

                        <div class="mt-3">
                            <button type="submit" class="btn btn-primary">Lưu</button>
                            <a href="{{ route('admin.guests.index') }}" class="btn btn-secondary">Quay lại</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
