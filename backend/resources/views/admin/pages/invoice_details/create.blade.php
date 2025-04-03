@extends('admin.index')

@section('content')
<div class="container mt-4">
    <h2>Thêm Chi Tiết Hóa Đơn</h2>
    <form action="{{ route('invoice_details.store') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label for="booking_id" class="form-label">Đặt Lịch</label>
            <select class="form-control" name="booking_id" required>
                <option value="">Chọn đặt lịch</option>
                @foreach($bookings as $booking)
                    <option value="{{ $booking->id }}">
                        #{{ $booking->id }} | {{ $booking->booking_date }} | 
                        {{ $booking->guest->guest_name ?? 'Không có khách' }} | 
                        {{ $booking->guest->guest_phone ?? 'Không có SĐT' }} | 
                        {{ $booking->service->services_name ?? 'Không có dịch vụ' }} | 
                        {{ number_format($booking->service->price ?? 0, 0, ',', '.') }} VNĐ
                    </option>
                @endforeach
            </select>
            
        </div>

        <h4>Thông Tin Hóa Đơn</h4>
        <div class="mb-3">
             {{-- <label for="total_amount" class="form-label">Tổng tiền</label> --}}
             <input type="hidden" name="total_amount" value="0">
        </div>

        <div class="mb-3">
            <label for="discount" class="form-label">Giảm giá</label>
            <input type="number" class="form-control" name="discount">
        </div>

        <div class="mb-3">
            <label for="tax" class="form-label">Thuế</label>
            <input type="number" class="form-control" name="tax">
        </div>

        <button type="submit" class="btn btn-primary">Thêm</button>
    </form>
</div>
@endsection
