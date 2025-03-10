@extends('admin.index')
@section('title', 'Tạo mới')
@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Settings /</span> Thêm người dùng</h4>

            <div class="row">
                <div class="col-md-12">
                    <div class="card mb-4">
                        <h5 class="card-header">Thông tin tài khoản</h5>

                        <hr class="my-0" />
                        <div class="card-body">
                           
                                <form action="{{ route('admin.users.store') }}" method="POST">
                                    @csrf

                                    @if ($errors->any())
                                        <div class="alert alert-danger">
                                            <strong>Lỗi!</strong> Vui lòng kiểm tra lại thông tin nhập vào.
                                            <ul>
                                                @foreach ($errors->all() as $error)
                                                    <li>{{ $error }}</li>
                                                @endforeach
                                            </ul>
                                        </div>
                                    @endif


                                    <div class="row mt-3">
                                        <!-- Tên -->
                                        <div class="mb-3 col-md-6">
                                            <label for="name" class="form-label">Tên</label>
                                            <input type="text" class="form-control @error('name') is-invalid @enderror"
                                                id="name" name="name" value="{{ old('name') }}"
                                                placeholder="Vui lòng nhập tên">
                                            @error('name')
                                                <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>

                                        <!-- Email -->
                                        <div class="mb-3 col-md-6">
                                            <label for="email" class="form-label">Email</label>
                                            <input type="text" class="form-control @error('email') is-invalid @enderror"
                                                id="email" name="email" value="{{ old('email') }}"
                                                placeholder="Vui lòng nhập email">
                                            @error('email')
                                                <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>

                                        <!-- Số điện thoại -->
                                        <div class="mb-3 col-md-6">
                                            <label for="phone" class="form-label">Số điện thoại</label>
                                            <input type="text" class="form-control @error('phone') is-invalid @enderror"
                                                id="phone" name="phone" value="{{ old('phone') }}"
                                                placeholder="Vui lòng nhập số điện thoại">
                                            @error('phone')
                                                <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>

                                        <!-- Mật khẩu -->
                                        <div class="mb-3 col-md-6">
                                            <label for="password" class="form-label">Mật khẩu</label>
                                            <input type="password"
                                                class="form-control @error('password') is-invalid @enderror" id="password"
                                                name="password" placeholder="Vui lòng nhập mật khẩu">
                                            @error('password')
                                                <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>

                                        <!-- Vai trò -->
                                        <div class="mb-3 col-md-6">
                                            <label for="role" class="form-label">Vai trò</label>
                                            <select id="role" name="role"
                                                class="select2 form-select @error('role') is-invalid @enderror">
                                                @foreach ($role as $key => $value)
                                                    <option value="{{ $key }}"
                                                        {{ old('role') == $key ? 'selected' : '' }}>
                                                        {{ $value }}
                                                    </option>
                                                @endforeach
                                            </select>
                                            @error('role')
                                                <div class="invalid-feedback">{{ $message }}</div>
                                            @enderror
                                        </div>
                                    </div>

                                    <div class="mt-2">
                                        <button type="submit" class="btn btn-primary me-2">Lưu thay đổi</button>
                                        <a href="{{ route('admin.users.index') }}" class="btn btn-outline-secondary">Quay
                                            lại</a>
                                    </div>
                                </form>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
