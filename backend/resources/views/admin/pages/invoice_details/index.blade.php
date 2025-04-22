@extends('admin.index')

@section('content')
<div class="container mt-4">
    {{-- <h2 class="mb-4 text-center text-uppercase text-primary fw-bold">Chi Tiết Hóa Đơn</h2> --}}

    @foreach($invoiceDetails as $detail)
    <div class="card shadow-lg mb-4">

        <div class="card-body mt-4" id="invoice-{{ $detail->invoice_id }}">
            <div class="card-header text-center border-bottom border-1 border-primary pb-3 mb-3">
                <h4 class="mb-1 fw-bold text-uppercase text-dark">HÓA ĐƠN KHÁM BỆNH</h4>
                <h5 class="mb-1 fw-bold text-primary text-secondary">{{ $system->site_name }}</h5>
                <p class="mb-0 fst-italic">Địa chỉ: {{ $system->address }}</p>
                <p class="mb-0 fst-italic">Hotline: {{ $system->hotline }}</p>
            </div>
            <div class="row">
                <div class="col-md-9 col-sm-4">
                    <h5 class="fw-bold text-secondary">Thông Tin Hóa Đơn</h5>
                    <p><strong>Mã Hóa Đơn:</strong> #{{ $detail->invoice_id }}</p>
                    <p><strong>Ngày Xuất:</strong> {{ \Carbon\Carbon::parse($detail->invoice->created_at)->format('d/m/Y') }}</p>
                    <p><strong>Hotline:</strong> {{ $system->hotline }}</p>
                </div>

                <div class="col-md-3 col-sm-4 text-start">
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
                        <td>{{ $detail->booking->service_name ?? 'N/A' }}</td>
                        <td>{{ $detail->booking->doctor_name ?? 'N/A' }}</td>
                        <td>{{ \Carbon\Carbon::parse($detail->booking->booking_date)->format('d/m/Y') }}</td>
                        <td>{{ \Carbon\Carbon::parse($detail->booking->booking_time)->format('H:i') }}</td>
                    </tr>
                </tbody>
            </table>
            <h5 class="fw-bold text-secondary mt-4">Kết Quả Khám Bệnh</h5>
            <div class="border-top border-2 border-primary my-3 shadow-sm opacity-75"></div>

            @if ($detail->booking->result)
            <div class="mb-3">
                <p><strong>Chuẩn Đoán:</strong> {{ $detail->booking->result->diagnosis ?? 'Không có dữ liệu' }}</p>
                <p><strong>Chỉ Định:</strong> {{ $detail->booking->result->prescription ?? 'Không có dữ liệu' }}</p>
                @if (!empty($detail->booking->result->note))
                <p><strong>Ghi Chú:</strong> {{ $detail->booking->result->note }}</p>
                @endif
            </div>
            @else
            <div class="text-muted fst-italic">Chưa có kết quả khám bệnh.</div>
            @endif
            <h5 class="fw-bold text-secondary mt-4">Chi Tiết Thanh Toán</h5>
            <div class="border-top border-2 border-primary my-3 shadow-sm opacity-75"></div>

            <div class="row">
                <div class="col-md-6">
                    <p><strong>Giá Dịch Vụ:</strong> {{ number_format($detail->booking->service_price ?? 0, 0, ',', '.') }} VNĐ</p>
                    <p><strong>Thuế:</strong> {{ number_format($detail->invoice->tax ?? 0, 0, ',', '.') }} %</p>
                </div>
                <div class="col-md-6 text-end pe-4">
                    <p><strong>Giảm Giá:</strong> {{ number_format($detail->invoice->discount ?? 0, 0, ',', '.') }} VNĐ</p>
                    @php
                    $gia = $detail->booking->service_price ?? 0;
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
        </div>

    </div>
    <div class="card-header d-flex justify-content-between align-items-center d-print-none">
        <div class="d-flex">
            <a href="{{ route('invoice_details.edit', $detail->id) }}" class="btn btn-warning me-2">
                <i class="fas fa-edit"></i> Sửa
            </a>

            {{-- <form action="{{ route('invoice_details.delete', $detail->id) }}" method="POST" onsubmit="return confirm('Bạn có chắc chắn muốn xóa không?');">
            @csrf
            @method('DELETE')
            <button type="submit" class="btn btn-danger">
                <i class="fas fa-trash-alt"></i> Xóa
            </button>
            </form> --}}
        </div>

        <button class="btn btn-primary mt-3" onclick="printInvoice('{{ $detail->invoice_id }}')">
            <i class="fas fa-print"></i> In Hóa Đơn
        </button>
    </div>
@endforeach
</div>
@endsection

@section('scripts')
<script>
    function printInvoice(invoiceId) {
        const invoiceContent = document.getElementById(`invoice-${invoiceId}`).innerHTML;

        const printArea = document.createElement('div');
        printArea.id = 'print-area';
        printArea.innerHTML = invoiceContent;
        document.body.appendChild(printArea);

        const style = document.createElement('style');
        style.innerHTML = `
        @media print {
    @page {
        size: A4 portrait;
        margin: 10mm;
    }

    html, body {
        padding: 0 !important;
        margin: 0 !important;
        height: auto !important;
        overflow: hidden !important;
        font-size: 12px !important;
        line-height: 1.3 !important;
    }

    body * {
        visibility: hidden;
    }

    #print-area, #print-area * {
        visibility: visible;
    }

    #print-area {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        max-width: 750px;
        margin: 0 auto;
        padding: 5px;
        font-size: 12px;
        line-height: 1.3;
    }

    .row {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 5px;
    }

    .col-md-6 {
        width: 49%;
    }

    .text-end {
        text-align: right !important;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 5px;
        font-size: 12px;
    }

    table th, table td {
        border: 1px solid #999;
        padding: 4px;
        text-align: left;
    }

    .d-print-none {
        display: none !important;
    }

    .card, .card-body, .row, table, tr, td, th {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
    }
}
                `;

        document.head.appendChild(style);
        window.print();
        setTimeout(() => {
            document.body.removeChild(printArea);
            document.head.removeChild(style);
        }, 1000);
    }
</script>
@endsection