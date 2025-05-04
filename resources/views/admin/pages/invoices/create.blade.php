@extends('admin.index')

@section('content')
    <h2>Thêm hóa đơn mới</h2>

    <form action="{{ route('admin.invoices.store') }}" method="POST">
        @csrf
        <label>Tổng tiền:</label>
        <input type="number" name="total_amount" required>

        <label>Giảm giá:</label>
        <input type="number" name="discount">

        <label>Thuế:</label>
        <input type="number" name="tax">

        <button type="submit">Lưu</button>
    </form>
@endsection
