@extends('admin.index')

@section('content')
<div class="container mt-4">
    <h2 class="mb-4 text-center text-uppercase text-primary fw-bold">Chi Tiết Hóa Đơn</h2>

    @foreach($invoiceDetails as $detail)
        <div class="card shadow-lg mb-4">
            <div class="card-header bg-primary text-white">
                <h4 style="color: white" class="card-title mb-0">Mã Hóa Đơn: #{{ $detail->invoice_id }}</h4>
            </div>
            <div class="card-body" id="invoice-{{ $detail->invoice_id }}">
                <div class="row">
                    <!-- Cột trái -->
                    <div class="mt-3 col-md-6">
                        <h5 class="fw-bold text-secondary">Thông Tin Khách Hàng</h5>
                        <p><strong>Họ Tên:</strong> {{ $detail->booking->guest->guest_name ?? 'N/A' }}</p>
                        <p><strong>Email:</strong> {{ $detail->booking->guest->guest_email ?? 'N/A' }}</p>
                        <p><strong>Số Điện Thoại:</strong> {{ $detail->booking->guest->guest_phone ?? 'N/A' }}</p>
                    </div>

                    <!-- Cột phải -->
                    <div class="mt-3 col-md-6">
                        <h5 class="fw-bold text-secondary">Thông Tin Dịch Vụ</h5>
                        <p><strong>Tên Dịch Vụ:</strong> {{ $detail->booking->service->services_name ?? 'N/A' }}</p>
                        <p><strong>Ngày Đặt:</strong> {{ \Carbon\Carbon::parse($detail->booking->booking_date)->format('d/m/Y') }}</p>
                        <p><strong>Giờ Đặt:</strong> {{ \Carbon\Carbon::parse($detail->booking->booking_time)->format('H:i') }}</p>

                        <p><strong>Giá Dịch Vụ:</strong> {{ number_format($detail->booking->service->price ?? 0, 0, ',', '.') }} VNĐ</p>
                        <p><strong>Thuế:</strong> {{ number_format($detail->invoice->tax ?? 0, 0, ',', '.') }} VNĐ</p>
                        <p><strong>Giảm Giá:</strong> {{ number_format($detail->invoice->discount ?? 0, 0, ',', '.') }} VNĐ</p>

                        @php
                            $gia = $detail->booking->service->price ?? 0;
                            $thue = $detail->invoice->tax ?? 0;
                            $giam_gia = $detail->invoice->discount ?? 0;
                            $tong_tien = $gia + $thue - $giam_gia;
                        @endphp
                        <h5 class="fw-bold text-danger">Tổng Tiền: {{ number_format($tong_tien, 0, ',', '.') }} VNĐ</h5>
                    </div>
                </div>

                <hr>

                <h5 class="fw-bold text-secondary">Kết Quả Xét Nghiệm</h5>
                <p><strong>Chẩn Đoán:</strong> {{ $detail->booking->result->diagnosis ?? 'Chưa có kết quả' }}</p>
                <p><strong>Ghi Chú:</strong> {{ $detail->booking->result->note ?? 'Không có ghi chú' }}</p>

                @if($detail->booking->result && $detail->booking->result->file)
                @php
                    $filePath = asset('storage/' . $detail->booking->result->file);
                    $fileExtension = pathinfo($filePath, PATHINFO_EXTENSION);
                @endphp

                <h5 class="mt-3 fw-bold text-secondary">File Kết Quả</h5>

                @if(in_array($fileExtension, ['jpg', 'jpeg', 'png', 'gif']))
                    <img src="{{ $filePath }}" class="img-fluid rounded shadow mb-3" alt="File kết quả" style="max-width: 100%;">
                @elseif($fileExtension === 'pdf')
                    <iframe src="{{ $filePath }}" width="100%" height="400px"></iframe>
                @else
                    <p class="text-warning">Không thể hiển thị file này.</p>
                @endif

                <a href="{{ $filePath }}" class="btn btn-success mt-2" target="_blank">
                    <i class="fas fa-download"></i> Tải Xuống
                </a>
                @else
                    <p class="text-danger">Không có file kết quả.</p>
                @endif

                <div class="mt-3 d-flex justify-content-between align-items-center">
                <!-- Nút Sửa và Xóa -->
                <div class="mt-3 d-flex">
                    <a href="{{ route('invoice_details.edit', $detail->id) }}" class="btn btn-warning me-2">
                        <i class="fas fa-edit"></i> Sửa
                    </a>

                    <form action="{{ route('invoice_details.delete', $detail->id) }}" method="POST" onsubmit="return confirm('Bạn có chắc chắn muốn xóa không?');">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger">
                            <i class="fas fa-trash-alt"></i> Xóa
                        </button>
                    </form>
                </div>

                <!-- Nút In Hóa Đơn -->
                <button class="btn btn-primary mt-3" onclick="printInvoice('{{ $detail->invoice_id }}')">
                    <i class="fas fa-print"></i> In Hóa Đơn
                </button>
            </div>
            </div>
        </div>
    @endforeach

    <!-- Hiển thị phân trang -->
    <div class="d-flex justify-content-center">
        {{ $invoiceDetails->links() }}
    </div>
</div>
@endsection

@section('scripts')
<script>
    function printInvoice(invoiceId) {
        let printContent = document.getElementById(`invoice-${invoiceId}`).innerHTML;
        let originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        location.reload(); // Load lại trang sau khi in
    }
</script>
@endsection
