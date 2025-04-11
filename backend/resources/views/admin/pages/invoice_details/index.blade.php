@extends('admin.index')

@section('content')
<div class="container mt-4">
    {{-- <h2 class="mb-4 text-center text-uppercase text-primary fw-bold">Chi Tiết Hóa Đơn</h2> --}}

    @foreach($invoiceDetails as $detail)
        <div class="card shadow-lg mb-4">
            <div class="card-header text-center border-bottom border-1 border-primary pb-3 shadow-sm">
                <h4 class="mb-1 fw-bold text-uppercase text-dark">HÓA ĐƠN KHÁM BỆNH</h4>
                <h5 class="mb-1 fw-bold text-primary text-secondary">Phòng Khám Đa Khoa Số 1</h5>
                <p class="mb-0 text-muted fst-italic">Địa chỉ: Số 1, Đường 2, Quận 3, TP.HN</p>
                <p class="mb-0 text-muted fst-italic">Điện thoại: 0123 456 789</p>
            </div>
            

            <div class="card-body mt-4" id="invoice-{{ $detail->invoice_id }}">
                <div class="row">
                    <div class="col-md-6">
                        <h5 class="mb-1"><strong>Mã Hóa Đơn:</strong> #{{ $detail->invoice_id }}</h5>
                        <p class="mb-0"><strong>Ngày Xuất:</strong> {{ \Carbon\Carbon::parse($detail->invoice->created_at)->format('d/m/Y') }}</p>
                    </div>

                    <div class="col-md-6 text-end">
                        <h5 class="fw-bold text-secondary">Thông Tin Khách Hàng</h5>
                        <p><strong>Họ Tên:</strong> {{ $detail->booking->guest->guest_name ?? 'N/A' }}</p>
                        <p><strong>Email:</strong> {{ $detail->booking->guest->guest_email ?? 'N/A' }}</p>
                        <p><strong>Số Điện Thoại:</strong> {{ $detail->booking->guest->guest_phone ?? 'N/A' }}</p>
                    </div>
                </div>


                <h5 class="fw-bold text-secondary mt-4">Chi Tiết Dịch Vụ</h5>
                <div class="border-top border-2 border-primary my-3 shadow-sm opacity-75"></div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Dịch Vụ</th>
                            <th>Bác Sĩ</th>
                            <th>Ngày Khám</th>
                            <th>Giờ Khám</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ $detail->booking->service->services_name ?? 'N/A' }}</td>
                            <td>{{ $detail->booking->doctor->doctor_name ?? 'N/A' }}</td>
                            <td>{{ \Carbon\Carbon::parse($detail->booking->booking_date)->format('d/m/Y') }}</td>
                            <td>{{ \Carbon\Carbon::parse($detail->booking->booking_time)->format('H:i') }}</td>
                        </tr>
                    </tbody>
                </table>

                <h5 class="fw-bold text-secondary mt-4">Chi Tiết Thanh Toán</h5>
                <div class="border-top border-2 border-primary my-3 shadow-sm opacity-75"></div>

                <div class="row">
                    <div class="col-md-6">
                        <p><strong>Giá Dịch Vụ:</strong> {{ number_format($detail->booking->service->price ?? 0, 0, ',', '.') }} VNĐ</p>
                        <p><strong>Thuế:</strong> {{ number_format($detail->invoice->tax ?? 0, 0, ',', '.') }} %</p>
                    </div>
                    <div class="col-md-6 text-end pe-4">                      <p><strong>Giảm Giá:</strong> {{ number_format($detail->invoice->discount ?? 0, 0, ',', '.') }} VNĐ</p>
                        @php
                            $gia = $detail->booking->service->price ?? 0;
                            $giam_gia = $detail->invoice->discount ?? 0;
                            $thue_phan_tram = $detail->invoice->tax ?? 0;

                            $tien_sau_giam = $gia - $giam_gia;
                            $tien_thue = ($tien_sau_giam * $thue_phan_tram) / 100;
                            $tong_tien = $tien_sau_giam + $tien_thue;
                        @endphp
                        <h5 class="fw-bold text-danger">Tổng Tiền: {{ number_format($tong_tien, 0, ',', '.') }} VNĐ</h5>
                    </div>
                </div>

                <div class="card-header text-center">
                    <p class="mb-0 text-muted fst-italic">Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi</p>
                    <p class="mb-0 text-muted fst-italic">Vui lòng giữ hóa đơn để đối chiếu khi cần thiết</p>

                </div>

                <div class="card-header d-flex justify-content-between align-items-center">
                    <div class="d-flex">
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
