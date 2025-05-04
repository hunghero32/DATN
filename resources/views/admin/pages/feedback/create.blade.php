@extends('admin.index')

@section('content')
<div class="container">
    <h2>Thêm phản hồi</h2>
    <form action="{{ route('admin.feedback.store') }}" method="POST">
        @csrf
        <div class="form-group">
            <label>Khách hàng</label>
            <select name="guest_id" class="form-control" required>
                @foreach($guests as $guest)
                    <option value="{{ $guest->id }}">{{ $guest->guest_name }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
            <label>Bác sĩ</label>
            <select name="doctor_id" class="form-control">
                <option value="">Chọn bác sĩ</option>
                @foreach($doctors as $doctor)
                    <option value="{{ $doctor->id }}">{{ $doctor->doctor_name }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
            <label>Dịch vụ</label>
            <select name="service_id" class="form-control">
                <option value="">Chọn dịch vụ</option>
                @foreach($services as $service)
                    <option value="{{ $service->id }}">{{ $service->services_name }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
            <label>Xếp hạng</label>
            <input type="number" name="rating" class="form-control" min="1" max="5" required>
        </div>
        <div class="form-group">
            <label>Bình luận</label>
            <textarea name="comments" class="form-control"></textarea>
        </div>
        <div class="form-group">
            <label>Trạng thái</label>
            <select name="status" class="form-control" required>
                <option value="pending">Chờ duyệt</option>
                <option value="approved">Đã duyệt</option>
                <option value="rejected">Từ chối</option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary">Lưu</button>
    </form>
</div>
@endsection