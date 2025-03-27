@extends('admin.index')
@section('title', 'Tạo mới')
@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Settings /</span> Thêm người dùng</h4>

            <div class="row">
                <div class="col-md-12">
                    <div class="card mb-4">
                        <h5 class="card-header">Chi tiết hồ sơ</h5>
                        <hr class="my-0" />
                        <div class="card-body">
                            <form action="{{ route('admin.users.update', $user->id) }}" method="POST"
                                enctype="multipart/form-data">
                                @method('PUT')
                                @csrf

                                <div class="row mt-3">
                                    <div class="mb-3 col-md-6">
                                        <label for="name" class="form-label">Tên</label>
                                        <input type="text" class="form-control" id="name" name="name"
                                            value="{{ $user->name }}" placeholder="Vui lòng nhập tên">
                                    </div>

                                    <div class="mb-3 col-md-6">
                                        <label for="email" class="form-label">Email</label>
                                        <input type="text" class="form-control" id="email" name="email"
                                            value="{{ $user->email }}" placeholder="Vui lòng nhập email">
                                    </div>

                                    <div class="mb-3 col-md-6">
                                        <label for="phone" class="form-label">Số điện thoại</label>
                                        <input type="text" class="form-control" id="phone" name="phone"
                                            value="{{ $user->phone }}" placeholder="Vui lòng nhập số điện thoại">
                                    </div>

                                    <div class="mb-3 col-md-6">
                                        <label for="role" class="form-label">Trạng thái</label>
                                        <select id="role" name="role" class="form-select">
                                            @foreach ($role as $key => $value)
                                                <option value="{{ $key }}"
                                                    {{ (isset($user) && $user->role == $key) || (!isset($user->id) && $key == 'user') ? 'selected' : '' }}>
                                                    {{ $value }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <div class="mt-2">
                                    <button type="submit" class="btn btn-primary me-2">Lưu thay đổi</button>
                                    <button type="reset" class="btn btn-outline-secondary">Quay lại</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
