@extends('admin.index')

@section('content')
<div class="container mt-4">
    <h2>Thêm Chi Tiết Hóa Đơn</h2>
    <form action="{{ route('invoice_details.store') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label for="invoice_id" class="form-label">Hóa Đơn</label>
            <select class="form-control" name="invoice_id" required>
                <option value="">Chọn hóa đơn</option>
                @foreach($invoices as $invoice)
                    <option value="{{ $invoice->id }}">{{ $invoice->id }}</option>
                @endforeach
            </select>
        </div>
        <div class="mb-3">
            <label for="booking_id" class="form-label">Đặt lịch</label>
            <select class="form-control" name="booking_id" required>
                <option value="">Chọn đặt lịch</option>
                @foreach($bookings as $booking)
                    <option value="{{ $booking->id }}">{{ $booking->id }}</option>
                @endforeach
            </select>
        </div>
        <button type="submit" class="btn btn-primary">Thêm</button>
    </form>
</div>
@endsection
