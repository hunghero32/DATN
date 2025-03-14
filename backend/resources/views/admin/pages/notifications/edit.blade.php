@extends('admin.index')

@section('title', 'Chỉnh sửa thông báo')

@section('content')

    <div class="card">

        <div class="card-body">

            <h2>Sửa thông báo</h2>

            <form action="{{ route('admin.notifications.update', $notification->id) }}" method="POST">
                @csrf
                @method('PUT')
                
                <div class="mb-3">
                    <label for="user_id" class="form-label">Người dùng</label>
                    <select class="form-control" id="user_id" name="user_id" required>
                        <option value="">-- Chọn người dùng --</option>
                        @foreach ($users as $user)
                            <option value="{{ $user->id }}" {{ $notification->user_id == $user->id ? 'selected' : '' }}>
                                {{ $user->name }}
                            </option>
                        @endforeach
                    </select>
                </div>
                
                <div class="mb-3">
                    <label for="booking_id" class="form-label">Mã đặt lịch</label>
                    <select class="form-control" id="booking_id" name="booking_id" required>
                        <option value="">-- Chọn mã đặt lịch --</option>
                        @foreach ($bookings as $booking)
                            <option value="{{ $booking->id }}" {{ $notification->booking_id == $booking->id ? 'selected' : '' }}>
                                {{ $booking->id }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-3">
                    <label for="title" class="form-label">Tiêu đề</label>
                    <input type="text" class="form-control" id="title" name="title" value="{{ $notification->title }}" required>
                </div>

                <div class="mb-3">
                    <label for="content" class="form-label">Nội dung</label>
                    <textarea class="form-control" id="content" name="content" rows="3" required>{{ $notification->content }}</textarea>
                </div>

                <div class="mb-3">
                    <label for="type" class="form-label">Loại</label>
                    <select class="form-control" id="type" name="type" required>
                        <option value="info" {{ $notification->type == 'info' ? 'selected' : '' }}>Thông tin</option>
                        <option value="warning" {{ $notification->type == 'warning' ? 'selected' : '' }}>Cảnh báo</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="is_read" class="form-label">Trạng thái</label>
                    <select class="form-control" id="is_read" name="is_read" required>
                        <option value="1" {{ $notification->is_read == 1 ? 'selected' : '' }}>Đã đọc</option>
                        <option value="0" {{ $notification->is_read == 0 ? 'selected' : '' }}>Chưa đọc</option>
                    </select>
                </div>

                <button type="submit" class="btn btn-primary">Cập nhật</button>
                <a href="{{ route('admin.notifications.index') }}" class="btn btn-secondary">Quay lại</a>
            </form>

        </div>

    </div>
    
@endsection