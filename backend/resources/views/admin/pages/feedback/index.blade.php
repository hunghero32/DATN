@extends('admin.index')

@section('content')
<div class="container mt-4">
    <h2 class="mb-3">Danh Sách Phản Hồi</h2>

    <form action="{{ route('admin.feedback.index') }}" method="GET" class="mb-3">
        <div class="row d-flex align-items-center">
            <div class="col-md-4">
                <input type="text" name="search" class="form-control" placeholder="Tìm kiếm theo bình luận hoặc dịch vụ" value="{{ request()->search }}">
            </div>
            <div class="col-md-3">
                <select name="rating" class="form-control">
                    <option value="">-- Chọn Rating --</option>
                    <option value="1" {{ request()->rating == 1 ? 'selected' : '' }}>1 Sao</option>
                    <option value="2" {{ request()->rating == 2 ? 'selected' : '' }}>2 Sao</option>
                    <option value="3" {{ request()->rating == 3 ? 'selected' : '' }}>3 Sao</option>
                    <option value="4" {{ request()->rating == 4 ? 'selected' : '' }}>4 Sao</option>
                    <option value="5" {{ request()->rating == 5 ? 'selected' : '' }}>5 Sao</option>
                </select>
            </div>
            <div class="col-md-2">
                <button type="submit" class="btn btn-primary">Tìm kiếm</button>
            </div>
            <div class="col-md-3">
                <a href="{{ route('admin.feedback.create') }}" class="btn btn-success">Thêm feedback</a>
            </div>
        </div>
    </form>
    

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>#</th>
                <th>Khách Hàng</th>
                <th>Bác Sĩ</th>
                <th>Dịch Vụ</th>
                <th>Đánh Giá</th>
                <th>Bình Luận</th>
                <th>Trạng Thái</th>
                <th>Hành Động</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($feedbacks as $feedback)
            <tr>
                <td>{{ $feedback->id }}</td>
                <td>{{ $feedback->guest->guest_name ?? 'N/A' }}</td>
                <td>{{ $feedback->doctor->doctor_name ?? 'N/A' }}</td>
                <td>{{ $feedback->service->services_name ?? 'N/A' }}</td>
                <td>{{ $feedback->rating }}/5</td>
                <td>{{ $feedback->comments ?? 'Không có' }}</td>
                <td>{{ ucfirst($feedback->status) }}</td>
                <td>
                    <a href="{{ route('admin.feedback.edit', $feedback->id) }}" class="btn btn-warning btn-sm">Sửa</a>
                    <form action="{{ route('admin.feedback.delete', $feedback->id) }}" method="POST" class="d-inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Bạn có chắc chắn muốn xóa?')">Xóa</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="d-flex justify-content-center mt-3">
        {{ $feedbacks->links() }}
    </div>

    <h3>Trung bình đánh giá theo dịch vụ</h3>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Dịch Vụ</th>
                <th>Trung Bình Rating</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($averageRatings as $avg)
            <tr>
                <td>{{ $avg->service->services_name ?? 'N/A' }}</td>
                <td>{{ number_format($avg->avg_rating, 1) }}/5</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>

@endsection
