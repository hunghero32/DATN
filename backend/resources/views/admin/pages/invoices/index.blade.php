@extends('admin.index')

@section('content')
<div class="container mt-4">
    <h2 class="mb-3">Danh sách hóa đơn</h2>

    <!-- Form tìm kiếm -->
    <div class="d-flex justify-content-between align-items-center gap-3 mb-3">
        <form action="{{ route('admin.invoices.index') }}" method="GET" class="mb-3 d-flex flex-grow-1">
            <div class="input-group">
                <input type="text" name="keyword" class="form-control" placeholder="Tìm kiếm hóa đơn..."
                    value="{{ request('keyword') }}">
                <button type="submit" class="btn btn-primary">Tìm kiếm</button>
            </div>
        </form>
        <a href="{{ route('invoice_details.create') }}" class="btn btn-success mb-3">Thêm hóa đơn</a>
    </div>
    <!-- Bảng danh sách hóa đơn -->
    <div class="table-responsive">
        <table class="table table-bordered table-hover">
            <thead class="">
                <tr>
                    <th>Mã</th>
                    <th>Khách hàng</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Dịch vụ</th>
                    <th>Thanh toán</th>
                    <th class=" text-nowrap">Hành động</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($invoices as $invoice)
                <tr>
                    <td>#{{ $invoice->id }}</td>
                    <td>{{ $invoice->guest_name ?? 'N/A' }}</td>
                    <td>{{ $invoice->guest_email ?? 'N/A' }}</td>
                    <td>{{ $invoice->guest_phone ?? 'N/A' }}</td>
                    <td>{{ $invoice->services_name ?? 'N/A' }}</td>
                    <td>
                        <form method="POST" action="{{ route('admin.invoices.updateStatus', $invoice->id) }}" class="d-inline">
                            @csrf
                            @method('PATCH')
                            <select name="status" onchange="this.form.submit()" class="form-select form-select-sm">
                                <option value="unpaid" {{ $invoice->status == 'unpaid' ? 'selected' : '' }}>Chưa thanh toán</option>
                                <option value="paid" {{ $invoice->status == 'paid' ? 'selected' : '' }}>Đã thanh toán</option>
                                <option value="pending" {{ $invoice->status == 'pending' ? 'selected' : '' }}>Đang xử lý</option>
                                <option value="cancelled" {{ $invoice->status == 'cancelled' ? 'selected' : '' }}>Đã hủy</option>
                            </select>
                        </form>
                    </td>
                    <td class=" text-nowrap">
                        <a href="{{ route('invoice_details.index', ['invoice_id' => $invoice->id]) }}" class="btn btn-info btn-sm">Chi tiết</a>
                        {{-- <a href="{{ route('admin.invoices.edit', $invoice->id) }}" class="btn btn-warning btn-sm">Sửa</a> --}}
                        {{-- <form action="{{ route('admin.invoices.delete', $invoice->id) }}" method="POST" style="display:inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Bạn có chắc muốn xóa?')">Xóa</button>
                        </form> --}}
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
<div class="d-flex justify-content-center mt-3">
    {{ $invoices->links() }}
</div>

@endsection