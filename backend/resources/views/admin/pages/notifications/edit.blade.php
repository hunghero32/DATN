@extends('admin.index')

@section('title', 'Chỉnh sửa thông báo')

@section('content')

    <div class="content-wrapper">

        <div class="container-xxl flex-grow-1 container-p-y">

            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Thông báo /</span> Chỉnh sửa</h4>

            <div class="card">

                <div class="card-body">

                    <form action="{{ route('admin.notifications.update', $notification->id) }}" method="POST">
                        @csrf
                        @method('PUT')

                        <div class="row">

                            <div class="mb-3 col-md-6">
                                <label for="user_id" class="form-label">Người dùng</label>
                                <select class="form-control select2" id="user_id" name="user_id">
                                    <option value="">-- Chọn người dùng --</option>
                                    @foreach ($users as $user)
                                        <option value="{{ $user->id }}" {{ $notification->user_id == $user->id ? 'selected' : '' }}>{{ $user->name }}</option>
                                    @endforeach
                                </select>
                            </div>

                            <div class="mb-3 col-md-6">
                                <label for="booking_id" class="form-label">Mã đặt lịch</label>
                                <select class="form-control select2" id="booking_id" name="booking_id">
                                    <option value="">-- Chọn mã đặt lịch --</option>
                                    @foreach ($bookings as $booking)
                                        <option value="{{ $booking->id }}" {{ $notification->booking_id == $booking->id ? 'selected' : '' }}>{{ $booking->id }}</option>
                                    @endforeach
                                </select>
                            </div>

                            <div class="mb-3 col-md-6">
                                <label for="title" class="form-label">Tiêu đề</label>
                                <input type="text" class="form-control" id="title" name="title" value="{{ $notification->title }}">
                            </div>

                            <div class="mb-3 col-md-6">
                                <label for="type" class="form-label">Loại</label>
                                <select class="form-control" id="type" name="type">
                                    <option value="">-- Chọn loại --</option>
                                    <option value="info" {{ $notification->type == 'info' ? 'selected' : '' }}>Thông tin</option>
                                    <option value="warning" {{ $notification->type == 'warning' ? 'selected' : '' }}>Cảnh báo</option>
                                </select>
                            </div>

                            <div class="mb-3 col-12">
                                <label for="content" class="form-label">Nội dung</label>
                                <textarea class="form-control" id="content" name="content" rows="3">{{ $notification->content }}</textarea>
                            </div>

                            <div class="mb-3 col-md-6">
                                <label for="is_read" class="form-label">Trạng thái</label>
                                <select class="form-control" id="is_read" name="is_read">
                                    <option value="">-- Trạng thái --</option>
                                    <option value="1" {{ $notification->is_read == 1 ? 'selected' : '' }}>Đã đọc</option>
                                    <option value="0" {{ $notification->is_read == 0 ? 'selected' : '' }}>Chưa đọc</option>
                                </select>
                            </div>

                        </div>

                        <div class="mt-3">
                            <button type="submit" class="btn btn-primary">Cập nhật</button>
                            <a href="{{ route('admin.notifications.index') }}" class="btn btn-secondary">Quay lại</a>
                        </div>

                    </form>

                </div>

            </div>

        </div>

    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js"></script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css">
    
    <script>
        $.noConflict();
        jQuery(document).ready(function($) {
            $(".select2").each(function() {
                $(this).select2();
            });
        });
    </script>

@endsection
