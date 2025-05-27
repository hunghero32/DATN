@extends('admin.index')

@section('content')
    <div class="container py-5 print-area">
        <div class="p-5 shadow bg-white no-break" style="max-width: 800px; margin: auto; border: 1px solid #ddd;">
            <h4 class="text-center mb-4">Hồ sơ bệnh án</h4>

            @foreach ($records as $record)
                <div class="mb-3 text-end">
                    <strong>Mã hồ sơ:</strong> #{{ $record->id }}
                </div>

                <p><strong>Tên:</strong> {{ $guest->guest_name }}</p>
                <p><strong>Giới tính:</strong> {{ $guest->gender ?? '---' }}</p>
                <p><strong>Ngày sinh:</strong> {{ $guest->birthday ?? '---' }}</p>
                <p><strong>BHYT:</strong> {!! $record->BHYT ?? 'Không có' !!}</p>
                <p><strong>SĐT:</strong> {{ $guest->guest_phone ?? '---' }}</p>
                <p><strong>Email:</strong> {{ $guest->guest_email ?? '---' }}</p>

                <hr>

                <p><strong>Tình trạng bệnh:</strong>{!! $record->medical_condition ?? 'Chưa có thông tin' !!}</p>
                <p><strong>Tiền sử gia đình:</strong> {!! $record->family_history ?? 'Không có' !!}</p>
                <p><strong>Dị ứng:</strong> {!! $record->allergies ?? 'Không có' !!}</p>
                <p><strong>Thuốc đang dùng:</strong> {!! $record->medications ?? 'Không có' !!}</p>
                <p><strong>Phác đồ điều trị:</strong> {!! $record->treatment ?? 'Không có' !!}</p>

                <hr>

                <p><strong>Ghi chú và nhận xét:</strong></p>
                <div style="min-height: 100px; border: 1px dashed #ccc; padding: 10px;">
                    {!! $record->note ?? 'Không có ghi chú' !!}
                </div>

                <hr>

                <p><strong>Trạng thái:</strong>
                    <span class="badge {{ $record->isDeleted ? 'bg-danger' : 'bg-success' }}">
                        {{ $record->isDeleted ? 'Đã Xóa' : 'Còn Hiệu Lực' }}
                    </span>
                </p>
                <p><strong>Ngày tạo:</strong> {{ $record->created_at->format('d/m/Y H:i') }}</p>
                <p><strong>Ngày cập nhật:</strong> {{ $record->updated_at->format('d/m/Y H:i') }}</p>

                <hr style="border-top: 2px dashed #aaa;">
            @endforeach

            <div class="mt-4 text-center no-print">
                <button onclick="window.print()" class="btn btn-primary mt-3 me-2">In</button>
                <a href="{{ route('admin.guests.index') }}" class="btn btn-outline-primary mt-3">Quay lại</a>
            </div>
        </div>
    </div>

    <style>
        @media print {

            /* Ẩn tất cả nội dung mặc định */
            body * {
                visibility: hidden;
                box-shadow: none !important;
            }

            /* Hiện đúng vùng cần in */
            .print-area,
            .print-area * {
                visibility: visible;
            }

            /* Đặt vị trí tuyệt đối ở đầu trang, không bị đẩy xuống */
            .print-area {
                position: absolute;
                max-width: 800px;
                /* Chiều rộng tối đa khung */
                margin: auto;
                /* Căn giữa */
                padding: 20px;
                /* Khoảng cách bên trong */
                font-size: 13px;
                /* Cỡ chữ to hơn */
                line-height: 1.6;
                /* Giãn dòng dễ đọc hơn */
                background: white;
                /* Màu nền trắng */
            }

            /* Xóa margin/padding mặc định của trình duyệt */
            html,
            body {
                margin: 0 !important;
                padding: 0 !important;
                height: auto !important;
                background: white !important;
                font-size: 14px;
            }

            /* Định nghĩa trang in đúng khổ A4 */
            @page {
                size: A4 portrait;
                margin: 10mm;
            }

            /* Ẩn nút hoặc thành phần không cần in */
            .no-print {
                display: none !important;
            }
        }
    </style>
@endsection
