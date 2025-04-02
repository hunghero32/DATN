@extends('admin.index')

@section('content')
<div class="container mt-4">
    <h2>Chỉnh Sửa Chi Tiết Hóa Đơn</h2>
    <form action="{{ route('invoice_details.update', $invoiceDetail->id) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="mb-3">
            <label for="invoice_id" class="form-label">Hóa Đơn</label>
            <select class="form-control" name="invoice_id" disabled required>
                @foreach($invoices as $inv)
                    <option value="{{ $inv->id }}" {{ $inv->id == $invoiceDetail->invoice_id ? 'selected' : '' }}>
                        Hóa đơn #{{ $inv->id }}
                    </option>
                @endforeach
            </select>
        </div>
        <div class="mb-3">
            <label for="booking_id" class="form-label">Đặt Lịch</label>
            <select class="form-control" name="booking_id" required>
                @foreach($bookings as $booking)
                    <option value="{{ $booking->id }}" {{ $booking->id == $invoiceDetail->booking_id ? 'selected' : '' }}>
                        Đặt lịch #{{ $booking->id }}
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
