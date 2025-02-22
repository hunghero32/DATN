@extends('admin.index')
@section('title', 'Tạo mới')
@section('content')
    <div class="content-wrapper">

        <!-- Content -->

        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Settings /</span> Thêm nguoi dung</h4>

            <div class="row">
                <div class="col-md-12">
                    <div class="card mb-4">
                        <h5 class="card-header">Profile Details</h5>
                        <!-- Account -->

                        <hr class="my-0" />
                        <div class="card-body">
                            <form action="{{ route('admin.users.store') }}" method="POST" enctype="multipart/form-data">
                                @csrf

                                <div class="row mt-3">
                                    <div class="mb-3 col-md-12">

                                        <div class="d-flex align-items-start align-items-sm-center gap-4">

                                            <div class="button-wrapper">

                                            </div>
                                        </div>

                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="title" class="form-label">NAME</label>
                                        <input type="text" class="form-control" id="name" name="name"
                                            value="" placeholder=" vui long nhap ten">
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="title" class="form-label">email</label>
                                        <input type="text" class="form-control" id="email" name="email"
                                            value="" placeholder=" vui long nhap email">
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="phone" class="form-label">phone</label>
                                        <input type="text" class="form-control" id="phone" name="phone"
                                            value="" placeholder="vui long nhap so dien thoai">
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="phone" class="form-label">password</label>
                                        <input type="password" class="form-control" id="password" name="password"
                                            value="" placeholder=" vui long nhap password">
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="role" class="form-label">Trạng thái</label>
                                        <select id="role" name="role" class="select2 form-select">
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

    </div>
@endsection
