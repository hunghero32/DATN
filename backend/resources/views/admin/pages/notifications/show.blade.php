@extends('admin.index')

@section('content')

<div class="container mt-4">

    <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Thông báo /</span> Chi tiết</h4>

    <div class="card">

        <div class="card-body">
            <p><strong>ID:</strong> {{ $data->id }}</p>
            <p><strong>Người dùng:</strong> {{ $data->user->name ?? 'N/A' }}</p>
            <p><strong>Đặt lịch:</strong> {{ $data->booking_id ?? 'N/A' }}</p>
            <p><strong>Tiêu đề:</strong> {{ strip_tags($data->title) }}</p>
            <p><strong>Nội dung:</strong> {{ strip_tags($data->content) }}</p>
            <p><strong>Loại:</strong> {{ $data->type }}</p>
            <p><strong>Trạng thái:</strong> {{ $data->is_read ? 'Đã đọc' : 'Chưa đọc' }}</p>
        </div>

    </div>

    <a href="{{ route('admin.notifications.index') }}" class="btn btn-secondary mt-3">Quay lại</a>

</div>

@endsection


