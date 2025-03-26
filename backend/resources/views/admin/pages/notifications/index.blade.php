@extends('admin.index')

@section('title', 'Danh sách thông báo')

@section('content')

    <div class="content-wrapper">

        <div class="container-xxl flex-grow-1 container-p-y">

            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Thông báo /</span> Danh sách</h4>

            <div class="card">

                <div class="card-header d-flex justify-content-between">
                    <h5 class="mb-0">Danh sách thông báo</h5>
                    <a href="{{ route('admin.notifications.create') }}" class="btn btn-success">Thêm mới</a>
                </div>

                <div class="card-body">

                    <form method="GET" action="{{ route('admin.notifications.index') }}" class="row g-3">
                        <div class="col-md-4">
                            <input type="text" name="search" class="form-control"
                                placeholder="Tìm theo Tiêu đề hoặc Nội dung" value="{{ request('search') }}">
                        </div>

                        <div class="col-md-3">
                            <select class="form-control" name="type">
                                <option value="">-- Loại thông báo --</option>
                                <option value="info">Thông tin</option>
                                <option value="warning">Cảnh báo</option>
                            </select>
                        </div>

                        <div class="col-md-2">
                            <select class="form-control" name="is_read">
                                <option value="">-- Trạng thái --</option>
                                <option value="1">Đã đọc</option>
                                <option value="0">Chưa đọc</option>
                            </select>
                        </div>

                        <div class="col-md-2">
                            <button type="submit" class="btn btn-primary">Tìm kiếm</button>
                        </div>

                        @if (request('search') || request('type') || request('is_read'))
                            <div class="col-md-2">
                                <a href="{{ route('admin.notifications.index') }}" class="btn btn-secondary">Quay lại</a>
                            </div>
                        @endif
                    </form>

                </div>

                <div class="table-responsive">

                    <table class="table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Người dùng</th>
                                <th>Đặt lịch</th>
                                <th>Loại</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>

                        <tbody>

                            @foreach ($data as $notification)
                                <tr>
                                    <td>{{ ($data->currentPage() - 1) * $data->perPage() + $loop->iteration }}</td>
                                    <td>{{ $notification->user->name ?? 'N/A' }}</td>
                                    <td>{{ $notification->booking_id ?? 'N/A' }}</td>
                                    <td>{{ $notification->type }}</td>
                                    <td>{{ $notification->is_read ? 'Đã đọc' : 'Chưa đọc' }}</td>
                                    <td>
                                        <a href="{{ route('admin.notifications.show', $notification->id) }}" class="btn btn-info btn-sm">Chi tiết</a>
                                        <a href="{{ route('admin.notifications.edit', $notification->id) }}" class="btn btn-warning btn-sm">Sửa</a>
                                        <form action="{{ route('admin.notifications.destroy', $notification->id) }}" method="POST" class="d-inline">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" onclick="return confirm('Bạn có chắc muốn xóa?')" class="btn btn-danger btn-sm">Xóa</button>
                                        </form>
                                    </td>
                                </tr>
                            @endforeach

                        </tbody>

                    </table>

                </div>

                <div class="card-footer">
                    {{ $data->appends(request()->query())->links() }}
                </div>

            </div>

        </div>

    </div>
    
@endsection
