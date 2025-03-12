@extends('admin.index')

@section('content')
<div class="container mt-4">
    <h2>Chỉnh Sửa Chi Tiết Hóa Đơn</h2>
    <form action="{{ route('invoice_details.update', $invoiceDetail->id) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="mb-3">
            <label for="invoice_id" class="form-label">Hóa Đơn</label>
            <select class="form-control" name="invoice_id" required>
                @foreach($invoices as $invoice)
                    <option value="{{ $invoice->id }}" {{ $invoice->id == $invoiceDetail->invoice_id ? 'selected' : '' }}>{{ $invoice->id }}</option>
                @endforeach
            </select>
        </div>
        <div class="mb-3">
            <label for="booking_id" class="form-label">Đặt Lịch</label>
            <select class="form-control" name="booking_id" required>
                @foreach($bookings as $booking)
                    <option value="{{ $booking->id }}" {{ $booking->id == $invoiceDetail->booking_id ? 'selected' : '' }}>{{ $booking->id }}</option>
                @endforeach
            </select>
        </div>
        <button type="submit" class="btn btn-primary">Cập Nhật</button>
    </form>
</div>
@endsection
