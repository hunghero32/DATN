@extends('admin.index')

@section('content')
{{-- <div class="container">
    <h2 class="mb-4">Xuất Danh Sách Khám Bệnh</h2> --}}
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light"></span>Xuất Danh Sách Khám Bệnh</h4>
    
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Lọc theo ngày</h5>
                </div>
    
                <div class="card-body">
    
    <form action="{{ route('admin.report.index') }}" method="GET">
        <div class="row">
            {{-- <div class="col-md-3">
                <label for="year">Theo Năm:</label>
                <select name="year" class="form-control">
                    <option value="">-- Chọn Năm --</option>
                    @foreach(range(date('Y'), 2000) as $year)
                        <option value="{{ $year }}" {{ old('year') == $year ? 'selected' : '' }}>{{ $year }}</option>
                    @endforeach
                </select>
            </div> --}}
            {{-- <div class="col-md-3">
                <label for="month">Theo Tháng:</label>
                <input type="month" name="month" class="form-control" value="{{ old('month') }}">
            </div> --}}
            <div class="col-md-3">
                <label for="day">Theo Ngày:</label>
                <select name="day" class="form-control select2">
                    <option value="">-- Chọn Ngày --</option>
                    @foreach($dates as $date)
                        <option value="{{ $date }}" {{ old('day') == $date ? 'selected' : '' }}>{{ date('d/m/Y', strtotime($date)) }}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-md-3">
                <label for="guest_phone">Số Điện Thoại:</label>
                <input type="text" name="guest_phone" class="form-control" placeholder="Nhập số điện thoại" value="{{ old('guest_phone', request('guest_phone')) }}">
            </div>            
            
        {{-- <h5> Chọn khoảng thời gian:</h5> --}}
        <div class="col-md-6">
            <div class="border rounded p-2">
                <div class="row">
                    <div class="col-md-6">
                        <label for="start_date">Từ ngày:</label>
                        <input type="date" name="start_date" class="form-control" value="{{ old('start_date') }}">
                    </div>
                    <div class="col-md-6">
                        <label for="end_date">Đến ngày:</label>
                        <input type="date" name="end_date" class="form-control" value="{{ old('end_date') }}">
                    </div>
                </div>
            </div>
        </div>
    </div>
        <div class="d-flex justify-content-between align-items-center">
            <button type="submit" class="btn btn-primary mt-3">Xem Trước</button>
            {{-- <a href="{{ route('admin.report.export', request()->query()) }}" class="btn btn-success">Tải Xuống Excel</a> --}}
        </div>
    </form>    
    <form id="exportForm" action="{{ route('admin.report.export') }}" method="POST">
        @csrf
        <input type="hidden" name="day" value="{{ request('day') }}">
        <input type="hidden" name="start_date" value="{{ request('start_date') }}">
        <input type="hidden" name="end_date" value="{{ request('end_date') }}">
        <input type="hidden" name="guest_phone" value="{{ request('guest_phone') }}">
        <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-success mt-3">Tải Xuống Excel</button>
        </div>
    </form>            
    <hr>

    <h3>Xem trước một số thông tin:</h3>
    @if($bookings->isEmpty())
        <p class="alert alert-warning">Không có bản ghi nào phù hợp với tiêu chí tìm kiếm.</p>
    @else
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Mã Booking</th>
                    <th>Tên Bệnh Nhân</th>
                    <th>SĐT</th>
                    {{-- <th>Địa chỉ</th> --}}
                    <th>Ngày Đặt</th>
                    <th>Bác Sĩ</th>
                    <th>Dịch Vụ</th>
                </tr>
            </thead>
            <tbody>
                @foreach($bookings as $booking)
                    <tr>
                        <td>#{{ $booking->id }}</td>
                        <td>{{ $booking->guest->guest_name ?? 'N/A' }}</td>
                        <td>{{ $booking->guest->guest_phone?? 'N/A' }}</td>
                        {{-- <td>{{json_encode($booking->guest->address, JSON_UNESCAPED_UNICODE)}}</td> --}}
                        {{-- <td>{{ $booking->guest->address?? 'N/A' }}</td> --}}
                        <td>{{ \Carbon\Carbon::parse($booking->booking_date)->format('d/m/Y') }}</td>
                        <td>{{ $booking->doctor_name ?? 'N/A' }}</td>
                        <td>{{ $booking->service_name ?? 'N/A' }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <div class="d-flex justify-content-center">
            {{ $bookings->links() }}
        </div>
        
    @endif
</div>
</div>
</div>
</div>

@push('scripts')
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css">

<script>
    $.noConflict();
    jQuery(document).ready(function($) {
        $('.select2').select2({
            placeholder: '-- Chọn Ngày --',
            allowClear: true
        });
    });
</script>
@endpush
@endsection
