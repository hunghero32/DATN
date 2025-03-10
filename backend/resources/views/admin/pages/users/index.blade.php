@extends('admin.index')

@section('title', 'Danh sách người dùng')

@section('content')
    <div class="content-wrapper">
        <div class="container-xxl">
            <h4 class="fw-bold py-3 mb-4">Danh sách người dùng</h4>

            <!-- Thanh tìm kiếm & bộ lọc -->
            <form action="{{ route('admin.users.index') }}" method="GET" class="mb-4">
                <div class="row">
                    <div class="col-md-4">
                        <input type="text" name="search" class="form-control" placeholder="Tìm kiếm theo tên, email, SĐT"
                            value="{{ request('search') }}">
                    </div>
                    <div class="col-md-3">
                        <select name="role" class="form-control">
                            <option value="">-- Chọn vai trò --</option>
                            <option value="admin" {{ request('role') == 'admin' ? 'selected' : '' }}>Admin</option>
                            <option value="doctor" {{ request('role') == 'doctor' ? 'selected' : '' }}>Doctor</option>
                            <option value="guest" {{ request('role') == 'guest' ? 'selected' : '' }}>Guest</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <input type="date" name="created_at" class="form-control" value="{{ request('created_at') }}">
                    </div>
                    <div class="col-md-2">
                        <button type="submit" class="btn btn-primary">Lọc</button>
                    </div>
                </div>
            </form>
            <div class="text-end mb-3">
                <a href="{{ route('admin.users.create') }}" class="btn btn-success">Thêm mới</a>
            </div>

            <!-- Bảng danh sách người dùng -->
            <div class="card">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead class="table-dark">
                            <tr>
                                <th>STT</th>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>SĐT</th>
                                <th>Vai trò</th>
                                <th>Ngày tạo</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($users as $user)
                                <tr>
                                    {{-- <td>{{ $user->id }}</td> --}}
                                    <td>{{ ($users->currentPage() - 1) * $users->perPage() + $loop->iteration }}</td>

                                    <td>{{ $user->name }}</td>
                                    <td>{{ $user->email }}</td>
                                    <td>{{ $user->phone }}</td>
                                    <td>{{ $user->role ?? 'Không có vai trò' }}</td>
                                    <td>{{ $user->created_at->format('d-m-Y') }}</td>
                                    <td>
                                        <a href="{{ route('admin.users.edit', $user->id) }}"
                                            class="btn btn-primary btn-sm">Sửa</a>
                                        <form action="{{ route('admin.users.delete', $user->id) }}" method="POST"
                                            onsubmit="return confirm('Bạn có chắc không?')" class="d-inline">
                                            @csrf
                                            @method('DELETE')
                                            <button class="btn btn-danger btn-sm">Xóa</button>
                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                <!-- Phân trang -->
                <div class="card-footer">
                    {{ $users->links() }}
                </div>
            </div>
        </div>
    </div>
@endsection
