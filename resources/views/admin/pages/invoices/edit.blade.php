@extends('admin.index')

@section('content')
    <h2>Chỉnh sửa hóa đơn</h2>

    <form action="{{ route('admin.invoices.update', $invoice->id) }}" method="POST">
        @csrf
        @method('PUT')

        <label>Tổng tiền:</label>
        <input type="number" name="total_amount" value="{{ $invoice->total_amount }}" required>

        <label>Giảm giá:</label>
        <input type="number" name="discount" value="{{ $invoice->discount }}">

        <label>Thuế:</label>
        <input type="number" name="tax" value="{{ $invoice->tax }}">

        <button type="submit">Cập nhật</button>
    </form>
@endsection
