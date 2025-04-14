@extends('admin.index')

@section('title', 'Danh sách người dùng')

@section('content')
    <div class="content-wrapper">
        <div class="container-xxl">
            <h3 class="fw-bold py-3 mb-4 text-center text-primary">📋 Danh sách Người Dùng</h3>

            <!-- Thanh tìm kiếm & bộ lọc -->
            <div class="card shadow-lg border-0 mb-4 rounded">
                <div class="card-body bg-white">
                    <form action="{{ route('admin.users.index') }}" method="GET">
                        <div class="row g-2">
                            <div class="col-md-4">
                                <div class="input-group">
                                    <span class="input-group-text bg-primary text-white"><i class="bi bi-search"></i></span>
                                    <input type="text" name="search" class="form-control"
                                        placeholder="Tìm kiếm theo tên, email, SĐT" value="{{ request('search') }}">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <select name="role" class="form-select">
                                    <option value="">-- Chọn vai trò --</option>
                                    <option value="admin" {{ request('role') == 'admin' ? 'selected' : '' }}>QUẢN TRỊ VIÊN </option>
                                    <option value="doctor" {{ request('role') == 'doctor' ? 'selected' : '' }}>BÁC SĨ
                                    </option>
                                    <option value="guest" {{ request('role') == 'guest' ? 'selected' : '' }}>BỆNH NHÂN </option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <input type="date" name="created_at" class="form-control"
                                    value="{{ request('created_at') }}">
                            </div>
                            <div class="col-md-2 d-flex gap-2">
                                <button type="submit" class="btn btn-primary w-100"><i class="bi bi-funnel"></i>
                                    Lọc</button>
                            </div>
                        </div>
                    </form>

                    <!-- Nút Quay Lại, chỉ hiển thị nếu có bộ lọc được áp dụng -->
                    @if (request('search') || request('role') || request('created_at'))
                        <div class="text-end mt-2">
                            <a href="{{ route('admin.users.index') }}" class="btn btn-secondary"><i
                                    class="bi bi-arrow-counterclockwise"></i> Quay lại</a>
                        </div>
                    @endif
                </div>
            </div>


            <!-- Nút thêm mới -->


            <!-- Bảng danh sách người dùng -->
            <div class="card shadow-lg border-1 rounded">
                <div class="d-flex justify-content-end mt-2 mb-1">
                    <a href="{{ route('admin.users.create') }}" class="btn btn-success shadow-sm px-4 py-2 fw-bold">
                        <i class="bi bi-plus-circle"></i> <span class="ms-1">Thêm Mới</span>
                    </a>
                </div>


                <div class="card-body bg-light">
                    <div class="table-responsive">
                        <table class="table table-hover table-striped table-bordered align-middle text-center rounded">
                            <thead class="table-primary">
                                <tr>
                                    <th>STT</th>
                                    <th>Tên</th>
                                    <th>Email</th>
                                    <th>SĐT</th>
                                    <th>Vai trò</th>
                                    <th>Ngày tạo</th>

                                </tr>
                            </thead>

                            <tbody class="table-light">
                                @foreach ($users as $user)
                                    <tr>
                                        <td class="fw-bold text-primary">
                                            {{ ($users->currentPage() - 1) * $users->perPage() + $loop->iteration }}
                                        </td>
                                        <td>{{ $user->name }}</td>
                                        <td>{{ $user->email }}</td>
                                        <td>{{ $user->phone }}</td>
                                        <td>
                                            <span class="badge bg-info text-dark px-3 py-2">
                                                @php
                                                    $roleMapping = [
                                                        'admin' => 'Quản trị viên',
                                                        'doctor' => 'Bác sĩ',
                                                        'guest' => 'Bệnh nhân',
                                                    ];
                                                @endphp
                                                {{ $roleMapping[$user->role] ?? 'Không có vai trò' }}
                                            </span>
                                        </td>

                                        <td>{{ $user->created_at->format('d-m-Y') }}</td>

                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Phân trang -->
                <div class="card-footer d-flex justify-content-center bg-white">
                    {{ $users->links() }}
                </div>
            </div>
        </div>
    </div>
@endsection
