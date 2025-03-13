@extends('admin.index')

@section('title', 'Danh sách thông báo')

@section('content')

    <form class="row g-2 mb-3" method="GET" action="{{ route('admin.notifications.index') }}">

        <div class="col-md-3">
            <input class="form-control" type="text" name="search" value="{{ request('search') }}" placeholder="Tìm theo Tiêu đề hoặc Nội dung">
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
            <button class="btn btn-primary" type="submit">Tìm kiếm</button>
        </div>

    </form>

    <a href="{{ route('admin.notifications.create') }}" class="btn btn-success mb-3">Thêm mới</a>

    <table class="table">

        <thead>

            <tr>
                <th>ID</th>
                <th>Người dùng</th>
                <th>Đặt lịch</th>
                <th>Tiêu đề</th>
                <th>Nội dung</th>
                <th>Loại</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
            </tr>
            
        </thead>
        <tbody>

            @foreach ($data as $notification)
            
                <tr>

                    <td>{{ $notification->id }}</td>
                    <td>{{ $notification->user->name ?? 'N/A' }}</td>
                    <td>{{ $notification->booking_id ?? 'N/A' }}</td>
                    <td>{{ $notification->title }}</td>
                    <td>{{ Str::limit($notification->content, 50) }}</td>
                    <td>{{ $notification->type }}</td>
                    <td>{{ $notification->is_read ? 'Đã đọc' : 'Chưa đọc' }}</td>
                    <td>
                        <a href="{{ route('admin.notifications.edit', $notification->id) }}" class="btn btn-warning btn-sm">Sửa</a>
                        <form action="{{ route('admin.notifications.destroy', $notification->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" onclick="return confirm('Bạn có chắc muốn xóa?')" class="btn btn-danger btn-sm">Xóa</button>
                        </form>
                    </td>

                </tr>

            @endforeach

        </tbody>

    </table>

    {{ $data->links() }}

@endsection
