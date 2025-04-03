@extends('admin.index')

@section('content')
<div class="container">
    <h2 class="mb-4">Xuất Danh Sách Khám Bệnh</h2>
    
    <form action="{{ route('admin.report.index') }}" method="GET">
        <div class="row">
            <div class="col-md-3">
                <label for="year">Theo Năm:</label>
                <select name="year" class="form-control">
                    <option value="">-- Chọn Năm --</option>
                    @foreach(range(date('Y'), 2000) as $year)
                        <option value="{{ $year }}" {{ old('year') == $year ? 'selected' : '' }}>{{ $year }}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-md-3">
                <label for="month">Theo Tháng:</label>
                <input type="month" name="month" class="form-control" value="{{ old('month') }}">
            </div>
            <div class="col-md-3">
                <label for="day">Theo Ngày:</label>
                <select name="day" class="form-control">
                    <option value="">-- Chọn Ngày --</option>
                    @foreach($dates as $date)
                        <option value="{{ $date }}" {{ old('day') == $date ? 'selected' : '' }}>{{ date('d/m/Y', strtotime($date)) }}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-md-3">
                <label for="guest_phone">Số Điện Thoại:</label>
                <input type="text" name="guest_phone" class="form-control" placeholder="Nhập số điện thoại" value="{{ old('guest_phone') }}">
            </div>            
        </div>
    
        <hr>
    
        <h5>Hoặc chọn khoảng thời gian:</h5>
        <div class="row">
            <div class="col-md-4">
                <label for="start_date">Từ ngày:</label>
                <input type="date" name="start_date" class="form-control" value="{{ old('start_date') }}">
            </div>
            <div class="col-md-4">
                <label for="end_date">Đến ngày:</label>
                <input type="date" name="end_date" class="form-control" value="{{ old('end_date') }}">
            </div>
        </div>
    
        <div class="d-flex justify-content-between align-items-center">
            <button type="submit" class="btn btn-primary mt-3">Xem Trước</button>
            <a href="{{ route('admin.report.export', request()->query()) }}" class="btn btn-success">Tải Xuống Excel</a>
        </div>
    </form>    

    <hr>

    <h3>Kết Quả:</h3>
    @if($bookings->isEmpty())
        <p class="alert alert-warning">Không có bản ghi nào phù hợp với tiêu chí tìm kiếm.</p>
    @else
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Mã Đặt Lịch</th>
                    <th>Tên Bệnh Nhân</th>
                    <th>SĐT</th>
                    <th>Ngày Đặt</th>
                    <th>Bác Sĩ</th>
                    <th>Dịch Vụ</th>
                    <th>Kết Quả</th>
                </tr>
            </thead>
            <tbody>
                @foreach($bookings as $booking)
                    <tr>
                        <td>{{ $booking->id }}</td>
                        <td>{{ $booking->guest->guest_name ?? 'N/A' }}</td>
                        <td>{{ $booking->guest->guest_phone?? 'N/A' }}</td>
                        <td>{{ \Carbon\Carbon::parse($booking->booking_date)->format('d/m/Y') }}</td>
                        <td>{{ $booking->doctor->doctor_name ?? 'N/A' }}</td>
                        <td>{{ $booking->service->services_name ?? 'N/A' }}</td>
                        <td>{{ $booking->result->diagnosis ?? 'Chưa có' }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif
</div>
@endsection
