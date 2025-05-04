@extends('admin.index')

@section('content')
<div class="container">
    <h2>Chỉnh sửa phản hồi</h2>
    <form action="{{ route('admin.feedback.update', $feedback->id) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="form-group">
            <label>Khách hàng</label>
            <select name="guest_id" class="form-control" required>
                @foreach($guests as $guest)
                    <option value="{{ $guest->id }}" {{ $feedback->guest_id == $guest->id ? 'selected' : '' }}>{{ $guest->guest_name }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
            <label>Bác sĩ (nếu có)</label>
            <select name="doctor_id" class="form-control">
                <option value="">Chọn bác sĩ</option>
                @foreach($doctors as $doctor)
                    <option value="{{ $doctor->id }}" {{ $feedback->doctor_id == $doctor->id ? 'selected' : '' }}>{{ $doctor->doctor_name }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
            <label>Dịch vụ (nếu có)</label>
            <select name="service_id" class="form-control">
                <option value="">Chọn dịch vụ</option>
                @foreach($services as $service)
                    <option value="{{ $service->id }}" {{ $feedback->service_id == $service->id ? 'selected' : '' }}>{{ $service->services_name }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
            <label>Xếp hạng</label>
            <input type="number" name="rating" class="form-control" min="1" max="5" value="{{ $feedback->rating }}" required>
        </div>
        <div class="form-group">
            <label>Bình luận</label>
            <textarea name="comments" class="form-control">{{ $feedback->comments }}</textarea>
        </div>
        <div class="form-group">
            <label>Trạng thái</label>
            <select name="status" class="form-control" required>
                <option value="pending" {{ $feedback->status == 'pending' ? 'selected' : '' }}>Chờ duyệt</option>
                <option value="approved" {{ $feedback->status == 'approved' ? 'selected' : '' }}>Đã duyệt</option>
                <option value="rejected" {{ $feedback->status == 'rejected' ? 'selected' : '' }}>Từ chối</option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary">Cập nhật</button>
    </form>
</div>
@endsection
