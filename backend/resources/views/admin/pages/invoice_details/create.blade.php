@extends('admin.index')

@section('content')
<div class="content-wrapper">
    <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Hóa đơn /</span> Thêm hóa đơn</h4>

        <div class="card">
            {{-- <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Danh sách chuyên khoa</h5>
            </div> --}}

            <div class="card-body">
    <form action="{{ route('invoice_details.store') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label for="booking_id" class="form-label">Đặt Lịch</label>
            <select class="form-control select2" name="booking_id">
                <option value="">Chọn đặt lịch</option>
                @foreach($bookings as $booking)
                    <option value="{{ $booking->id }}">
                        #{{ $booking->id }} | {{ $booking->booking_date }} | 
                        {{ $booking->guest->guest_name ?? 'Không có khách' }} | 
                        {{ $booking->guest->guest_phone ?? 'Không có SĐT' }} | 
                        {{ $booking->service_name ?? 'Không có dịch vụ' }} | 
                        {{ number_format($booking->service_price ?? 0, 0, ',', '.') }} VNĐ
                    </option>
                @endforeach
            </select>
            @error('booking_id')
                <div class="invalid-feedback d-block">{{ $message }}</div>
            @enderror
        </div>

        <h4>Thông Tin Hóa Đơn</h4>
        <div class="mb-3">
             {{-- <label for="total_amount" class="form-label">Tổng tiền</label> --}}
             {{-- <input type="hidden" name="total_amount" value="0"> --}}
        </div>

        <div class="mb-3">
            <label for="discount" class="form-label">Giảm giá (VNĐ)</label>
            <input type="number" class="form-control" name="discount">
            @error('discount')
                <div class="invalid-feedback d-block">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="tax" class="form-label">Thuế (%)</label>
            <input type="number" class="form-control" name="tax">
            @error('tax')
                <div class="invalid-feedback d-block">{{ $message }}</div>
            @enderror
        </div>

        <button type="submit" class="btn btn-primary">Thêm</button>
    </form>
</div>
</div>
</div>
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
