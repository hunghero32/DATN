@extends('admin.index')

@section('content')
{{-- <div class="container mt-4">
    <h2 class="mb-3">Danh Sách Đánh giá</h2> --}}
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light"></span> Đánh giá</h4>
    
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Danh sách đánh giá</h5>
                </div>
    
                <div class="card-body">

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
            <div class="col-md-3 text-center">
                <div class="bg-light border rounded p-2">
                    <strong class="text-success">
                        Tổng số lượt đánh giá: {{ $feedbacks->total() }}
                    </strong>
                </div>
            </div>            
        </div>
    </form>


    <table class="table table-bordered">
    @php
    $statusMap = [
        'pending' => 'Đang đánh giá',
        'approved' => 'Đã đánh giá',
        'rejected' => 'Đã hủy',
    ];
@endphp
        <thead>
            <tr>
                <th>#</th>
                <th>Khách Hàng</th>
                <th>Bác Sĩ</th>
                <th>Dịch Vụ</th>
                <th>Đánh Giá</th>
                <th>Bình Luận</th>
                <th>Trạng Thái</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($feedbacks as $feedback)
            <tr>
            <td>{{ ($feedbacks->currentPage() - 1) * $feedbacks->perPage() + $loop->iteration }}</td>
                <td>{{ $feedback->guest->guest_name ?? 'N/A' }}</td>
                <td>{{ $feedback->doctor->doctor_name ?? 'N/A' }}</td>
                <td>{{ $feedback->service->services_name ?? 'N/A' }}</td>
                <td>{{ $feedback->rating }}/5</td>
                <td>{{ $feedback->comments ?? 'Không có' }}</td>
                <td>{{ $statusMap[$feedback->status] ?? 'Không xác định' }}</td>
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

    <div class="mt-3 d-flex justify-content-center">
    {{ $averageRatings->appends(['avg_page' => request('avg_page')])->links() }}
    </div>
</div>
</div>
</div>
</div>
@endsection
