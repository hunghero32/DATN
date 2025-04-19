@extends('admin.index')

@section('content')
<div class="container mt-4">
    <h2>Chỉnh Sửa Chi Tiết Hóa Đơn</h2>
    <form action="{{ route('invoice_details.update', $invoiceDetail->id) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="mb-3">
            <label for="invoice_id" class="form-label">Hóa Đơn</label>
            <input type="text" class="form-control" name="invoice_id" value="{{ $invoiceDetail->invoice_id }}" readonly>

        </div>
        {{-- <div class="mb-3">
            <label for="booking_id" class="form-label">Đặt Lịch</label>
            <select class="form-control" name="booking_id" required>
                <option value="">Chọn đặt lịch</option>
                @foreach($bookings as $booking)
                    <option value="{{ $booking->id }}" {{ $booking->id == $invoiceDetail->booking_id ? 'selected' : '' }}>
                        #{{ $booking->id }} | {{ $booking->booking_date }} | 
                        {{ $booking->guest->guest_name ?? 'Không có khách' }} | 
                        {{ $booking->guest->guest_phone ?? 'Không có SĐT' }} | 
                        {{ $booking->service->services_name ?? 'Không có dịch vụ' }} | 
                        {{ number_format($booking->service->price ?? 0, 0, ',', '.') }} VNĐ
                    </option>
                @endforeach
            </select>
        </div> --}}
        <div class="mb-3">
            <label for="booking_id" class="form-label">Thông tin Đặt Lịch</label>
            <div class="card p-3 bg-light border">
                <p class="mb-1"><strong>Mã đặt lịch:</strong> #{{ $invoiceDetail->booking->id }}</p>
                <p class="mb-1"><strong>Ngày đặt:</strong> {{ $invoiceDetail->booking->booking_date }}</p>
                <p class="mb-1"><strong>Khách hàng:</strong> {{ $invoiceDetail->booking->guest->guest_name ?? 'Không có khách' }}</p>
                <p class="mb-1"><strong>SĐT:</strong> {{ $invoiceDetail->booking->guest->guest_phone ?? 'Không có SĐT' }}</p>
                <p class="mb-1"><strong>Dịch vụ:</strong> {{ $invoiceDetail->booking->service_name ?? 'Không có dịch vụ' }}</p>
                <p class="mb-0"><strong>Giá:</strong> {{ number_format($invoiceDetail->booking->service_price ?? 0, 0, ',', '.') }} VNĐ</p>
            </div>
            <input type="hidden" name="booking_id" value="{{ $invoiceDetail->booking_id }}">
        </div>        
        <h4>Thông Tin Hóa Đơn</h4>
        
        <div class="mb-3">
            <label for="discount" class="form-label">Giảm giá</label>
            <input type="number" class="form-control" name="discount" value="{{ $invoice->discount }}">
        </div>

        <div class="mb-3">
            <label for="tax" class="form-label">Thuế</label>
            <input type="number" class="form-control" name="tax" value="{{ $invoice->tax }}">
        </div>

        <button type="submit" class="btn btn-primary">Cập Nhật</button>
    </form>
</div>
@endsection
