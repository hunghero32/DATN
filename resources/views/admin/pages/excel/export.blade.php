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
                <form action="{{ route('admin.report.index') }}" method="GET" class="mt-4">
                    <div class="row g-3">
                        <div class="col-md-3">
                            <label for="year" class="form-label">Theo Năm</label>
                            <select name="year" class="form-select select2">
                                <option value="">-- Chọn Năm --</option>
                                @foreach(range(date('Y'), 2000) as $year)
                                <option value="{{ $year }}" {{ request('year') == $year ? 'selected' : '' }}>{{ $year }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="col-md-3">
                            <label for="month" class="form-label">Theo Tháng</label>
                            <input type="month" name="month" class="form-control" value="{{ request('month') }}">
                        </div>

                        <div class="col-md-3">
                            <label for="day" class="form-label">Theo Ngày</label>
                            <select name="day" class="form-select select2">
                                <option value="">-- Chọn Ngày --</option>
                                @foreach($dates as $date)
                                <option value="{{ $date }}" {{ request('day') == $date ? 'selected' : '' }}>{{ date('d/m/Y', strtotime($date)) }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="col-md-3">
                            <label for="guest_phone" class="form-label">Số Điện Thoại</label>
                            <input type="text" name="guest_phone" class="form-control" placeholder="Nhập số điện thoại" value="{{ request('guest_phone') }}">
                        </div>

                        <div class="col-md-6">
                            <fieldset class="border rounded p-3 mt-3">
                                <legend class="float-none w-auto px-2">Chọn Khoảng Thời Gian</legend>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="start_date" class="form-label">Từ ngày</label>
                                        <input type="date" name="start_date" class="form-control" value="{{ request('start_date') }}">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="end_date" class="form-label">Đến ngày</label>
                                        <input type="date" name="end_date" class="form-control" value="{{ request('end_date') }}">
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    {{-- Nút thao tác --}}
                    <div class="d-flex justify-content-end gap-2 mt-4">
                        {{-- Nút xem trước --}}
                        <button type="submit" class="btn btn-primary" formaction="{{ route('admin.report.index') }}">
                            Xem Trước
                        </button>

                        {{-- Nút tải xuống Excel --}}
                        <button type="submit" class="btn btn-success" formaction="{{ route('admin.report.export') }}" formmethod="POST">
                            @csrf
                            Tải Xuống Excel
                        </button>
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
                            <th scope="col">#</th>
                            <th>Mã Booking</th>
                            <th>Tên Bệnh Nhân</th>
                            <th>SĐT</th>
                            <th>Ngày Đặt</th>
                            <th>Bác Sĩ</th>
                            <th>Dịch Vụ</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($bookings as $booking)
                        <tr>
                            <td>{{ $bookings->firstItem() + $loop->index }}</td>
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
                @endif
            </div>
            <div class="d-flex justify-content-center">
                {{ $bookings->appends(request()->query())->links() }}
            </div>
        </div>
    </div>
</div>
@push('scripts')
<script>
    $(document).ready(function() {
        $('.select2').select2({
            width: '100%'
        });
    });
</script>
@endpush
@endsection