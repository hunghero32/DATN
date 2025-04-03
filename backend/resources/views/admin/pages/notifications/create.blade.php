@extends('admin.index')

@section('title', 'Thêm thông báo')

@section('content')

<div class="content-wrapper">

    <div class="container-xxl flex-grow-1 container-p-y">

        <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Thông báo /</span> Thêm mới</h4>

        <div class="card">

            <div class="card-body">

                <form action="{{ route('admin.notifications.store') }}" method="POST">

                    @csrf

                    <div class="row">

                        <div class="mb-3 col-md-6">
                            <label for="user_id" class="form-label">Người dùng</label>
                            <select id="user_id" name="user_id" class="form-control select2">
                                <option value="">-- Chọn người dùng --</option>
                                @foreach ($users as $user)
                                    <option value="{{ $user->id }}">{{ $user->name }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label for="booking_id" class="form-label">Mã đặt lịch</label>
                            <select id="booking_id" name="booking_id" class="form-control select2">
                                <option value="">-- Chọn mã đặt lịch --</option>
                                @foreach ($bookings as $booking)
                                    <option value="{{ $booking->id }}">{{ $booking->id }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="mb-3 col-md-12">
                            <label for="title" class="form-label">Tiêu đề</label>
                            <textarea class="form-control" id="title" name="title"></textarea>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label for="type" class="form-label">Loại</label>
                            <select id="type" name="type" class="form-control">
                                <option value="">-- Chọn loại --</option>
                                <option value="booking">Đặt phòng</option>
                                <option value="payment">Thanh toán</option>
                                <option value="general">Chung</option>
                            </select>
                        </div>

                        <div class="mb-3 col-md-12">
                            <label for="content" class="form-label">Nội dung</label>
                            <textarea class="form-control" id="content" name="content"></textarea>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label for="is_read" class="form-label">Trạng thái</label>
                            <select id="is_read" name="is_read" class="form-control">
                                <option value="">-- Trạng thái --</option>
                                <option value="1">Đã đọc</option>
                                <option value="0" selected>Chưa đọc</option>
                            </select>
                        </div>

                    </div>

                    <div class="mt-3">
                        <button type="submit" class="btn btn-primary">Lưu</button>
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

<script src="https://cdn.ckeditor.com/ckeditor5/34.0.0/classic/ckeditor.js"></script>

<script>
    $.noConflict();
    jQuery(document).ready(function($) {
        $(".select2").select2();

        ClassicEditor
            .create(document.querySelector('#content'))
            .catch(error => {
                console.error(error);
            });
        
        ClassicEditor
            .create(document.querySelector('#title'))
            .catch(error => {
                console.error(error);
            });
    });
</script>

@endsection


