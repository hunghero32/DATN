@extends('admin.index')

@section('content')
<div class="container mt-4">
    <h2>Thêm Chi Tiết Hóa Đơn</h2>
    <form action="{{ route('invoice_details.store') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label for="booking_id" class="form-label">Đặt Lịch</label>
            <select class="form-control select2" name="booking_id" required>
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
             {{-- <input type="hidden" name="total_amount" value="0"> --}}
        </div>

        <div class="mb-3">
            <label for="discount" class="form-label">Giảm giá (VNĐ)</label>
            <input type="number" class="form-control" name="discount">
        </div>

        <div class="mb-3">
            <label for="tax" class="form-label">Thuế (%)</label>
            <input type="number" class="form-control" name="tax">
        </div>

        <button type="submit" class="btn btn-primary">Thêm</button>
    </form>
</div>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css">

<script>
    $.noConflict();
    jQuery(document).ready(function($) {
        $('.select2').select2({
            placeholder: 'Chọn đặt lịch',
            allowClear: true
        });
    });
</script>
@endsection
